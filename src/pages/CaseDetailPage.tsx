import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Copy, FileText, Layout, Presentation, Monitor, Smartphone, ShoppingCart, CreditCard, Truck, User, Search, Menu, Home } from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { DocPreview } from '@/components/preview/DocPreview'
import { useCaseStore } from '@/stores/caseStore'

const ecommerceDocContent = `# 电商平台需求文档

## 1. 项目概述

### 1.1 项目背景
随着互联网的快速发展，电子商务已成为现代商业的重要组成部分。本项目旨在构建一个功能完善、用户体验优秀的B2C电商平台，满足消费者线上购物需求。

### 1.2 项目目标
- 打造用户友好的购物体验
- 建立高效的商品管理和订单履约体系
- 实现多渠道支付和物流配送整合
- 提供数据驱动的运营决策支持

## 2. 目标用户

### 2.1 消费者端
- 年龄：18-45岁
- 特征：熟悉互联网，追求便捷购物体验
- 需求：商品搜索、比价、安全支付、物流追踪

### 2.2 商家端
- 中小型品牌商和经销商
- 个体工商户
- 需求：商品上架、订单管理、数据分析

## 3. 核心功能模块

### 3.1 用户系统
- 用户注册/登录（手机号、邮箱、第三方登录）
- 个人中心管理
- 收货地址管理
- 优惠券和积分管理

### 3.2 商品系统
- 商品分类管理（三级分类）
- 商品信息展示（图片、价格、库存、详情）
- 商品搜索与筛选
- 商品推荐算法
- 商品评价与问答

### 3.3 订单系统
- 购物车管理
- 订单创建与支付
- 订单状态流转（待支付、已支付、待发货、已发货、已完成）
- 订单取消与退款
- 售后管理（退货、换货）

### 3.4 支付系统
- 支持支付方式：微信支付、支付宝、银联
- 支付安全保障
- 支付异常处理

### 3.5 物流系统
- 物流信息追踪
- 多物流商对接
- 配送时效管理

## 4. 非功能需求

### 4.1 性能要求
- 页面加载时间 < 3秒
- 并发用户数 > 10000
- 订单处理能力 > 1000单/分钟

### 4.2 安全要求
- 用户数据加密存储
- 支付信息安全保障
- 防SQL注入、XSS攻击

### 4.3 可用性
- 系统可用性 > 99.9%
- 故障恢复时间 < 30分钟

## 5. 技术架构

### 5.1 前端技术栈
- React + TypeScript
- 移动端：React Native
- 状态管理：Redux Toolkit
- UI组件库：Ant Design

### 5.2 后端技术栈
- Spring Boot + Java
- 数据库：MySQL + Redis
- 消息队列：RabbitMQ
- 搜索引擎：Elasticsearch

### 5.3 基础设施
- 云服务：阿里云
- CDN加速
- 对象存储：OSS
- 容器化部署：Kubernetes

## 6. 项目实施计划

### 6.1 里程碑
- M1（1-2月）：用户系统、商品系统
- M2（3-4月）：订单系统、支付系统
- M3（5-6月）：物流系统、运营后台
- M4（7月）：测试优化、上线部署

### 6.2 团队配置
- 产品经理：1人
- UI设计师：2人
- 前端开发：4人
- 后端开发：6人
- 测试工程师：2人

## 7. 风险评估

### 7.1 技术风险
- 高并发场景下的系统稳定性
- 支付系统的安全性

### 7.2 业务风险
- 市场竞争激烈
- 用户获取成本高

## 8. 预期效果

### 8.1 业务指标
- 首年GMV目标：5000万元
- 注册用户：100万
- 日活跃用户：10万

### 8.2 技术指标
- 系统响应时间 < 2秒
- 订单处理成功率 > 99.5%
`

type ContentTab = 'overview' | 'document' | 'ppt' | 'prototype'

interface NavGroup {
  id: string
  label: string
  icon: React.ReactNode
  items?: { id: ContentTab; label: string }[]
}

const navGroups: NavGroup[] = [
  { id: 'overview', label: '概览', icon: <FileText className="w-4 h-4" /> },
  {
    id: 'project',
    label: '项目资料',
    icon: <FileText className="w-4 h-4" />,
    items: [
      { id: 'document', label: '需求文档' },
      { id: 'ppt', label: '方案PPT' },
      { id: 'prototype', label: '产品原型' },
    ],
  },
]

function SidebarNav({ activeItem, onItemClick }: { activeItem: ContentTab; onItemClick: (item: ContentTab) => void }) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['project']))

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

  return (
    <nav className="w-60 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0">
      <div className="py-4">
        {navGroups.map((group) => (
          <div key={group.id}>
            {group.items ? (
              <>
                <button
                  onClick={() => toggleGroup(group.id)}
                  className={`w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors ${
                    activeItem === group.id || group.items.some((item) => item.id === activeItem)
                      ? 'bg-blue-50 text-primary'
                      : ''
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {group.icon}
                    <span>{group.label}</span>
                  </div>
                </button>
                {expandedGroups.has(group.id) && (
                  <div className="ml-4 border-l border-gray-200">
                    {group.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => onItemClick(item.id)}
                        className={`w-full flex items-center space-x-2 px-4 py-2 text-sm transition-colors ${
                          activeItem === item.id
                            ? 'bg-blue-50 text-primary border-l-2 border-primary -ml-px pl-[calc(1rem-1px)]'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => onItemClick(group.id as ContentTab)}
                className={`w-full flex items-center space-x-2 px-4 py-2 text-sm transition-colors ${
                  activeItem === group.id
                    ? 'bg-blue-50 text-primary border-l-2 border-primary'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {group.icon}
                <span>{group.label}</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}

export function CaseDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<ContentTab>('overview')
  const { getCaseById } = useCaseStore()

  const caseData = getCaseById(id || '')

  if (!caseData) {
    return (
      <PageLayout showNavbar={false}>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">案例不存在</h1>
          <Button onClick={() => navigate('/cases')}>返回案例列表</Button>
        </div>
      </PageLayout>
    )
  }

  const handleReuse = () => {
    navigate(`/collection?caseId=${id}&mode=reuse`)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={caseData.thumbnail}
                    alt={caseData.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-50 text-primary text-xs rounded">{caseData.industry}</span>
                    <span className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded">{caseData.scale}</span>
                    <span className="text-gray-400 text-sm">{caseData.completionDate} 完成</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{caseData.title}</h2>
                  <p className="text-gray-600 leading-relaxed">{caseData.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {caseData.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">案例亮点</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">30%</div>
                  <div className="text-sm text-gray-600">运营效率提升</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">50万+</div>
                  <div className="text-sm text-gray-600">累计用户</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">99.9%</div>
                  <div className="text-sm text-gray-600">系统可用性</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">产出物预览</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('document')}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-all text-left"
                >
                  <FileText className="w-8 h-8 text-primary mb-3" />
                  <div className="font-medium text-gray-900">需求文档</div>
                  <div className="text-sm text-gray-500 mt-1">查看完整需求文档</div>
                </button>
                <button
                  onClick={() => setActiveTab('ppt')}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-all text-left"
                >
                  <Presentation className="w-8 h-8 text-primary mb-3" />
                  <div className="font-medium text-gray-900">方案PPT</div>
                  <div className="text-sm text-gray-500 mt-1">查看汇报方案</div>
                </button>
                <button
                  onClick={() => setActiveTab('prototype')}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-all text-left"
                >
                  <Layout className="w-8 h-8 text-primary mb-3" />
                  <div className="font-medium text-gray-900">产品原型</div>
                  <div className="text-sm text-gray-500 mt-1">查看交互原型</div>
                </button>
              </div>
            </Card>
          </div>
        )

      case 'document':
        return (
          <div className="h-full">
            <DocPreview content={ecommerceDocContent} />
          </div>
        )

      case 'ppt':
        return (
          <div className="h-full bg-white">
            <div className="max-w-4xl mx-auto p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">电商平台建设方案</h2>
                <p className="text-gray-500">B2C电商全渠道解决方案</p>
              </div>
              
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
                    项目背景与目标
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-1">5000万</div>
                      <div className="text-sm text-gray-600">首年GMV目标</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-1">100万</div>
                      <div className="text-sm text-gray-600">注册用户目标</div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
                    核心功能架构
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {['用户系统', '商品系统', '订单系统', '支付系统', '物流系统', '营销系统'].map((item, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded text-center text-sm">{item}</div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm mr-3">3</span>
                    技术架构
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                        <Monitor className="w-8 h-8 text-primary" />
                      </div>
                      <div className="text-sm">前端</div>
                    </div>
                    <div className="flex-1 h-px bg-gray-200 mx-4" />
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                        <Layout className="w-8 h-8 text-green-600" />
                      </div>
                      <div className="text-sm">后端</div>
                    </div>
                    <div className="flex-1 h-px bg-gray-200 mx-4" />
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                        <Smartphone className="w-8 h-8 text-purple-600" />
                      </div>
                      <div className="text-sm">移动端</div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm mr-3">4</span>
                    项目里程碑
                  </h3>
                  <div className="space-y-3">
                    {[
                      { phase: '第一阶段', time: '1-2月', content: '用户系统、商品系统开发' },
                      { phase: '第二阶段', time: '3-4月', content: '订单系统、支付系统开发' },
                      { phase: '第三阶段', time: '5-6月', content: '物流系统、运营后台开发' },
                      { phase: '第四阶段', time: '7月', content: '测试优化、上线部署' },
                    ].map((milestone, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className="w-20 text-sm font-medium text-primary">{milestone.phase}</div>
                        <div className="w-16 text-sm text-gray-500">{milestone.time}</div>
                        <div className="flex-1 text-sm text-gray-700">{milestone.content}</div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm mr-3">5</span>
                    预期效果
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4">
                      <div className="text-3xl font-bold text-primary mb-2">&lt;2s</div>
                      <div className="text-sm text-gray-600">页面响应时间</div>
                    </div>
                    <div className="text-center p-4">
                      <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
                      <div className="text-sm text-gray-600">系统可用性</div>
                    </div>
                    <div className="text-center p-4">
                      <div className="text-3xl font-bold text-purple-600 mb-2">10000+</div>
                      <div className="text-sm text-gray-600">并发支持</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )

      case 'prototype':
        return (
          <div className="h-full bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">电商平台交互原型</h3>
                <p className="text-sm text-gray-500">包含完整的用户端页面流程</p>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-[9/16] bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                    <Home className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="text-sm font-medium text-center">首页</div>
                  <div className="text-xs text-gray-500 text-center mt-1">商品推荐、分类入口</div>
                </Card>
                
                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-[9/16] bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="text-sm font-medium text-center">搜索页</div>
                  <div className="text-xs text-gray-500 text-center mt-1">商品搜索、筛选</div>
                </Card>
                
                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-[9/16] bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                    <ShoppingCart className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="text-sm font-medium text-center">商品详情</div>
                  <div className="text-xs text-gray-500 text-center mt-1">商品信息、加入购物车</div>
                </Card>
                
                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-[9/16] bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                    <Menu className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="text-sm font-medium text-center">购物车</div>
                  <div className="text-xs text-gray-500 text-center mt-1">商品管理、结算</div>
                </Card>
                
                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-[9/16] bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                    <CreditCard className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="text-sm font-medium text-center">订单确认</div>
                  <div className="text-xs text-gray-500 text-center mt-1">地址选择、支付方式</div>
                </Card>
                
                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-[9/16] bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                    <Truck className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="text-sm font-medium text-center">订单列表</div>
                  <div className="text-xs text-gray-500 text-center mt-1">订单状态、物流追踪</div>
                </Card>
                
                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-[9/16] bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="text-sm font-medium text-center">个人中心</div>
                  <div className="text-xs text-gray-500 text-center mt-1">个人信息、优惠券</div>
                </Card>
                
                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-[9/16] bg-gray-200 rounded-lg mb-3 flex items-center justify-center border-2 border-dashed border-gray-300">
                    <span className="text-gray-400 text-xs">+</span>
                  </div>
                  <div className="text-sm font-medium text-center">更多页面</div>
                  <div className="text-xs text-gray-500 text-center mt-1">共15个页面</div>
                </Card>
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">核心页面流程</h4>
                <div className="flex items-center justify-between">
                  {['首页浏览', '商品搜索', '加入购物车', '提交订单', '支付完成', '查看物流'].map((step, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-24 text-center">
                        <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-sm mb-2 mx-auto">
                          {i + 1}
                        </div>
                        <div className="text-xs text-gray-600">{step}</div>
                      </div>
                      {i < 5 && (
                        <div className="w-8 h-px bg-gray-300" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <PageLayout showNavbar={false}>
      <div className="h-screen flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/cases')}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">案例详情</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button onClick={handleReuse}>
                <Copy className="w-4 h-4 mr-2" />
                复用此需求
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <SidebarNav activeItem={activeTab} onItemClick={setActiveTab} />
          <main className="flex-1 overflow-y-auto bg-bg-light p-6">{renderContent()}</main>
        </div>
      </div>
    </PageLayout>
  )
}