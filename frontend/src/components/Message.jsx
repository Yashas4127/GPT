import { useState } from 'react'
import { Bot, Check, Copy, User } from 'lucide-react'
import MarkdownRenderer from './MarkdownRenderer'
import { formatMessageTime } from '../utils/format'
import { useAuth } from '../context/AuthContext'
import { getInitials } from '../utils/format'

export default function Message({ message }) {
  const { user } = useAuth()
  const [copied, setCopied] = useState(false)
  const isUser = message.role === 'user'

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={`group flex gap-3 animate-fade-in px-4 py-2 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${
          isUser
            ? 'bg-accent text-white'
            : 'bg-accent-muted text-accent'
        }`}
      >
        {isUser ? (
          user?.name ? (
            getInitials(user.name)
          ) : (
            <User className="h-4 w-4" />
          )
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>

      <div className={`max-w-[85%] sm:max-w-[75%] md:max-w-[70%] ${isUser ? 'items-end' : ''}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-user-bubble text-white'
              : 'border border-border bg-ai-bubble text-text-primary'
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
          ) : (
            <MarkdownRenderer content={message.content} />
          )}
        </div>

        <div
          className={`mt-1.5 flex items-center gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
        >
          <span className="text-xs text-text-muted">
            {formatMessageTime(message.createdAt)}
          </span>
          {!isUser && (
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs text-text-muted opacity-0 transition-all hover:bg-surface-hover hover:text-text-primary group-hover:opacity-100"
              title="Copy response"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-success" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
