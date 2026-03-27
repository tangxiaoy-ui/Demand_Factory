import { Layout, Bell, Calendar, CheckSquare, MessageSquare, Newspaper } from 'lucide-react'

interface PrototypePreviewProps {
  prototypeUrl?: string
}

export function PrototypePreview({ prototypeUrl }: PrototypePreviewProps) {
  if (!prototypeUrl) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Layout className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">原型尚未生成</p>
          <p className="text-sm text-gray-400">点击上方"生成原型"按钮开始生成</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-gray-100 overflow-y-auto hover-scroll">
      <div className="min-h-full">
        <nav className="bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">中</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold">中国中药统一门户</h1>
                  <p className="text-xs text-white/80">信息触达 · 日程办公</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Bell className="w-5 h-5 cursor-pointer hover:text-white/80" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">员</span>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 pb-3">
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-white/80 font-medium">首页</a>
              <a href="#" className="hover:text-white/80">新闻</a>
              <a href="#" className="hover:text-white/80">公告</a>
              <a href="#" className="hover:text-white/80">日程</a>
              <a href="#" className="hover:text-white/80">待办</a>
              <a href="#" className="hover:text-white/80">论坛</a>
            </div>
          </div>
        </nav>

        <div className="p-6">
          <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto">
            <div className="col-span-8 space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Newspaper className="w-5 h-5 mr-2 text-primary" />
                    新闻动态
                  </h2>
                  <a href="#" className="text-sm text-primary hover:underline">查看更多</a>
                </div>
                <div className="space-y-3">
                  {[
                    { title: '公司数字化转型项目正式启动', date: '2025-03-20', hot: true },
                    { title: '2025年度工作会议圆满召开', date: '2025-03-18', hot: true },
                    { title: '新办公系统上线通知', date: '2025-03-15', hot: false }
                  ].map((news, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        <span className="text-gray-800 hover:text-primary cursor-pointer">{news.title}</span>
                        {news.hot && <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded">热门</span>}
                      </div>
                      <span className="text-sm text-gray-400">{news.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                    公告通知
                  </h2>
                  <a href="#" className="text-sm text-primary hover:underline">查看更多</a>
                </div>
                <div className="space-y-3">
                  {[
                    { title: '关于清明节放假安排的通知', type: '通知', date: '2025-03-25' },
                    { title: '系统维护公告', type: '公告', date: '2025-03-24' },
                    { title: '新员工培训安排', type: '通知', date: '2025-03-22' }
                  ].map((notice, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        <span className="text-gray-800 hover:text-primary cursor-pointer">{notice.title}</span>
                        <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded">{notice.type}</span>
                      </div>
                      <span className="text-sm text-gray-400">{notice.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-4 space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-primary" />
                  今日日程
                </h2>
                <div className="space-y-3">
                  {[
                    { time: '09:00', title: '部门例会', location: '会议室A' },
                    { time: '14:00', title: '项目评审', location: '会议室B' },
                    { time: '16:00', title: '客户沟通', location: '线上会议' }
                  ].map((schedule, i) => (
                    <div key={i} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-primary font-medium text-sm">{schedule.time}</div>
                      <div className="flex-1">
                        <div className="text-gray-800 text-sm font-medium">{schedule.title}</div>
                        <div className="text-gray-500 text-xs">{schedule.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckSquare className="w-5 h-5 mr-2 text-primary" />
                  待办事项
                </h2>
                <div className="space-y-3">
                  {[
                    { title: '提交项目周报', urgent: true },
                    { title: '审核新员工入职资料', urgent: false },
                    { title: '参加培训课程', urgent: false }
                  ].map((todo, i) => (
                    <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <input type="checkbox" className="w-4 h-4 text-primary rounded" />
                      <span className="flex-1 text-sm text-gray-700">{todo.title}</span>
                      {todo.urgent && <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded">紧急</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}