import { useState } from 'react'
import { Grid3x3, List } from 'lucide-react'
import { SidebarLayout } from '@/components/layout/SidebarLayout'
import { Card } from '@/components/common/Card'
import { SearchFilterBar } from '@/components/common/SearchFilterBar'
import { ButtonGroup } from '@/components/common/ButtonGroup'
import { StatusTabs } from '@/components/common/StatusTabs'
import { Eye, EyeOff, Star, StarOff, Filter } from 'lucide-react'
import { useCaseStore } from '@/stores/caseStore'
import { PublishCaseModal } from '@/components/case/PublishCaseModal'
import type { PublishCaseData } from '@/components/case/PublishCaseModal'

export function AdminCasesPage() {
  const { cases, togglePublish, toggleRecommend, publishCase } = useCaseStore()
  const [search, setSearch] = useState('')
  const [industryFilter, setIndustryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'unpublished' | 'recommended'>('all')
  const [recommendFilter, setRecommendFilter] = useState('all')
  const [publishModalOpen, setPublishModalOpen] = useState(false)
  const [selectedCase, setSelectedCase] = useState<typeof cases[0] | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const industries = Array.from(new Set(cases.map(c => c.industry)))

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
    const matchesIndustry = industryFilter === 'all' || c.industry === industryFilter
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'published' && c.isPublished) || 
      (statusFilter === 'unpublished' && !c.isPublished) ||
      (statusFilter === 'recommended' && c.isRecommended)
    const matchesRecommend = recommendFilter === 'all' || 
      (recommendFilter === 'recommended' && c.isRecommended) || 
      (recommendFilter === 'unrecommended' && !c.isRecommended)
    return matchesSearch && matchesIndustry && matchesStatus && matchesRecommend
  })

  const handlePublishCase = (data: PublishCaseData) => {
    publishCase(data)
    setPublishModalOpen(false)
    setSelectedCase(null)
  }

  const handlePublish = () => {
    setSelectedCase(null)
    setPublishModalOpen(true)
  }

  type CaseStatusFilter = 'all' | 'published' | 'unpublished' | 'recommended'
  
  const statusTabs = [
    { value: 'all' as CaseStatusFilter, label: '全部', count: cases.length },
    { value: 'published' as CaseStatusFilter, label: '已上架', count: cases.filter(c => c.isPublished).length },
    { value: 'unpublished' as CaseStatusFilter, label: '未上架', count: cases.filter(c => !c.isPublished).length },
    { value: 'recommended' as CaseStatusFilter, label: '已推荐', count: cases.filter(c => c.isRecommended).length },
  ]

  return (
    <SidebarLayout>
      <div className="px-6 py-6">
        <div className="w-[1200px] mx-auto">
          <div className="mb-6">
            <StatusTabs
              title="案例展示管理"
              tabs={statusTabs}
              activeTab={statusFilter}
              onChange={(value) => setStatusFilter(value as typeof statusFilter)}
            />
          </div>

          <Card className="mb-6 bg-transparent">
          <div className="flex items-center justify-between w-full">
            <SearchFilterBar
              searchValue={search}
              onSearchChange={setSearch}
              searchPlaceholder="搜索案例标题或描述..."
              showFilterButton
              onFilterClick={() => setShowFilters(!showFilters)}
              filtersVisible={showFilters}
              showViewToggle={false}
            />
            
            <div className="flex items-center gap-2 whitespace-nowrap">
              <ButtonGroup 
                items={[
                  { id: 'publish', label: '发布案例', onClick: handlePublish }
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
              <div>
                <select
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">全部行业</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">全部</option>
                  <option value="published">已上架</option>
                  <option value="unpublished">未上架</option>
                  <option value="recommended">已推荐</option>
                </select>
              </div>
              <div>
                <select
                  value={recommendFilter}
                  onChange={(e) => setRecommendFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">全部</option>
                  <option value="recommended">已推荐</option>
                  <option value="unrecommended">未推荐</option>
                </select>
              </div>
            </div>
          )}

          {(industryFilter !== 'all' || statusFilter !== 'all' || recommendFilter !== 'all') && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-500">已选筛选：</span>
              {industryFilter !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-600 text-sm rounded">
                  {industryFilter}
                  <button onClick={() => setIndustryFilter('all')} className="ml-1 hover:text-blue-700">×</button>
                </span>
              )}
              {statusFilter !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-600 text-sm rounded">
                  {statusFilter === 'published' ? '已上架' : '已下架'}
                  <button onClick={() => setStatusFilter('all')} className="ml-1 hover:text-green-700">×</button>
                </span>
              )}
              {recommendFilter !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 bg-orange-50 text-orange-600 text-sm rounded">
                  {recommendFilter === 'recommended' ? '已推荐' : '未推荐'}
                  <button onClick={() => setRecommendFilter('all')} className="ml-1 hover:text-orange-700">×</button>
                </span>
              )}
              <button
                onClick={() => {
                  setIndustryFilter('all')
                  setStatusFilter('all')
                  setRecommendFilter('all')
                }}
                className="text-sm text-gray-500 hover:text-gray-700 ml-2"
              >
                清除全部
              </button>
            </div>
          )}
        </Card>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCases.map((caseItem) => (
              <Card key={caseItem.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={caseItem.thumbnail}
                    alt={caseItem.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex space-x-1">
                    {caseItem.isRecommended && (
                      <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-md flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>推荐</span>
                      </span>
                    )}
                    <span className={`px-2 py-1 text-white text-xs rounded-md ${
                      caseItem.isPublished ? 'bg-green-500' : 'bg-gray-500'
                    }`}>
                      {caseItem.isPublished ? '已上架' : '已下架'}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{caseItem.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{caseItem.description}</p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {caseItem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <span>{caseItem.industry}</span>
                    <span className="ml-3">{caseItem.scale}</span>
                    <span className="ml-3">{caseItem.completionDate}</span>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        if (caseItem.isPublished) {
                          togglePublish(caseItem.id)
                        } else {
                          setSelectedCase(caseItem)
                          setPublishModalOpen(true)
                        }
                      }}
                      className={`flex-1 px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-center space-x-1 ${
                        caseItem.isPublished
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {caseItem.isPublished ? (
                        <>
                          <EyeOff className="w-4 h-4" />
                          <span>下架</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          <span>上架</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => toggleRecommend(caseItem.id)}
                      className={`flex-1 px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-center space-x-1 ${
                        caseItem.isRecommended
                          ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {caseItem.isRecommended ? (
                        <>
                          <StarOff className="w-4 h-4" />
                          <span>取消推荐</span>
                        </>
                      ) : (
                        <>
                          <Star className="w-4 h-4" />
                          <span>推荐</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">缩略图</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">标题</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">行业</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">规模</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">完成时间</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">标签</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">上架状态</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">推荐状态</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCases.map((caseItem) => (
                  <tr key={caseItem.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <img
                        src={caseItem.thumbnail}
                        alt={caseItem.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-900">{caseItem.title}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{caseItem.industry}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{caseItem.scale}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{caseItem.completionDate}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div 
                        className="text-sm text-gray-600 truncate max-w-[200px]" 
                        title={caseItem.tags.join(', ')}
                      >
                        {caseItem.tags.join(', ')}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-md ${
                        caseItem.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {caseItem.isPublished ? '已上架' : '已下架'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {caseItem.isRecommended ? (
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-md">
                          已推荐
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">--</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => {
                            if (caseItem.isPublished) {
                              togglePublish(caseItem.id)
                            } else {
                              setSelectedCase(caseItem)
                              setPublishModalOpen(true)
                            }
                          }}
                          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {caseItem.isPublished ? '下架' : '上架'}
                        </button>
                        <button
                          onClick={() => toggleRecommend(caseItem.id)}
                          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {caseItem.isRecommended ? '取消推荐' : '推荐'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        {filteredCases.length === 0 && (
          <Card className="p-12 text-center">
            <div className="text-gray-500">
              <Filter className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>暂无符合条件的案例</p>
            </div>
          </Card>
        )}
        </div>
      </div>

      <PublishCaseModal
        caseItem={selectedCase}
        isOpen={publishModalOpen}
        onClose={() => {
          setPublishModalOpen(false)
          setSelectedCase(null)
        }}
        onSubmit={handlePublishCase}
      />
    </SidebarLayout>
  )
}
