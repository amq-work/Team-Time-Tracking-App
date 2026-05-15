import React from 'react'
import { Search, Bell, Menu } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const routeTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/tracker': 'Time Tracker',
  '/projects': 'Projects',
  '/team': 'Team',
  '/chat': 'Team Chat',
  '/analytics': 'Analytics',
  '/reports': 'Reports',
  '/settings': 'Settings'
}

interface TopBarProps {
  onMenuClick: () => void;
}

export const TopBar = ({ onMenuClick }: TopBarProps) => {
  const location = useLocation()
  const title = routeTitles[location.pathname] || 'Chronos'
  
  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface-light transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-surface border border-border rounded-full pl-9 pr-4 py-1.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent w-64 transition-all"
          />
        </div>
        <button className="relative p-2 text-text-secondary hover:text-text-primary transition-colors rounded-full hover:bg-surface-light">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full shadow-[0_0_5px_rgba(255,45,120,0.8)]"></span>
        </button>
      </div>
    </header>
  )
}