import { Sparkles } from 'lucide-react'
import { useChat } from '../context/ChatContext'
import { APP_NAME, SUGGESTED_PROMPTS } from '../utils/constants'

export default function EmptyChat() {
  const { sendMessage, sending } = useChat()

  const handlePromptClick = (prompt) => {
    if (!sending) sendMessage(prompt)
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-muted">
        <Sparkles className="h-7 w-7 text-accent" />
      </div>
      <h2 className="text-xl font-semibold text-text-primary">
        Welcome to {APP_NAME}
      </h2>
      <p className="mt-2 max-w-md text-center text-sm text-text-secondary">
        Start a conversation with your AI assistant. Ask questions, get help with code,
        or explore ideas.
      </p>

      <div className="mt-8 grid w-full max-w-lg gap-2 sm:grid-cols-2">
        {SUGGESTED_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handlePromptClick(prompt)}
            disabled={sending}
            className="rounded-xl border border-border bg-surface-elevated px-4 py-3 text-left text-sm text-text-secondary transition-colors hover:border-accent/30 hover:bg-surface-hover hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  )
}
