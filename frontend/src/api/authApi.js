import api from './axios'

export const authApi = {
  signup: (data) => api.post('/user/signup', data),

  login: (data) => api.post('/user/login', data),

  logout: () => api.post('/user/logout'),

  getProfile: () => api.get('/user/profile'),

  deleteAccount: () => api.delete('/user/delete'),
}
