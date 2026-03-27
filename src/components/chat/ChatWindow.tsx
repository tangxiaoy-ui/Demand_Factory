import { useEffect, useRef } from 'react'
import { MessageBubble } from './MessageBubble'
import { ChatInput } from './ChatInput'
import type { Message } from '@/types'

interface MessageWithMeta {
  message: Message
  isStructuredAI?: boolean
  analysisTitle?: string
  progress?: string
}

interface ChatWindowProps {
  messages: Message[]
  onSendMessage: (message: string) => void
  isGenerating?: boolean
}

const mockStructuredResponses: Record<string, MessageWithMeta> = {
  'ai-analysis-1': {
    message: {
      id: 'ai-analysis-1',
      role: 'assistant',
      content: '• 收到。看来我们要开始构建一个新的低代码模块了。\n\n• 请问你目前关注的是哪个业务领域？或者需要我为你提供一些应用场景的建议？',
      timestamp: new Date().toISOString(),
    },
    isStructuredAI: true,
    analysisTitle: '车辆管理需求解析',
    progress: '分析进度0%',
  },
  'ai-analysis-2': {
    message: {
      id: 'ai-analysis-2',
      role: 'assistant',
      content: '• 明白。针对 B 端企业的车辆管理，我建议从以下逻辑划分：\n\n• 员工端（移动端为主）：\n  - 用车申请、我的行程、还车确认、报销申请（油费/路桥费）。\n\n• 管理端（PC端为主）：\n  - 车辆档案库、驾驶员管理、车辆实时状态监控、派车调度、保险/维保提醒。\n\n• 决策端：\n  - 车辆利用率报表、费用分析统计。',
      timestamp: new Date().toISOString(),
    },
    isStructuredAI: true,
    analysisTitle: '车辆管理需求解析',
    progress: '分析进度30%',
  },
  'ai-analysis-3': {
    message: {
      id: 'ai-analysis-3',
      role: 'assistant',
      content: '• 好的，这是为您设计的字段清单：\n\n• 车辆档案表：\n  - 车牌号（唯一）、车型、车架号、载人数、购入日期、所属部门、当前状态（空闲/使用中/维修中）、保险到期日。\n\n• 用车申请单：\n  - 申请人（关联用户）、用车部门、目的地、用车时间（起/止）、随行人数、申请理由、车辆类型要求、预估里程。',
      timestamp: new Date().toISOString(),
    },
    isStructuredAI: true,
    analysisTitle: '车辆管理需求解析',
    progress: '分析进度50%',
  },
  'ai-complete': {
    message: {
      id: 'ai-complete',
      role: 'assistant',
      content: '完美！我已经收集了所有必要的信息，正在生成需求文档...',
      timestamp: new Date().toISOString(),
    },
    isStructuredAI: false,
  },
}

export function ChatWindow({
  messages,
  onSendMessage,
  isGenerating = false,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getMessageMeta = (message: Message): MessageWithMeta => {
    const meta = mockStructuredResponses[message.id]
    if (meta) {
      return meta
    }
    return { message }
  }

  return (
    <div className="flex flex-col h-full bg-bg-light">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => {
          const meta = getMessageMeta(message)
          return (
            <MessageBubble
              key={message.id}
              message={message}
              isStructuredAI={meta.isStructuredAI}
              analysisTitle={meta.analysisTitle}
              progress={meta.progress}
            />
          )
        })}
        {isGenerating && (
          <div className="flex justify-start mb-4">
            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={onSendMessage} disabled={isGenerating} />
    </div>
  )
}