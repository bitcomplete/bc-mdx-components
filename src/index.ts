// Public API entry. ESM/CJS consumers import from here. The IIFE bundle
// (for embedding in sandboxed JS engines like v8go) lives in `bundle.ts`.

export { compileMDX, renderMDX } from "./compile.js";
export type { CompileResult } from "./compile.js";
export * as components from "./components/index.js";
