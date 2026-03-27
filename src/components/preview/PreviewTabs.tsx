import type { ReactNode } from 'react'
import { FileText, Presentation, Layout } from 'lucide-react'

type TabType = 'document' | 'ppt' | 'prototype'

interface Tab {
  id: TabType
  label: string
  icon: ReactNode
}

const tabs: Tab[] = [
  { id: 'document', label: '需求文档', icon: <FileText className="w-4 h-4" /> },
  { id: 'ppt', label: 'PPT', icon: <Presentation className="w-4 h-4" /> },
  { id: 'prototype', label: '原型', icon: <Layout className="w-4 h-4" /> },
]

interface PreviewTabsProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
  children: ReactNode
}

export function PreviewTabs({ activeTab, onTabChange, children }: PreviewTabsProps) {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center border-b border-gray-200 flex-shrink-0">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.icon}
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}