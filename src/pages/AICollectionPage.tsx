import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ChevronDown, Bot } from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'
import { ChatWindow } from '@/components/chat/ChatWindow'
import { ChatInput } from '@/components/chat/ChatInput'
import { DocPreview } from '@/components/preview/DocPreview'
import { PPTPreview } from '@/components/preview/PPTPreview'
import { PrototypePreview } from '@/components/preview/PrototypePreview'
import { ButtonGroup } from '@/components/common/ButtonGroup'
import { useChatStore } from '@/stores/chatStore'
import { useRequirementStore } from '@/stores/requirementStore'
import { useAuthStore } from '@/stores/authStore'
import { useHistoryStore } from '@/stores/historyStore'
import type { Message } from '@/types'

type PageState = 'initial' | 'chatting' | 'document'

const sampleDocContent = `# 需求文档

## 项目概述
基于对话收集的需求信息，自动生成的标准化需求文档。

## 目标用户
- 企业用户
- 个人开发者
- 产品团队

## 核心功能
1. AI智能对话收集需求
2. 自动生成需求文档
3. 一键生成PPT演示
4. 交互原型自动生成

## 非功能需求
- 响应时间 < 2秒
- 支持并发用户数 > 100
- 系统可用性 99.9%

## 技术约束
- 前端：React + TypeScript
- 后端：Node.js
- 数据库：PostgreSQL
`

export function AICollectionPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { isLoggedIn } = useAuthStore()
  const { messages, addMessage, setMessages, setProgress, setDocGenerated, docGenerated } = useChatStore()
  const { addRequirement, requirements } = useRequirementStore()
  const { sessions } = useHistoryStore()

  const [pageState, setPageState] = useState<PageState>('initial')
  const [currentStep, setCurrentStep] = useState(0)
  const [activeTab, setActiveTab] = useState<'document' | 'ppt' | 'prototype'>('document')
  const [pptGenerated, setPptGenerated] = useState(false)
  const [prototypeGenerated, setPrototypeGenerated] = useState(false)
  const [requirementConfirmed, setRequirementConfirmed] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState('V1.0')
  const [docContent, setDocContent] = useState(sampleDocContent)
  const [pptUrl, setPptUrl] = useState<string | undefined>()
  const [prototypeUrl, setPrototypeUrl] = useState<string | undefined>()
  const [isHistorySession, setIsHistorySession] = useState(false)

  const sessionId = searchParams.get('sessionId')
  const requirementId = searchParams.get('requirementId')

  const agentInfo = {
    name: '需求助手',
    description: '专业的需求分析助手，通过对话帮你梳理项目需求，自动生成文档、PPT和原型。'
  }

  const quickCategories = [
    { id: 'portal', name: '门户', icon: '🏢' },
    { id: 'lowcode', name: '低代码', icon: '⚡' },
    { id: 'workflow', name: '流程平台', icon: '🔄' },
    { id: 'collaboration', name: '协同应用', icon: '👥' },
    { id: 'aiagent', name: '智能体', icon: '🤖' },
    { id: 'search', name: '搜问做', icon: '🔍' },
    { id: 'knowledge', name: '知识管理', icon: '📚' },
  ]

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn, navigate])

  useEffect(() => {
    if (sessionId) {
      const session = sessions.find(s => s.id === sessionId)
      if (session) {
        setIsHistorySession(true)
        setMessages(session.messages)
        setPageState('chatting')
        
        const isSessionComplete = session.progress >= 100
        if (isSessionComplete) {
          setDocGenerated(true)
          setProgress(100)
        } else {
          setProgress(session.progress)
        }
      }
    }

    if (requirementId) {
      const requirement = requirements.find(r => r.id === requirementId)
      if (requirement) {
        setDocContent(requirement.docContent || sampleDocContent)
        if (requirement.pptUrl) {
          setPptGenerated(true)
          setPptUrl(requirement.pptUrl)
        }
        if (requirement.prototypeUrl) {
          setPrototypeGenerated(true)
          setPrototypeUrl(requirement.prototypeUrl)
        }
      }
    }
  }, [sessionId, requirementId, sessions, requirements, setMessages, setProgress, setDocGenerated])

  const handleStartChat = (quickCategory?: string) => {
    setPageState('chatting')

    if (quickCategory) {
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: quickCategory,
        timestamp: new Date().toISOString(),
      }
      addMessage(userMessage)

      setProgress(20)
      setCurrentStep(1)

      setTimeout(() => {
        const aiResponse: Message = {
          id: 'ai-analysis-1',
          role: 'assistant',
          content: `• 收到，${quickCategory}。\n\n• 先确认几个关键信息：\na. 门户定位：这个统一门户是面向内部员工（B2E）、还是面向外部客户/供应商（B2B/B2C）？还是内外一体化？\nb. 统一范围：需要整合哪些现有系统？（如OA、ERP、CRM、HR、财务、生产管理等）\nc. 核心场景：用户登录门户后，最常用的3个场景是什么？（如：审批待办、数据看板、业务申请、知识查询等）\nd. 组织规模：预计覆盖多少用户？是否涉及多子公司/多层级组织架构？\n\n• 另外，这个项目之前是否有历史需求文档或沟通记录？如果有，请发给我参考。`,
          timestamp: new Date().toISOString(),
        }
        addMessage(aiResponse)
      }, 500)
    }
  }

  const handleSendMessage = (content: string) => {
    if (pageState === 'initial') {
      handleStartChat()
      return
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    }
    addMessage(userMessage)

    const nextStep = currentStep + 1
    setCurrentStep(nextStep)

    const progressMap = [20, 50, 70, 90, 100]
    setProgress(progressMap[Math.min(nextStep, progressMap.length - 1)])

    setTimeout(() => {
      let aiResponse: Message

      if (nextStep === 1) {
        aiResponse = {
          id: 'ai-analysis-1',
          role: 'assistant',
          content: `• 收到，${content}。\n\n• 先确认几个关键信息：\na. 门户定位：这个统一门户是面向内部员工（B2E）、还是面向外部客户/供应商（B2B/B2C）？还是内外一体化？\nb. 统一范围：需要整合哪些现有系统？（如OA、ERP、CRM、HR、财务、生产管理等）\nc. 核心场景：用户登录门户后，最常用的3个场景是什么？（如：审批待办、数据看板、业务申请、知识查询等）\nd. 组织规模：预计覆盖多少用户？是否涉及多子公司/多层级组织架构？\n\n• 另外，这个项目之前是否有历史需求文档或沟通记录？如果有，请发给我参考。`,
          timestamp: new Date().toISOString(),
        }
      } else if (nextStep === 2) {
        aiResponse = {
          id: 'ai-analysis-2',
          role: 'assistant',
          content: `• 收到，已了解门户定位和业务范围。\n\n• 基于您的描述，建议将门户定位如下：\na. 门户定位：内外一体化统一门户\nb. 统一范围：整合OA、ERP、CRM、HR、财务等核心业务系统\nc. 核心场景：审批待办、数据看板、业务申请\nd. 组织规模：覆盖5000+用户，涉及多层级组织架构\n\n• 接下来，请描述一下您期望的核心功能模块有哪些？（例如：单点登录、待办中心、数据看板、消息通知、个人工作台等）`,
          timestamp: new Date().toISOString(),
        }
      } else if (nextStep === 3) {
        aiResponse = {
          id: 'ai-analysis-3',
          role: 'assistant',
          content: `• 收到，已记录核心功能需求。\n\n• 根据您的描述，识别出以下关键功能：\na. 统一认证：单点登录（SSO）、多因素认证\nb. 业务中心：审批待办、业务申请流程、知识查询\nc. 数据展示：个人工作台、数据看板、报表中心\nd. 协作功能：消息通知、日程管理、任务协作\n\n• 最后，请确认一下技术约束条件，例如：\na. 是否要求国产化适配（如华为云、达梦数据库）？\nb. 是否已有技术栈要求？\nc. 交付时间要求？`,
          timestamp: new Date().toISOString(),
        }
      } else {
        aiResponse = {
          id: 'ai-complete',
          role: 'assistant',
          content: '完美！我已经收集了所有必要的信息，正在生成需求文档...',
          timestamp: new Date().toISOString(),
        }

        setTimeout(() => {
          setDocGenerated(true)
          const newRequirement = {
            id: Date.now().toString(),
            name: content.slice(0, 20) + '...',
            status: 'draft' as const,
            docContent: sampleDocContent,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            userId: 'user1',
          }
          addRequirement(newRequirement)
        }, 1500)
      }

      addMessage(aiResponse)
    }, 800)
  }

  const handleConfirmRequirement = () => {
    setRequirementConfirmed(true)
  }

  const handleGeneratePPT = () => {
    setPptGenerated(true)
    setActiveTab('ppt')
  }

  const handleGeneratePrototype = () => {
    setPrototypeGenerated(true)
    setActiveTab('prototype')
  }

  const handleDownload = () => {
    console.log('下载功能')
  }

  const getActionButtons = () => {
    const buttons = []

    if (!isHistorySession && !requirementConfirmed) {
      buttons.push({
        id: 'confirm',
        label: '确认需求',
        onClick: handleConfirmRequirement,
      })
    }

    if (!isHistorySession && requirementConfirmed) {
      buttons.push({
        id: 'prototype',
        label: '生成原型',
        onClick: handleGeneratePrototype,
        disabled: prototypeGenerated,
      })
      buttons.push({
        id: 'ppt',
        label: '生成PPT',
        onClick: handleGeneratePPT,
        disabled: pptGenerated,
      })
    }

    buttons.push({
      id: 'manage',
      label: '需求管理',
      onClick: () => navigate('/requirements'),
    })

    buttons.push({
      id: 'download',
      label: '下载',
      onClick: handleDownload,
    })

    return buttons
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <PageLayout showNavbar={false}>
      <div className="h-screen flex flex-col bg-bg-light overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                if (isHistorySession && requirementId) {
                  navigate(`/requirements/${requirementId}`)
                } else {
                  navigate('/')
                }
              }}
              className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{isHistorySession ? '返回需求详情' : '返回首页'}</span>
            </button>
            <h1 className="text-lg font-semibold text-gray-900">AI需求收集</h1>
            <div className="w-20" />
          </div>
        </header>

        <div className={`flex-1 flex ${docGenerated ? '' : 'justify-center items-center'} overflow-hidden`}>
          {!docGenerated && pageState === 'initial' ? (
            <div className="w-full max-w-3xl mx-4 h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center">
                <div className="text-center max-w-md">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <Bot className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{agentInfo.name}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{agentInfo.description}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {quickCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleStartChat(category.name)}
                        className="px-4 py-2 rounded-lg text-sm bg-blue-50 text-gray-700 hover:bg-primary hover:text-white transition-all"
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <ChatInput
                onSend={(message) => handleStartChat(message)}
                disabled={false}
              />
            </div>
          ) : !docGenerated && pageState === 'chatting' ? (
            <div className="w-full max-w-3xl mx-4 h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <ChatWindow
                messages={messages}
                onSendMessage={handleSendMessage}
              />
            </div>
          ) : (
            <>
              <div className="w-[400px] border-r border-gray-200 bg-white flex flex-col flex-shrink-0">
                <div className="flex-1 overflow-y-auto">
                  <ChatWindow
                    messages={messages}
                    onSendMessage={handleSendMessage}
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 flex-shrink-0">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <button
                        onClick={() => {
                          const menu = document.getElementById('version-menu')
                          if (menu) {
                            menu.classList.toggle('hidden')
                          }
                        }}
                        className="flex items-center space-x-2 text-gray-900 hover:bg-gray-100 px-2 py-1 rounded transition-colors"
                      >
                        <span className="text-sm font-medium">{selectedVersion}</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </button>
                      <div
                        id="version-menu"
                        className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-1 hidden z-10 min-w-[80px]"
                      >
                        <button
                          onClick={() => {
                            setSelectedVersion('V1.0')
                            const menu = document.getElementById('version-menu')
                            if (menu) {
                              menu.classList.add('hidden')
                            }
                          }}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                            selectedVersion === 'V1.0' ? 'text-primary bg-blue-50' : 'text-gray-700'
                          }`}
                        >
                          V1.0
                        </button>
                        <button
                          onClick={() => {
                            setSelectedVersion('V2.0')
                            const menu = document.getElementById('version-menu')
                            if (menu) {
                              menu.classList.add('hidden')
                            }
                          }}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                            selectedVersion === 'V2.0' ? 'text-primary bg-blue-50' : 'text-gray-700'
                          }`}
                        >
                          V2.0
                        </button>
                        <button
                          onClick={() => {
                            setSelectedVersion('V3.0')
                            const menu = document.getElementById('version-menu')
                            if (menu) {
                              menu.classList.add('hidden')
                            }
                          }}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                            selectedVersion === 'V3.0' ? 'text-primary bg-blue-50' : 'text-gray-700'
                          }`}
                        >
                          V3.0
                        </button>
                      </div>
                    </div>
                    <div className="h-4 w-px bg-gray-300" />
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setActiveTab('document')}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                          activeTab === 'document'
                            ? 'text-primary bg-blue-50'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        需求文档
                      </button>
                      <button
                        onClick={() => setActiveTab('ppt')}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                          activeTab === 'ppt'
                            ? 'text-primary bg-blue-50'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        PPT
                      </button>
                      <button
                        onClick={() => setActiveTab('prototype')}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                          activeTab === 'prototype'
                            ? 'text-primary bg-blue-50'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        原型
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <ButtonGroup items={getActionButtons()} />
                  </div>
                </div>

                <div className="flex-1 overflow-hidden">
                  {activeTab === 'document' && <DocPreview content={docContent} />}
                  {activeTab === 'ppt' && pptGenerated && <PPTPreview pptUrl={pptUrl || '/mock/ppt.pptx'} />}
                  {activeTab === 'prototype' && prototypeGenerated && <PrototypePreview prototypeUrl={prototypeUrl || '/mock/prototype'} />}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </PageLayout>
  )
}