import { defineConfig } from "tsup";

// Three build targets:
//   - ESM + CJS for npm consumers (skills, build tools).
//   - A single IIFE bundle (no external imports) for hosts that embed it
//     and run inside a sandboxed JS engine (e.g. v8go from Go). Such
//     engines have no module loader, no Node built-ins, no DOM — the
//     IIFE must be self-contained.
export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    sourcemap: true,
    clean: true,
    target: "node20",
    splitting: false,
  },
  {
    entry: { "bundle.iife": "src/bundle.ts" },
    format: ["iife"],
    globalName: "BC",
    sourcemap: false,
    clean: false,
    target: "es2022",
    minify: true,
    noExternal: [/.*/],
    platform: "neutral",
    // Replace process.env.NODE_ENV at build time so React's production
    // bundle doesn't reference `process` (undefined inside v8go).
    define: {
      "process.env.NODE_ENV": '"production"',
      "process.env.NODE_DEBUG": "undefined",
      "process.platform": '"browser"',
      "process.version": '"v0.0.0"',
    },
  },
]);
