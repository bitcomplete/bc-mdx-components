import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Pull quote — italic serif body with a thin left rule and optional
 * attribution. Use for important things someone said, never for the
 * agent's own paragraphs.
 *
 * @category emphasis
 * @example
 * <Quote author="Rich Hickey">
 *   Simple is not the same as easy.
 * </Quote>
 */
function Quote({
  author,
  className,
  children,
  ...props
}: React.ComponentProps<"figure"> & {
  /** Optional attribution shown under the quote. */
  author?: string;
}) {
  return (
    <figure
      data-slot="quote"
      className={cn("my-6 border-l-2 border-border pl-5", className)}
      {...props}
    >
      <blockquote className="m-0 font-serif text-lg italic leading-relaxed text-foreground/90">
        {children}
      </blockquote>
      {author ? (
        <figcaption className="mt-2 font-sans text-sm text-muted-foreground">
          — {author}
        </figcaption>
      ) : null}
    </figure>
  );
}

export { Quote };
