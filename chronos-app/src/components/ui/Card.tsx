import React from 'react'

interface CardProps {
  className?: string
  hoverable?: boolean
  children?: React.ReactNode
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({
  className = '',
  hoverable = false,
  children,
  onClick,
}) => {
  return (
    <div
      className={`bg-surface border border-border rounded-xl overflow-hidden ${hoverable ? 'hover:border-accent/50 transition-colors cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}