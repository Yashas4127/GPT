import { Bot } from 'lucide-react'

export default function LoadingMessage() {
  return (
    <div className="flex gap-3 animate-fade-in px-4 py-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-muted text-accent">
        <Bot className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl border border-border bg-ai-bubble px-4 py-3">
        <span className="typing-dot h-2 w-2 rounded-full bg-text-muted" />
        <span className="typing-dot h-2 w-2 rounded-full bg-text-muted" />
        <span className="typing-dot h-2 w-2 rounded-full bg-text-muted" />
      </div>
    </div>
  )
}
