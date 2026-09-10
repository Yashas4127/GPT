import { AlertTriangle, X } from 'lucide-react'
import Button from './Button'

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="relative w-full max-w-md rounded-xl border border-border bg-surface-elevated p-6 shadow-md animate-fade-in"
      >
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 rounded-md p-1 text-text-muted hover:bg-surface-hover hover:text-text-primary"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <AlertTriangle className="h-5 w-5 text-danger" />
          </div>
          <div className="flex-1">
            <h2 id="dialog-title" className="text-base font-semibold text-text-primary">
              {title}
            </h2>
            <p className="mt-2 text-sm text-text-secondary">{description}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant={variant} onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
