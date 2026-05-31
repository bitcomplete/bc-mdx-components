// Step list — Agentic Craft plan-card visual frame, but adapted for
// static MDX. AC's pattern uses line-through on "done" steps because
// the card shows live progress; pin authors use status="done" to mean
// "this step is required / verified", not "completed and superseded",
// so we don't strike through. State is signalled by a small colored
// dot plus an optional status pill on the right.

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { TaskDone01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils.js";

type StepStatus = "todo" | "doing" | "done" | "blocked";

const dotClass: Record<StepStatus, string> = {
  todo: "bg-muted-foreground/40",
  doing: "bg-sky-500 animate-pulse",
  done: "bg-emerald-500",
  blocked: "bg-red-500",
};

const pillClass: Record<StepStatus, string> = {
  todo: "bg-muted/60 text-muted-foreground",
  doing: "bg-sky-500/15 text-sky-400",
  done: "bg-emerald-500/15 text-emerald-400",
  blocked: "bg-red-500/15 text-red-400",
};

function Steps({
  title,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { title?: string }) {
  return (
    <div
      data-slot="steps"
      className={cn(
        "my-6 rounded-lg border border-border bg-card/40 px-5 py-4",
        className,
      )}
      {...props}
    >
      {title ? (
        <div
          data-slot="steps-header"
          className="mb-3 flex items-center gap-2 font-sans text-sm font-medium text-foreground"
        >
          <HugeiconsIcon
            icon={TaskDone01Icon}
            size={16}
            strokeWidth={1.5}
            className="shrink-0 text-muted-foreground"
          />
          <span>{title}</span>
        </div>
      ) : null}
      <ol data-slot="steps-list" className="list-none p-0 m-0 space-y-3">
        {children}
      </ol>
    </div>
  );
}

function Step({
  title,
  status,
  className,
  children,
  ...props
}: React.ComponentProps<"li"> & {
  title: string;
  status?: StepStatus;
}) {
  const s = status ?? "todo";
  return (
    <li
      data-slot="step"
      data-status={s}
      className={cn("relative pl-5 font-sans text-sm", className)}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-[7px] block size-1.5 rounded-[2px]",
          dotClass[s],
        )}
      />
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-medium text-foreground leading-snug">
          {title}
        </span>
        {status ? (
          <span
            data-slot="step-status"
            className={cn(
              "shrink-0 rounded-full px-2 py-0.5 font-sans text-[10px] font-medium uppercase tracking-wider",
              pillClass[s],
            )}
          >
            {status}
          </span>
        ) : null}
      </div>
      {children ? (
        <div
          data-slot="step-body"
          className="mt-1 font-serif text-base text-muted-foreground leading-relaxed"
        >
          {children}
        </div>
      ) : null}
    </li>
  );
}

export { Steps, Step };
export type { StepStatus };
