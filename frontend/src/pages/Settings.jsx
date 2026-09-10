import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { useChat } from '../context/ChatContext'
import { AI_MODELS } from '../utils/constants'
import { getErrorMessage } from '../utils/errors'
import Button from '../components/ui/Button'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import ThemeToggle from '../components/ThemeToggle'

export default function Settings() {
  const navigate = useNavigate()
  const { user, deleteAccount, refreshProfile } = useAuth()
  const { selectedModel, setSelectedModel } = useChat()

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleModelChange = (modelId) => {
    setSelectedModel(modelId)
    toast.success('Default model updated')
  }

  const handleDeleteAccount = async () => {
    setDeleting(true)
    try {
      await deleteAccount()
      toast.success('Account deleted')
      navigate('/login')
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  const handleRefreshUsage = async () => {
    try {
      await refreshProfile()
      toast.success('Usage updated')
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <div className="min-h-dvh bg-surface">
      <header className="border-b border-border bg-surface-elevated">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link
              to="/chat"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-hover hover:text-text-primary"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-base font-semibold text-text-primary">Settings</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <section className="rounded-xl border border-border bg-surface-elevated p-6">
          <h2 className="text-sm font-semibold text-text-primary">Profile</h2>
          <dl className="mt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <dt className="text-text-secondary">Name</dt>
              <dd className="font-medium text-text-primary">{user?.name}</dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-text-secondary">Age</dt>
              <dd className="font-medium text-text-primary">{user?.age}</dd>
            </div>
          </dl>
        </section>

        <section className="mt-6 rounded-xl border border-border bg-surface-elevated p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text-primary">Token Usage</h2>
            <Button variant="ghost" size="sm" onClick={handleRefreshUsage}>
              Refresh
            </Button>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Current window</span>
              <span className="font-medium text-text-primary">
                {user?.usage?.tokenUsed?.toLocaleString() ?? 0} /{' '}
                {user?.usage?.tokenLimit?.toLocaleString() ?? 10000}
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-hover">
              <div
                className="h-full rounded-full bg-accent transition-all"
                style={{
                  width: `${Math.min(
                    ((user?.usage?.tokenUsed ?? 0) / (user?.usage?.tokenLimit ?? 10000)) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
            {user?.usage?.resetAt && (
              <p className="mt-2 text-xs text-text-muted">
                Resets at {new Date(user.usage.resetAt).toLocaleString()}
              </p>
            )}
            <p className="mt-1 text-xs text-text-muted">
              Total used: {user?.usage?.totalTokenUsed?.toLocaleString() ?? 0} tokens
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-border bg-surface-elevated p-6">
          <h2 className="text-sm font-semibold text-text-primary">Default AI Model</h2>
          <p className="mt-1 text-xs text-text-muted">
            Used when starting new conversations
          </p>
          <div className="mt-4 space-y-2">
            {AI_MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => handleModelChange(model.id)}
                className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors ${
                  selectedModel === model.id
                    ? 'border-accent bg-accent-muted'
                    : 'border-border hover:bg-surface-hover'
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-text-primary">{model.label}</p>
                  <p className="text-xs text-text-muted">{model.description}</p>
                </div>
                {selectedModel === model.id && (
                  <span className="h-2 w-2 rounded-full bg-accent" />
                )}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-red-200 bg-surface-elevated p-6 dark:border-red-900/50">
          <h2 className="text-sm font-semibold text-danger">Danger Zone</h2>
          <p className="mt-1 text-xs text-text-muted">
            Permanently delete your account and all conversations
          </p>
          <Button
            variant="danger"
            size="sm"
            className="mt-4"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="h-4 w-4" />
            Delete account
          </Button>
        </section>
      </main>

      <ConfirmDialog
        open={showDeleteDialog}
        title="Delete account"
        description="This will permanently delete your account, all conversations, and messages. This action cannot be undone."
        confirmLabel="Delete account"
        loading={deleting}
        onConfirm={handleDeleteAccount}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </div>
  )
}
