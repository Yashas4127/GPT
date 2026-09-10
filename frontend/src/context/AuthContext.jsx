import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { authApi } from '../api/authApi'
import { setUnauthorizedHandler } from '../api/axios'
import { getErrorMessage } from '../utils/errors'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const clearAuth = useCallback(() => {
    setUser(null)
  }, [])

  const fetchProfile = useCallback(async () => {
    try {
      const { data } = await authApi.getProfile()
      setUser(data)
      return data
    } catch {
      setUser(null)
      return null
    }
  }, [])

  useEffect(() => {
    setUnauthorizedHandler(() => {
      clearAuth()
    })

    fetchProfile().finally(() => setLoading(false))
  }, [fetchProfile, clearAuth])

  const login = async (credentials) => {
    const { data } = await authApi.login(credentials)
    setUser({
      name: data.name,
      age: data.age,
      email: data.email,
      usage: data.usage,
    })
    return data
  }

  const signup = async (payload) => {
    await authApi.signup(payload)
    // Backend signup cookie may be invalid; login ensures a working session
    return login({ email: payload.email, password: payload.password })
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } finally {
      clearAuth()
    }
  }

  const refreshProfile = async () => {
    try {
      const profile = await fetchProfile()
      return profile
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }

  const deleteAccount = async () => {
    await authApi.deleteAccount()
    clearAuth()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        refreshProfile,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
