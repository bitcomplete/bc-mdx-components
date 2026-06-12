// MDX-facing component registry. Names here are the JSX tags authors
// write in `.mdx` files. The compile path passes this module as
// `components` to MDXContent so authors don't need import statements.
//
// Structure mirrors the shadcn registry layout (`ui/`): components are
// imported from `./ui/<name>`. Three of them (tool-call, tool-tree,
// status-indicator) are installed from the agentic-craft shadcn
// registry — run `pnpm registry:sync` to pull upstream updates; do not
// edit those files by hand. The rest are local implementations that
// mimic agentic-craft's editorial visual language.

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
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
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils.js";

// Installed from the agentic-craft registry (bitcomplete/agentic-craft)
// via `npx shadcn add @agentic-craft/<name>` — see components.json.
export {
  ToolCall as ToolCallPrimitive,
  ToolCallTrigger,
  ToolCallLabel,
  ToolCallContent,
  ToolCallError,
  ToolCallRetry,
} from "./ui/tool-call.js";
export {
  ToolTree as ToolTreePrimitive,
  ToolTreeTrigger,
  ToolTreeContent,
} from "./ui/tool-tree.js";
export { StatusIndicator } from "./ui/status-indicator.js";

export { TLDR } from "./ui/tldr.js";
export { Callout } from "./ui/callout.js";
export { KPI, KPIGroup } from "./ui/kpi.js";
export { Steps, Step } from "./ui/steps.js";
export { Compare, Option } from "./ui/compare.js";
export { Finding, Findings } from "./ui/finding.js";
export { Approval } from "./ui/approval.js";
export { Timeline, Event } from "./ui/timeline.js";
export { Tag, Status } from "./ui/tag.js";
export { Diff } from "./ui/diff.js";
export { Section } from "./ui/section.js";
export { Quote } from "./ui/quote.js";
export { Code } from "./ui/code.js";
export { Diagram } from "./ui/diagram.js";
export { Subagent } from "./ui/subagent.js";
export {
  Conversation,
  UserMessage,
  AssistantMessage,
  SystemMessage,
  Thinking,
} from "./ui/conversation.js";

// ── ToolCall MDX wrapper ─────────────────────────────────────────────
// Our MDX API is flat: `<ToolCall name="bash" status="ok" timing="0.4s"
// args="..."/>`. The registry primitive expects a hugeicons `icon`,
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

// We render <details>/<summary> rather than the registry's React
// ToolCall/ToolTree from agentic-craft. Their primitives use
// React.useState for expand/collapse — that works in their Next.js
// app but pin ships static HTML with no React runtime in the browser,
// so the click handlers never fire. <details> gets the same UX for
// free with no JS. We keep the same visual language and `data-slot`
// markers so a future client-hydrated swap-in is mechanical.
//
// Following the agentic-craft Actions spec
// (https://agentic-craft.vercel.app/actions):
//   - Label is 14px sans, weight 400 — never bold, never function
//     signature
//   - Icons are monochrome muted; only `fail` switches to red
//   - Duration is right-aligned in muted text. Failed calls prefix
//     it with "failed ·"
//   - Args + children are hidden until the row is expanded — only
//     the label is visible by default
//   - `fail` rows open by default so the error is immediately visible

const statusIconClass: Record<ToolStatus, string> = {
  running: "text-sky-500",
  ok: "text-muted-foreground",
  fail: "text-red-500",
  skip: "text-muted-foreground/50",
};

/**
 * Single tool invocation row. Collapsible: clicking the row opens
 * args + output. Failed calls open by default and gain the "failed ·"
 * timing prefix.
 *
 * @category agent
 * @example
 * <ToolCall name="bash" status="ok" timing="0.4s" args='go test ./...'>
 *   ok  github.com/bitcomplete/pin/internal/auth  0.418s
 * </ToolCall>
 */
export function ToolCall({
  name,
  label,
  status = "ok",
  timing,
  args,
  outputType = "code",
  children,
}: {
  name: string;
  /** Human-readable label override. Falls back to `name`. */
  label?: string;
  status?: ToolStatus;
  timing?: string;
  args?: string;
  /**
   * How to render the output body. "code" (default) wraps children in
   * a monospace pre-style container — right for shell output, raw
   * stdout, JSON payloads. "prose" skips the mono wrapper so markdown
   * children render with normal typography — right for Skill bodies
   * or anything that ships as formatted text.
   */
  outputType?: "code" | "prose";
  children?: React.ReactNode;
}) {
  const icon: IconSvgElement =
    iconByName[name.toLowerCase()] ?? Settings01Icon;
  const hasBody = !!(args || children);
  const displayLabel = label ?? name;
  const isFail = status === "fail";

  const timingText = timing
    ? isFail
      ? `failed · ${timing}`
      : timing
    : isFail
      ? "failed"
      : undefined;

  const summary = (
    <>
      <span className="relative inline-flex size-5 shrink-0 items-center justify-center">
        <HugeiconsIcon
          icon={icon}
          size={16}
          strokeWidth={1.5}
          className={cn(
            "relative",
            statusIconClass[status],
            status === "running" && "animate-pulse",
          )}
        />
      </span>
      <span
        data-slot="tool-call-label"
        className={cn(
          "min-w-0 flex-1 truncate font-sans text-sm font-normal",
          isFail ? "text-red-400" : "text-foreground/90",
        )}
      >
        {displayLabel}
      </span>
      {timingText ? (
        <span
          data-slot="tool-call-timing"
          className={cn(
            "shrink-0 font-sans text-xs tabular-nums",
            isFail ? "text-red-400/80" : "text-muted-foreground",
          )}
        >
          {timingText}
        </span>
      ) : null}
      {hasBody ? (
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          size={14}
          strokeWidth={1.5}
          className="shrink-0 text-muted-foreground/60 transition-transform duration-150 [details[open]_&]:rotate-90"
        />
      ) : null}
    </>
  );

  if (!hasBody) {
    // Non-expandable row — still aligned with the others.
    return (
      <div
        data-slot="tool-call"
        data-status={status}
        className="flex items-center gap-2 py-1.5"
      >
        {summary}
      </div>
    );
  }

  return (
    <details
      data-slot="tool-call"
      data-status={status}
      open={isFail || undefined}
      className="group/tool"
    >
      <summary className="flex cursor-pointer items-center gap-2 py-1.5 list-none [&::-webkit-details-marker]:hidden">
        {summary}
      </summary>
      <div data-slot="tool-call-content" className="pl-7 pt-1 pb-3 space-y-3">
        {args ? <ToolCallArgs args={args} /> : null}
        {children ? (
          <ToolCallOutput isFail={isFail} variant={outputType}>{children}</ToolCallOutput>
        ) : null}
      </div>
    </details>
  );
}

// Args panel. If `args` parses as a JSON object, render as a definition
// list (mono keys aligned, values wrap). Otherwise render the raw
// string in a single mono code block. Both variants sit under a small
// uppercase ARGS label.
function ToolCallArgs({ args }: { args: string }) {
  const kv = parseArgsAsKV(args);
  return (
    <section data-slot="tool-call-args">
      <SectionLabel>args</SectionLabel>
      {kv ? (
        <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 rounded-md bg-muted/40 px-3 py-2 font-mono text-xs">
          {kv.map(([k, v]) => (
            <React.Fragment key={k}>
              <dt className="text-muted-foreground select-none">{k}</dt>
              <dd className="m-0 whitespace-pre-wrap break-words text-foreground">
                {v}
              </dd>
            </React.Fragment>
          ))}
        </dl>
      ) : (
        <pre className="m-0 rounded-md bg-muted/40 px-3 py-2 font-mono text-xs whitespace-pre-wrap break-words text-foreground">
          {args}
        </pre>
      )}
    </section>
  );
}

function ToolCallOutput({
  isFail,
  variant = "code",
  children,
}: {
  isFail: boolean;
  variant?: "code" | "prose";
  children: React.ReactNode;
}) {
  // "code" keeps the original mono pre-style frame for raw output.
  // "prose" hands children off to the document's normal prose styling
  // (headings, paragraphs, lists, inline code) — used by Skill bodies
  // where the recipient should be able to read the loaded markdown.
  const proseClasses = "rounded-md border border-border/40 bg-muted/30 px-4 py-3 text-sm leading-normal [&>:first-child]:mt-0 [&>:last-child]:mb-0";
  const codeClasses = cn(
    "rounded-md bg-muted/40 px-3 py-2 font-mono text-xs leading-relaxed whitespace-pre-wrap break-words [&_p]:font-mono [&_p]:text-xs [&_p]:m-0 [&_p+p]:mt-1.5",
    isFail ? "text-red-400/90" : "text-foreground/90",
  );
  return (
    <section data-slot="tool-call-output">
      <SectionLabel tone={isFail ? "fail" : undefined}>
        {isFail ? "error" : "output"}
      </SectionLabel>
      <div className={variant === "prose" ? proseClasses : codeClasses}>
        {children}
      </div>
    </section>
  );
}

function SectionLabel({
  tone,
  children,
}: {
  tone?: "fail";
  children: React.ReactNode;
}) {
  return (
    <div
      data-slot="tool-call-section-label"
      className={cn(
        "mb-1 font-sans text-[10px] font-medium uppercase tracking-[0.1em]",
        tone === "fail" ? "text-red-400/80" : "text-muted-foreground",
      )}
    >
      {children}
    </div>
  );
}

// Try to detect "{...}" object-shaped JSON and return [key, valueString]
// pairs. Values that aren't strings are JSON-stringified two-space
// pretty so they wrap nicely in the dl. Returns null for anything we
// can't safely treat as a key/value record.
function parseArgsAsKV(args: string): Array<[string, string]> | null {
  const trimmed = args.trim();
  if (!(trimmed.startsWith("{") && trimmed.endsWith("}"))) return null;
  try {
    const parsed = JSON.parse(trimmed);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return null;
    }
    const entries = Object.entries(parsed as Record<string, unknown>);
    if (entries.length === 0) return null;
    return entries.map(([k, v]) => [
      k,
      typeof v === "string" ? v : JSON.stringify(v, null, 2),
    ]);
  } catch {
    return null;
  }
}

// ── ToolCallGroup MDX wrapper ────────────────────────────────────────
// AC's "Grouped" pattern: wrap N adjacent ToolCalls in a single
// rounded card frame. No header, no toggle — the group exists purely
// to visually associate the calls. Each child <details> still
// toggles independently.

/**
 * Rounded frame around several adjacent <ToolCall>s. Pure visual
 * grouping — no header, no shared toggle. For a labelled, collapsible
 * parent (e.g. "Running 3 in parallel"), use <ToolTree> instead.
 *
 * @category agent
 * @example
 * <ToolCallGroup>
 *   <ToolCall name="search" status="ok" />
 *   <ToolCall name="read" status="ok" />
 *   <ToolCall name="edit" status="ok" />
 * </ToolCallGroup>
 */
export function ToolCallGroup({
  className,
  children,
}: {
  /** Extra classes; rarely needed. */
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      data-slot="tool-call-group"
      className={cn(
        "my-4 rounded-lg border border-border bg-card/30 px-4 py-2 divide-y divide-border/50",
        className,
      )}
    >
      {children}
    </div>
  );
}

// ── ToolTree MDX wrapper ─────────────────────────────────────────────
// Grouped tool calls with an explicit header — AC's "Running N tasks
// in parallel" pattern. Children are indented with an L-connector
// spine. Default collapsed.

/**
 * Labelled, collapsible group of tool calls — the "Running N in
 * parallel" pattern. Header summary at top, L-connectored children
 * inside. Use when the calls share a higher-level purpose worth
 * naming; for an unlabelled visual frame, use <ToolCallGroup>.
 *
 * @category agent
 * @example
 * <ToolTree label="Running 3 tasks in parallel">
 *   <ToolCall name="search" status="ok" />
 *   <ToolCall name="read" status="ok" />
 *   <ToolCall name="grep" status="ok" />
 * </ToolTree>
 */
export function ToolTree({
  label = "Running tools",
  defaultOpen,
  children,
}: {
  /** Header shown above the children. */
  label?: string;
  /** Open by default? Defaults to false. */
  defaultOpen?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <details
      data-slot="tool-tree"
      open={defaultOpen || undefined}
      className="my-3 group/tree"
    >
      <summary className="flex cursor-pointer items-center gap-2 py-1.5 list-none [&::-webkit-details-marker]:hidden">
        <span className="relative inline-flex size-5 shrink-0 items-center justify-center">
          <HugeiconsIcon
            icon={GitBranchIcon}
            size={16}
            strokeWidth={1.5}
            className="relative text-muted-foreground"
          />
        </span>
        <span className="min-w-0 flex-1 truncate font-sans text-sm font-normal text-foreground/90">
          {label}
        </span>
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          size={14}
          strokeWidth={1.5}
          className="shrink-0 text-muted-foreground/60 transition-transform duration-150 [details[open]_&]:rotate-90"
        />
      </summary>
      <div
        data-slot="tool-tree-content"
        className={cn(
          "relative pl-7 mt-1 mb-1",
          // Vertical spine + L connector for each direct child
          "before:absolute before:left-2 before:top-1 before:bottom-3 before:w-px before:bg-border",
          "[&>*]:relative",
          "[&>*]:before:absolute [&>*]:before:left-[-20px] [&>*]:before:top-[15px] [&>*]:before:w-4 [&>*]:before:h-px [&>*]:before:bg-border",
        )}
      >
        {children}
      </div>
    </details>
  );
}
