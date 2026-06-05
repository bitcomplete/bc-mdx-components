// Subagent card — the visual home for an Agent (Task / subagent) tool
// call in an MDX share. Inspired by agentic-craft's "Agent Card"
// pattern: a labelled identity (name + role) with a status badge, the
// prompt tucked into a collapsed details, and the agent's final report
// rendered as prose.

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  RobotIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

type SubagentStatus = "running" | "ok" | "fail" | "skip";

const statusToneClass: Record<SubagentStatus, string> = {
  running: "bg-sky-500/10 text-sky-600 border-sky-500/30",
  ok: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  fail: "bg-red-500/10 text-red-600 border-red-500/30",
  skip: "bg-muted text-muted-foreground border-border",
};

const statusLabel: Record<SubagentStatus, string> = {
  running: "running",
  ok: "done",
  fail: "failed",
  skip: "skipped",
};

/**
 * Subagent invocation card — a labelled identity, the prompt collapsed
 * for reference, and the final report rendered as prose. Use for any
 * dispatched task (Task / Agent tool call) where the work happened in a
 * separate context that the recipient should be able to see and
 * inspect.
 *
 * @category agent
 * @example
 * <Subagent name="Branch ship-readiness audit" type="general-purpose" status="ok" prompt="Audit what's left before this branch can ship...">
 *
 * Two things left: the GrowthBook gate isn't wired (`internal/flags/billing.go:42`)
 * and CI hasn't seen this branch yet. Everything else is green.
 *
 * </Subagent>
 */
export function Subagent({
  name,
  type,
  status = "ok",
  timing,
  prompt,
  children,
}: {
  /** Short label for what the subagent was asked to do. */
  name?: string;
  /** Agent type (e.g. "general-purpose", "Explore", "Plan"). */
  type?: string;
  status?: SubagentStatus;
  /** Optional duration to show in the header (e.g. "14.3s"). */
  timing?: string;
  /**
   * The full prompt the agent was launched with. Rendered inside a
   * collapsed details panel so the report stays the focal point.
   */
  prompt?: string;
  /** The agent's final report, as MDX. */
  children?: React.ReactNode;
}) {
  const displayName = name ?? "Subagent";
  return (
    <section
      data-slot="subagent"
      data-status={status}
      className="my-4 rounded-lg border border-border bg-card/40 px-4 py-3"
    >
      <header className="flex items-center gap-2">
        <HugeiconsIcon
          icon={RobotIcon}
          size={18}
          strokeWidth={1.5}
          className="shrink-0 text-muted-foreground"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              data-slot="subagent-name"
              className="truncate font-sans text-sm font-medium text-foreground"
            >
              {displayName}
            </span>
            {type ? (
              <span
                data-slot="subagent-type"
                className="font-sans text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
              >
                {type}
              </span>
            ) : null}
          </div>
        </div>
        {timing ? (
          <span
            data-slot="subagent-timing"
            className="shrink-0 font-sans text-xs tabular-nums text-muted-foreground"
          >
            {timing}
          </span>
        ) : null}
        <span
          data-slot="subagent-status"
          className={cn(
            "shrink-0 rounded-full border px-2 py-0.5 font-sans text-[10px] font-medium uppercase tracking-wide",
            statusToneClass[status],
          )}
        >
          {statusLabel[status]}
        </span>
      </header>
      {prompt ? (
        <details
          data-slot="subagent-prompt"
          className="mt-3 group/prompt"
        >
          <summary className="flex cursor-pointer items-center gap-1.5 list-none [&::-webkit-details-marker]:hidden font-sans text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={12}
              strokeWidth={1.5}
              className="shrink-0 transition-transform duration-150 [details[open]_&]:rotate-90"
            />
            prompt
          </summary>
          <pre className="m-0 mt-1.5 rounded-md bg-muted/40 px-3 py-2 font-mono text-xs leading-relaxed whitespace-pre-wrap break-words text-foreground/80">
            {prompt}
          </pre>
        </details>
      ) : null}
      {children ? (
        <div
          data-slot="subagent-report"
          className="mt-3 text-sm leading-normal text-foreground/90 [&>:first-child]:mt-0 [&>:last-child]:mb-0"
        >
          {children}
        </div>
      ) : null}
    </section>
  );
}
