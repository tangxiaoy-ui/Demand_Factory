import type { Requirement, Attachment } from '@/types'

export const mockRequirements: Requirement[] = [
  {
    id: '0',
    name: '智能客服系统',
    status: 'rejected',
    docContent: `# 智能客服系统需求文档

## 项目概述
基于AI的智能客服系统，支持多渠道接入、智能问答、工单管理等功能。

## 目标用户
- 电商企业
- 金融机构
- 政府部门
`,
    createdAt: '2024-03-20T10:00:00Z',
    updatedAt: '2024-03-20T10:00:00Z',
    userId: 'user1',
    customer: '智汇科技有限公司',
    submitter: '赵敏',
    rejectionReason: '需求描述不够详细，缺少具体的技术实现方案和预算说明。请补充完整后再提交。',
  },
  {
    id: '6',
    name: '移动端支付系统',
    status: 'draft',
    docContent: `# 移动端支付系统需求文档

## 项目概述
开发一个安全、便捷的移动支付系统，支持多种支付方式、即时到账、交易查询等功能。

## 目标用户
- 个人用户
- 商户
- 开发者

## 核心功能
1. 扫码支付
2. 近场通信支付
3. 在线支付
4. 交易记录查询
5. 账户管理

## 安全要求
- 支付数据加密传输
- 支付密码验证
- 交易短信验证
- 异常交易检测
`,
    createdAt: '2024-03-24T16:30:00Z',
    updatedAt: '2024-03-24T16:30:00Z',
    userId: 'user1',
    customer: '迅捷支付科技有限公司',
    submitter: '李华',
  },
  {
    id: '1',
    name: '智能物流系统',
    status: 'confirmed',
    docContent: `# 智能物流系统需求文档

## 项目概述
物流配送管理系统，支持智能路线规划、实时追踪、仓库管理等功能。

## 目标用户
- 物流公司
- 配送员
- 仓库管理员
- 商家
`,
    createdAt: '2024-03-10T08:00:00Z',
    updatedAt: '2024-03-10T08:00:00Z',
    userId: 'user1',
    customer: '顺达物流公司',
    submitter: '张伟',
  },
  {
    id: '3',
    name: 'CRM客户管理系统',
    status: 'submitted',
    docContent: `# CRM客户管理系统需求文档

## 项目概述
客户关系管理系统，帮助企业有效管理客户信息、销售线索、营销活动等。

## 目标用户
- 销售人员
- 销售经理
- 市场营销人员
- 客服人员

## 核心功能
1. 客户信息管理
2. 销售线索追踪
3. 营销活动管理
4. 报表分析
5. 任务提醒
`,
    createdAt: '2024-03-15T09:00:00Z',
    updatedAt: '2024-03-18T14:30:00Z',
    userId: 'user1',
    customer: '天成软件公司',
    submitter: '王强',
  },
  {
    id: '4',
    name: '企业OA系统',
    status: 'developing',
    docContent: `# 企业OA系统需求文档

## 项目概述
企业内部办公自动化系统，包含审批流程、日程管理、公告通知、文档管理等模块。

## 目标用户
- 企业员工
- 部门经理
- 行政人员
- 高层管理者

## 核心功能
1. 审批流程管理
2. 日程安排
3. 公告通知
4. 文档管理
5. 通讯录
6. 数据报表
`,
    pptUrl: '/mock/ppt2.pptx',
    prototypeUrl: '/mock/prototype2',
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-02-10T14:00:00Z',
    userId: 'user1',
    customer: '华泰制造集团',
    submitter: '刘芳',
  },
  {
    id: '5',
    name: '在线教育平台',
    status: 'completed',
    docContent: `# 在线教育平台需求文档

## 项目概述
构建一个面向K12学生的在线教育平台，提供直播课程、录播课程、作业系统、考试系统等功能。

## 目标用户
- 小学生（6-12岁）
- 初中生（12-15岁）
- 高中生（15-18岁）
- 家长

## 核心功能
1. 课程管理系统
2. 直播课堂
3. 录播课程
4. 作业系统
5. 考试系统
6. 学习进度追踪

## 非功能需求
- 支持10000并发用户
- 视频延迟小于3秒
- 系统可用性99.9%
`,
    pptUrl: '/mock/ppt1.pptx',
    prototypeUrl: '/mock/prototype1',
    codePackageUrl: '/mock/code1.zip',
    manualUrl: '/mock/manual1.pdf',
    deliveryFilesCount: 4,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
    userId: 'user1',
    customer: '智学教育集团',
    submitter: '陈明',
  },
]

export const mockAttachments: Attachment[] = [
  {
    id: 'a1',
    requirementId: '1',
    fileName: '需求评审会议纪要.md',
    fileUrl: '/mock/attachments/meeting1.md',
    fileType: 'document',
    category: 'meeting_minutes',
    uploadedAt: '2024-03-10T10:00:00Z',
  },
  {
    id: 'a2',
    requirementId: '1',
    fileName: '技术方案讨论会议纪要.md',
    fileUrl: '/mock/attachments/meeting2.md',
    fileType: 'document',
    category: 'meeting_minutes',
    uploadedAt: '2024-03-11T14:00:00Z',
  },
  {
    id: 'a3',
    requirementId: '1',
    fileName: '竞品分析-顺丰物流.png',
    fileUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    fileType: 'image',
    category: 'website_screenshot',
    uploadedAt: '2024-03-10T16:00:00Z',
  },
  {
    id: 'a4',
    requirementId: '1',
    fileName: '竞品分析-京东物流.png',
    fileUrl: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800',
    fileType: 'image',
    category: 'website_screenshot',
    uploadedAt: '2024-03-10T16:30:00Z',
  },
  {
    id: 'a5',
    requirementId: '1',
    fileName: '品牌VI设计规范手册.pdf',
    fileUrl: '/mock/attachments/vi.pdf',
    fileType: 'pdf',
    category: 'vi_spec',
    uploadedAt: '2024-03-12T09:00:00Z',
  },
  {
    id: 'a6',
    requirementId: '3',
    fileName: 'CRM需求调研会议纪要.md',
    fileUrl: '/mock/attachments/crm-meeting1.md',
    fileType: 'document',
    category: 'meeting_minutes',
    uploadedAt: '2024-03-15T10:00:00Z',
  },
  {
    id: 'a7',
    requirementId: '3',
    fileName: '原型评审会议纪要.md',
    fileUrl: '/mock/attachments/crm-meeting2.md',
    fileType: 'document',
    category: 'meeting_minutes',
    uploadedAt: '2024-03-16T15:00:00Z',
  },
  {
    id: 'a8',
    requirementId: '3',
    fileName: 'Salesforce官网参考.png',
    fileUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    fileType: 'image',
    category: 'website_screenshot',
    uploadedAt: '2024-03-15T14:00:00Z',
  },
  {
    id: 'a9',
    requirementId: '3',
    fileName: 'CRM系统VI规范 v2.0.pdf',
    fileUrl: '/mock/attachments/crm-vi.pdf',
    fileType: 'pdf',
    category: 'vi_spec',
    uploadedAt: '2024-03-17T11:00:00Z',
  },
  {
    id: 'a10',
    requirementId: '4',
    fileName: 'OA系统启动会议纪要.md',
    fileUrl: '/mock/attachments/oa-meeting1.md',
    fileType: 'document',
    category: 'meeting_minutes',
    uploadedAt: '2024-02-02T09:00:00Z',
  },
  {
    id: 'a11',
    requirementId: '4',
    fileName: '钉钉产品参考.png',
    fileUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
    fileType: 'image',
    category: 'website_screenshot',
    uploadedAt: '2024-02-03T14:00:00Z',
  },
  {
    id: 'a12',
    requirementId: '4',
    fileName: '企业微信产品参考.png',
    fileUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    fileType: 'image',
    category: 'website_screenshot',
    uploadedAt: '2024-02-03T14:30:00Z',
  },
  {
    id: 'a13',
    requirementId: '5',
    fileName: '在线教育平台需求评审.md',
    fileUrl: '/mock/attachments/edu-meeting1.md',
    fileType: 'document',
    category: 'meeting_minutes',
    uploadedAt: '2024-01-16T10:00:00Z',
  },
  {
    id: 'a14',
    requirementId: '5',
    fileName: '在线教育平台UI设计会议.md',
    fileUrl: '/mock/attachments/edu-meeting2.md',
    fileType: 'document',
    category: 'meeting_minutes',
    uploadedAt: '2024-01-18T14:00:00Z',
  },
  {
    id: 'a15',
    requirementId: '5',
    fileName: '学而思官网参考.png',
    fileUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
    fileType: 'image',
    category: 'website_screenshot',
    uploadedAt: '2024-01-16T15:00:00Z',
  },
  {
    id: 'a16',
    requirementId: '5',
    fileName: '猿辅导官网参考.png',
    fileUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
    fileType: 'image',
    category: 'website_screenshot',
    uploadedAt: '2024-01-16T15:30:00Z',
  },
  {
    id: 'a17',
    requirementId: '5',
    fileName: '教育平台品牌VI手册.pdf',
    fileUrl: '/mock/attachments/edu-vi.pdf',
    fileType: 'pdf',
    category: 'vi_spec',
    uploadedAt: '2024-01-19T10:00:00Z',
  },
]