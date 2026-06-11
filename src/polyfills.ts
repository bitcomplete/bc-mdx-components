// Minimal Web-API shims for sandboxed JS engines (e.g. v8go) that ship
// only ECMAScript built-ins. react-dom/server.edge calls into these at
// module-init time, so this file must execute before the React import.
// Imported first in bundle.ts.

const g = globalThis as Record<string, unknown>;

if (typeof g.TextEncoder === "undefined") {
  class TextEncoderShim {
    readonly encoding = "utf-8";
    encode(str = ""): Uint8Array {
      // Encode via well-formed UTF-8 manually so we don't depend on
      // decodeURIComponent's surrogate handling.
      const out: number[] = [];
      for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        if (c >= 0xd800 && c <= 0xdbff && i + 1 < str.length) {
          const c2 = str.charCodeAt(i + 1);
          if (c2 >= 0xdc00 && c2 <= 0xdfff) {
            c = 0x10000 + (((c - 0xd800) << 10) | (c2 - 0xdc00));
            i++;
          }
        }
        if (c < 0x80) {
          out.push(c);
        } else if (c < 0x800) {
          out.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
        } else if (c < 0x10000) {
          out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
        } else {
          out.push(
            0xf0 | (c >> 18),
            0x80 | ((c >> 12) & 0x3f),
            0x80 | ((c >> 6) & 0x3f),
            0x80 | (c & 0x3f),
          );
        }
      }
      return new Uint8Array(out);
    }
    encodeInto(str: string, dest: Uint8Array) {
      const bytes = this.encode(str);
      const n = Math.min(bytes.length, dest.length);
      dest.set(bytes.subarray(0, n));
      return { read: str.length, written: n };
    }
  }
  g.TextEncoder = TextEncoderShim;
}

if (typeof g.TextDecoder === "undefined") {
  class TextDecoderShim {
    readonly encoding = "utf-8";
    readonly fatal = false;
    readonly ignoreBOM = false;
    decode(input?: BufferSource): string {
      if (!input) return "";
      const view =
        input instanceof Uint8Array
          ? input
          : new Uint8Array(input instanceof ArrayBuffer ? input : (input as ArrayBufferView).buffer);
      let out = "";
      for (let i = 0; i < view.length; ) {
        const b1 = view[i++];
        if (b1 < 0x80) {
          out += String.fromCharCode(b1);
        } else if (b1 < 0xc0) {
          out += "�";
        } else if (b1 < 0xe0) {
          out += String.fromCharCode(((b1 & 0x1f) << 6) | (view[i++] & 0x3f));
        } else if (b1 < 0xf0) {
          out += String.fromCharCode(
            ((b1 & 0x0f) << 12) | ((view[i++] & 0x3f) << 6) | (view[i++] & 0x3f),
          );
        } else {
          let cp =
            ((b1 & 0x07) << 18) |
            ((view[i++] & 0x3f) << 12) |
            ((view[i++] & 0x3f) << 6) |
            (view[i++] & 0x3f);
          cp -= 0x10000;
          out += String.fromCharCode(0xd800 | (cp >> 10), 0xdc00 | (cp & 0x3ff));
        }
      }
      return out;
    }
  }
  g.TextDecoder = TextDecoderShim;
}

// React's scheduler probes for `performance.now()`. Provide a Date-based
// fallback. Cheap; never called in our synchronous render path.
if (typeof g.performance === "undefined") {
  g.performance = { now: () => Date.now() };
}

// Used by react-dom-server in its abort signal plumbing. The render
// path we take never aborts, but it dereferences `AbortController`
// at module init time.
if (typeof g.AbortController === "undefined") {
  class AbortSignalShim {
    aborted = false;
    reason: unknown = undefined;
    onabort: (() => void) | null = null;
    addEventListener() {}
    removeEventListener() {}
    dispatchEvent() {
      return true;
    }
    throwIfAborted() {}
  }
  class AbortControllerShim {
    signal = new AbortSignalShim();
    abort(reason?: unknown) {
      this.signal.aborted = true;
      this.signal.reason = reason;
    }
  }
  g.AbortController = AbortControllerShim;
  g.AbortSignal = AbortSignalShim;
}

// react-dom-server.edge uses queueMicrotask. v8 provides it as a
// built-in (ECMA-262 jobs queue) but expose it as a global if missing.
if (typeof g.queueMicrotask === "undefined") {
  g.queueMicrotask = (cb: () => void) => Promise.resolve().then(cb);
}

export {};
