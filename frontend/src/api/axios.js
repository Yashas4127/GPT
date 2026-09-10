import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

let onUnauthorized = null

export function setUnauthorizedHandler(handler) {
  onUnauthorized = handler
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const url = error.config?.url || ''

    const isAuthRoute =
      url.includes('/user/login') ||
      url.includes('/user/signup') ||
      url.includes('/user/logout')

    if (status === 401 && !isAuthRoute && onUnauthorized) {
      onUnauthorized()
    }

    return Promise.reject(error)
  }
)

export default api
