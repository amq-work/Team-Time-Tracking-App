import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Folder, MoreVertical, Clock, Users, ChevronDown, ChevronRight } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

const mockProjects = [
  { id: 1, name: 'Chronos App', client: 'Internal', status: 'Active', hours: '124:30', team: 4, color: 'bg-accent' },
  { id: 2, name: 'Website Redesign', client: 'Acme Corp', status: 'Active', hours: '45:15', team: 2, color: 'bg-purple-500' },
  { id: 3, name: 'Mobile App', client: 'Global Tech', status: 'On Hold', hours: '210:00', team: 5, color: 'bg-blue-500' },
  { id: 4, name: 'Brand Identity', client: 'Startup Inc', status: 'Completed', hours: '85:45', team: 3, color: 'bg-green-500' },
]

const mockTasks = [
  { id: 1, name: 'Design System Setup', status: 'Done', priority: 'High', assignee: 'JD', time: '12:30' },
  { id: 2, name: 'Dashboard Layout', status: 'In Progress', priority: 'High', assignee: 'JD', time: '08:45' },
  { id: 3, name: 'API Integration', status: 'Todo', priority: 'Medium', assignee: 'AS', time: '00:00' },
  { id: 4, name: 'User Authentication', status: 'Review', priority: 'High', assignee: 'MK', time: '15:20' },
]

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(mockProjects[0])
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({ 'Sprint 1': true, Backlog: false })

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }))
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
      <div className="w-full lg:w-80 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">Projects</h2>
          <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>New</Button>
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto pr-2">
          {mockProjects.map((project) => (
            <Card key={project.id} hoverable onClick={() => setSelectedProject(project)} className={`p-4 cursor-pointer transition-all ${selectedProject.id === project.id ? 'border-accent bg-accent/5' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${project.color} shadow-[0_0_10px_currentColor]`} />
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary">{project.name}</h3>
                    <span className="text-xs text-text-muted">{project.client}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /><span className="font-pixel text-[9px]">{project.hours}</span></div>
                <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /><span>{project.team} members</span></div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border-border/50">
        <div className="p-6 border-b border-border bg-surface-light/50">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold text-text-primary">{selectedProject.name}</h2>
                <span className="px-2.5 py-1 rounded-full bg-surface border border-border text-xs font-medium text-text-secondary">{selectedProject.status}</span>
              </div>
              <p className="text-sm text-text-muted">Client: {selectedProject.client}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="secondary" size="sm">Edit Project</Button>
              <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>Add Task</Button>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex flex-col gap-1"><span className="text-xs text-text-muted uppercase tracking-wider font-medium">Total Time</span><span className="font-pixel text-lg text-text-primary">{selectedProject.hours}</span></div>
            <div className="flex flex-col gap-1"><span className="text-xs text-text-muted uppercase tracking-wider font-medium">Budget</span><span className="font-pixel text-lg text-text-primary">$12,500</span></div>
            <div className="flex flex-col gap-1"><span className="text-xs text-text-muted uppercase tracking-wider font-medium">Team</span><div className="flex -space-x-2">{[...Array(selectedProject.team)].map((_, i) => (<div key={i} className="w-7 h-7 rounded-full bg-surface border-2 border-surface-light flex items-center justify-center text-[10px] font-medium text-white" style={{ backgroundColor: `hsl(${i * 40 + 200}, 70%, 50%)` }}>U{i+1}</div>))}</div></div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {['Sprint 1', 'Backlog'].map((category) => (
            <div key={category} className="flex flex-col gap-3">
              <button onClick={() => toggleCategory(category)} className="flex items-center gap-2 text-sm font-semibold text-text-primary hover:text-accent transition-colors w-fit">
                {expandedCategories[category] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                {category}<span className="text-xs text-text-muted font-normal ml-2">({category === 'Sprint 1' ? 4 : 12})</span>
              </button>
              {expandedCategories[category] && (<div className="flex flex-col gap-2 pl-6">{mockTasks.map((task) => (<div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border hover:border-accent/50 transition-colors group"><div className="flex items-center gap-4"><div className={`w-2 h-2 rounded-full ${task.status === 'Done' ? 'bg-green-500' : task.status === 'In Progress' ? 'bg-accent' : 'bg-text-muted'}`} /><span className={`text-sm font-medium ${task.status === 'Done' ? 'text-text-muted line-through' : 'text-text-primary'}`}>{task.name}</span><span className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${task.priority === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>{task.priority}</span></div><div className="flex items-center gap-6"><div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-text-muted" /><span className="font-pixel text-[10px] text-text-secondary">{task.time}</span></div><div className="w-6 h-6 rounded-full bg-surface-light border border-border flex items-center justify-center text-[10px] font-medium text-text-primary">{task.assignee}</div><button className="text-text-muted hover:text-text-primary opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical className="w-4 h-4" /></button></div></div>))}</div>)}
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}