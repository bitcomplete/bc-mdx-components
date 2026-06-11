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

/**
 * Rounded container around a chat transcript. Children are
 * <UserMessage>, <AssistantMessage>, <SystemMessage>, optionally
 * <Thinking>. Use to share a session, a worked-through dialogue,
 * a Q&A — anything that reads as turns.
 *
 * @category conversation
 * @example
 * <Conversation>
 *   <UserMessage>What's our SLO?</UserMessage>
 *   <AssistantMessage>1.5s p99. We've been blowing it.</AssistantMessage>
 * </Conversation>
 */
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

/**
 * Right-aligned chat bubble for the human's turn. Sans, 75% max
 * width. Markdown inside renders normally.
 *
 * @category conversation
 * @example
 * <UserMessage>Can you list the SFRs missing from the mapping?</UserMessage>
 */
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

/**
 * Left-aligned agent turn. Serif body, no bubble, 85% max width.
 * Contains the agent's prose plus any <ToolCall>s the turn produced.
 *
 * @category conversation
 * @example
 * <AssistantMessage>
 *   Found three missing SFRs. Let me list them.
 *   <ToolCall name="search" status="ok" />
 * </AssistantMessage>
 */
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

/**
 * Centred system notice — "Agent connected to repo", "Session
 * resumed", etc. Small muted pill.
 *
 * @category conversation
 * @example
 * <SystemMessage>Agent connected to document repository</SystemMessage>
 */
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

/**
 * Tiny italic "Thinking" indicator placed above an <AssistantMessage>.
 * Use to signal the agent is reasoning before it replies — usually
 * paired with an empty assistant turn in a live demo.
 *
 * @category conversation
 * @example
 * <Thinking>Thinking…</Thinking>
 * <AssistantMessage>Here's what I found.</AssistantMessage>
 */
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
