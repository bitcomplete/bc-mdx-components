// Conversation patterns — Agentic Craft's messages-&-prose model
// (https://agentic-craft.vercel.app/conversation).
//
//   - <Conversation> wraps the whole transcript in a single rounded
//     container so it reads as one unit even when other content
//     appears nearby.
//   - <UserMessage>     right-aligned bubble, sans, 75% max width
//   - <AssistantMessage> left-aligned, no bubble, serif, 85% max
//                        width — signals "AI-authored prose"
//   - <SystemMessage>   centered pill, sans muted — system notices
//                        ("Agent connected to document repository")
//   - <Thinking>        small italic "Thinking" indent above an
//                        assistant message
//
// Markdown inside any message renders normally (our base CSS scopes
// prose styles to <p>/<ul>/<code>/etc. so they pick up the right
// typography automatically).

import * as React from "react";
import { cn } from "@/lib/utils.js";

function Conversation({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="conversation"
      className={cn(
        "my-6 flex flex-col gap-5 rounded-xl border border-border bg-card/30 px-5 py-6",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function UserMessage({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="user-message"
      className={cn("flex justify-end", className)}
      {...props}
    >
      <div
        className={cn(
          // Translucent frosted bubble — works in both light + dark
          // without needing a separate dark variant.
          "max-w-[75%] rounded-2xl bg-foreground/10 px-4 py-2.5 font-sans text-sm text-foreground leading-relaxed",
          // tighten markdown spacing inside the bubble
          "[&>*]:my-0 [&>*+*]:mt-2 [&_p]:font-sans [&_p]:text-sm [&_p]:m-0",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function AssistantMessage({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="assistant-message"
      className={cn("flex justify-start", className)}
      {...props}
    >
      <div
        className={cn(
          "max-w-[85%] font-serif text-base text-foreground leading-relaxed",
          // tighten markdown so the message doesn't get extra top/bottom margins
          "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:font-serif [&_p]:text-base",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function SystemMessage({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="system-message"
      className={cn("flex justify-center", className)}
      {...props}
    >
      <div className="rounded-full bg-muted/60 px-3 py-1 font-sans text-xs text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

function Thinking({
  className,
  children = "Thinking",
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="thinking"
      className={cn(
        "font-sans text-xs italic text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Conversation, UserMessage, AssistantMessage, SystemMessage, Thinking };
