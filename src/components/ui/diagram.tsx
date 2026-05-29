import * as React from "react";
import { cn } from "@/lib/utils";

function Diagram({
  caption,
  className,
  children,
  ...props
}: React.ComponentProps<"figure"> & { caption?: string }) {
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
