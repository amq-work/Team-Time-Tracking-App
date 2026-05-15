import React from 'react'
import { Card } from './Card'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string
  icon: LucideIcon
  trend?: { value: string; isPositive: boolean }
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, trend }) => {
  return (
    <Card className="p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text-secondary">{title}</span>
        <div className="w-8 h-8 rounded-lg bg-surface-light flex items-center justify-center">
          <Icon className="w-4 h-4 text-accent" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className="font-pixel text-xl text-text-primary tracking-tighter">{value}</span>
        {trend && (
          <span className={`text-xs font-medium ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {trend.isPositive ? '+' : '-'}{trend.value}
          </span>
        )}
      </div>
    </Card>
  )
}