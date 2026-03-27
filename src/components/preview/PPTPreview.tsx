import { FileText } from 'lucide-react'

interface PPTPreviewProps {
  pptUrl?: string
}

const mockSlides = [
  {
    title: '项目概述',
    content: '企业车辆管理系统',
    subtitle: '智能调度 · 实时监控 · 高效管理'
  },
  {
    title: '核心功能',
    items: ['车辆档案管理', '司机信息管理', '调度派车管理', 'GPS实时监控', '维修保养管理', '违章事故管理', '费用统计管理']
  },
  {
    title: '目标用户',
    content: '物流企业车队管理员 · 企业行政管理人员 · 调度中心操作员 · 司机及用车人员'
  },
  {
    title: '技术架构',
    items: ['前端：React + TypeScript', '后端：Node.js / Java Spring Boot', '数据库：PostgreSQL / MySQL', '地图服务：高德/百度地图', 'GPS设备：北斗/GPS双模定位', '移动端：iOS/Android司机端APP']
  }
]

export function PPTPreview({ pptUrl }: PPTPreviewProps) {
  if (!pptUrl) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">PPT尚未生成</p>
          <p className="text-sm text-gray-400">点击上方"生成PPT"按钮开始生成</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-gray-100">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
          {mockSlides.map((slide, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-8 aspect-video flex flex-col justify-center"
            >
              <div className="border-2 border-primary text-primary text-xs font-medium px-3 py-1 rounded-full w-fit mb-4">
                页面 {index + 1}
              </div>
              {slide.title && (
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{slide.title}</h2>
              )}
              {slide.subtitle && (
                <p className="text-lg text-gray-600 mb-4">{slide.subtitle}</p>
              )}
              {slide.content && (
                <p className="text-xl text-gray-700 font-medium">{slide.content}</p>
              )}
              {slide.items && (
                <ul className="space-y-2">
                  {slide.items.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}