import React from 'react'
import { motion } from 'framer-motion'
import { Mail, MoreHorizontal, Plus, Shield, Clock } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

const mockTeam = [
  { id: 1, name: 'John Doe', role: 'Admin / Lead Designer', email: 'john@chronos.app', hours: '38:45', status: 'active', avatar: 'JD', color: 'from-accent to-purple-600' },
  { id: 2, name: 'Alice Smith', role: 'Frontend Developer', email: 'alice@chronos.app', hours: '42:10', status: 'active', avatar: 'AS', color: 'from-blue-500 to-cyan-500' },
  { id: 3, name: 'Mike Johnson', role: 'Backend Developer', email: 'mike@chronos.app', hours: '35:20', status: 'offline', avatar: 'MJ', color: 'from-green-500 to-emerald-600' },
  { id: 4, name: 'Sarah Wilson', role: 'Project Manager', email: 'sarah@chronos.app', hours: '28:00', status: 'active', avatar: 'SW', color: 'from-orange-500 to-red-500' },
  { id: 5, name: 'David Lee', role: 'QA Engineer', email: 'david@chronos.app', hours: '40:00', status: 'offline', avatar: 'DL', color: 'from-purple-500 to-pink-500' },
]

export const Team = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold text-text-primary mb-1">Team Members</h2><p className="text-sm text-text-muted">Manage your workspace members and roles.</p></div>
        <Button leftIcon={<Plus className="w-4 h-4" />}>Invite Member</Button>
      </div>
      <Card className="overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="border-b border-border bg-surface-light/50"><th className="px-6 py-4 text-xs font-medium text-text-muted uppercase tracking-wider">Member</th><th className="px-6 py-4 text-xs font-medium text-text-muted uppercase tracking-wider">Role</th><th className="px-6 py-4 text-xs font-medium text-text-muted uppercase tracking-wider">Status</th><th className="px-6 py-4 text-xs font-medium text-text-muted uppercase tracking-wider">Hours (This Week)</th><th className="px-6 py-4 text-xs font-medium text-text-muted uppercase tracking-wider text-right">Actions</th></tr></thead><tbody className="divide-y divide-border">{mockTeam.map((member) => (<tr key={member.id} className="hover:bg-surface-light/30 transition-colors group"><td className="px-6 py-4"><div className="flex items-center gap-4"><div className={`w-10 h-10 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-medium text-sm shadow-lg`}>{member.avatar}</div><div className="flex flex-col"><span className="text-sm font-medium text-text-primary">{member.name}</span><span className="text-xs text-text-muted flex items-center gap-1"><Mail className="w-3 h-3" />{member.email}</span></div></div></td><td className="px-6 py-4"><div className="flex items-center gap-2">{member.role.includes('Admin') && <Shield className="w-3.5 h-3.5 text-accent" />}<span className="text-sm text-text-secondary">{member.role}</span></div></td><td className="px-6 py-4"><div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${member.status === 'active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-text-muted'}`} /><span className="text-sm text-text-secondary capitalize">{member.status}</span></div></td><td className="px-6 py-4"><div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-text-muted" /><span className="font-pixel text-[10px] text-text-primary">{member.hours}</span></div></td><td className="px-6 py-4 text-right"><button className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface transition-colors opacity-0 group-hover:opacity-100"><MoreHorizontal className="w-5 h-5" /></button></td></tr>))}</tbody></table></div></Card>
    </motion.div>
  )
}