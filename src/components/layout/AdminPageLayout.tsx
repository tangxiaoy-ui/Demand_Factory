import type { ReactNode } from 'react'
import { AdminNavbar } from './AdminNavbar'

interface AdminPageLayoutProps {
  children: ReactNode
  showNavbar?: boolean
  className?: string
}

export function AdminPageLayout({ children, showNavbar = true, className = '' }: AdminPageLayoutProps) {
  return (
    <div className="min-h-screen bg-bg-light">
      {showNavbar && <AdminNavbar />}
      <main className={className}>{children}</main>
    </div>
  )
}
