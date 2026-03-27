import { MessageSquare, FileText, Presentation, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PageLayout } from '@/components/layout/PageLayout'
import { Banner } from '@/components/home/Banner'
import { FeatureCard } from '@/components/home/FeatureCard'
import { CaseCard } from '@/components/home/CaseCard'
import { TestimonialCarousel } from '@/components/home/TestimonialCarousel'
import { useCaseStore } from '@/stores/caseStore'
import { useAuthStore } from '@/stores/authStore'
import { mockTestimonials } from '@/mock/testimonials'

const features = [
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'AI智能需求收集',
    description: '通过AI对话引导，智能收集需求信息，确保需求完整性和准确性。',
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: '一键生成文档',
    description: '自动生成标准化需求文档，支持Markdown格式，易于编辑和分享。',
  },
  {
    icon: <Presentation className="w-6 h-6" />,
    title: '多格式产出',
    description: '一键生成PPT演示文稿和交互原型，满足不同场景的汇报需求。',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: '开发协作闭环',
    description: '无缝对接开发团队，需求状态实时同步，交付进度一目了然。',
  },
]

export function HomePage() {
  const navigate = useNavigate()
  const { cases } = useCaseStore()
  const { isLoggedIn } = useAuthStore()
  const publishedCases = cases.filter(c => c.isPublished).slice(0, 6)
  
  const handleExperience = () => {
    if (isLoggedIn) {
      navigate('/collection')
    } else {
      navigate('/login?redirect=/collection')
    }
  }

  return (
    <PageLayout>
      <Banner />

      <section className="py-16 md:py-24 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">平台能力</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              需求工厂提供一站式需求管理解决方案，从需求收集到交付全流程覆盖
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">客户案例</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              来自各行各业的成功案例，展示需求工厂的实际应用效果
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {publishedCases.map((caseData) => (
              <CaseCard key={caseData.id} caseData={caseData} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">客户声音</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              听听使用需求工厂的客户怎么说
            </p>
          </div>

          <TestimonialCarousel testimonials={mockTestimonials} />
        </div>
      </section>

      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            准备好升级您的生产力了吗？
          </h2>
          <button
            onClick={handleExperience}
            className="px-8 py-3 bg-primary text-white text-base font-medium rounded-lg hover:bg-blue-600 transition-colors mb-4"
          >
            立即开始免费试用
          </button>
          <div className="mt-4">
            <button
              onClick={() => navigate('/cases')}
              className="text-gray-500 text-sm hover:text-gray-700 transition-colors inline-flex items-center"
            >
              或预约专家演示
              <span className="ml-1">→</span>
            </button>
          </div>
        </div>
      </section>

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