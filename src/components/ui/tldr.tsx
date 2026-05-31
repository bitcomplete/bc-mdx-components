// Our component. If agentic-craft publishes a registry TLDR later, drop
// it in here and adjust the MDX wrapper in components/index.ts.

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Summary box at the top of a document. Use one — at most one — per
 * share to let readers grasp the whole thing in a sentence before
 * deciding to dive in.
 *
 * @category layout
 * @example
 * <TLDR>
 *   Migrating billing off the request path drops p99 from 8s to 40ms.
 *   Two PRs, behind a feature flag.
 * </TLDR>
 */
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
