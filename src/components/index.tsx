// MDX-facing component registry. Names here are the JSX tags authors
// write in `.mdx` files. The compile path passes this module as
// `components` to MDXContent so authors don't need import statements.
//
// Structure mirrors the shadcn registry layout (`ui/`): components are
// imported from `./ui/<name>`. Two of them (tool-call, tool-tree) are
// vendored verbatim from agentic-craft's registry. The rest are local
// implementations that mimic agentic-craft's editorial visual language
// — they are intended to be replaced by registry components when (if)
// the upstream project publishes them.

import * as React from "react";
import {
  CommandLineIcon,
  CodeIcon,
  PencilEdit01Icon,
  File01Icon,
  Search01Icon,
  GlobeIcon,
  Settings01Icon,
  GitBranchIcon,
  Database01Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

// Vendored from agentic-craft registry —
// https://github.com/arielconti10/agentic-craft/tree/main/registry/base-nova/ui
export {
  ToolCall as ToolCallPrimitive,
  ToolCallLabel,
  ToolCallContent,
} from "./ui/tool-call.js";
export {
  ToolTree as ToolTreePrimitive,
  ToolTreeTrigger,
  ToolTreeContent,
} from "./ui/tool-tree.js";

import {
  ToolCall as ToolCallPrimitive,
  ToolCallLabel,
  ToolCallContent,
} from "./ui/tool-call.js";
import {
  ToolTree as ToolTreePrimitive,
  ToolTreeTrigger,
  ToolTreeContent,
} from "./ui/tool-tree.js";

export { TLDR } from "./ui/tldr.js";
export { Callout } from "./ui/callout.js";
export { KPI, KPIGroup } from "./ui/kpi.js";
export { Steps, Step } from "./ui/steps.js";
export { Compare, Option } from "./ui/compare.js";
export { Finding } from "./ui/finding.js";
export { Approval } from "./ui/approval.js";
export { Timeline, Event } from "./ui/timeline.js";
export { Tag, Status } from "./ui/tag.js";
export { Diff } from "./ui/diff.js";
export { Section } from "./ui/section.js";
export { Quote } from "./ui/quote.js";
export { Code } from "./ui/code.js";
export { Diagram } from "./ui/diagram.js";

// ── ToolCall MDX wrapper ─────────────────────────────────────────────
// Our MDX API is flat: `<ToolCall name="bash" status="ok" timing="0.4s"
// args="..."/>`. The vendored primitive expects a hugeicons `icon`,
// `<ToolCallLabel>`, and `<ToolCallContent>`. This wrapper translates.
// status: "ok"|"fail"|"running"|"skip" maps to "completed"|"failed"|
// "running"|"completed" (skip = quiet completed).

const iconByName: Record<string, IconSvgElement> = {
  bash: CommandLineIcon,
  shell: CommandLineIcon,
  sh: CommandLineIcon,
  zsh: CommandLineIcon,
  edit: PencilEdit01Icon,
  write: PencilEdit01Icon,
  read: File01Icon,
  file: File01Icon,
  grep: Search01Icon,
  search: Search01Icon,
  webfetch: GlobeIcon,
  webview: GlobeIcon,
  git: GitBranchIcon,
  db: Database01Icon,
  database: Database01Icon,
  code: CodeIcon,
};

type ToolStatus = "running" | "ok" | "fail" | "skip";

export function ToolCall({
  name,
  status,
  timing,
  args,
  children,
}: {
  name: string;
  status?: ToolStatus;
  timing?: string;
  args?: string;
  children?: React.ReactNode;
}) {
  const icon: IconSvgElement =
    iconByName[name.toLowerCase()] ?? Settings01Icon;
  const upstream: "running" | "completed" | "failed" =
    status === "running"
      ? "running"
      : status === "fail"
        ? "failed"
        : "completed";
  const hasBody = !!(args || children);
  return (
    <ToolCallPrimitive
      icon={icon}
      status={upstream}
      timestamp={timing}
      defaultExpanded={hasBody}
    >
      <ToolCallLabel>
        <span className="font-mono">{name}</span>
        {args ? (
          <span className="ml-2 text-muted-foreground/70 truncate">{args}</span>
        ) : null}
      </ToolCallLabel>
      {hasBody ? (
        <ToolCallContent>
          {args ? (
            <pre className="rounded-md bg-muted/50 px-3 py-2 font-mono text-xs leading-relaxed whitespace-pre-wrap break-words">
              {args}
            </pre>
          ) : null}
          {children ? (
            <div className="mt-2 font-serif text-sm text-foreground/80">
              {children}
            </div>
          ) : null}
        </ToolCallContent>
      ) : null}
    </ToolCallPrimitive>
  );
}

// ── ToolTree MDX wrapper ─────────────────────────────────────────────
// MDX usage: `<ToolTree label="Running 3 in parallel">…ToolCalls…</ToolTree>`.
// The vendored primitive wants explicit Trigger + Content children; the
// wrapper supplies them.

export function ToolTree({
  label = "Running tools",
  defaultOpen = true,
  children,
}: {
  label?: string;
  defaultOpen?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <ToolTreePrimitive defaultOpen={defaultOpen}>
      <ToolTreeTrigger icon={GitBranchIcon}>{label}</ToolTreeTrigger>
      <ToolTreeContent>{children}</ToolTreeContent>
    </ToolTreePrimitive>
  );
}
