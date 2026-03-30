import { SidebarLayout } from '@/components/layout/SidebarLayout'
import { Card } from '@/components/common/Card'
import { useRequirementStore } from '@/stores/requirementStore'
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from 'recharts'

const STATUS_COLORS = {
  draft: '#94a3b8',
  confirmed: '#3b82f6',
  submitted: '#8b5cf6',
  developing: '#f97316',
  completed: '#22c55e',
  rejected: '#ef4444',
}

const TYPE_COLORS = {
  web: '#3b82f6',
  mobile: '#8b5cf6',
  desktop: '#06b6d4',
  system: '#f97316',
  platform: '#22c55e',
  other: '#94a3b8',
}

const TYPE_LABELS = {
  web: 'Web应用',
  mobile: '移动应用',
  desktop: '桌面应用',
  system: '管理系统',
  platform: '平台型',
  other: '其他',
}

const INDUSTRY_COLORS = {
  finance: '#3b82f6',
  education: '#22c55e',
  logistics: '#f97316',
  retail: '#ec4899',
  healthcare: '#06b6d4',
  manufacturing: '#8b5cf6',
  government: '#ef4444',
  internet: '#14b8a6',
  other: '#94a3b8',
}

const INDUSTRY_LABELS = {
  finance: '金融',
  education: '教育',
  logistics: '物流',
  retail: '零售',
  healthcare: '医疗',
  manufacturing: '制造',
  government: '政府',
  internet: '互联网',
  other: '其他',
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

  const typeDistribution = [
    { name: TYPE_LABELS.web, value: requirements.filter(r => r.type === 'web').length, color: TYPE_COLORS.web },
    { name: TYPE_LABELS.mobile, value: requirements.filter(r => r.type === 'mobile').length, color: TYPE_COLORS.mobile },
    { name: TYPE_LABELS.desktop, value: requirements.filter(r => r.type === 'desktop').length, color: TYPE_COLORS.desktop },
    { name: TYPE_LABELS.system, value: requirements.filter(r => r.type === 'system').length, color: TYPE_COLORS.system },
    { name: TYPE_LABELS.platform, value: requirements.filter(r => r.type === 'platform').length, color: TYPE_COLORS.platform },
    { name: TYPE_LABELS.other, value: requirements.filter(r => r.type === 'other').length, color: TYPE_COLORS.other },
  ].filter(item => item.value > 0)

  const industryDistribution = [
    { name: INDUSTRY_LABELS.finance, value: requirements.filter(r => r.industry === 'finance').length, color: INDUSTRY_COLORS.finance },
    { name: INDUSTRY_LABELS.education, value: requirements.filter(r => r.industry === 'education').length, color: INDUSTRY_COLORS.education },
    { name: INDUSTRY_LABELS.logistics, value: requirements.filter(r => r.industry === 'logistics').length, color: INDUSTRY_COLORS.logistics },
    { name: INDUSTRY_LABELS.retail, value: requirements.filter(r => r.industry === 'retail').length, color: INDUSTRY_COLORS.retail },
    { name: INDUSTRY_LABELS.healthcare, value: requirements.filter(r => r.industry === 'healthcare').length, color: INDUSTRY_COLORS.healthcare },
    { name: INDUSTRY_LABELS.manufacturing, value: requirements.filter(r => r.industry === 'manufacturing').length, color: INDUSTRY_COLORS.manufacturing },
    { name: INDUSTRY_LABELS.government, value: requirements.filter(r => r.industry === 'government').length, color: INDUSTRY_COLORS.government },
    { name: INDUSTRY_LABELS.internet, value: requirements.filter(r => r.industry === 'internet').length, color: INDUSTRY_COLORS.internet },
    { name: INDUSTRY_LABELS.other, value: requirements.filter(r => r.industry === 'other').length, color: INDUSTRY_COLORS.other },
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">需求类型分布</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={typeDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  angle={0}
                  textAnchor="middle"
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6">
                  {typeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">行业分布</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={industryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => percent && percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {industryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
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
