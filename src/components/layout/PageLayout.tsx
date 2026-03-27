import type { ReactNode } from 'react'
import { Navbar } from './Navbar'

interface PageLayoutProps {
  children: ReactNode
  showNavbar?: boolean
  className?: string
}

export function PageLayout({ children, showNavbar = true, className = '' }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-bg-light">
      {showNavbar && <Navbar />}
      <main className={className}>{children}</main>
    </div>
  )
}