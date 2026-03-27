import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, FileText, Trash2, Plus, MessageCircle, Package, FolderOpen, Clock, CheckCircle, User, Layout, Monitor } from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'
import { SidebarNav } from '@/components/requirement/SidebarNav'
import { StatusBadge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { ButtonGroup } from '@/components/common/ButtonGroup'
import { Card } from '@/components/common/Card'
import { DocPreview } from '@/components/preview/DocPreview'
import { PPTPreview } from '@/components/preview/PPTPreview'
import { PrototypePreview } from '@/components/preview/PrototypePreview'
import { useRequirementStore } from '@/stores/requirementStore'
import { useHistoryStore } from '@/stores/historyStore'

type ContentTab = 'overview' | 'document' | 'prototype' | 'ppt' | 'delivery' | 'source' | 'history'

export function RequirementDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { requirements, getAttachmentsByRequirementId, updateRequirement } = useRequirementStore()
  const { sessions } = useHistoryStore()
  const [activeTab, setActiveTab] = useState<ContentTab>('overview')
  const [pptGenerated, setPptGenerated] = useState(false)
  const [prototypeGenerated, setPrototypeGenerated] = useState(false)

  const requirement = requirements.find((r) => r.id === id)
  const attachments = id ? getAttachmentsByRequirementId(id) : []

  useEffect(() => {
    if (!requirement) {
      navigate('/requirements')
    }
  }, [requirement, navigate])

  if (!requirement) {
    return null
  }

  const handleSupplement = () => {
    navigate(`/requirements/${id}/supplement`)
  }

  const handleConfirm = () => {
    if (requirement && confirm('确认需求后，需求将被锁定并可以进行文档生成。是否确认？')) {
      updateRequirement(requirement.id, { status: 'confirmed' })
    }
  }

  const handleSubmitDevelopment = () => {
    if (requirement && confirm('确认提交开发？')) {
      updateRequirement(requirement.id, { status: 'submitted' })
    }
  }

  const handleGeneratePPT = () => {
    setPptGenerated(true)
    if (requirement) {
      updateRequirement(requirement.id, { pptUrl: `/mock/ppt_${requirement.id}.pptx` })
    }
  }

  const handleGeneratePrototype = () => {
    setPrototypeGenerated(true)
    if (requirement) {
      updateRequirement(requirement.id, { prototypeUrl: `/mock/prototype_${requirement.id}` })
    }
  }

  const handleWithdraw = () => {
    if (requirement && confirm('确认撤回？撤回到已确认状态。')) {
      updateRequirement(requirement.id, { status: 'confirmed' })
    }
  }

  const handleClose = () => {
    if (requirement && confirm('确认关闭需求？')) {
      updateRequirement(requirement.id, { status: 'draft' })
    }
  }

  const handleExport = () => {
    if (!requirement) return
    const content = requirement.docContent
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${requirement.name}_需求文档.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getActionButtons = () => {
    if (!requirement) return []

    const status = requirement.status

    if (status === 'draft') {
      return [
        { id: 'supplement', label: '补充需求', onClick: handleSupplement },
        { id: 'confirm', label: '确认需求', onClick: handleConfirm },
        { id: 'export', label: '导出需求', onClick: handleExport },
        { id: 'close', label: '关闭需求', onClick: handleClose },
      ]
    }

    if (status === 'confirmed' || status === 'rejected') {
      return [
        { id: 'supplement', label: '补充需求', onClick: handleSupplement },
        { id: 'prototype', label: '生成原型', onClick: handleGeneratePrototype, disabled: prototypeGenerated },
        { id: 'ppt', label: '生成PPT', onClick: handleGeneratePPT, disabled: pptGenerated },
        { id: 'submit', label: '提交开发', onClick: handleSubmitDevelopment },
        { id: 'export', label: '导出需求', onClick: handleExport },
        { id: 'close', label: '关闭需求', onClick: handleClose },
      ]
    }

    if (status === 'submitted' || status === 'developing') {
      return [
        { id: 'withdraw', label: '撤回', onClick: handleWithdraw },
        { id: 'export', label: '导出需求', onClick: handleExport },
        { id: 'close', label: '关闭需求', onClick: handleClose },
      ]
    }

    if (status === 'completed') {
      return [
        { id: 'export', label: '导出需求', onClick: handleExport },
      ]
    }

    return []
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{requirement.name}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>创建时间：{new Date(requirement.createdAt).toLocaleString('zh-CN')}</span>
                    <span>更新时间：{new Date(requirement.updatedAt).toLocaleString('zh-CN')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <ButtonGroup items={getActionButtons()} />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">项目进度</h3>
              <div className="relative">
                <div className="flex items-center justify-between">
                  {(() => {
                    const steps = [
                      { id: 'draft', label: '草稿', isActive: requirement.status === 'draft' },
                      { id: 'confirmed', label: '已确认', isActive: requirement.status === 'confirmed' },
                      { id: 'submitted', label: '已提交', isActive: requirement.status === 'submitted' },
                      { id: 'developing', label: '开发中', isActive: requirement.status === 'developing' },
                      { id: 'completed', label: '已完成', isActive: requirement.status === 'completed' },
                      { id: 'rejected', label: '已拒绝', isActive: requirement.status === 'rejected' },
                    ]
                    const activeIndex = steps.findIndex(s => s.isActive)
                    return steps.filter(s => s.id !== 'rejected' || s.isActive).map((step, index, arr) => {
                      const isActive = step.isActive
                      const isPast = activeIndex > index && step.id !== 'rejected'
                      const isRejected = step.id === 'rejected'
                      return (
                        <div key={step.id} className="flex items-center flex-1">
                          <div className={`flex flex-col items-center ${isActive ? 'z-10' : ''}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                              isRejected && isActive
                                ? 'bg-red-500 text-white ring-4 ring-red-100'
                                : isActive 
                                  ? 'bg-primary text-white ring-4 ring-blue-100' 
                                  : isPast 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-gray-200 text-gray-500'
                            }`}>
                              {isPast ? <CheckCircle className="w-5 h-5" /> : index + 1}
                            </div>
                            <span className={`text-xs mt-2 ${
                              isRejected && isActive ? 'text-red-600 font-medium' 
                              : isActive ? 'text-primary font-medium' 
                              : 'text-gray-500'
                            }`}>
                              {step.label}
                            </span>
                          </div>
                          {index < arr.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-2 ${isPast ? 'bg-green-500' : 'bg-gray-200'}`} />
                          )}
                        </div>
                      )
                    })
                  })()}
                </div>
              </div>
            </Card>

            {(() => {
              const isDraft = requirement.status === 'draft'
              const hasArtifacts = ['confirmed', 'submitted', 'developing', 'rejected'].includes(requirement.status)
              const isCompleted = requirement.status === 'completed'
              
              return (
                <div className="grid grid-cols-4 gap-4">
                  <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('history')}>
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MessageCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">2</div>
                    <div className="text-sm text-gray-500">对话轮次</div>
                  </Card>
                  {isCompleted && (
                    <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('delivery')}>
                      <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Package className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">3</div>
                      <div className="text-sm text-gray-500">交付资料</div>
                    </Card>
                  )}
                  {hasArtifacts && (
                    <>
                      <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('document')}>
                        <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-3">
                          <FileText className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">1</div>
                        <div className="text-sm text-gray-500">需求文档</div>
                      </Card>
                      <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('ppt')}>
                        <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Monitor className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">1</div>
                        <div className="text-sm text-gray-500">汇报方案</div>
                      </Card>
                      <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('prototype')}>
                        <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Layout className="w-6 h-6 text-pink-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">1</div>
                        <div className="text-sm text-gray-500">需求原型</div>
                      </Card>
                    </>
                  )}
                  {isDraft && (
                    <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('document')}>
                      <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FileText className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">1</div>
                      <div className="text-sm text-gray-500">需求文档</div>
                    </Card>
                  )}
                  <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('source')}>
                    <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FolderOpen className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{attachments.length}</div>
                    <div className="text-sm text-gray-500">原始资料</div>
                  </Card>
                </div>
              )
            })()}

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">需求概览</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">需求背景</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    随着业务快速发展，现有系统已无法满足日益增长的业务需求。需要构建一套全新的电商平台，支持B2C业务模式，具备完善的商品管理、订单履约、支付结算和物流配送能力。
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">需求目标</h4>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>打造用户友好的购物体验，提升转化率</li>
                    <li>建立高效的商品管理和订单履约体系</li>
                    <li>实现多渠道支付和物流配送整合</li>
                    <li>提供数据驱动的运营决策支持</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">需求更新记录</h3>
              <div className="space-y-4">
                {[
                  {
                    time: '2024-03-15 14:32',
                    action: '生成文档',
                    summary: 'AI根据对话内容自动生成需求文档',
                    icon: <FileText className="w-4 h-4 text-primary" />,
                    type: 'success'
                  },
                  {
                    time: '2024-03-15 10:15',
                    action: '新会话',
                    summary: '用户补充了技术架构和性能要求',
                    icon: <MessageCircle className="w-4 h-4 text-blue-600" />,
                    type: 'info'
                  },
                  {
                    time: '2024-03-14 16:45',
                    action: '状态变更',
                    summary: '需求状态从"草稿"变更为"已确认"',
                    icon: <CheckCircle className="w-4 h-4 text-green-600" />,
                    type: 'success'
                  },
                  {
                    time: '2024-03-14 09:20',
                    action: '创建需求',
                    summary: '用户创建了新的需求项目',
                    icon: <Plus className="w-4 h-4 text-gray-600" />,
                    type: 'default'
                  }
                ].map((item, index, arr) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        item.type === 'success' ? 'bg-green-100' : 
                        item.type === 'info' ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        {item.icon}
                      </div>
                      {index < arr.length - 1 && <div className="w-px flex-1 bg-gray-200 my-1" />}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-400">{item.time}</span>
                        <span className="px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-600">
                          {item.action}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{item.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )

      case 'document':
        return (
          <div className="h-full">
            <DocPreview content={requirement.docContent} />
          </div>
        )

      case 'prototype':
        return (
          <div className="h-full">
            <PrototypePreview prototypeUrl={requirement.prototypeUrl} />
          </div>
        )

      case 'ppt':
        return (
          <div className="h-full">
            <PPTPreview pptUrl={requirement.pptUrl} />
          </div>
        )

      case 'delivery':
        return (
          <div className="p-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">交付资料</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">安装包</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">应用安装包 v1.0.0.exe</p>
                          <p className="text-xs text-gray-500">Windows · 125.8 MB</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-green-100 rounded flex items-center justify-center">
                          <FileText className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">应用安装包 v1.0.0.dmg</p>
                          <p className="text-xs text-gray-500">macOS · 142.3 MB</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-purple-100 rounded flex items-center justify-center">
                          <FileText className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">应用安装包 v1.0.0.apk</p>
                          <p className="text-xs text-gray-500">Android · 89.2 MB</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">部署文档</h4>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">部署指导手册.pdf</p>
                        <p className="text-xs text-gray-500">包含详细的环境配置、部署步骤和故障排查指南</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )

      case 'source':
        const sourceAttachments = attachments.filter((a) => 
          a.category === 'meeting_minutes' || a.category === 'website_screenshot' || a.category === 'vi_spec'
        )

        return (
          <div className="p-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">原始资料</h3>
              {sourceAttachments.length > 0 ? (
                <div className="space-y-3">
                  {sourceAttachments.map((att) => (
                    <div
                      key={att.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        {att.fileType === 'image' ? (
                          <img
                            src={att.fileUrl}
                            alt={att.fileName}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                            <FileText className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{att.fileName}</p>
                          <p className="text-xs text-gray-500">
                            {att.category === 'meeting_minutes' && '会议纪要'}
                            {att.category === 'website_screenshot' && '官网截图'}
                            {att.category === 'vi_spec' && 'VI规范'}
                            {' · '}
                            {new Date(att.uploadedAt).toLocaleDateString('zh-CN')}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  暂无原始资料
                </div>
              )}
            </Card>
          </div>
        )

      case 'history':
        return (
          <div className="p-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-700" />
                  <h3 className="text-lg font-semibold text-gray-900">历史对话</h3>
                  <span className="ml-2 text-sm text-gray-500">({sessions.length} 条会话)</span>
                </div>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  清空历史
                </Button>
              </div>

              {sessions.length > 0 ? (
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="relative pl-6 pb-6 border-l-2 border-gray-300 last:pb-0"
                    >
                      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-gray-500 border-2 border-white shadow-sm" />
                      
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                        <Clock className="w-3.5 h-3.5" />
                        <span>
                          {new Date(session.updatedAt).toLocaleString('zh-CN', {
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>

                      <div 
                        className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => navigate(`/collection?sessionId=${session.id}&requirementId=${id}`)}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          {session.userName && (
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-sm font-medium text-gray-900">{session.userName}</span>
                            </div>
                          )}
                        </div>

                        <h4 className="text-sm font-semibold text-gray-800 mb-2">
                          {session.summary || '未命名会话'}
                        </h4>

                        {session.artifacts && session.artifacts.length > 0 && (
                          <div className="flex items-center space-x-2 flex-wrap">
                            {session.artifacts.map((artifact) => (
                              <a
                                key={artifact.id}
                                href={artifact.url}
                                onClick={(e) => {
                                  e.stopPropagation()
                                }}
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                                  artifact.type === 'document'
                                    ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                    : artifact.type === 'prototype'
                                    ? 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                                    : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                                }`}
                              >
                                {artifact.type === 'document' && <FileText className="w-3 h-3 mr-1" />}
                                {artifact.type === 'prototype' && <Layout className="w-3 h-3 mr-1" />}
                                {artifact.type === 'ppt' && <Monitor className="w-3 h-3 mr-1" />}
                                {artifact.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">暂无历史对话</p>
                  <Button>开始新对话</Button>
                </div>
              )}
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <PageLayout>
      <div className="h-[calc(100vh-64px)] flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/requirements')}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">{requirement.name}</h1>
              <StatusBadge status={requirement.status} />
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <SidebarNav activeItem={activeTab} onItemClick={setActiveTab} status={requirement.status} />
          <main className="flex-1 overflow-y-auto bg-bg-light p-4">{renderContent()}</main>
        </div>
      </div>
    </PageLayout>
  )
}