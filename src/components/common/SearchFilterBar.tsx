import { Search, Filter, Grid3x3, List } from 'lucide-react'

export interface SearchFilterBarProps {
  searchValue: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
  showFilterButton?: boolean
  showViewToggle?: boolean
  viewMode?: 'grid' | 'table'
  onViewModeChange?: (mode: 'grid' | 'table') => void
  onFilterClick?: () => void
  filtersVisible?: boolean
}

export function SearchFilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = '搜索...',
  showFilterButton = true,
  showViewToggle = false,
  viewMode = 'grid',
  onViewModeChange,
  onFilterClick,
  filtersVisible = false,
}: SearchFilterBarProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-[180px] pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {showFilterButton && onFilterClick && (
          <button
            onClick={onFilterClick}
            className={`flex items-center justify-center space-x-2 px-4 py-2 border rounded-md transition-colors ${
              filtersVisible
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm">筛选</span>
          </button>
        )}
      </div>

      {showViewToggle && onViewModeChange && (
        <div className="flex items-center gap-2">
          <div className="flex space-x-2">
            <button
              onClick={() => onViewModeChange('grid')}
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
              onClick={() => onViewModeChange('table')}
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
      )}
    </div>
  )
}
