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
      content: '• 收到，中国中药统一门户建设项目。\n\n• 先确认几个关键信息：\na. 门户定位：这个统一门户是面向内部员工（B2E）、还是面向外部客户/供应商（B2B/B2C）？还是内外一体化？\nb. 统一范围：需要整合哪些现有系统？（如OA、ERP、CRM、HR、财务、生产管理等）\nc. 核心场景：用户登录门户后，最常用的3个场景是什么？（如：审批待办、数据看板、业务申请、知识查询等）\nd. 组织规模：预计覆盖多少用户？是否涉及多子公司/多层级组织架构？\n\n• 另外，这个项目之前是否有历史需求文档或沟通记录？如果有，请发给我参考。',
      timestamp: new Date().toISOString(),
    },
    isStructuredAI: true,
    analysisTitle: '门户需求解析',
    progress: '分析进度20%',
  },
  'ai-analysis-2': {
    message: {
      id: 'ai-analysis-2',
      role: 'assistant',
      content: '• 收到，已了解门户定位和业务范围。\n\n• 基于您的描述，建议将门户定位如下：\na. 门户定位：内外一体化统一门户\nb. 统一范围：整合OA、ERP、CRM、HR、财务等核心业务系统\nc. 核心场景：审批待办、数据看板、业务申请\nd. 组织规模：覆盖5000+用户，涉及多层级组织架构\n\n• 接下来，请描述一下您期望的核心功能模块有哪些？（例如：单点登录、待办中心、数据看板、消息通知、个人工作台等）',
      timestamp: new Date().toISOString(),
    },
    isStructuredAI: true,
    analysisTitle: '门户需求解析',
    progress: '分析进度50%',
  },
  'ai-analysis-3': {
    message: {
      id: 'ai-analysis-3',
      role: 'assistant',
      content: '• 收到，已记录核心功能需求。\n\n• 根据您的描述，识别出以下关键功能：\na. 统一认证：单点登录（SSO）、多因素认证\nb. 业务中心：审批待办、业务申请流程、知识查询\nc. 数据展示：个人工作台、数据看板、报表中心\nd. 协作功能：消息通知、日程管理、任务协作\n\n• 最后，请确认一下技术约束条件，例如：\na. 是否要求国产化适配（如华为云、达梦数据库）？\nb. 是否已有技术栈要求？\nc. 交付时间要求？',
      timestamp: new Date().toISOString(),
    },
    isStructuredAI: true,
    analysisTitle: '门户需求解析',
    progress: '分析进度70%',
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