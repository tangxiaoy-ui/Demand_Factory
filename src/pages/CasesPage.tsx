import { useState, useMemo } from 'react'
import { Grid3X3, List, Search, Filter } from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'
import { CaseCard } from '@/components/home/CaseCard'
import { industryOptions, scaleOptions, tagOptions } from '@/mock/cases'
import { useCaseStore } from '@/stores/caseStore'
import { useAuthStore } from '@/stores/authStore'

export function CasesPage() {
  const { cases } = useCaseStore()
  const { isLoggedIn, openLoginModal } = useAuthStore()
  const [search, setSearch] = useState('')
  const [industryFilter, setIndustryFilter] = useState('all')
  const [scaleFilter, setScaleFilter] = useState('all')
  const [tagFilter, setTagFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const filteredCases = useMemo(() => {
    return cases.filter((caseItem) => {
      const matchesSearch = 
        caseItem.title.toLowerCase().includes(search.toLowerCase()) ||
        caseItem.description.toLowerCase().includes(search.toLowerCase())
      const matchesIndustry = industryFilter === 'all' || caseItem.industry === industryFilter
      const matchesScale = scaleFilter === 'all' || caseItem.scale === scaleFilter
      const matchesTag = tagFilter === 'all' || caseItem.tags.includes(tagFilter)
      const isPublished = caseItem.isPublished
      
      return matchesSearch && matchesIndustry && matchesScale && matchesTag && isPublished
    })
  }, [search, industryFilter, scaleFilter, tagFilter, cases])

  return (
    <PageLayout>
      <div className="min-h-screen bg-[#F4F2FE]">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-bold text-gray-900">客户案例</h1>
              <p className="text-gray-600 mt-2">
                探索我们为客户成功交付的 {cases.filter(c => c.isPublished).length} 个优质项目
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full justify-center">
                <div className="relative flex-1 max-w-2xl">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="搜索案例名称或描述..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-sm">筛选</span>
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
                <div>
                  <select
                    value={industryFilter}
                    onChange={(e) => setIndustryFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {industryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={scaleFilter}
                    onChange={(e) => setScaleFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {scaleOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={tagFilter}
                    onChange={(e) => setTagFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {tagOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {(industryFilter !== 'all' || scaleFilter !== 'all' || tagFilter !== 'all') && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">已选筛选：</span>
                {industryFilter !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-primary text-sm rounded">
                    {industryFilter}
                    <button onClick={() => setIndustryFilter('all')} className="ml-1 hover:text-blue-700">×</button>
                  </span>
                )}
                {scaleFilter !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-600 text-sm rounded">
                    {scaleFilter}
                    <button onClick={() => setScaleFilter('all')} className="ml-1 hover:text-green-700">×</button>
                  </span>
                )}
                {tagFilter !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 bg-purple-50 text-purple-600 text-sm rounded">
                    {tagFilter}
                    <button onClick={() => setTagFilter('all')} className="ml-1 hover:text-purple-700">×</button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setIndustryFilter('all')
                    setScaleFilter('all')
                    setTagFilter('all')
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 ml-2"
                >
                  清除全部
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600">
              共找到 <span className="font-semibold text-gray-900">{filteredCases.length}</span> 个案例
            </p>
            
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCases.map((caseData) => (
                <CaseCard key={caseData.id} caseData={caseData} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
{filteredCases.map((caseData) => (
                 <div
                   key={caseData.id}
                   onClick={() => {
                     if (isLoggedIn) {
                       window.open(`/cases/${caseData.id}`, '_blank')
                     } else {
                       openLoginModal(`/cases/${caseData.id}`)
                     }
                   }}
                   className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer flex gap-4"
                 >
                  <div className="w-48 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={caseData.thumbnail}
                      alt={caseData.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-gray-500">{caseData.industry}</span>
                        <span className="text-xs text-gray-400">|</span>
                        <span className="text-xs text-gray-500">{caseData.completionDate}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{caseData.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{caseData.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex flex-wrap gap-2">
                        {caseData.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-blue-50 text-primary text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600">
                        {caseData.scale}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredCases.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">未找到匹配的案例</h3>
              <p className="text-gray-500">请尝试调整筛选条件或搜索关键词</p>
              <button
                onClick={() => {
                  setSearch('')
                  setIndustryFilter('all')
                  setScaleFilter('all')
                  setTagFilter('all')
                }}
                className="mt-4 px-4 py-2 text-primary hover:bg-blue-50 rounded-lg transition-colors"
              >
                清除所有筛选
              </button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}