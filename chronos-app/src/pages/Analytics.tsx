import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, LineChart, Line, CartesianGrid } from 'recharts'
import { Card } from '../components/ui/Card'

export const Analytics = () => {
  const [workSeconds, setWorkSeconds] = useState(0)
  const [breakSeconds, setBreakSeconds] = useState(0)

  useEffect(() => {
    const savedWork = localStorage.getItem('todayWorkSeconds')
    const savedBreak = localStorage.getItem('todayBreakSeconds')
    if (savedWork) setWorkSeconds(parseInt(savedWork))
    if (savedBreak) setBreakSeconds(parseInt(savedBreak))
  }, [])

  const totalSeconds = workSeconds + breakSeconds
  const workPercentage = totalSeconds > 0 ? (workSeconds / totalSeconds) * 100 : 0
  const breakPercentage = totalSeconds > 0 ? (breakSeconds / totalSeconds) * 100 : 0

  const projectData = [
    { name: 'Chronos App', hours: Math.floor(workSeconds / 3600) },
    { name: 'Website Redesign', hours: 45 },
    { name: 'Mobile App', hours: 210 },
    { name: 'Brand Identity', hours: 85 },
  ]

  const productivityData = [
    { name: 'Work', value: workPercentage, color: '#FF2D78' },
    { name: 'Break', value: breakPercentage, color: '#2A2A35' },
  ]

  const trendData = [
    { name: 'Week 1', hours: 35 },
    { name: 'Week 2', hours: 42 },
    { name: 'Week 3', hours: 38 },
    { name: 'Week 4', hours: workSeconds / 3600 || 25 },
    { name: 'Week 5', hours: 39 },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-1">Analytics Dashboard</h2>
          <p className="text-sm text-text-muted">Your productivity insights at a glance</p>
        </div>
        <select className="bg-surface border border-border rounded-lg px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent">
          <option>Last 30 Days</option>
          <option>This Month</option>
          <option>Last Month</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-base font-semibold text-text-primary">Time Distribution</h3>
            <span className="text-sm text-text-muted">Work vs Break ratio</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={productivityData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                  {productivityData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#12121A', border: '1px solid #2A2A35', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-accent" /><span className="text-sm text-text-secondary">Work ({workPercentage.toFixed(0)}%)</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-surface-light" /><span className="text-sm text-text-secondary">Break ({breakPercentage.toFixed(0)}%)</span></div>
          </div>
        </Card>

        <Card className="p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-base font-semibold text-text-primary">Time per Project</h3>
            <span className="text-sm text-text-muted">Hours logged by project</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2A2A35" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8A8A9A', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8A8A9A', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#1A1A25' }} contentStyle={{ backgroundColor: '#12121A', border: '1px solid #2A2A35', borderRadius: '8px' }} />
                <Bar dataKey="hours" radius={[4, 4, 0, 0]} fill="#FF2D78" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2 flex flex-col gap-6">
          <div>
            <h3 className="text-base font-semibold text-text-primary">Weekly Productivity Trend</h3>
            <span className="text-sm text-text-muted">Hours logged over time</span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2A2A35" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8A8A9A', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8A8A9A', fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: '#12121A', border: '1px solid #2A2A35', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="hours" stroke="#FF2D78" strokeWidth={3} dot={{ fill: '#12121A', stroke: '#FF2D78', strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}