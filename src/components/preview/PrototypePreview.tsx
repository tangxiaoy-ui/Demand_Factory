import { Layout, Bell, Calendar, Car, MapPin, Wrench, AlertTriangle, Users } from 'lucide-react'

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
        <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">车辆管理系统</h1>
                  <p className="text-xs text-white/80">智能调度 · 高效管理</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Bell className="w-5 h-5 cursor-pointer hover:text-white/80" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">管</span>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 pb-3">
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-white/80 font-medium">首页</a>
              <a href="#" className="hover:text-white/80">车辆管理</a>
              <a href="#" className="hover:text-white/80">调度派车</a>
              <a href="#" className="hover:text-white/80">GPS监控</a>
              <a href="#" className="hover:text-white/80">维修保养</a>
              <a href="#" className="hover:text-white/80">费用统计</a>
            </div>
          </div>
        </nav>

        <div className="p-6">
          <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto">
            <div className="col-span-8 space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Car className="w-5 h-5 mr-2 text-blue-600" />
                    车辆概况
                  </h2>
                  <a href="#" className="text-sm text-blue-600 hover:underline">查看全部</a>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">200</div>
                    <div className="text-xs text-gray-600 mt-1">总车辆</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">156</div>
                    <div className="text-xs text-gray-600 mt-1">在用</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">32</div>
                    <div className="text-xs text-gray-600 mt-1">空闲</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">12</div>
                    <div className="text-xs text-gray-600 mt-1">维修中</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { plate: '京A·12345', type: '货车', status: '在用', driver: '张师傅', location: '朝阳区配送中' },
                    { plate: '京B·67890', type: '面包车', status: '空闲', driver: '-', location: '公司停车场' },
                    { plate: '京C·24680', type: '轿车', status: '在用', driver: '李师傅', location: '海淀区客户处' }
                  ].map((vehicle, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        <div>
                          <div className="text-gray-800 font-medium">{vehicle.plate}</div>
                          <div className="text-xs text-gray-500">{vehicle.type} · {vehicle.driver}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-0.5 text-xs rounded ${
                            vehicle.status === '在用' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                          }`}>{vehicle.status}</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {vehicle.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                    待处理提醒
                  </h2>
                  <a href="#" className="text-sm text-blue-600 hover:underline">查看更多</a>
                </div>
                <div className="space-y-3">
                  {[
                    { title: '5辆车年检即将到期', type: '年检', date: '2025-03-28', urgent: true },
                    { title: '3辆车保险续费提醒', type: '保险', date: '2025-03-26', urgent: true },
                    { title: '8辆车需定期保养', type: '保养', date: '2025-03-30', urgent: false }
                  ].map((alert, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        <span className="text-gray-800 hover:text-blue-600 cursor-pointer">{alert.title}</span>
                        <span className={`px-2 py-0.5 text-xs rounded ${
                          alert.type === '年检' ? 'bg-red-100 text-red-600' : 
                          alert.type === '保险' ? 'bg-blue-100 text-blue-600' : 
                          'bg-green-100 text-green-600'
                        }`}>{alert.type}</span>
                      </div>
                      <span className="text-sm text-gray-400">{alert.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-4 space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  今日派车
                </h2>
                <div className="space-y-3">
                  {[
                    { time: '08:30', plate: '京A·12345', route: '公司→大兴仓库', driver: '张师傅' },
                    { time: '10:00', plate: '京C·24680', route: '公司→海淀客户', driver: '李师傅' },
                    { time: '14:00', plate: '京A·54321', route: '通州→公司', driver: '王师傅' }
                  ].map((task, i) => (
                    <div key={i} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-blue-600 font-medium text-sm">{task.time}</div>
                      <div className="flex-1">
                        <div className="text-gray-800 text-sm font-medium">{task.plate}</div>
                        <div className="text-gray-500 text-xs">{task.route}</div>
                        <div className="text-gray-400 text-xs mt-1">{task.driver}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Wrench className="w-5 h-5 mr-2 text-blue-600" />
                  维修保养
                </h2>
                <div className="space-y-3">
                  {[
                    { plate: '京B·98765', type: '定期保养', status: '进行中', days: 2 },
                    { plate: '京A·11111', type: '发动机维修', status: '待处理', days: 1 },
                    { plate: '京C·22222', type: '轮胎更换', status: '已完成', days: 0 }
                  ].map((maintenance, i) => (
                    <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Car className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <div className="text-gray-800 text-sm font-medium">{maintenance.plate}</div>
                        <div className="text-gray-500 text-xs">{maintenance.type}</div>
                      </div>
                      <span className={`px-2 py-0.5 text-xs rounded ${
                        maintenance.status === '进行中' ? 'bg-blue-100 text-blue-600' : 
                        maintenance.status === '待处理' ? 'bg-orange-100 text-orange-600' : 
                        'bg-green-100 text-green-600'
                      }`}>{maintenance.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  司机状态
                </h2>
                <div className="space-y-3">
                  {[
                    { name: '张师傅', status: '在途', plate: '京A·12345', phone: '138****1234' },
                    { name: '李师傅', status: '空闲', plate: '-', phone: '139****5678' },
                    { name: '王师傅', status: '休息', plate: '-', phone: '137****9012' }
                  ].map((driver, i) => (
                    <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600">{driver.name[0]}</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-800 text-sm font-medium">{driver.name}</div>
                        <div className="text-gray-500 text-xs">{driver.plate || '无派车'}</div>
                      </div>
                      <span className={`px-2 py-0.5 text-xs rounded ${
                        driver.status === '在途' ? 'bg-green-100 text-green-600' : 
                        driver.status === '空闲' ? 'bg-blue-100 text-blue-600' : 
                        'bg-gray-100 text-gray-600'
                      }`}>{driver.status}</span>
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