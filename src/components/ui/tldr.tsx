// Our component. If agentic-craft publishes a registry TLDR later, drop
// it in here and adjust the MDX wrapper in components/index.ts.

import * as React from "react";
import { cn } from "@/lib/utils";

function TLDR({
  className,
  children,
  ...props
}: React.ComponentProps<"aside">) {
  return (
    <aside
      data-slot="tldr"
      role="note"
      aria-label="TL;DR"
      className={cn(
        "my-8 border-l border-border pl-5 font-serif text-lg leading-relaxed text-foreground/90",
        className,
      )}
      {...props}
    >
      <div
        data-slot="tldr-label"
        className="mb-2 font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground"
      >
        TL;DR
      </div>
      <div data-slot="tldr-body">{children}</div>
    </aside>
  );
}

export { TLDR };
