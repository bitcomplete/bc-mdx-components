// MDX → static HTML, synchronously (works inside v8go which has no event
// loop).

import { compileSync } from "@mdx-js/mdx";
import { createElement, type ReactNode } from "react";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
// `react-dom/server.edge` works in environments that have neither Node
// built-ins (stream / crypto / async_hooks) nor the DOM's MessageChannel.
// v8go is one of those. The other server entries fail to load.
import { renderToString } from "react-dom/server.edge";

import * as componentsImport from "./components/index.js";
import { stylesheet } from "./components/styles.js";

export interface CompileResult {
  html: string;
  css: string;
  document: string;
}

export function compileMDX(source: string): CompileResult {
  const html = renderMDX(source);
  return {
    html,
    css: stylesheet,
    document: wrapDocument(html, stylesheet),
  };
}

export function renderMDX(source: string): string {
  const stripped = stripLeadingImports(source);
  const compiled = compileSync(stripped, {
    outputFormat: "function-body",
    development: false,
    jsxImportSource: "react",
    providerImportSource: undefined,
  });
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const factory = new Function(String(compiled));
  const mod = factory({ jsx, jsxs, Fragment }) as {
    default: (props: {
      components?: Record<string, unknown>;
    }) => ReactNode;
  };
  const tree = createElement(mod.default, { components: componentsImport });
  return renderToString(tree);
}

function stripLeadingImports(src: string): string {
  const lines = src.split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const trimmed = lines[i].trim();
    if (trimmed === "" || trimmed.startsWith("//")) {
      i++;
      continue;
    }
    if (trimmed.startsWith("import ")) {
      while (i < lines.length && !/['"`];?\s*$/.test(lines[i])) i++;
      i++;
      continue;
    }
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
