import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  LogOut,
  MessageSquarePlus,
  Search,
  Settings,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useChat } from '../context/ChatContext'
import { APP_NAME } from '../utils/constants'
import { formatRelativeTime, getInitials } from '../utils/format'
import ConfirmDialog from './ui/ConfirmDialog'
import { ChatListSkeleton } from './ui/Skeleton'
import ThemeToggle from './ThemeToggle'

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const {
    filteredChats,
    chatId,
    loadingChats,
    searchQuery,
    setSearchQuery,
    startNewChat,
    deleteChat,
  } = useChat()

  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const handleNewChat = () => {
    startNewChat()
    onClose?.()
  }

  const handleSelectChat = (id) => {
    navigate(`/chat/${id}`)
    onClose?.()
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deleteChat(deleteTarget)
      setDeleteTarget(null)
    } finally {
      setDeleting(false)
    }
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await logout()
      navigate('/login')
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border bg-surface-elevated transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-semibold text-text-primary">{APP_NAME}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle className="lg:hidden" />
            <button
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-hover lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-3">
          <button
            onClick={handleNewChat}
            className="flex w-full items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-surface-hover"
          >
            <MessageSquarePlus className="h-4 w-4" />
            New Chat
          </button>
        </div>

        <div className="px-3 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="search"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {loadingChats ? (
            <ChatListSkeleton />
          ) : filteredChats.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-text-muted">
              {searchQuery ? 'No conversations found' : 'No conversations yet'}
            </p>
          ) : (
            <ul className="space-y-0.5">
              {filteredChats.map((chat) => {
                const isActive = chatId === chat._id
                return (
                  <li key={chat._id} className="group relative">
                    <button
                      onClick={() => handleSelectChat(chat._id)}
                      className={`flex w-full items-start gap-2 rounded-lg px-3 py-2.5 pr-10 text-left text-sm transition-colors ${
                        isActive
                          ? 'bg-accent-muted text-accent'
                          : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                      }`}
                    >
                      <span className="line-clamp-2 flex-1 font-medium">
                        {chat.topic || 'New Chat'}
                      </span>
                    </button>
                    <span className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 text-[10px] text-text-muted">
                      {formatRelativeTime(chat.updatedAt)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setDeleteTarget(chat._id)
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-text-muted opacity-0 transition-all hover:bg-surface-hover hover:text-danger group-hover:opacity-100"
                      aria-label="Delete conversation"
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-border p-3">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
              {getInitials(user?.name)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-text-primary">
                {user?.name}
              </p>
              <p className="truncate text-xs text-text-muted">
                {user?.usage?.tokenUsed?.toLocaleString() ?? 0} /{' '}
                {user?.usage?.tokenLimit?.toLocaleString() ?? 10000} tokens
              </p>
            </div>
          </div>

          <div className="mt-1 flex gap-1">
            <Link
              to="/chat/settings"
              onClick={onClose}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-hover hover:text-danger disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" />
              {loggingOut ? '...' : 'Logout'}
            </button>
          </div>
        </div>
      </aside>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete conversation"
        description="This will permanently delete this conversation and all its messages. This action cannot be undone."
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  )
}
