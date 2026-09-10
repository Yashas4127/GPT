import api from './axios'

export const chatApi = {
  getRecentChats: () => api.get('/chat/getRecentChat'),

  getChat: (chatId) => api.get(`/chat/${chatId}`),

  createChat: (model) => api.post('/chat/createChat', { model }),

  deleteChat: (chatId) => api.delete(`/chat/${chatId}`),

  getMessages: (chatId) => api.get(`/msg/${chatId}`),

  sendMessage: (content, model) =>
    api.post('/msg/', { content, model }),

  sendMessageToChat: (chatId, content) =>
    api.post(`/msg/${chatId}`, { content }),
}
