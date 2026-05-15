import React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { AppLayout } from './components/layout/AppLayout'
import { Login } from './pages/auth/Login'
import { Signup } from './pages/auth/Signup'
import { Dashboard } from './pages/Dashboard'
import { TimeTracker } from './pages/TimeTracker'
import { Projects } from './pages/Projects'
import { Team } from './pages/Team'
import { Chat } from './pages/Chat'
import { Analytics } from './pages/Analytics'
import { Reports } from './pages/Reports'
import { Settings } from './pages/Settings'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth()
  if (isLoading) return <div className="bg-background min-h-screen" />
  return user ? <>{children}</> : <Navigate to="/login" />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="tracker" element={<TimeTracker />} />
        <Route path="projects" element={<Projects />} />
        <Route path="team" element={<Team />} />
        <Route path="chat" element={<Chat />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </HashRouter>
  )
}

export default App