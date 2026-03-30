import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { useAuthStore } from '@/stores/authStore'

const banners = [
  {
    id: 1,
    title: '需求工厂',
    subtitle: '智能生成需求文档与原型',
    description: 'AI驱动的需求管理平台，让需求梳理变得简单高效',
    bgColor: 'bg-gradient-to-r from-primary to-blue-600',
  },
  {
    id: 2,
    title: '从需求到交付',
    subtitle: '一站式协作平台',
    description: '需求收集、文档生成、原型设计、开发协作全流程覆盖',
    bgColor: 'bg-gradient-to-r from-secondary to-gray-700',
  },
]

export function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()
  const { isLoggedIn } = useAuthStore()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleExperience = () => {
    if (isLoggedIn) {
      navigate('/collection')
    } else {
      const store = useAuthStore.getState()
      store.openLoginModal('/collection')
    }
  }

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className={`min-w-full ${banner.bgColor} text-white py-20 md:py-32`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{banner.title}</h1>
              <p className="text-xl md:text-2xl mb-4 opacity-90">{banner.subtitle}</p>
              <p className="text-base md:text-lg mb-8 opacity-80">{banner.description}</p>
              <Button
                variant="outline"
                size="lg"
                className="bg-white hover:bg-gray-100"
                onClick={handleExperience}
              >
                立即体验
              </Button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % banners.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}