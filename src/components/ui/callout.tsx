// Our component, styled to match agentic-craft's editorial look — a thin
// left rule with a small icon, no heavy panel background.

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  InformationCircleIcon,
  Alert02Icon,
  CheckmarkCircle02Icon,
  Cancel01Icon,
  Note01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "danger" | "success" | "note";

const iconMap = {
  info: InformationCircleIcon,
  warning: Alert02Icon,
  danger: Cancel01Icon,
  success: CheckmarkCircle02Icon,
  note: Note01Icon,
} as const;

const toneClass: Record<CalloutType, string> = {
  info: "border-l-sky-500/60",
  warning: "border-l-amber-500/70",
  danger: "border-l-red-500/70",
  success: "border-l-emerald-500/70",
  note: "border-l-border",
};

const iconClass: Record<CalloutType, string> = {
  info: "text-sky-500",
  warning: "text-amber-500",
  danger: "text-red-500",
  success: "text-emerald-500",
  note: "text-muted-foreground",
};

function Callout({
  type = "info",
  title,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  type?: CalloutType;
  title?: string;
}) {
  return (
    <div
      data-slot="callout"
      data-tone={type}
      role="note"
      className={cn(
        "my-6 flex gap-3 border-l-2 pl-4 py-1",
        toneClass[type],
        className,
      )}
      {...props}
    >
      <HugeiconsIcon
        icon={iconMap[type]}
        size={18}
        strokeWidth={1.5}
        className={cn("mt-1 shrink-0", iconClass[type])}
      />
      <div className="min-w-0 flex-1 font-serif text-base text-foreground/90">
        {title ? (
          <div
            data-slot="callout-title"
            className="mb-1 font-sans text-sm font-medium text-foreground"
          >
            {title}
          </div>
        ) : null}
        <div data-slot="callout-body">{children}</div>
      </div>
    </div>
  );
}

export { Callout };
export type { CalloutType };
