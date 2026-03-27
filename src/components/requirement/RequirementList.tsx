import { useNavigate } from 'react-router-dom'
import { Grid3x3, List } from 'lucide-react'
import { useState } from 'react'
import { Card } from '@/components/common/Card'
import { SearchFilterBar } from '@/components/common/SearchFilterBar'
import { ButtonGroup } from '@/components/common/ButtonGroup'
import { StatusTabs } from '@/components/common/StatusTabs'
import { StatusBadge } from '@/components/common/Badge'
import { useRequirementStore } from '@/stores/requirementStore'
import { useAuthStore } from '@/stores/authStore'
import type { Requirement, RequirementStatus } from '@/types'

const statusOptions: { value: RequirementStatus | 'all'; label: string }[] = [
  { value: 'all', label: '全部状态' },
  { value: 'draft', label: '草稿' },
  { value: 'confirmed', label: '已确认' },
  { value: 'submitted', label: '已提交开发' },
  { value: 'developing', label: '开发中' },
  { value: 'completed', label: '已完成' },
  { value: 'rejected', label: '已拒绝' },
]

export function RequirementList() {
  const navigate = useNavigate()
  const { requirements, deleteRequirement, updateRequirement } = useRequirementStore()
  const { user } = useAuthStore()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<RequirementStatus | 'all'>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table')

  const isAdmin = user?.role === 'admin'

  const statusTabs = [
    { value: 'all' as const, label: '全部', count: requirements.length },
    { value: 'draft' as const, label: '草稿', count: requirements.filter(r => r.status === 'draft').length },
    { value: 'confirmed' as const, label: '已确认', count: requirements.filter(r => r.status === 'confirmed').length },
    { value: 'submitted' as const, label: '已提交开发', count: requirements.filter(r => r.status === 'submitted').length },
    { value: 'developing' as const, label: '开发中', count: requirements.filter(r => r.status === 'developing').length },
    { value: 'completed' as const, label: '已完成', count: requirements.filter(r => r.status === 'completed').length },
    { value: 'rejected' as const, label: '已拒绝', count: requirements.filter(r => r.status === 'rejected').length },
  ]

  const filteredRequirements = requirements
    .filter((req) => {
      const matchesSearch = req.name.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || req.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime()
      const dateB = new Date(b.updatedAt).getTime()
      return dateB - dateA
    })

  const handleCreateNew = () => {
    navigate('/collection')
  }

  const handleViewDetail = (id: string) => {
    navigate(`/requirements/${id}`)
  }

  const handleEdit = (id: string) => {
    navigate(`/collection?id=${id}`)
  }

  const handleSupplement = (id: string) => {
    navigate(`/collection?id=${id}&mode=supplement`)
  }

  const handleDelete = (id: string) => {
    if (confirm('确认删除该需求？')) {
      deleteRequirement(id)
    }
  }

  const handleSubmitDevelopment = (id: string) => {
    updateRequirement(id, { status: 'submitted' })
    alert('需求已提交开发')
  }

  const handleWithdrawSubmit = (id: string) => {
    if (confirm('确认撤回提交？')) {
      updateRequirement(id, { status: 'confirmed' })
    }
  }

  const handleDownloadOutputs = (req: Requirement) => {
    alert(`下载产出物：${req.name}`)
  }

  const countProjectDocuments = (req: Requirement): number => {
    let count = 1
    
    if (req.pptUrl) count += 1
    if (req.prototypeUrl) count += 1
    if (req.deliveryFilesCount) count += req.deliveryFilesCount
    
    return count
  }

  const renderActionButtons = (req: Requirement) => {
    const buttons = []

    switch (req.status) {
      case 'draft':
        buttons.push(
          <button
            key="supplement"
            onClick={(e) => {
              e.stopPropagation()
              handleSupplement(req.id)
            }}
            className="text-primary text-sm mr-3"
          >
            补充需求
          </button>
        )
        buttons.push(
          <button
            key="edit"
            onClick={(e) => {
              e.stopPropagation()
              handleEdit(req.id)
            }}
            className="text-primary text-sm mr-3"
          >
            编辑
          </button>
        )
        buttons.push(
          <button
            key="delete"
            onClick={(e) => {
              e.stopPropagation()
              handleDelete(req.id)
            }}
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
            onClick={(e) => {
              e.stopPropagation()
              handleEdit(req.id)
            }}
            className="text-primary text-sm mr-3"
          >
            编辑
          </button>
        )
        buttons.push(
          <button
            key="submit"
            onClick={(e) => {
              e.stopPropagation()
              handleSubmitDevelopment(req.id)
            }}
            className="text-primary text-sm mr-3"
          >
            提交开发
          </button>
        )
        buttons.push(
          <button
            key="download"
            onClick={(e) => {
              e.stopPropagation()
              handleDownloadOutputs(req)
            }}
            className="text-primary text-sm"
          >
            下载
          </button>
        )
        break

      case 'submitted':
        buttons.push(
          <button
            key="withdraw"
            onClick={(e) => {
              e.stopPropagation()
              handleWithdrawSubmit(req.id)
            }}
            className="text-primary text-sm"
          >
            撤回
          </button>
        )
        break

      case 'developing':
        break

      case 'completed':
        buttons.push(
          <button
            key="download"
            onClick={(e) => {
              e.stopPropagation()
              handleDownloadOutputs(req)
            }}
            className="text-primary text-sm mr-3"
          >
            下载
          </button>
        )
        if (isAdmin) {
          buttons.push(
            <button
              key="delete"
              onClick={(e) => {
                e.stopPropagation()
                handleDelete(req.id)
              }}
              className="text-primary text-sm"
            >
              删除
            </button>
          )
        }
        break
    }

    return buttons
  }

  return (
    <div className="space-y-3">
      <StatusTabs
        title="我的需求"
        tabs={statusTabs}
        activeTab={statusFilter}
        onChange={setStatusFilter}
      />

      <Card className="bg-transparent">
        <div className="flex items-center justify-between w-full">
          <SearchFilterBar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="搜索需求..."
            showFilterButton
            onFilterClick={() => setShowFilters(!showFilters)}
            filtersVisible={showFilters}
            showViewToggle={false}
          />
          
          <div className="flex items-center gap-2 whitespace-nowrap">
            <ButtonGroup 
              items={[
                { id: 'create', label: '新建需求', onClick: handleCreateNew }
              ]}
            />
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title="网格视图"
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'table'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title="表格视图"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {showFilters && (
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as RequirementStatus | 'all')}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-[#333333] uppercase tracking-wider">
                  需求名称
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-[#333333] uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-[#333333] uppercase tracking-wider">
                  项目文档
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-[#333333] uppercase tracking-wider">
                  更新日期
                </th>
                {isAdmin && (
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#333333] uppercase tracking-wider">
                    创建人
                  </th>
                )}
                <th className="px-6 py-3 text-right text-sm font-medium text-[#333333] uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequirements.map((req) => (
                <tr
                  key={req.id}
                  onClick={() => handleViewDetail(req.id)}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{req.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={req.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {countProjectDocuments(req)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(req.updatedAt).toLocaleDateString('zh-CN')}
                    </div>
                  </td>
                  {isAdmin && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {req.userId}
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-1">
                      {renderActionButtons(req)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRequirements.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            暂无需求记录
          </div>
        )}
      </Card>
    </div>
  )
}