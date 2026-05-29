// Editorial step list: serif title + status pill on the right, bullet
// rule on the left.

import * as React from "react";
import { cn } from "@/lib/utils";

type StepStatus = "todo" | "doing" | "done" | "blocked";

const statusClass: Record<StepStatus, string> = {
  todo: "bg-muted text-muted-foreground",
  doing: "bg-sky-500/10 text-sky-500",
  done: "bg-emerald-500/10 text-emerald-500",
  blocked: "bg-red-500/10 text-red-500",
};

function Steps({
  className,
  children,
  ...props
}: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="steps"
      className={cn("my-6 flex flex-col gap-4 border-l border-border pl-5", className)}
      {...props}
    >
      {children}
    </ol>
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
  return (
    <li
      data-slot="step"
      data-status={status}
      className={cn("relative", className)}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          "absolute -left-[26px] top-2 block size-1.5 rounded-full",
          status === "done"
            ? "bg-emerald-500"
            : status === "doing"
              ? "bg-sky-500"
              : status === "blocked"
                ? "bg-red-500"
                : "bg-foreground/30",
        )}
      />
      <div className="flex items-baseline justify-between gap-4">
        <div
          data-slot="step-title"
          className="font-sans text-sm font-medium text-foreground"
        >
          {title}
        </div>
        {status ? (
          <span
            data-slot="step-status"
            className={cn(
              "shrink-0 rounded-full px-2 py-0.5 font-sans text-[10px] font-medium uppercase tracking-wider",
              statusClass[status],
            )}
          >
            {status}
          </span>
        ) : null}
      </div>
      {children ? (
        <div
          data-slot="step-body"
          className="mt-1 font-serif text-base text-foreground/80"
        >
          {children}
        </div>
      ) : null}
    </li>
  );
}

export { Steps, Step };
export type { StepStatus };
