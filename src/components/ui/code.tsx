import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Code block. A fenced markdown block (```lang) renders identically;
 * reach for <Code> when you need the `language` attribute set
 * programmatically (e.g. for client-side highlighters that read it).
 *
 * @category code-media
 * @example
 * <Code language="go">
 *   func handle(w http.ResponseWriter, r *http.Request) { ... }
 * </Code>
 */
function Code({
  language,
  className,
  children,
  ...props
}: React.ComponentProps<"pre"> & {
  /** Optional language hint (e.g. "go", "ts"). */
  language?: string;
}) {
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
