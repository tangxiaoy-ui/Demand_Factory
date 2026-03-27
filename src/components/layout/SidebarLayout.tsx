import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutGrid, FileText, Settings, Star } from 'lucide-react'
import { AdminNavbar } from './AdminNavbar'

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
    label: '案例管理',
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
      <AdminNavbar />
      <div className="flex">
        <aside className="w-64 bg-[#3B5BDB] border-r border-gray-200 flex-shrink-0 min-h-[calc(100vh-64px)]">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = activePath === item.path || activePath.startsWith(item.path + '/')
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white font-medium'
                      : 'text-white/80 hover:bg-white/10'
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
