export interface StatusTab<T = string> {
  value: T
  label: string
  count: number
}

export function StatusTabs<T extends string>({
  title,
  tabs,
  activeTab,
  onChange,
}: {
  title: string
  tabs: StatusTab<T>[]
  activeTab: T
  onChange: (tab: T) => void
}) {
  return (
    <div className="flex items-baseline gap-6">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <div className="flex items-center gap-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value
          return (
            <button
              key={tab.value}
              onClick={() => onChange(tab.value)}
              className="relative pb-1 group"
            >
              <span className={`text-sm transition-colors ${
                isActive ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-gray-900'
              }`}>
                {tab.label} ({tab.count})
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-7 h-0.5 bg-blue-600" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
