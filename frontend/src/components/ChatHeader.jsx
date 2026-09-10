import { Menu, Sparkles } from 'lucide-react'
import { useChat } from '../context/ChatContext'
import { APP_NAME, AI_MODELS } from '../utils/constants'
import ThemeToggle from './ThemeToggle'

export default function ChatHeader({ onMenuClick }) {
  const { currentChat, chatId, selectedModel } = useChat()

  const modelLabel =
    AI_MODELS.find((m) => m.id === (currentChat?.model || selectedModel))?.label ||
    currentChat?.model ||
    selectedModel

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-surface-elevated px-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-hover hover:text-text-primary lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="hidden h-8 w-8 items-center justify-center rounded-lg bg-accent-muted text-accent sm:flex">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-text-primary">
              {chatId && currentChat?.topic ? currentChat.topic : APP_NAME}
            </h1>
            <p className="text-xs text-text-muted">{modelLabel}</p>
          </div>
        </div>
      </div>

      <ThemeToggle />
    </header>
  )
}
