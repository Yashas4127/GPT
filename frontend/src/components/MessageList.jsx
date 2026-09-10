import { useEffect, useRef } from 'react'
import Message from './Message'
import LoadingMessage from './LoadingMessage'
import EmptyChat from './EmptyChat'
import { MessageSkeleton } from './ui/Skeleton'
import { useChat } from '../context/ChatContext'

export default function MessageList() {
  const { messages, loadingMessages, sending, chatId } = useChat()
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, sending])

  if (loadingMessages && chatId) {
    return <MessageSkeleton />
  }

  if (!chatId && messages.length === 0 && !sending) {
    return <EmptyChat />
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-3xl py-6">
        {messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}
        {sending && <LoadingMessage />}
        <div ref={bottomRef} className="h-1" />
      </div>
    </div>
  )
}
