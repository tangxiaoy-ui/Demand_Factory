import { useState, useMemo } from 'react'
import { ChevronDown, ChevronRight, ChevronLeft, FileText, Layout, Presentation, FolderOpen, File, Package, Clock } from 'lucide-react'
import { useHistoryStore } from '@/stores/historyStore'
import type { RequirementStatus } from '@/types'

type NavItem = 'overview' | 'document' | 'prototype' | 'ppt' | 'delivery' | 'source' | 'history'

interface NavGroup {
  id: string
  label: string
  icon: React.ReactNode
  items?: { id: NavItem; label: string }[]
}

interface SidebarNavProps {
  activeItem: NavItem
  onItemClick: (item: NavItem) => void
  status: RequirementStatus
}

export function SidebarNav({ activeItem, onItemClick, status }: SidebarNavProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['project', 'source']))
  const [collapsed, setCollapsed] = useState(false)
  const { sessions } = useHistoryStore()

  const navGroups = useMemo(() => {
    const isDraft = status === 'draft'
    const hasArtifacts = ['confirmed', 'submitted', 'developing', 'rejected'].includes(status)
    const isCompleted = status === 'completed'

    const projectItems: { id: NavItem; label: string }[] = []
    
    if (isDraft) {
      projectItems.push({ id: 'document', label: '需求文档' })
    } else if (hasArtifacts) {
      projectItems.push(
        { id: 'document', label: '需求文档' },
        { id: 'prototype', label: '需求原型' },
        { id: 'ppt', label: '汇报方案' }
      )
    } else if (isCompleted) {
      projectItems.push(
        { id: 'document', label: '需求文档' },
        { id: 'prototype', label: '需求原型' },
        { id: 'ppt', label: '汇报方案' },
        { id: 'delivery', label: '交付资料' }
      )
    }

    const groups: NavGroup[] = [
      { id: 'overview', label: '概览', icon: <FileText className="w-4 h-4" /> },
    ]

    if (projectItems.length > 0) {
      groups.push({
        id: 'project',
        label: '项目资料',
        icon: <FolderOpen className="w-4 h-4" />,
        items: projectItems,
      })
    }

    groups.push(
      {
        id: 'history',
        label: '历史对话',
        icon: <Clock className="w-4 h-4" />,
      },
      { id: 'source', label: '原始资料', icon: <FolderOpen className="w-4 h-4" /> }
    )

    return groups
  }, [status])

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(groupId)) {
        newSet.delete(groupId)
      } else {
        newSet.add(groupId)
      }
      return newSet
    })
  }

  const getItemIcon = (id: NavItem) => {
    switch (id) {
      case 'document':
        return <FileText className="w-4 h-4" />
      case 'prototype':
        return <Layout className="w-4 h-4" />
      case 'ppt':
        return <Presentation className="w-4 h-4" />
      case 'delivery':
        return <Package className="w-4 h-4" />
      case 'history':
        return <Clock className="w-4 h-4" />
      default:
        return <File className="w-4 h-4" />
    }
  }

  return (
    <div className={`relative bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 ${collapsed ? 'w-12' : 'w-[220px]'}`}>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-4 w-6 h-6 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 z-10"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-gray-600" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-gray-600" />
        )}
      </button>
      
      <nav className="h-full overflow-y-auto overflow-x-hidden">
        <div className="py-2">
          {navGroups.map((group) => (
            <div key={group.id}>
              {group.items ? (
                <>
                  <button
                    onClick={() => !collapsed && toggleGroup(group.id)}
                    className={`w-full flex items-center ${collapsed ? 'justify-center px-0' : 'justify-between px-3'} py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors ${
                      activeItem === group.id || group.items.some((item) => item.id === activeItem)
                        ? 'bg-blue-50 text-primary'
                        : ''
                    }`}
                    title={collapsed ? group.label : undefined}
                  >
                    <div className={`flex items-center ${collapsed ? '' : 'space-x-2'}`}>
                      {group.icon}
                      {!collapsed && <span>{group.label}</span>}
                    </div>
                    {!collapsed && (
                      <>
                        {expandedGroups.has(group.id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </>
                    )}
                  </button>
                  {!collapsed && expandedGroups.has(group.id) && (
                    <div className="border-l-2 border-gray-100 ml-4">
                      {group.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => onItemClick(item.id)}
                          className={`w-full flex items-center ${collapsed ? 'justify-center px-0' : 'px-3'} py-2 text-sm transition-colors ${
                            activeItem === item.id
                              ? 'bg-blue-50 text-primary'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                          title={collapsed ? item.label : undefined}
                        >
                          {collapsed ? (
                            getItemIcon(item.id)
                          ) : (
                            <>
                              <span className="w-4 h-4 mr-2 opacity-0">{getItemIcon(item.id)}</span>
                              <span>{item.label}</span>
                            </>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : group.id === 'history' ? (
                <button
                  onClick={() => onItemClick('history')}
                  className={`w-full flex items-center ${collapsed ? 'justify-center px-0' : 'justify-between px-3'} py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors ${
                    activeItem === group.id ? 'bg-blue-50 text-primary' : ''
                  }`}
                  title={collapsed ? group.label : undefined}
                >
                  <div className={`flex items-center ${collapsed ? '' : 'space-x-2'}`}>
                    {group.icon}
                    {!collapsed && (
                      <>
                        <span>{group.label}</span>
                        {sessions.length > 0 && (
                          <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                            {sessions.length}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => onItemClick(group.id as NavItem)}
                  className={`w-full flex items-center ${collapsed ? 'justify-center px-0' : 'px-3'} py-2 text-sm transition-colors ${
                    activeItem === group.id
                      ? 'bg-blue-50 text-primary'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  title={collapsed ? group.label : undefined}
                >
                  {collapsed ? (
                    group.icon
                  ) : (
                    <>
                      <span className="mr-2">{group.icon}</span>
                      <span>{group.label}</span>
                    </>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      </nav>
    </div>
  )
}