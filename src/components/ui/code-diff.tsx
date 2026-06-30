import * as React from "react";

/**
 * Embeds a real code diff inside a document. Wrap a ```diff fenced code
 * block containing a unified patch (e.g. the output of `gh pr diff`), and
 * the host renders it as a full, syntax-highlighted diff view in place of
 * the plain fence.
 *
 * This component only emits a marker (`data-slot="code-diff"`) around the
 * fence — the host (pin) does the diff rendering server-side, so the heavy
 * lifting stays out of the bundle and the output is static. A plain ```diff
 * fence without this wrapper is left as ordinary highlighted text.
 *
 * @category data
 * @example
 * <CodeDiff>
 *
 * ```diff
 * diff --git a/server.go b/server.go
 * --- a/server.go
 * +++ b/server.go
 * @@ -1,3 +1,4 @@
 *  func main() {
 * -	serve()
 * +	serveTLS()
 * +	log.Println("listening")
 *  }
 * ```
 *
 * </CodeDiff>
 */
function CodeDiff({ children, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="code-diff" {...props}>
      {children}
    </div>
  );
}

export { CodeDiff };
