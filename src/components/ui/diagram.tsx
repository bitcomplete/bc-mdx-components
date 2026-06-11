import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Centred figure wrapper for an inline SVG or image, with an
 * optional caption. The body should be a single visual element —
 * for arbitrary content blocks, use plain markdown.
 *
 * @category code-media
 * @example
 * <Diagram caption="Request → Queue → Worker → Stripe">
 *   <svg viewBox="0 0 200 60">...</svg>
 * </Diagram>
 */
function Diagram({
  caption,
  className,
  children,
  ...props
}: React.ComponentProps<"figure"> & {
  /** Caption shown centred below the figure. */
  caption?: string;
}) {
  return (
    <figure data-slot="diagram" className={cn("my-6", className)} {...props}>
      <div className="flex justify-center">{children}</div>
      {caption ? (
        <figcaption className="mt-2 text-center font-sans text-sm text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export { Diagram };
