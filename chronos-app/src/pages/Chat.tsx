import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Hash, MessageSquare, Send, Paperclip, MoreVertical, Plus } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

// Mock Data
const mockGroups = [
  { id: 'g1', name: 'General', unread: 0 },
  { id: 'g2', name: 'Design Team', unread: 3 },
  { id: 'g3', name: 'Engineering', unread: 0 },
  { id: 'g4', name: 'Project Alpha', unread: 12 },
]

const mockDirectMessages = [
  { id: 'u1', name: 'Alice Smith', avatar: 'AS', color: 'from-blue-500 to-cyan-500', status: 'online', unread: 1 },
  { id: 'u2', name: 'Mike Johnson', avatar: 'MJ', color: 'from-green-500 to-emerald-600', status: 'offline', unread: 0 },
  { id: 'u3', name: 'Sarah Wilson', avatar: 'SW', color: 'from-orange-500 to-red-500', status: 'online', unread: 0 },
]

const mockMessages = [
  { id: 1, senderId: 'u1', senderName: 'Alice Smith', avatar: 'AS', color: 'from-blue-500 to-cyan-500', text: 'Hey team, the new designs are ready for review!', timestamp: '10:30 AM', isMe: false },
  { id: 2, senderId: 'me', senderName: 'John Doe', avatar: 'JD', color: 'from-accent to-purple-600', text: 'Awesome, I will take a look at them after this meeting.', timestamp: '10:32 AM', isMe: true },
  { id: 3, senderId: 'u2', senderName: 'Mike Johnson', avatar: 'MJ', color: 'from-green-500 to-emerald-600', text: 'Looks great! One small thing on the navbar though...', timestamp: '10:35 AM', isMe: false },
]

export const Chat = () => {
  const [activeChat, setActiveChat] = useState('g1')
  const [messageInput, setMessageInput] = useState('')

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col h-[calc(100vh-8rem)] gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-1">Team Chat</h2>
          <p className="text-sm text-text-muted">Communicate with your team in real-time.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Chat Sidebar */}
        <Card className="w-full lg:w-80 flex flex-col flex-shrink-0 h-[400px] lg:h-auto overflow-hidden">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full bg-surface-light border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Groups */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">Channels</h3>
                <button className="text-text-muted hover:text-accent"><Plus className="w-4 h-4" /></button>
              </div>
              <div className="space-y-1">
                {mockGroups.map(group => (
                  <button
                    key={group.id}
                    onClick={() => setActiveChat(group.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${activeChat === group.id ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:bg-surface-light hover:text-text-primary'}`}
                  >
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      <span>{group.name}</span>
                    </div>
                    {group.unread > 0 && (
                      <span className="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{group.unread}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Messages */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">Direct Messages</h3>
                <button className="text-text-muted hover:text-accent"><Plus className="w-4 h-4" /></button>
              </div>
              <div className="space-y-1">
                {mockDirectMessages.map(user => (
                  <button
                    key={user.id}
                    onClick={() => setActiveChat(user.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${activeChat === user.id ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:bg-surface-light hover:text-text-primary'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-white text-[10px] font-medium`}>
                          {user.avatar}
                        </div>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-surface ${user.status === 'online' ? 'bg-green-500' : 'bg-text-muted'}`} />
                      </div>
                      <span>{user.name}</span>
                    </div>
                    {user.unread > 0 && (
                      <span className="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{user.unread}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col h-[500px] lg:h-auto overflow-hidden">
          {/* Chat Header */}
          <div className="h-16 border-b border-border flex items-center justify-between px-4 lg:px-6 flex-shrink-0 bg-surface/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-light border border-border flex items-center justify-center text-text-primary shadow-sm">
                <Hash className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-primary">General</h3>
                <p className="text-xs text-text-muted hidden sm:block">Company-wide announcements and general chat</p>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button className="p-2 text-text-muted hover:text-text-primary rounded-lg transition-colors"><Search className="w-5 h-5" /></button>
              <button className="p-2 text-text-muted hover:text-text-primary rounded-lg transition-colors"><MoreVertical className="w-5 h-5" /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 flex flex-col justify-end bg-surface/30">
            {mockMessages.map(msg => (
              <div key={msg.id} className={`flex items-start gap-3 lg:gap-4 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${msg.color} flex items-center justify-center text-white text-xs font-medium flex-shrink-0 shadow-lg mt-1`}>
                  {msg.avatar}
                </div>
                <div className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} max-w-[85%] sm:max-w-[70%]`}>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm font-medium text-text-primary">{msg.senderName}</span>
                    <span className="text-[10px] text-text-muted">{msg.timestamp}</span>
                  </div>
                  <div className={`p-3 rounded-2xl text-sm ${msg.isMe ? 'bg-accent text-white rounded-tr-sm shadow-[0_4px_15px_rgba(255,45,120,0.2)]' : 'bg-surface-light border border-border text-text-secondary rounded-tl-sm shadow-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-3 lg:p-4 border-t border-border bg-surface flex-shrink-0">
            <div className="flex items-end gap-2">
              <button className="p-2 lg:p-3 text-text-muted hover:text-accent transition-colors hidden sm:block"><Paperclip className="w-5 h-5" /></button>
              <div className="flex-1 bg-surface-light border border-border rounded-xl px-3 lg:px-4 py-2 flex items-center focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all shadow-inner">
                <textarea 
                  rows={1}
                  placeholder="Type a message..."
                  className="w-full bg-transparent border-none focus:ring-0 resize-none text-sm text-text-primary py-1 placeholder:text-text-muted outline-none"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (messageInput.trim()) {
                        setMessageInput('');
                      }
                    }
                  }}
                />
              </div>
              <Button 
                className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl flex items-center justify-center p-0 flex-shrink-0 shadow-[0_4px_15px_rgba(255,45,120,0.3)]"
                onClick={() => messageInput.trim() && setMessageInput('')}
              >
                <Send className="w-4 h-4 lg:w-5 lg:h-5 ml-1" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}
