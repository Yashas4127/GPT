const variants = {
  primary:
    'bg-accent text-white hover:bg-accent-hover shadow-sm disabled:opacity-50 disabled:cursor-not-allowed',
  secondary:
    'bg-surface-elevated text-text-primary border border-border hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed',
  ghost:
    'text-text-secondary hover:bg-surface-hover hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed',
  danger:
    'bg-danger text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed',
}

const sizes = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-11 px-5 text-sm gap-2',
  icon: 'h-9 w-9 p-0',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        children
      )}
    </button>
  )
}
