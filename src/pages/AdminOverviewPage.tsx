import { SidebarLayout } from '@/components/layout/SidebarLayout'
import { Card } from '@/components/common/Card'
import { useRequirementStore } from '@/stores/requirementStore'
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'

const STATUS_COLORS = {
  draft: '#94a3b8',
  confirmed: '#3b82f6',
  submitted: '#8b5cf6',
  developing: '#f97316',
  completed: '#22c55e',
  rejected: '#ef4444',
}

export function AdminOverviewPage() {
  const { requirements } = useRequirementStore()

  const stats = {
    total: requirements.length,
    submitted: requirements.filter(r => r.status === 'submitted').length,
    developing: requirements.filter(r => r.status === 'developing').length,
    completed: requirements.filter(r => r.status === 'completed').length,
  }

  const statusDistribution = [
    { name: '草稿', value: requirements.filter(r => r.status === 'draft').length, color: STATUS_COLORS.draft },
    { name: '已确认', value: requirements.filter(r => r.status === 'confirmed').length, color: STATUS_COLORS.confirmed },
    { name: '已提交', value: requirements.filter(r => r.status === 'submitted').length, color: STATUS_COLORS.submitted },
    { name: '开发中', value: requirements.filter(r => r.status === 'developing').length, color: STATUS_COLORS.developing },
    { name: '已完成', value: stats.completed, color: STATUS_COLORS.completed },
    { name: '已拒绝', value: requirements.filter(r => r.status === 'rejected').length, color: STATUS_COLORS.rejected },
  ].filter(item => item.value > 0)

  const getLast30DaysData = () => {
    const today = new Date()
    const data = []
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      
      const count = requirements.filter(r => {
        const reqDate = new Date(r.createdAt).toISOString().split('T')[0]
        return reqDate === dateStr
      }).length
      
      data.push({
        date: `${date.getMonth() + 1}/${date.getDate()}`,
        count,
      })
    }
    
    return data
  }

  const trendData = getLast30DaysData()

  const recentRequirements = [...requirements]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <SidebarLayout>
      <div className="px-6 py-6">
        <div className="w-[1200px] mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">概览</h1>
            <p className="text-gray-600 mt-1">查看平台整体运营情况</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">总需求数</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">待审需求</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.submitted}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">开发中需求</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.developing}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">已完成</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">需求状态分布</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">近30天需求生成趋势</h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#1A40C2" 
                  strokeWidth={2}
                  dot={{ fill: '#1A40C2', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">最近需求</h2>
          <div className="space-y-3">
            {recentRequirements.map((req) => (
              <div
                key={req.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div>
                  <p className="font-medium text-gray-900">{req.name}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {req.customer} · {req.submitter}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(req.createdAt).toLocaleDateString('zh-CN')}
                </div>
              </div>
            ))}
          </div>
        </Card>
        </div>
      </div>
    </SidebarLayout>
  )
}
