# @bitcomplete/mdx-components

MDX components for agent-generated documents: plans, reports, session summaries. Static HTML output, no React runtime needed in the browser.

## Why

When an LLM agent generates a report or a plan, you want it spatial, scannable, and visually structured — not a wall of markdown. This package gives the agent a small palette of components for the patterns it'll actually need: TL;DR boxes, status callouts, KPI displays, side-by-side comparisons, tool-call visualizations, finding cards, timelines.

The trick is **using MDX as the intermediate representation**, not HTML. MDX is markdown plus components, so:

- **Humans** open the rendered HTML — laid out, colored, scannable.
- **Other agents** read the original `.mdx` — same content, but as terse markdown-with-tags. No `<div class="bc-callout-warning"><div class="bc-callout-icon">…</div>…` noise filling the context window. A document that's 18 KB of rendered HTML can be 1–2 KB of MDX.

So one source artifact serves two audiences with very different cost models. Keep the MDX around, render to HTML when a human needs to look, hand the MDX directly to the next agent in the chain.

Inspired by [Thariq's "Effective HTML"](https://thariqs.github.io/html-effectiveness/) and [Agentic Craft](https://agentic-craft.vercel.app/).

## Install

```sh
pnpm add @bitcomplete/mdx-components
# or
npm install @bitcomplete/mdx-components
```

## Use

```ts
import { compileMDX } from '@bitcomplete/mdx-components';

const source = `
# Status report

<TLDR>Everything's fine.</TLDR>

<KPIGroup>
  <KPI value="99.95%" label="uptime" tone="ok" />
  <KPI value="312ms" label="p95 latency" />
</KPIGroup>
`;

const { document } = compileMDX(source);
// document is a self-contained HTML string with inlined styles.
await fs.writeFile('report.html', document);
```

`compileMDX(source)` returns `{ html, css, document }`:

- `html` — body markup only
- `css` — the stylesheet (stable across calls; safe to cache or extract)
- `document` — `<!doctype html>` wrapper with css inlined; the easy default

## Components

| Component | Purpose |
|---|---|
| `<TLDR>` | Summary box at top |
| `<Section title>` | Major section heading |
| `<Callout type>` | Colored callouts (`info`/`warning`/`danger`/`success`/`note`) |
| `<KPI value label trend? tone?>` | Big-number display |
| `<KPIGroup>` | Grid wrapper for KPIs |
| `<Steps>` `<Step title status?>` | Numbered step list with statuses |
| `<Compare>` `<Option label>` | Side-by-side comparison columns |
| `<Timeline>` `<Event time tone?>` | Chronology with colored markers |
| `<ToolCall name status? timing? args?>` | LLM tool-call card |
| `<ToolTree>` | Visual tree of tool calls |
| `<Finding code? title severity>` | Issue/finding card |
| `<Approval action approved?>` | Snapshot of an approval prompt |
| `<Quote author?>` | Pull quote |
| `<Code language?>` | Code block (plain `<pre><code>`, no built-in highlighting) |
| `<Diagram caption?>` | Wraps inline SVG with caption |
| `<Tag color?>` | Pill/tag |
| `<Status state>` | Status indicator dot |
| `<Diff before after>` | Before/after columns |

## Static-by-default

The rendered HTML contains no `<script>` tags and no inline event handlers. Consumers can layer in client-side JS (syntax highlighting via prism.js, mermaid diagrams, etc.) but the library itself ships zero JS in the output. That keeps it usable inside a Content-Security-Policy `sandbox` directive when you need to safely serve arbitrary agent-generated HTML.

If you need an interactive variant (live updates, hover states, expandable trees), wrap a hydration-friendly fork of this library in a separate package.

## Dark mode

The shipped CSS uses `prefers-color-scheme: dark` and `@media` queries. No JS toggle.

## Server-side rendering inside v8

For sandboxed Go/Rust/non-Node hosts: `dist/bundle.iife.js` is a self-contained IIFE that defines `compileMDX` on the global object. Embed it via your host's source-loading mechanism (e.g. `go:embed` + [v8go](https://github.com/rogchap/v8go)) and call `compileMDX(source)` synchronously. Returns `{ html, css }`.

## Development

```sh
pnpm install
pnpm test         # vitest
pnpm build        # tsup
pnpm dev          # tsup watch
pnpm typecheck    # tsc --noEmit
```

## License

MIT
