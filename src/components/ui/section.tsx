import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Major section wrapper with an optional title. Mostly redundant with
 * a plain `## H2` in markdown — reach for it when you need an `id`
 * anchor or a wrapping container for styling/spacing.
 *
 * @category layout
 * @example
 * <Section title="Why now" id="why-now">
 *   We've blown the SLO every weekday this month.
 * </Section>
 */
function Section({
  title,
  id,
  className,
  children,
  ...props
}: React.ComponentProps<"section"> & {
  /** Optional H2 rendered above the body. */
  title?: string;
}) {
  return (
    <section
      data-slot="section"
      id={id}
      className={cn("my-10", className)}
      {...props}
    >
      {title ? (
        <h2 className="mb-4 font-serif text-2xl font-light tracking-tight">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}

export { Section };
