import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Mock login - accept any email/password
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const found = users.find((u: any) => u.email === email && u.password === password)
    
    if (found || (email && password)) {
      const userData = { email, name: found?.name || email.split('@')[0] }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      return true
    }
    return false
  }

  const signup = async (name: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    users.push({ name, email, password })
    localStorage.setItem('users', JSON.stringify(users))
    
    const userData = { email, name }
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}