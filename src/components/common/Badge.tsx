import type { ReactNode } from 'react'
import type { RequirementStatus } from '@/types'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
  className?: string
}

const variants = {
  default: 'bg-gray-100 text-gray-700',
  primary: 'bg-blue-100 text-blue-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-orange-100 text-orange-700',
  error: 'bg-red-100 text-red-700',
  info: 'bg-purple-100 text-purple-700',
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

const statusVariants: Record<RequirementStatus, BadgeProps['variant']> = {
  draft: 'default',
  confirmed: 'primary',
  submitted: 'warning',
  developing: 'info',
  completed: 'success',
  rejected: 'error',
}

const statusLabels: Record<RequirementStatus, string> = {
  draft: '草稿',
  confirmed: '已确认',
  submitted: '已提交开发',
  developing: '开发中',
  completed: '已完成',
  rejected: '已拒绝',
}

export function StatusBadge({ status }: { status: RequirementStatus }) {
  return (
    <Badge variant={statusVariants[status]}>
      {statusLabels[status]}
    </Badge>
  )
}