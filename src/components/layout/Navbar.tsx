import { Link, useNavigate } from 'react-router-dom'
import { User, LogOut, FileText, Settings } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '@/stores/authStore'

export function Navbar() {
  const navigate = useNavigate()
  const { user, isLoggedIn, logout } = useAuthStore()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogout = () => {
    logout()
    setShowDropdown(false)
    navigate('/')
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">需</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">需求工厂</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              首页
            </Link>
            <Link
              to="/cases"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              案例展示
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="hidden md:block">{user.name}</span>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
                    <button
                      onClick={() => {
                        navigate('/requirements')
                        setShowDropdown(false)
                      }}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <FileText className="w-4 h-4" />
                      <span>我的需求</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate('/admin/overview')
                        setShowDropdown(false)
                      }}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <Settings className="w-4 h-4" />
                      <span>后台管理</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>退出登录</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                登录
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}