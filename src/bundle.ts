// IIFE entry for sandboxed JS engines (e.g. v8go from Go). Those engines
// have no DOM, no fetch, no Node built-ins. Everything the IIFE needs is
// bundled in (tsup's `noExternal: [/.*/]`). Exposes a synchronous
// `compileMDX(source)` on `globalThis` that returns `{ html, css }`.

// Polyfills first — must execute before React loads. See polyfills.ts.
import "./polyfills.js";
import { renderMDX } from "./compile.js";
import { stylesheet } from "./components/styles.js";
import { componentManifest } from "./components/manifest.js";

const g = globalThis as Record<string, unknown>;

g.compileMDX = (source: string) => {
  const html = renderMDX(source);
  return { html, css: stylesheet };
};

// Component metadata for pin's library discovery API. Pin runs this
// in v8 at startup, JSON-stringifies the result, and caches it.
g.componentManifest = componentManifest;
