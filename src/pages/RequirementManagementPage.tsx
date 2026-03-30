import { useNavigate } from 'react-router-dom'
import { Building2 } from 'lucide-react'
import { useState } from 'react'
import { SidebarLayout } from '@/components/layout/SidebarLayout'
import { Card } from '@/components/common/Card'
import { StatusBadge } from '@/components/common/Badge'
import { SearchFilterBar } from '@/components/common/SearchFilterBar'
import { StatusTabs } from '@/components/common/StatusTabs'
import { RejectReasonModal } from '@/components/requirement/RejectReasonModal'
import { useRequirementStore } from '@/stores/requirementStore'
import type { Requirement, RequirementStatus } from '@/types'

const statusOptions: { value: RequirementStatus | 'all'; label: string }[] = [
  { value: 'all', label: '全部状态' },
  { value: 'draft', label: '草稿' },
  { value: 'confirmed', label: '已确认' },
  { value: 'submitted', label: '待审核' },
  { value: 'developing', label: '开发中' },
  { value: 'completed', label: '已完成' },
  { value: 'rejected', label: '已拒绝' },
]

export function RequirementManagementPage() {
  const navigate = useNavigate()
  const { requirements, deleteRequirement, updateRequirement } = useRequirementStore()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<RequirementStatus | 'all'>('all')
  const [customerFilter, setCustomerFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [rejectingReqId, setRejectingReqId] = useState<string | null>(null)

  const uniqueCustomers = Array.from(new Set(requirements.map((req) => req.customer).filter(Boolean)))

  const statusTabs = [
    { value: 'all' as const, label: '全部', count: requirements.length },
    { value: 'submitted' as const, label: '待审核', count: requirements.filter(r => r.status === 'submitted').length },
    { value: 'developing' as const, label: '开发中', count: requirements.filter(r => r.status === 'developing').length },
    { value: 'completed' as const, label: '已完成', count: requirements.filter(r => r.status === 'completed').length },
  ]

  const filteredRequirements = requirements
    .filter((req) => {
      const matchesSearch = req.name.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || req.status === statusFilter
      const matchesCustomer = customerFilter === 'all' || req.customer === customerFilter
      return matchesSearch && matchesStatus && matchesCustomer
    })
    .sort((a, b) => {
      if (a.status === 'draft' && b.status !== 'draft') return 1
      if (a.status !== 'draft' && b.status === 'draft') return -1
      return 0
    })

  const handleRowClick = (id: string) => {
    navigate(`/requirements/${id}`)
  }

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('确定要删除这个需求吗？')) {
      deleteRequirement(id)
    }
  }

  const handleEdit = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/requirements/${id}/edit`)
  }

  const handleAccept = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    updateRequirement(id, { status: 'developing' })
  }

  const handleReject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setRejectingReqId(id)
    setIsRejectModalOpen(true)
  }

  const handleRejectConfirm = (reason: string) => {
    if (rejectingReqId) {
      updateRequirement(rejectingReqId, { 
        status: 'rejected',
        rejectionReason: reason 
      })
      setRejectingReqId(null)
    }
  }

  const handleSubmit = (_id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    alert('提交开发功能待实现')
  }

  const handleDownload = (_id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    alert('下载功能待实现')
  }

  const renderActionButtons = (req: Requirement) => {
    const buttons = []

    switch (req.status) {
      case 'draft':
        buttons.push(
          <button
            key="edit"
            onClick={(e) => handleEdit(req.id, e)}
            className="text-primary text-sm mr-3"
          >
            编辑
          </button>
        )
        buttons.push(
          <button
            key="delete"
            onClick={(e) => handleDelete(req.id, e)}
            className="text-primary text-sm"
          >
            删除
          </button>
        )
        break
      case 'confirmed':
      case 'rejected':
        buttons.push(
          <button
            key="edit"
            onClick={(e) => handleEdit(req.id, e)}
            className="text-primary text-sm mr-3"
          >
            编辑
          </button>
        )
        buttons.push(
          <button
            key="submit"
            onClick={(e) => handleSubmit(req.id, e)}
            className="text-primary text-sm mr-3"
          >
            提交开发
          </button>
        )
        buttons.push(
          <button
            key="download"
            onClick={(e) => handleDownload(req.id, e)}
            className="text-primary text-sm"
          >
            下载
          </button>
        )
        break
      case 'submitted':
        buttons.push(
          <button
            key="accept"
            onClick={(e) => handleAccept(req.id, e)}
            className="text-primary text-sm mr-3"
          >
            采纳
          </button>
        )
        buttons.push(
          <button
            key="reject"
            onClick={(e) => handleReject(req.id, e)}
            className="text-primary text-sm"
          >
            拒绝
          </button>
        )
        break
      case 'developing':
        buttons.push(
          <button
            key="forceComplete"
            onClick={(e) => {
              e.stopPropagation()
              alert('强制完成功能待实现')
            }}
            className="text-primary text-sm mr-3"
          >
            强制完成
          </button>
        )
        buttons.push(
          <button
            key="changeStatus"
            onClick={(e) => {
              e.stopPropagation()
              alert('修改状态功能待实现')
            }}
            className="text-primary text-sm"
          >
            修改状态
          </button>
        )
        break
      case 'completed':
        buttons.push(
          <button
            key="download"
            onClick={(e) => handleDownload(req.id, e)}
            className="text-primary text-sm mr-3"
          >
            下载
          </button>
        )
        buttons.push(
          <button
            key="delete"
            onClick={(e) => handleDelete(req.id, e)}
            className="text-primary text-sm"
          >
            删除
          </button>
        )
        break
    }

    return buttons.length > 0 ? (
      <div className="flex justify-end">
        {buttons}
      </div>
    ) : null
  }

  return (
    <SidebarLayout>
      <div className="px-6 py-6">
        <div className="w-[1200px] mx-auto">
          <div className="mb-3">
            <StatusTabs
              title="需求管理"
              tabs={statusTabs}
              activeTab={statusFilter}
              onChange={setStatusFilter}
            />
          </div>

          <Card className="mb-3 bg-transparent">
            <SearchFilterBar
              searchValue={search}
              onSearchChange={setSearch}
            searchPlaceholder="搜索需求名称..."
            showFilterButton
            onFilterClick={() => setShowFilters(!showFilters)}
            filtersVisible={showFilters}
          />
          
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <div>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={customerFilter}
                    onChange={(e) => setCustomerFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  >
                    <option value="all">全部客户</option>
                    {uniqueCustomers.map((customer) => (
                      <option key={customer} value={customer}>
                        {customer}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as RequirementStatus | 'all')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </Card>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#333333] uppercase tracking-wider">需求名称</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#333333] uppercase tracking-wider">客户</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#333333] uppercase tracking-wider">提交人</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#333333] uppercase tracking-wider">状态</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#333333] uppercase tracking-wider">项目文档</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#333333] uppercase tracking-wider">更新时间</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#333333] uppercase tracking-wider">创建时间</th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-[#333333] uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequirements.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-gray-500">
                      暂无数据
                    </td>
                  </tr>
                ) : (
                  filteredRequirements.map((req) => (
                    <tr
                      key={req.id}
                      onClick={() => handleRowClick(req.id)}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{req.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.customer || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.submitter || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={req.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {1 + (req.pptUrl ? 1 : 0) + (req.prototypeUrl ? 1 : 0) + (req.codePackageUrl ? 1 : 0) + (req.manualUrl ? 1 : 0)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(req.updatedAt).toLocaleDateString('zh-CN')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(req.createdAt).toLocaleDateString('zh-CN')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderActionButtons(req)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
        </div>
      </div>

      <RejectReasonModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={handleRejectConfirm}
      />
    </SidebarLayout>
  )
}
