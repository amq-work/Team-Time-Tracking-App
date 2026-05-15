import React from 'react'
import { motion } from 'framer-motion'
import { User, DollarSign, Bell, Shield, Monitor } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

export const Settings = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
      <div className="w-full lg:w-64 flex flex-col gap-2"><h2 className="text-xl font-bold text-text-primary mb-4 px-3">Settings</h2>
        {[
          { id: 'profile', label: 'Profile', icon: User, active: true },
          { id: 'billing', label: 'Rates & Billing', icon: DollarSign, active: false },
          { id: 'notifications', label: 'Notifications', icon: Bell, active: false },
          { id: 'security', label: 'Security', icon: Shield, active: false },
          { id: 'preferences', label: 'Preferences', icon: Monitor, active: false },
        ].map((item) => (<button key={item.id} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${item.active ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:text-text-primary hover:bg-surface-light'}`}><item.icon className="w-4 h-4" />{item.label}</button>))}
      </div>
      <div className="flex-1 flex flex-col gap-8">
        <Card className="p-6 md:p-8 flex flex-col gap-8"><div><h3 className="text-lg font-semibold text-text-primary mb-1">Profile Information</h3><p className="text-sm text-text-muted">Update your account details and public profile.</p></div><div className="flex items-center gap-6"><div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center text-white font-medium text-2xl shadow-lg">JD</div><div className="flex flex-col gap-2"><Button variant="secondary" size="sm">Change Avatar</Button><span className="text-xs text-text-muted">JPG, GIF or PNG. Max size of 800K</span></div></div><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Input label="First Name" defaultValue="John" /><Input label="Last Name" defaultValue="Doe" /><Input label="Email Address" type="email" defaultValue="john@chronos.app" className="md:col-span-2" /><Input label="Role / Title" defaultValue="Lead Designer" className="md:col-span-2" /></div></Card>
        <Card className="p-6 md:p-8 flex flex-col gap-8"><div><h3 className="text-lg font-semibold text-text-primary mb-1">Rates & Billing</h3><p className="text-sm text-text-muted">Set your default hourly rate for billable projects.</p></div><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Input label="Default Hourly Rate (USD)" type="number" defaultValue="150" leftIcon={<DollarSign className="w-4 h-4" />} /><div className="flex flex-col gap-1.5 justify-end"><label className="text-sm font-medium text-text-secondary">Currency</label><select className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent h-[38px]"><option>USD ($)</option><option>EUR (€)</option><option>GBP (£)</option></select></div></div></Card>
        <div className="flex justify-end gap-4"><Button variant="ghost">Cancel</Button><Button>Save Changes</Button></div>
      </div>
    </motion.div>
  )
}