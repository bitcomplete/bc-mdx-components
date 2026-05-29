import * as React from "react";
import { cn } from "@/lib/utils";

function Code({
  language,
  className,
  children,
  ...props
}: React.ComponentProps<"pre"> & { language?: string }) {
  const lang = (language ?? "").toLowerCase();
  return (
    <pre
      data-slot="code"
      data-language={lang || undefined}
      className={cn(
        "my-4 overflow-x-auto rounded-md border border-border bg-muted/50 p-4 font-mono text-sm leading-relaxed text-foreground",
        "whitespace-pre-wrap break-words",
        className,
      )}
      {...props}
    >
      <code className={lang ? `language-${lang}` : undefined}>{children}</code>
    </pre>
  );
}

export { Code };
