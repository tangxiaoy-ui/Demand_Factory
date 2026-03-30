import { Link, useNavigate, useLocation } from 'react-router-dom'
import { User, LogOut, FileText, Settings, Home } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '@/stores/authStore'

export function AdminNavbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isLoggedIn, logout, openLoginModal } = useAuthStore()
  const [showDropdown, setShowDropdown] = useState(false)

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const handleLogout = () => {
    logout()
    setShowDropdown(false)
    navigate('/')
  }

  const navLinkClass = (path: string) => {
    const baseClass = "relative px-1 py-2 text-sm font-medium transition-colors"
    const activeClass = isActive(path)
      ? "text-white"
      : "text-gray-300 hover:text-white"
    
    return `${baseClass} ${activeClass}`
  }

  return (
    <nav className="bg-[#333] border-b border-gray-700 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-6">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">需</span>
                </div>
                <span className="text-xl font-semibold text-white">需求工厂</span>
              </Link>

              <div className="hidden md:flex items-center space-x-6">
                <Link to="/" className={navLinkClass("/")}>
                  首页
                  {isActive("/") && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-7 h-0.5 bg-primary rounded-t"></span>
                  )}
                </Link>
                <Link to="/cases" className={navLinkClass("/cases")}>
                  精选案例
                  {isActive("/cases") && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-7 h-0.5 bg-primary rounded-t"></span>
                  )}
                </Link>
              </div>
            </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 text-gray-200 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-200" />
                  </div>
                  <span className="hidden md:block">{user.name}</span>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#444] rounded-lg shadow-lg border border-gray-600 py-1">
                    <button
                      onClick={() => {
                        navigate('/requirements')
                        setShowDropdown(false)
                      }}
                      className="w-full px-4 py-2 text-left text-gray-200 hover:bg-[#555] flex items-center space-x-2"
                    >
                      <FileText className="w-4 h-4" />
                      <span>我的需求</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate('/admin/overview')
                        setShowDropdown(false)
                      }}
                      className="w-full px-4 py-2 text-left text-gray-200 hover:bg-[#555] flex items-center space-x-2"
                    >
                      <Settings className="w-4 h-4" />
                      <span>后台管理</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate('/')
                        setShowDropdown(false)
                      }}
                      className="w-full px-4 py-2 text-left text-gray-200 hover:bg-[#555] flex items-center space-x-2"
                    >
                      <Home className="w-4 h-4" />
                      <span>返回前台</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-gray-200 hover:bg-[#555] flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>退出登录</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openLoginModal('/')}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                登录
              </button>
            )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
