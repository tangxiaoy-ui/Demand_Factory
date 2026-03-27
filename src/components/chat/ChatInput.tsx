import { useState, type KeyboardEvent, useRef, useEffect } from 'react'
import { Send, Plus } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      if (!input) {
        textarea.style.height = '60px'
      } else {
        textarea.style.height = 'auto'
        const newHeight = Math.max(Math.min(textarea.scrollHeight, 200), 60)
        textarea.style.height = `${newHeight}px`
      }
      textarea.style.overflowY = textarea.scrollHeight > 200 ? 'auto' : 'hidden'
    }
  }, [input])

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim())
      setInput('')
      if (textareaRef.current) {
        textareaRef.current.style.height = '60px'
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileUpload = () => {
    // TODO: 实现附件上传功能
    console.log('附件上传')
  }

  return (
    <div className="bg-white border-t border-gray-100">
      <div className="p-4">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入你的需求..."
            disabled={disabled}
            rows={1}
            className="w-full resize-none rounded-full pl-12 pr-14 py-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100 shadow-[0_2px_4px_rgba(59,91,219,0.15)]"
            style={{ maxHeight: '200px', minHeight: '60px', border: '1px solid #ddd' }}
          />
          <button
            onClick={handleFileUpload}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled}
            style={{ color: '#666' }}
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            onClick={handleSend}
            disabled={!input.trim() || disabled}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}