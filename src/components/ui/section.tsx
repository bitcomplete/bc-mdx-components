import * as React from "react";
import { cn } from "@/lib/utils";

function Section({
  title,
  id,
  className,
  children,
  ...props
}: React.ComponentProps<"section"> & { title?: string }) {
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
