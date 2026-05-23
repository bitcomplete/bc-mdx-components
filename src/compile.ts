// MDX → static HTML.
//
// We compile MDX *synchronously* so this works inside v8go (which has no
// event loop). `@mdx-js/mdx`'s `compileSync` produces an ES module source
// string that we then eval; the module exports a default function that
// returns a preact VNode when called with our components.

import { compileSync } from "@mdx-js/mdx";
import { h, type ComponentChildren } from "preact";
import { jsx, jsxs, Fragment } from "preact/jsx-runtime";
import { renderToString } from "preact-render-to-string";

import * as componentsImport from "./components/index.js";
import { stylesheet } from "./components/styles.js";

export interface CompileResult {
  /** Rendered HTML *body* (no <html> / <head> wrapper). */
  html: string;
  /** Stylesheet to inline. Same value for every compile; safe to cache. */
  css: string;
  /** A self-contained HTML document wrapping html + css. */
  document: string;
}

/**
 * Compile MDX source to static HTML.
 *
 * - The result includes a stylesheet you can either inline (via `document`)
 *   or serve as a separate file.
 * - Pure function: no I/O, no network, deterministic given the same input.
 */
export function compileMDX(source: string): CompileResult {
  const html = renderMDX(source);
  return {
    html,
    css: stylesheet,
    document: wrapDocument(html, stylesheet),
  };
}

/** Render only — for embedding pieces into a larger page. */
export function renderMDX(source: string): string {
  // Strip top-of-file ES `import` statements. MDX would otherwise turn
  // them into `await import(...)`, which can't run inside `new Function`
  // (no top-level await). All our components are auto-provided via the
  // `components` prop, so authors don't actually need imports — but
  // accept-and-ignore is friendlier than failing on them.
  const stripped = stripLeadingImports(source);
  const compiled = compileSync(stripped, {
    outputFormat: "function-body",
    development: false,
    jsxImportSource: "preact",
    providerImportSource: undefined,
  });
  // The "function-body" output reads its JSX runtime from `arguments[0]`
  // and returns `{ default: MDXContent }`. The runtime is the same object
  // shape as preact/jsx-runtime.
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const factory = new Function(String(compiled));
  const mod = factory({ jsx, jsxs, Fragment }) as {
    default: (props: {
      components?: Record<string, unknown>;
    }) => ComponentChildren;
  };
  const tree = h(mod.default as never, { components: componentsImport });
  return renderToString(tree as never);
}

/**
 * Drop ESM `import` statements that appear before the first non-import,
 * non-blank line. Preserves everything below (so an `import` lurking
 * inside a code-block survives). Tolerates single-line and multi-line
 * import forms (`import {\n A,\n B,\n} from '...'`).
 */
function stripLeadingImports(src: string): string {
  const lines = src.split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const trimmed = lines[i].trim();
    if (trimmed === "" || trimmed.startsWith("//")) {
      // Skip blank / comment lines but don't write them either; markdown
      // doesn't care about extra blank lines at the top.
      i++;
      continue;
    }
    if (trimmed.startsWith("import ")) {
      // Consume until the line ends with a semicolon or a quote-then-EOL.
      while (i < lines.length && !/['"`];?\s*$/.test(lines[i])) i++;
      i++;
      continue;
    }
    // First non-blank, non-import line: the rest of the file is content.
    break;
  }
  return lines.slice(i).join("\n");
}

function wrapDocument(body: string, css: string): string {
  return [
    "<!doctype html>",
    `<html lang="en"><head>`,
    `<meta charset="utf-8">`,
    `<meta name="viewport" content="width=device-width,initial-scale=1">`,
    `<title>Document</title>`,
    `<style>${css}</style>`,
    `</head><body class="bc-doc">${body}</body></html>`,
  ].join("");
}
