import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Timer, Mail, Lock } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useAuth } from '../../contexts/AuthContext'

export const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    const success = await login(email, password)
    if (success) {
      navigate('/')
    } else {
      setError('Invalid credentials')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-surface border border-border rounded-xl flex items-center justify-center mb-4">
            <Timer className="w-6 h-6 text-accent" />
          </div>
          <h1 className="font-pixel text-sm tracking-widest text-text-primary mb-2">CHRONOS</h1>
          <p className="text-text-secondary text-sm">Sign in to your workspace</p>
        </div>
        <Card className="p-6 md:p-8">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <Input 
              label="Email Address" 
              type="email" 
              placeholder="name@company.com" 
              leftIcon={<Mail className="w-4 h-4" />} 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              leftIcon={<Lock className="w-4 h-4" />} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full mt-2" isLoading={isLoading}>Sign In</Button>
          </form>
          <div className="mt-6 text-center text-sm text-text-secondary">
            Don't have an account? <Link to="/signup" className="text-accent hover:text-accent-hover font-medium">Create workspace</Link>
          </div>
        </Card>
      </div>
    </div>
  )
}