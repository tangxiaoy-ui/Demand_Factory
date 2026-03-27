import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { QrCode, Smartphone } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { useAuthStore } from '@/stores/authStore'

type LoginTab = 'wechat' | 'mobile'

export function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login } = useAuthStore()
  const [activeTab, setActiveTab] = useState<LoginTab>('wechat')
  const [mobile, setMobile] = useState('')
  const [code, setCode] = useState('')
  const [countdown, setCountdown] = useState(0)

  const redirectPath = searchParams.get('redirect') || '/'

  const handleWechatLogin = () => {
    login({
      id: 'user1',
      name: '测试用户',
      role: 'user',
    })
    navigate(redirectPath)
  }

  const handleMobileLogin = () => {
    if (mobile && code) {
      login({
        id: 'user1',
        name: '测试用户',
        mobile,
        role: 'user',
      })
      navigate(redirectPath)
    }
  }

  const handleGetCode = () => {
    if (mobile && countdown === 0) {
      setCountdown(60)
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-primary to-blue-700 items-center justify-center p-12">
        <div className="text-center text-white">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <span className="text-4xl font-bold">需</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">需求工厂</h1>
          <p className="text-xl opacity-90 mb-2">智能生成需求文档与原型</p>
          <p className="text-lg opacity-70">从需求到交付，一站式协作平台</p>
        </div>
      </div>

      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="lg:hidden w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">需</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">欢迎登录</h2>
            <p className="text-gray-500 mt-2">登录后开始使用需求工厂</p>
          </div>

          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('wechat')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 border-b-2 transition-colors ${
                activeTab === 'wechat'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <QrCode className="w-5 h-5" />
              <span>微信扫码登录</span>
            </button>
            <button
              onClick={() => setActiveTab('mobile')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 border-b-2 transition-colors ${
                activeTab === 'mobile'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Smartphone className="w-5 h-5" />
              <span>手机号登录</span>
            </button>
          </div>

          {activeTab === 'wechat' ? (
            <div className="text-center">
              <div className="w-48 h-48 bg-gray-100 rounded-xl mx-auto mb-6 flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">微信扫码登录</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-6">请使用微信扫描二维码登录</p>
              <Button className="w-full" onClick={handleWechatLogin}>
                测试帐号（演示用）
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                label="手机号"
                type="tel"
                placeholder="请输入手机号"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <div className="flex space-x-3">
                <div className="flex-1">
                  <Input
                    label="验证码"
                    type="text"
                    placeholder="请输入验证码"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleGetCode}
                  disabled={countdown > 0 || !mobile}
                  className="mt-6 px-4 py-2 text-primary border border-primary rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {countdown > 0 ? `${countdown}s` : '获取验证码'}
                </button>
              </div>
              <Button className="w-full mt-6" onClick={handleMobileLogin}>
                登录
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}