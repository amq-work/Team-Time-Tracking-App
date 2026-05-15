import React, { useEffect, useState } from 'react'
import { Play, Clock, Briefcase, DollarSign, Activity, Coffee } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { StatsCard } from '../components/ui/StatsCard'
import { Button } from '../components/ui/Button'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useNavigate } from 'react-router-dom'

const weeklyData = [
  { name: 'Mon', hours: 6.5 }, { name: 'Tue', hours: 8.2 }, { name: 'Wed', hours: 7.0 },
  { name: 'Thu', hours: 9.5 }, { name: 'Fri', hours: 5.5 }, { name: 'Sat', hours: 2.0 }, { name: 'Sun', hours: 0 }
]

export const Dashboard = () => {
  const navigate = useNavigate()
  const [todayHours, setTodayHours] = useState('00:00')
  const [todayBreak, setTodayBreak] = useState('00:00')

  useEffect(() => {
    // Load today's data from localStorage
    const savedWork = localStorage.getItem('todayWorkSeconds')
    const savedBreak = localStorage.getItem('todayBreakSeconds')
    if (savedWork) {
      const seconds = parseInt(savedWork)
      const hours = Math.floor(seconds / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      setTodayHours(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`)
    }
    if (savedBreak) {
      const seconds = parseInt(savedBreak)
      const hours = Math.floor(seconds / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      setTodayBreak(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`)
    }
  }, [])

  return (
    <div className="flex flex-col gap-6">
      {/* Active Timer Widget */}
      <Card className="p-6 border-accent/30 shadow-[0_0_30px_rgba(255,45,120,0.05)] relative overflow-hidden cursor-pointer" onClick={() => navigate('/tracker')}>
        <div className="absolute top-0 left-0 w-1 h-full bg-accent shadow-[0_0_10px_rgba(255,45,120,0.8)]" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
              <Play className="w-8 h-8 text-accent" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-text-secondary font-medium uppercase tracking-wider">Today's Progress</span>
              <div className="flex items-center gap-4 mt-1">
                <div>
                  <span className="text-xs text-text-muted">Work</span>
                  <h2 className="text-2xl font-pixel text-text-primary">{todayHours}</h2>
                </div>
                <div>
                  <span className="text-xs text-text-muted">Break</span>
                  <h2 className="text-2xl font-pixel text-text-primary">{todayBreak}</h2>
                </div>
              </div>
            </div>
          </div>
          <Button variant="primary" className="w-full md:w-auto">
            Go to Time Tracker →
          </Button>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Today's Hours" value={todayHours} icon={Clock} trend={{ value: '2h', isPositive: true }} />
        <StatsCard title="Break Time" value={todayBreak} icon={Coffee} trend={{ value: '30m', isPositive: false }} />
        <StatsCard title="Active Projects" value="04" icon={Briefcase} />
        <StatsCard title="Billable Amount" value="$1,240" icon={DollarSign} trend={{ value: '$320', isPositive: true }} />
      </div>

      {/* Charts & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-text-primary">Weekly Overview</h3>
            <span className="text-sm text-text-muted">Hours logged</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#5A5A6A', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#5A5A6A', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#1A1A25' }} contentStyle={{ backgroundColor: '#12121A', border: '1px solid #2A2A35', borderRadius: '8px' }} itemStyle={{ color: '#FF2D78' }} />
                <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                  {weeklyData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.name === new Date().toLocaleDateString('en-US', { weekday: 'short' }) ? '#FF2D78' : '#2A2A35'} />))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-semibold text-text-primary">Quick Actions</h3>
          </div>
          <div className="flex flex-col gap-3">
            <Button onClick={() => navigate('/tracker')} leftIcon={<Play className="w-4 h-4" />} className="w-full">
              Start Time Tracking
            </Button>
            <Button variant="secondary" onClick={() => navigate('/projects')} leftIcon={<Briefcase className="w-4 h-4" />} className="w-full">
              View Projects
            </Button>
            <Button variant="ghost" onClick={() => navigate('/analytics')} leftIcon={<Activity className="w-4 h-4" />} className="w-full">
              View Analytics
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}