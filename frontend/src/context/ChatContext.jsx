import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { chatApi } from '../api/chatApi'
import { DEFAULT_MODEL } from '../utils/constants'
import { getErrorMessage } from '../utils/errors'
import { useAuth } from './AuthContext'

const ChatContext = createContext(null)

export function ChatProvider({ children }) {
  const { chatId } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, refreshProfile } = useAuth()

  const [chats, setChats] = useState([])
  const [messages, setMessages] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [selectedModel, setSelectedModel] = useState(
    () => localStorage.getItem('selectedModel') || DEFAULT_MODEL
  )
  const [loadingChats, setLoadingChats] = useState(false)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [sending, setSending] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    localStorage.setItem('selectedModel', selectedModel)
  }, [selectedModel])

  const loadChats = useCallback(async () => {
    setLoadingChats(true)
    try {
      const { data } = await chatApi.getRecentChats()
      setChats(Array.isArray(data.chats) ? data.chats : [])
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setLoadingChats(false)
    }
  }, [])

  const loadMessages = useCallback(async (id) => {
    setLoadingMessages(true)
    try {
      const [messagesRes, chatRes] = await Promise.all([
        chatApi.getMessages(id),
        chatApi.getChat(id),
      ])
      setMessages(messagesRes.data.msg || [])
      setCurrentChat(chatRes.data)
    } catch (error) {
      toast.error(getErrorMessage(error))
      setMessages([])
      setCurrentChat(null)
    } finally {
      setLoadingMessages(false)
    }
  }, [])

  useEffect(() => {
    if (!isAuthenticated) return
    loadChats()
  }, [isAuthenticated, loadChats])

  useEffect(() => {
    if (!isAuthenticated) return

    if (chatId) {
      loadMessages(chatId)
    } else {
      setMessages([])
      setCurrentChat(null)
    }
  }, [chatId, isAuthenticated, loadMessages])

  const startNewChat = () => {
    navigate('/chat')
    setMessages([])
    setCurrentChat(null)
  }

  const sendMessage = async (content) => {
    const trimmed = content.trim()
    if (!trimmed || sending) return

    setSending(true)

    const optimisticUserMessage = {
      _id: `temp-user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      createdAt: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, optimisticUserMessage])

    try {
      let response

      if (chatId) {
        response = await chatApi.sendMessageToChat(chatId, trimmed)
      } else {
        response = await chatApi.sendMessage(trimmed, selectedModel)
      }

      const assistantMessage = {
        _id: `temp-assistant-${Date.now()}`,
        role: 'assistant',
        content: response.data.reply,
        createdAt: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      await loadChats()
      await refreshProfile()

      if (!chatId) {
        const { data } = await chatApi.getRecentChats()
        const latestChat = data.chats?.[0]
        if (latestChat) {
          navigate(`/chat/${latestChat._id}`, { replace: true })
        }
      } else {
        await loadMessages(chatId)
      }
    } catch (error) {
      setMessages((prev) => prev.filter((m) => m._id !== optimisticUserMessage._id))
      toast.error(getErrorMessage(error))
      throw error
    } finally {
      setSending(false)
    }
  }

  const deleteChat = async (id) => {
    try {
      await chatApi.deleteChat(id)
      setChats((prev) => prev.filter((c) => c._id !== id))
      toast.success('Conversation deleted')

      if (chatId === id) {
        startNewChat()
      }
    } catch (error) {
      toast.error(getErrorMessage(error))
      throw error
    }
  }

  const filteredChats = chats.filter((chat) =>
    chat.topic?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <ChatContext.Provider
      value={{
        chats,
        filteredChats,
        messages,
        currentChat,
        chatId,
        selectedModel,
        setSelectedModel,
        loadingChats,
        loadingMessages,
        sending,
        searchQuery,
        setSearchQuery,
        loadChats,
        loadMessages,
        startNewChat,
        sendMessage,
        deleteChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) throw new Error('useChat must be used within ChatProvider')
  return context
}
