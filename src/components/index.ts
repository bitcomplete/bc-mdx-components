// Every component MDX is allowed to use is re-exported from this file.
// The compile path passes this module as the `components` prop to
// MDXContent so authors can write <Callout>, <KPI>, etc. without any
// import statements in their .mdx files.

export { Section, TLDR, Compare, Option, Steps, Step } from "./layout.js";
export { Callout, Quote, Code, Diagram } from "./blocks.js";
export { KPI, KPIGroup, Tag, Status, Diff } from "./data.js";
export { ToolCall, ToolTree, Finding, Approval } from "./agent.js";
export { Timeline, Event } from "./timeline.js";
