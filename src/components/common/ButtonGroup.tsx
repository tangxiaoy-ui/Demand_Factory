import { useState, useRef, useEffect } from 'react'
import { MoreHorizontal } from 'lucide-react'

export interface ButtonGroupItem {
  id: string
  label: string
  onClick: () => void
  disabled?: boolean
}

export function ButtonGroup({ items }: { items: ButtonGroupItem[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  if (items.length <= 3) {
    return (
      <div className="flex items-center gap-2 whitespace-nowrap">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            disabled={item.disabled}
            className="inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-white hover:bg-blue-600 focus:ring-primary px-3 py-1.5 text-sm whitespace-nowrap"
          >
            {item.label}
          </button>
        ))}
      </div>
    )
  }

  const visibleItems = items.slice(0, 3)
  const hiddenItems = items.slice(3)

  const handleItemClick = (item: ButtonGroupItem) => {
    if (!item.disabled) {
      item.onClick()
      setIsOpen(false)
    }
  }

  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      {visibleItems.map((item) => (
        <button
          key={item.id}
          onClick={item.onClick}
          disabled={item.disabled}
          className="inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-white hover:bg-blue-600 focus:ring-primary px-3 py-1.5 text-sm whitespace-nowrap"
        >
          {item.label}
        </button>
      ))}
      
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
        >
          <MoreHorizontal className="w-4 h-4" />
          <span>更多</span>
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
            {hiddenItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 ${
                  item.disabled
                    ? 'opacity-50 cursor-not-allowed text-gray-400'
                    : 'text-gray-700'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
