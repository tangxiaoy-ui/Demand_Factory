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

interface DocumentVersion {
  version: string
  docContent: string
  confirmed: boolean
  pptUrl?: string
  prototypeUrl?: string
  createdAt: number
}

const sampleDocContent = `# 车辆管理系统需求文档

## 项目概述
为企业提供全面的车辆管理解决方案，实现车辆信息管理、调度派车、维修保养、违章记录、费用统计等一体化管理。

## 目标用户
- 物流企业车队管理员
- 企业行政管理人员
- 调度中心操作员
- 司机及用车人员

## 核心功能
1. 车辆档案管理
   - 车辆基本信息登记（车牌、车型、载重、购买日期等）
   - 证件管理（行驶证、营运证、保险等）
   - 车辆状态管理（在用、空闲、维修、报废等）
   - 车辆档案查询与导出

2. 司机信息管理
   - 司机基本信息（姓名、联系方式、驾驶证等）
   - 司机资质管理（驾龄、准驾车型、违章记录）
   - 司机状态管理（在途、空闲、休息、请假）
   - 司机绩效统计

3. 调度派车管理
   - 派车申请与审批流程
   - 智能车辆匹配与调度
   - 行程任务管理
   - 回车登记与里程确认

4. GPS实时监控
   - 实时定位显示（地图展示）
   - 轨迹回放查询
   - 电子围栏设置与报警
   - 超速、疲劳驾驶等异常报警

5. 维修保养管理
   - 保养计划制定与提醒
   - 维修记录管理
   - 维修费用统计
   - 维修点/保养点管理

6. 违章事故管理
   - 违章记录登记
   - 违章处理跟踪
   - 事故记录与处理
   - 违章统计分析

7. 费用统计管理
   - 油费、过路费、维修费等费用登记
   - 费用分类统计与报表
   - 单车成本核算
   - 费用趋势分析

## 非功能需求
- 系统响应时间 < 2秒
- 支持200辆车辆同时在线
- GPS定位更新频率：10秒/次
- 数据实时同步延迟 < 5秒
- 系统可用性 99.9%
- 支持7×24小时运行

## 技术约束
- 前端：React + TypeScript
- 后端：Node.js / Java Spring Boot
- 数据库：PostgreSQL / MySQL
- 地图服务：高德地图 API / 百度地图 API
- GPS设备：支持北斗/GPS双模定位
- 移动端：支持iOS/Android司机端APP
- 消息推送：WebSocket实时推送
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
  const [docVersions, setDocVersions] = useState<DocumentVersion[]>([
    {
      version: 'V1.0',
      docContent: sampleDocContent,
      confirmed: false,
      createdAt: Date.now()
    }
  ])
  const [selectedVersion, setSelectedVersion] = useState('V1.0')
  const [isHistorySession, setIsHistorySession] = useState(false)
  const [isQuickEntry, setIsQuickEntry] = useState(false)
  const [firstUserInput, setFirstUserInput] = useState('')

  const sessionId = searchParams.get('sessionId')
  const requirementId = searchParams.get('id')
  const mode = searchParams.get('mode')

  const currentVersion = docVersions.find(v => v.version === selectedVersion) || docVersions[0]

  useEffect(() => {
    if (currentVersion) {
      setRequirementConfirmed(currentVersion.confirmed)
      setPptGenerated(!!currentVersion.pptUrl)
      setPrototypeGenerated(!!currentVersion.prototypeUrl)
      if (!currentVersion.pptUrl && activeTab === 'ppt') {
        setActiveTab('document')
      }
      if (!currentVersion.prototypeUrl && activeTab === 'prototype') {
        setActiveTab('document')
      }
    }
  }, [selectedVersion, currentVersion])

  const agentInfo = {
    name: '需求助手',
    description: '专业的需求分析助手，通过对话帮你梳理项目需求，自动生成文档、PPT和原型。'
  }

  const quickCategories = [
    { id: 'portal', name: '门户', icon: '🏢' },
    { id: 'lowcode', name: '低代码应用', icon: '⚡' },
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
        const newDocVersion = {
          version: 'V1.0',
          docContent: requirement.docContent || sampleDocContent,
          confirmed: requirement.status === 'confirmed',
          pptUrl: requirement.pptUrl,
          prototypeUrl: requirement.prototypeUrl,
          createdAt: Date.now()
        }
        
        setDocVersions([newDocVersion])
        
        if (requirement.pptUrl) {
          setPptGenerated(true)
        }
        if (requirement.prototypeUrl) {
          setPrototypeGenerated(true)
        }
        
        // 补充需求模式：直接进入聊天状态
        if (mode === 'supplement') {
          setPageState('chatting')
          setDocGenerated(true)
          setProgress(100)
          
          // 添加补充需求的提示消息
          const supplementMessage: Message = {
            id: `supplement-${Date.now()}`,
            role: 'assistant',
            content: `正在为需求「${requirement.name}」补充内容。您可以提出新的需求或修改建议，我会帮您更新文档。`,
            timestamp: new Date().toISOString(),
          }
          setMessages([supplementMessage])
        }
      }
    }
  }, [sessionId, requirementId, mode, sessions, requirements, setMessages, setProgress, setDocGenerated])

  const handleStartChat = (quickCategory?: string, firstMessage?: string) => {
    setPageState('chatting')

    if (quickCategory) {
      setIsQuickEntry(true)
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: quickCategory,
        timestamp: new Date().toISOString(),
      }
      addMessage(userMessage)

      setProgress(0)
      setCurrentStep(1)

      setTimeout(() => {
        const aiResponse: Message = {
          id: 'ai-analysis-1',
          role: 'assistant',
          content: `• 收到。看来我们要开始构建一个新的${quickCategory}模块了。\n\n• 请问你目前关注的是哪个业务领域？或者需要我为你提供一些应用场景的建议？`,
          timestamp: new Date().toISOString(),
        }
        addMessage(aiResponse)
      }, 500)
    } else {
      setIsQuickEntry(false)
      if (firstMessage) {
        setFirstUserInput(firstMessage)
        const userMessage: Message = {
          id: `user-${Date.now()}`,
          role: 'user',
          content: firstMessage,
          timestamp: new Date().toISOString(),
        }
        addMessage(userMessage)

        setProgress(0)
        setCurrentStep(1)

        setTimeout(() => {
          const aiResponse: Message = {
            id: 'ai-analysis-1',
            role: 'assistant',
            content: `• 收到。看来我们要开始构建一个新的${firstMessage}模块了。\n\n• 请问你目前关注的是哪个业务领域？或者需要我为你提供一些应用场景的建议？`,
            timestamp: new Date().toISOString(),
          }
          addMessage(aiResponse)
        }, 500)
      } else {
        setCurrentStep(1)
      }
    }
  }

  const handleSendMessage = (content: string) => {
    if (pageState === 'initial') {
      handleStartChat()
      return
    }

    const confirmedVersion = docVersions.find(v => v.confirmed)
    const isAfterConfirmation = !!confirmedVersion

    if (isAfterConfirmation) {
      const latestVersionNum = docVersions.length
      const newVersion = `V${latestVersionNum + 1}.0`
      const newDocVersion: DocumentVersion = {
        version: newVersion,
        docContent: sampleDocContent,
        confirmed: false,
        createdAt: Date.now()
      }
      setDocVersions(prev => [...prev, newDocVersion])
      setSelectedVersion(newVersion)
      setRequirementConfirmed(false)
      setPptGenerated(false)
      setPrototypeGenerated(false)
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

    const progressMap = [0, 30, 50, 70, 100]
    setProgress(progressMap[Math.min(nextStep, progressMap.length - 1)])

    if (isQuickEntry && currentStep === 1 && !firstUserInput) {
      setFirstUserInput(content)
    }

    setTimeout(() => {
      let aiResponse: Message

      if (nextStep === 1) {
        aiResponse = {
          id: 'ai-analysis-1',
          role: 'assistant',
          content: `• 收到。看来我们要开始构建一个新的${content}模块了。\n\n• 请问你目前关注的是哪个业务领域？或者需要我为你提供一些应用场景的建议？`,
          timestamp: new Date().toISOString(),
        }
      } else if (nextStep === 2) {
        aiResponse = {
          id: 'ai-analysis-2',
          role: 'assistant',
          content: `• 明白。针对 B 端企业的车辆管理，我建议从以下逻辑划分：\n\n• 员工端（移动端为主）：\n  - 用车申请、我的行程、还车确认、报销申请（油费/路桥费）。\n\n• 管理端（PC端为主）：\n  - 车辆档案库、驾驶员管理、车辆实时状态监控、派车调度、保险/维保提醒。\n\n• 决策端：\n  - 车辆利用率报表、费用分析统计。`,
          timestamp: new Date().toISOString(),
        }
      } else if (nextStep === 3) {
        aiResponse = {
          id: 'ai-analysis-3',
          role: 'assistant',
          content: `• 好的，这是为您设计的字段清单：\n\n• 车辆档案表：\n  - 车牌号（唯一）、车型、车架号、载人数、购入日期、所属部门、当前状态（空闲/使用中/维修中）、保险到期日。\n\n• 用车申请单：\n  - 申请人（关联用户）、用车部门、目的地、用车时间（起/止）、随行人数、申请理由、车辆类型要求、预估里程。`,
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
          if (isAfterConfirmation) {
            setDocVersions(prev => prev.map(v => {
              if (v.version === selectedVersion && !v.confirmed) {
                return { ...v, docContent: sampleDocContent }
              }
              return v
            }))
          }
          const newRequirement = {
            id: Date.now().toString(),
            name: firstUserInput || content,
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
    setDocVersions(prev => {
      const updated = prev.map(v => {
        if (v.version === selectedVersion) {
          return { ...v, confirmed: true }
        }
        return v
      })
      return updated
    })
    setRequirementConfirmed(true)
  }

  const handleGeneratePPT = () => {
    setDocVersions(prev => {
      const updated = prev.map(v => {
        if (v.version === selectedVersion && v.confirmed) {
          return { ...v, pptUrl: '/mock/ppt.pptx' }
        }
        return v
      })
      return updated
    })
    setPptGenerated(true)
    setActiveTab('ppt')
  }

  const handleGeneratePrototype = () => {
    setDocVersions(prev => {
      const updated = prev.map(v => {
        if (v.version === selectedVersion && v.confirmed) {
          return { ...v, prototypeUrl: '/mock/prototype' }
        }
        return v
      })
      return updated
    })
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
                } else if (mode === 'supplement' && requirementId) {
                  navigate(`/requirements/${requirementId}`)
                } else {
                  navigate('/')
                }
              }}
              className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{isHistorySession || mode === 'supplement' ? '返回需求详情' : '返回首页'}</span>
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
                onSend={(message) => handleStartChat(undefined, message)}
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
                        {docVersions.map((version) => (
                          <button
                            key={version.version}
                            onClick={() => {
                              setSelectedVersion(version.version)
                              const menu = document.getElementById('version-menu')
                              if (menu) {
                                menu.classList.add('hidden')
                              }
                            }}
                            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                              selectedVersion === version.version ? 'text-primary bg-blue-50' : 'text-gray-700'
                            }`}
                          >
                            {version.version}
                            {version.confirmed && ' ✓'}
                          </button>
                        ))}
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
                  {activeTab === 'document' && <DocPreview content={currentVersion.docContent} />}
                  {activeTab === 'ppt' && pptGenerated && <PPTPreview pptUrl={currentVersion.pptUrl || '/mock/ppt.pptx'} />}
                  {activeTab === 'prototype' && prototypeGenerated && <PrototypePreview prototypeUrl={currentVersion.prototypeUrl || '/mock/prototype'} />}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </PageLayout>
  )
}