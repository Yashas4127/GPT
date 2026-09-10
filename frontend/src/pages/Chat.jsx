import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import ChatHeader from '../components/ChatHeader'
import MessageList from '../components/MessageList'
import ChatInput from '../components/ChatInput'
import Settings from './Settings'
import { ChatProvider } from '../context/ChatContext'
import { useMediaQuery } from '../hooks/useMediaQuery'

function ChatLayout() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ChatProvider>
      <div className="flex h-dvh overflow-hidden bg-surface">
        <Sidebar
          open={isDesktop || sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <ChatHeader onMenuClick={() => setSidebarOpen(true)} />
          <MessageList />
          <ChatInput />
        </div>
      </div>
    </ChatProvider>
  )
}

function ChatRoutes() {
  return (
    <Routes>
      <Route path="settings" element={<Settings />} />
      <Route path=":chatId" element={<ChatLayout />} />
      <Route index element={<ChatLayout />} />
    </Routes>
  )
}

export default ChatRoutes
