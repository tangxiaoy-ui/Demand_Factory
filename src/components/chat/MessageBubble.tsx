import type { Message } from '@/types'

interface MessageBubbleProps {
  message: Message
  isStructuredAI?: boolean
  analysisTitle?: string
  progress?: string
}

export function MessageBubble({ message, isStructuredAI, analysisTitle, progress }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  if (!isUser && isStructuredAI) {
    return (
      <div className="flex justify-start mb-4">
        <div className="max-w-[90%] rounded-2xl bg-white text-gray-900 border border-gray-100 shadow-sm overflow-hidden">
          {analysisTitle && progress && (
            <div className="flex items-center justify-between px-4 py-2 bg-blue-50 border-b border-blue-100">
              <span className="text-sm font-medium text-gray-700">{analysisTitle}</span>
              <span className="text-sm font-medium text-primary">{progress}</span>
            </div>
          )}
          <div className="p-4">
            <div className="text-sm leading-relaxed whitespace-pre-wrap space-y-3">
              {message.content.split('\n').map((line, index) => {
                if (line.startsWith('a. ') || line.startsWith('b. ') || line.startsWith('c. ') || line.startsWith('d. ')) {
                  return (
                    <div key={index} className="ml-4 text-gray-700">
                      <span className="text-gray-500">{line.substring(0, 3)}</span>
                      <span>{line.substring(3)}</span>
                    </div>
                  )
                }
                if (line.startsWith('• ')) {
                  return (
                    <div key={index} className="flex items-start space-x-2">
                      <span className="text-gray-400 mt-1">•</span>
                      <span>{line.substring(2)}</span>
                    </div>
                  )
                }
                return <p key={index}>{line}</p>
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[70%] bg-gray-100 text-gray-900 rounded-2xl px-4 py-3">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[85%] rounded-2xl bg-white text-gray-900 border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  )
}