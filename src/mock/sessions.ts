import type { ChatSession } from '@/types'

export const mockSessions: ChatSession[] = [
  {
    id: 'session-1',
    requirementId: '1',
    messages: [
      {
        id: 'msg-1-1',
        role: 'user',
        content: '门户',
        timestamp: '2024-03-10T08:00:00Z',
      },
      {
        id: 'msg-1-2',
        role: 'assistant',
        content:
          '• 收到，门户。\n\n• 先确认几个关键信息：\na. 门户定位：这个统一门户是面向内部员工（B2E）、还是面向外部客户/供应商（B2B/B2C）？还是内外一体化？\nb. 统一范围：需要整合哪些现有系统？（如OA、ERP、CRM、HR、财务、生产管理等）\nc. 核心场景：用户登录门户后，最常用的3个场景是什么？\nd. 组织规模：预计覆盖多少用户？是否涉及多子公司/多层级组织架构？',
        timestamp: '2024-03-10T08:01:00Z',
      },
      {
        id: 'msg-1-3',
        role: 'user',
        content: '面向内部员工，整合OA、ERP、CRM系统，核心场景是审批待办、数据看板、业务申请',
        timestamp: '2024-03-10T08:05:00Z',
      },
      {
        id: 'msg-1-4',
        role: 'assistant',
        content:
          '• 收到，已了解门户定位和业务范围。\n\n• 基于您的描述，建议将门户定位如下：\na. 门户定位：内部员工统一门户\nb. 统一范围：整合OA、ERP、CRM等核心业务系统\nc. 核心场景：审批待办、数据看板、业务申请\n\n• 接下来，请描述一下您期望的核心功能模块有哪些？',
        timestamp: '2024-03-10T08:06:00Z',
      },
      {
        id: 'msg-1-5',
        role: 'user',
        content: '需要单点登录、待办中心、数据看板、消息通知',
        timestamp: '2024-03-10T08:10:00Z',
      },
      {
        id: 'msg-1-6',
        role: 'assistant',
        content: '• 收到，已记录核心功能需求。\n\n• 完美！我已经收集了所有必要的信息，正在生成需求文档...',
        timestamp: '2024-03-10T08:11:00Z',
      },
    ],
    progress: 100,
    createdAt: '2024-03-10T08:00:00Z',
    updatedAt: '2024-03-10T08:15:00Z',
    userName: '张伟',
    summary: '智能物流系统需求收集',
    artifacts: [
      { id: 'art-1-1', type: 'document', title: '需求文档' },
      { id: 'art-1-2', type: 'ppt', title: '方案PPT' },
      { id: 'art-1-3', type: 'prototype', title: '产品原型' },
    ],
  },
  {
    id: 'session-2',
    requirementId: '3',
    messages: [
      {
        id: 'msg-2-1',
        role: 'user',
        content: 'CRM系统',
        timestamp: '2024-03-15T09:00:00Z',
      },
      {
        id: 'msg-2-2',
        role: 'assistant',
        content:
          '• 收到，CRM系统。\n\n• 先确认几个关键信息：\na. 主要用户群体：销售团队、客服团队还是全公司？\nb. 核心业务场景：客户管理、销售线索、还是售后服务？\nc. 预计用户规模？\nd. 是否需要与现有系统集成？',
        timestamp: '2024-03-15T09:01:00Z',
      },
      {
        id: 'msg-2-3',
        role: 'user',
        content: '主要是销售团队使用，管理客户信息和销售线索，预计50人使用',
        timestamp: '2024-03-15T09:05:00Z',
      },
      {
        id: 'msg-2-4',
        role: 'assistant',
        content:
          '• 收到，已了解CRM定位。\n\n• 基于您的描述，建议功能模块：\na. 客户信息管理\nb. 销售线索追踪\nc. 跟进记录\nd. 销售报表\n\n• 是否还有其他需求？',
        timestamp: '2024-03-15T09:06:00Z',
      },
    ],
    progress: 70,
    createdAt: '2024-03-15T09:00:00Z',
    updatedAt: '2024-03-15T09:10:00Z',
    userName: '王强',
    summary: 'CRM客户管理系统需求收集',
    artifacts: [{ id: 'art-2-1', type: 'document', title: '需求文档' }],
  },
  {
    id: 'session-3',
    requirementId: '4',
    messages: [
      {
        id: 'msg-3-1',
        role: 'user',
        content: '车辆管理系统',
        timestamp: '2024-02-01T09:00:00Z',
      },
      {
        id: 'msg-3-2',
        role: 'assistant',
        content:
          '• 收到，车辆管理系统。\n\n• 请确认以下信息：\na. 车辆规模和类型？\nb. 主要管理场景有哪些？\nc. 是否需要GPS定位和实时监控？',
        timestamp: '2024-02-01T09:01:00Z',
      },
      {
        id: 'msg-3-3',
        role: 'user',
        content: '物流公司，200辆车，包括货车、面包车、轿车，需要车辆调度、维修保养、违章管理、GPS定位',
        timestamp: '2024-02-01T09:05:00Z',
      },
      {
        id: 'msg-3-4',
        role: 'assistant',
        content: '• 收到，已记录需求信息。\n\n• 完美！我已经收集了所有必要的信息，正在生成需求文档...',
        timestamp: '2024-02-01T09:06:00Z',
      },
    ],
    progress: 100,
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-02-01T09:15:00Z',
    userName: '刘芳',
    summary: '车辆管理系统需求收集',
    artifacts: [
      { id: 'art-3-1', type: 'document', title: '需求文档' },
      { id: 'art-3-2', type: 'ppt', title: '方案PPT' },
      { id: 'art-3-3', type: 'prototype', title: '产品原型' },
    ],
  },
  {
    id: 'session-4',
    requirementId: '5',
    messages: [
      {
        id: 'msg-4-1',
        role: 'user',
        content: '在线教育平台',
        timestamp: '2024-01-15T10:00:00Z',
      },
      {
        id: 'msg-4-2',
        role: 'assistant',
        content:
          '• 收到，在线教育平台。\n\n• 请确认以下信息：\na. 目标用户年龄段？\nb. 课程类型：直播、录播还是混合？\nc. 预计并发用户数？',
        timestamp: '2024-01-15T10:01:00Z',
      },
      {
        id: 'msg-4-3',
        role: 'user',
        content: 'K12学生，6-18岁，直播+录播混合，预计10000并发',
        timestamp: '2024-01-15T10:05:00Z',
      },
      {
        id: 'msg-4-4',
        role: 'assistant',
        content: '• 收到，已记录需求信息。\n\n• 完美！我已经收集了所有必要的信息，正在生成需求文档...',
        timestamp: '2024-01-15T10:06:00Z',
      },
    ],
    progress: 100,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:15:00Z',
    userName: '陈明',
    summary: '在线教育平台需求收集',
    artifacts: [
      { id: 'art-4-1', type: 'document', title: '需求文档' },
      { id: 'art-4-2', type: 'ppt', title: '方案PPT' },
      { id: 'art-4-3', type: 'prototype', title: '产品原型' },
    ],
  },
]
