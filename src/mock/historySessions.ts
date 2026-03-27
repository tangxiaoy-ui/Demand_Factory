import type { ChatSession } from '@/types'
import type { Message } from '@/types'

export const mockHistorySessions: ChatSession[] = [
  {
    id: '1',
    requirementId: '0',
    messages: [
      { role: 'user', content: '你好，我想讨论智能客服系统的需求细节' } as Message,
      { role: 'assistant', content: '好的，我们可以从功能模块和技术架构两个方面来讨论。智能客服系统通常包括自动应答、人工转接、知识库管理、数据分析等核心模块。' } as Message,
      { role: 'user', content: '那技术架构方面有什么建议吗？' } as Message,
      { role: 'assistant', content: '建议采用微服务架构，使用自然语言处理技术实现智能问答，同时支持多渠道接入（网页、APP、微信等）。后端可以使用 Node.js 或 Python，数据库推荐使用 MySQL + Redis 组合。' } as Message,
    ],
    progress: 100,
    createdAt: '2024-03-26T09:30:00Z',
    updatedAt: '2024-03-26T10:15:00Z',
    userName: '张经理',
    summary: '讨论智能客服系统的需求细节，确定了基本功能模块和技术架构',
    artifacts: [
      { id: '1-1', type: 'document', title: '需求文档', url: '#' },
      { id: '1-2', type: 'prototype', title: '原型', url: '#' },
    ],
  },
  {
    id: '2',
    requirementId: '1',
    messages: [
      { role: 'user', content: '我需要一个项目管理平台' } as Message,
      { role: 'assistant', content: '好的，项目管理平台需要哪些核心功能？比如任务管理、进度跟踪、团队协作等。' } as Message,
      { role: 'user', content: '重点是用户权限管理和报表生成功能' } as Message,
      { role: 'assistant', content: '明白了。用户权限管理需要支持角色定义（管理员、项目经理、成员等），可以按项目、部门进行权限控制。报表功能可以包括项目进度报表、资源使用率、任务完成情况统计等。建议使用 RBAC 权限模型。' } as Message,
    ],
    progress: 85,
    createdAt: '2024-03-26T08:00:00Z',
    updatedAt: '2024-03-26T09:20:00Z',
    userName: '李总监',
    summary: '项目管理平台需求分析，明确用户权限管理和报表生成功能',
    artifacts: [
      { id: '2-1', type: 'document', title: '需求文档', url: '#' },
      { id: '2-2', type: 'ppt', title: 'PPT', url: '#' },
    ],
  },
  {
    id: '3',
    requirementId: '2',
    messages: [
      { role: 'user', content: '我们需要一个数据可视化大屏' } as Message,
      { role: 'assistant', content: '数据可视化大屏主要用于展示什么类型的数据？比如销售数据、运营指标、实时监控等。' } as Message,
      { role: 'user', content: '主要是业务指标和实时监控数据' } as Message,
      { role: 'assistant', content: '建议使用 ECharts 或 D3.js 作为图表库，图表类型可以包括：折线图（趋势分析）、柱状图（对比分析）、饼图（占比分析）、地图（地域分布）、数字翻牌器（核心指标）。交互方面支持点击下钻、图表联动、数据刷新等。' } as Message,
    ],
    progress: 60,
    createdAt: '2024-03-25T16:30:00Z',
    updatedAt: '2024-03-25T17:45:00Z',
    userName: '王工程师',
    summary: '数据可视化大屏设计讨论，确定图表类型和交互方案',
    artifacts: [
      { id: '3-1', type: 'prototype', title: '原型', url: '#' },
      { id: '3-2', type: 'ppt', title: 'PPT', url: '#' },
    ],
  },
  {
    id: '4',
    messages: [
      { role: 'user', content: '想调研一下新功能需求' } as Message,
      { role: 'assistant', content: '好的，我们可以从用户反馈、竞品分析、行业趋势三个维度来收集需求。' } as Message,
      { role: 'user', content: '已经收集了一些用户反馈，需要整理改进建议' } as Message,
      { role: 'assistant', content: '建议将用户反馈按优先级分类，包括：高频需求（多人提出）、紧急需求（影响使用）、体验优化（提升满意度）。同时可以结合用户画像和使用场景，制定产品迭代计划。' } as Message,
    ],
    progress: 40,
    createdAt: '2024-03-25T14:00:00Z',
    updatedAt: '2024-03-25T15:30:00Z',
    userName: '刘产品',
    summary: '新功能需求调研，收集用户反馈并整理改进建议',
  },
  {
    id: '5',
    requirementId: '3',
    messages: [
      { role: 'user', content: '系统需要优化架构' } as Message,
      { role: 'assistant', content: '当前系统主要面临哪些问题？性能瓶颈、扩展性差还是维护困难？' } as Message,
      { role: 'user', content: '主要是扩展性和维护性问题' } as Message,
      { role: 'assistant', content: '建议采用微服务架构拆分策略：1) 按业务领域拆分（用户服务、订单服务、支付服务等）2) 每个服务独立部署、独立扩展 3) 使用 API 网关统一管理 4) 引入消息队列实现服务解耦 5) 分布式事务采用 Saga 模式。这样可以让团队并行开发，提高系统可维护性。' } as Message,
    ],
    progress: 100,
    createdAt: '2024-03-24T11:00:00Z',
    updatedAt: '2024-03-24T12:00:00Z',
    userName: '陈架构师',
    summary: '系统架构优化方案讨论，确定微服务拆分策略',
    artifacts: [
      { id: '5-1', type: 'document', title: '需求文档', url: '#' },
      { id: '5-2', type: 'ppt', title: 'PPT', url: '#' },
    ],
  },
]
