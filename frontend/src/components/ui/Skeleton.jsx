export function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-surface-hover ${className}`}
    />
  )
}

export function ChatListSkeleton() {
  return (
    <div className="space-y-2 px-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  )
}

export function MessageSkeleton() {
  return (
    <div className="space-y-6 px-4 py-6">
      <div className="flex justify-end">
        <Skeleton className="h-16 w-2/3 max-w-md rounded-2xl" />
      </div>
      <div className="flex justify-start">
        <Skeleton className="h-24 w-3/4 max-w-lg rounded-2xl" />
      </div>
    </div>
  )
}
