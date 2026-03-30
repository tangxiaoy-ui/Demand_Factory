import { useNavigate } from 'react-router-dom'
import { PageLayout } from '@/components/layout/PageLayout'
import { useAuthStore } from '@/stores/authStore'
import { TestimonialCarousel } from '@/components/home/TestimonialCarousel'
import { mockTestimonials } from '@/mock/testimonials'
import { Bot, FileText, Zap, ArrowRight } from 'lucide-react'

export function HomePage() {
  const navigate = useNavigate()
  const { isLoggedIn, openLoginModal } = useAuthStore()

  const handleExperience = () => {
    if (isLoggedIn) {
      navigate('/collection')
    } else {
      openLoginModal('/collection')
    }
  }

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-white py-[46px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="text-sm font-medium text-primary">NEXT-GEN REQUIREMENT ENGINEERING</span>
              </div>
              
              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  大模型驱动的
                </h1>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
                  需求工程自动化平台
                </h1>
              </div>
              
              <p className="text-base text-gray-600 max-w-xl leading-relaxed">
                告别繁琐的需求沟通。AI引导式澄清，自动生成专业PRD文档与高保真原型，让您的想法直接转化为可执行的产品方案。
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleExperience}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-base font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                >
                  立即开始体验
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate('/cases')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 text-base font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  查看案例
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 0.8 }} />
                      <stop offset="100%" style={{ stopColor: '#a78bfa', stopOpacity: 0.6 }} />
                    </linearGradient>
                    <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#f472b6', stopOpacity: 0.7 }} />
                      <stop offset="100%" style={{ stopColor: '#fb7185', stopOpacity: 0.5 }} />
                    </linearGradient>
                  </defs>
                  <polygon points="50,100 150,50 200,150 100,200" fill="url(#grad1)" opacity="0.8" />
                  <polygon points="200,50 350,100 300,200 150,150" fill="url(#grad2)" opacity="0.7" />
                  <polygon points="100,200 250,180 300,300 150,320" fill="url(#grad1)" opacity="0.6" />
                  <polygon points="250,180 380,150 350,280 300,300" fill="url(#grad2)" opacity="0.5" />
                  <polygon points="50,250 150,220 200,350 100,380" fill="url(#grad1)" opacity="0.7" />
                  <polygon points="200,350 320,320 350,380 250,400" fill="url(#grad2)" opacity="0.6" />
                  <circle cx="320" cy="80" r="40" fill="rgba(255,255,255,0.2)" />
                  <circle cx="80" cy="320" r="30" fill="rgba(255,255,255,0.15)" />
                  <ellipse cx="200" cy="200" rx="60" ry="40" fill="rgba(255,255,255,0.1)" transform="rotate(30 200 200)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#F4F2FE] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">重新定义需求流转效率</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              基于深度学习的大语言模型，我们打造了闭环的智能需求工作流。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI智能引导</h3>
              <p className="text-gray-600 leading-relaxed">
                不再需要填写复杂的表格。AI通过对话式访谈，精准捕捉用户场景与核心痛点，自动识别逻辑漏洞。
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">自动化生成</h3>
              <p className="text-gray-600 leading-relaxed">
                一键生成标准PRD、User Story、流程图及交互原型。格式严格遵循行业标准，输出即为成品。
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">快速交付</h3>
              <p className="text-gray-600 leading-relaxed">
                缩短产品开发前置时间达70%。支持导出为Markdown、PDF或同步至Jira、飞书等主流协作工具。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-[#FBF8FF] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">全流程透明协作</h2>
              <p className="text-gray-600">
                从灵感闪现到方案落地，每一步都有迹可循，让团队协作从未如此简单。
              </p>
            </div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-primary rounded-full"></span>
                <span className="text-sm font-medium text-gray-700">COMPLETED</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 border-2 border-gray-400 rounded-full"></span>
                <span className="text-sm font-medium text-gray-700">IN PROGRESS</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gray-200">
              <div className="absolute left-0 top-0 h-full w-1/4 bg-primary"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="relative">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">提交想法</h3>
                <p className="text-gray-600 text-sm">
                  输入一句话原始需求或上传会议纪要录音。
                </p>
              </div>

              <div className="relative">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI澄清</h3>
                <p className="text-gray-600 text-sm">
                  智能引擎主动提问，补充边界条件与技术约束。
                </p>
              </div>

              <div className="relative">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">生成文档</h3>
                <p className="text-gray-600 text-sm">
                  秒级输出全套产品文档与高保真交互蓝图。
                </p>
              </div>

              <div className="relative">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">交付成果</h3>
                <p className="text-gray-600 text-sm">
                  团队评审并确认，直接推送至研发待办清单。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#F4F2FE] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">客户声音</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">来自 5,000+ 产品团队的真实反馈</p>
          </div>

          <TestimonialCarousel testimonials={mockTestimonials} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                准备好将生产力<br />
                提升一个数量级了吗？
              </h2>
              <p className="text-blue-100 text-lg">
                加入 5,000+ 领先产品团队，立即开启您的智能研发之旅。
              </p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <button
                onClick={handleExperience}
                className="px-8 py-4 bg-white text-primary text-base font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                立即体验
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">需</span>
              </div>
              <span className="text-xl font-semibold">需求工厂</span>
            </div>
            
            <div className="flex items-center gap-8 mt-6 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                官网
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                客户空间
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                产品Demo
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                关于我们
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8">
            <p className="text-gray-400 text-sm text-center">
              © 2024 需求工厂. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </PageLayout>
  )
}
