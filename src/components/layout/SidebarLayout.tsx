import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutGrid, FileText, Settings, Star } from 'lucide-react'
import { Navbar } from './Navbar'

interface SidebarLayoutProps {
  children: ReactNode
}

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  path: string
}

const navItems: NavItem[] = [
  {
    id: 'overview',
    label: '概览',
    icon: <LayoutGrid className="w-5 h-5" />,
    path: '/admin/overview',
  },
  {
    id: 'requirements',
    label: '需求管理',
    icon: <FileText className="w-5 h-5" />,
    path: '/admin/requirements',
  },
  {
    id: 'cases',
    label: '案例展示',
    icon: <Star className="w-5 h-5" />,
    path: '/admin/cases',
  },
  {
    id: 'settings',
    label: '全局配置',
    icon: <Settings className="w-5 h-5" />,
    path: '/admin/settings',
  },
]

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const location = useLocation()
  const activePath = location.pathname

  return (
    <div className="min-h-screen bg-bg-light">
      <Navbar />
      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 min-h-[calc(100vh-64px)]">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = activePath === item.path || activePath.startsWith(item.path + '/')
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-primary font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
