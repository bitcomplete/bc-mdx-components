// IIFE entry for sandboxed JS engines (e.g. v8go from Go). Those engines
// have no DOM, no fetch, no Node built-ins. Everything the IIFE needs is
// bundled in (tsup's `noExternal: [/.*/]`). Exposes a synchronous
// `compileMDX(source)` on `globalThis` that returns `{ html, css }`.

import { renderMDX } from "./compile.js";
import { stylesheet } from "./components/styles.js";

(globalThis as Record<string, unknown>).compileMDX = (source: string) => {
  const html = renderMDX(source);
  return { html, css: stylesheet };
};
