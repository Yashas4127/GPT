import { useRef, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { useChat } from '../context/ChatContext'
import Button from './ui/Button'

const MAX_CHARS = 4000

export default function ChatInput() {
  const { sendMessage, sending } = useChat()
  const [content, setContent] = useState('')
  const textareaRef = useRef(null)

  const handleSubmit = async (e) => {
    e?.preventDefault()
    const trimmed = content.trim()
    if (!trimmed || sending) return

    try {
      await sendMessage(trimmed)
      setContent('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    } catch {
      // Error handled in context
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleInput = (e) => {
    setContent(e.target.value)
    const textarea = e.target
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
  }

  const charCount = content.length
  const isNearLimit = charCount > MAX_CHARS * 0.9

  return (
    <div className="border-t border-border bg-surface-elevated px-4 py-4">
      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
        <div className="relative rounded-2xl border border-border bg-surface shadow-sm transition-colors focus-within:border-accent/50 focus-within:ring-2 focus-within:ring-accent/10">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Message Nexus AI..."
            disabled={sending}
            rows={1}
            maxLength={MAX_CHARS}
            className="block w-full resize-none bg-transparent px-4 py-3.5 pr-14 text-sm text-text-primary placeholder:text-text-muted focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
          <div className="absolute bottom-2 right-2">
            <Button
              type="submit"
              size="icon"
              disabled={!content.trim() || sending || charCount > MAX_CHARS}
              loading={sending}
              className="rounded-xl"
              aria-label="Send message"
            >
              {!sending && <ArrowUp className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between px-1">
          <p className="text-xs text-text-muted">
            Press Enter to send, Shift + Enter for new line
          </p>
          {charCount > 0 && (
            <span
              className={`text-xs ${isNearLimit ? 'text-danger' : 'text-text-muted'}`}
            >
              {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
