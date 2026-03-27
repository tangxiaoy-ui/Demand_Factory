import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Case } from '@/types'

interface PublishCaseData {
  id: string
  title: string
  description: string
  tags: string[]
  isAnonymized: boolean
  industry: string
  scale: string
}

interface CaseState {
  cases: Case[]
  togglePublish: (id: string) => void
  toggleRecommend: (id: string) => void
  publishCase: (data: PublishCaseData) => void
  getPublishedCases: () => Case[]
  getCaseById: (id: string) => Case | undefined
}

const initialCases: Case[] = [
  {
    id: '1',
    title: '电商平台需求分析',
    description: '完整的B2C电商平台需求文档,包含商品管理、订单系统、支付模块等核心功能。支持多种支付方式,具备完善的订单履约流程。',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    tags: ['电商', 'B2C', '支付'],
    industry: '电商零售',
    scale: '大型',
    completionDate: '2024-03',
    isPublished: true,
    isRecommended: true,
  },
  {
    id: '2',
    title: '企业协作平台',
    description: '面向企业的在线协作工具,支持项目管理、文档共享、即时通讯等功能。提升团队协同效率,实现信息实时同步。',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    tags: ['协作', '企业', '效率'],
    industry: '企业服务',
    scale: '中型',
    completionDate: '2024-02',
    isPublished: true,
    isRecommended: false,
  },
  {
    id: '3',
    title: '智能客服系统',
    description: '基于AI的智能客服解决方案,支持多渠道接入、知识库管理、工单系统。7×24小时自动响应,大幅降低人工成本。',
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
    tags: ['AI', '客服', '自动化'],
    industry: '人工智能',
    scale: '大型',
    completionDate: '2024-01',
    isPublished: true,
    isRecommended: true,
  },
  {
    id: '4',
    title: '在线教育平台',
    description: 'K12在线教育解决方案,涵盖直播课堂、录播课程、作业系统、考试测评等模块。支持万人同时在线学习。',
    thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=300&fit=crop',
    tags: ['教育', '直播', '在线学习'],
    industry: '教育培训',
    scale: '大型',
    completionDate: '2024-03',
    isPublished: true,
    isRecommended: false,
  },
  {
    id: '5',
    title: '智慧物流管理系统',
    description: '物流行业数字化转型方案,包含智能调度、实时追踪、仓储管理、配送优化等核心功能,提升物流运营效率。',
    thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop',
    tags: ['物流', '供应链', '智能调度'],
    industry: '物流运输',
    scale: '中型',
    completionDate: '2024-02',
    isPublished: false,
    isRecommended: false,
  },
  {
    id: '6',
    title: '医疗预约问诊平台',
    description: '互联网医疗解决方案,支持在线挂号、视频问诊、电子处方、健康管理等功能,连接医患两端,优化就医体验。',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop',
    tags: ['医疗', '互联网+', '问诊'],
    industry: '医疗健康',
    scale: '中型',
    completionDate: '2024-01',
    isPublished: true,
    isRecommended: false,
  },
  {
    id: '7',
    title: '金融风控决策引擎',
    description: '基于大数据和机器学习的金融风控系统,实现实时风控决策、反欺诈检测、信用评估等功能,保障金融业务安全。',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    tags: ['金融', '风控', '大数据'],
    industry: '金融科技',
    scale: '大型',
    completionDate: '2024-03',
    isPublished: true,
    isRecommended: true,
  },
  {
    id: '8',
    title: '餐饮外卖配送系统',
    description: '餐饮外卖行业解决方案,涵盖商户管理、订单配送、骑手调度、营销活动等模块,支持高并发订单处理。',
    thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    tags: ['餐饮', '外卖', '配送'],
    industry: '餐饮外卖',
    scale: '大型',
    completionDate: '2024-02',
    isPublished: false,
    isRecommended: false,
  },
  {
    id: '9',
    title: '智慧园区管理平台',
    description: '园区数字化转型方案,集成安防监控、能耗管理、停车管理、访客预约等功能,打造智能化园区运营体系。',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    tags: ['园区', '智慧化', 'IoT'],
    industry: '智慧城市',
    scale: '中型',
    completionDate: '2024-01',
    isPublished: false,
    isRecommended: false,
  },
  {
    id: '10',
    title: '社交社区应用',
    description: '兴趣社交社区平台,支持内容创作、话题讨论、活动组织、群组互动等功能,构建高粘性用户社区生态。',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
    tags: ['社交', '社区', '内容'],
    industry: '社交网络',
    scale: '大型',
    completionDate: '2024-03',
    isPublished: true,
    isRecommended: true,
  },
  {
    id: '11',
    title: '智能制造执行系统(MES)',
    description: '制造业数字化转型的核心系统,实现生产计划调度、质量管理、设备监控、物料追溯等功能,提升生产效率30%。',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
    tags: ['制造', 'MES', '数字化转型'],
    industry: '智能制造',
    scale: '大型',
    completionDate: '2024-03',
    isPublished: false,
    isRecommended: false,
  },
  {
    id: '12',
    title: '智慧零售门店管理系统',
    description: '新零售门店智能化解决方案,集成客流分析、智能陈列、会员管理、库存优化等功能,助力门店数字化转型。',
    thumbnail: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400&h=300&fit=crop',
    tags: ['零售', '新零售', '门店管理'],
    industry: '电商零售',
    scale: '中型',
    completionDate: '2024-02',
    isPublished: false,
    isRecommended: false,
  },
  {
    id: '13',
    title: '企业级数据分析平台',
    description: '一站式商业智能平台,支持多数据源接入、可视化报表、实时数据分析、AI预测等功能,驱动数据决策。',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    tags: ['数据分析', 'BI', '商业智能'],
    industry: '企业服务',
    scale: '大型',
    completionDate: '2024-03',
    isPublished: false,
    isRecommended: false,
  },
]

export const useCaseStore = create<CaseState>()(
  persist(
    (set, get) => ({
      cases: initialCases,
      togglePublish: (id) =>
        set((state) => ({
          cases: state.cases.map((c) =>
            c.id === id ? { ...c, isPublished: !c.isPublished } : c
          ),
        })),
      toggleRecommend: (id) =>
        set((state) => ({
          cases: state.cases.map((c) =>
            c.id === id ? { ...c, isRecommended: !c.isRecommended } : c
          ),
        })),
      publishCase: (data) =>
        set((state) => ({
          cases: state.cases.map((c) =>
            c.id === data.id
              ? {
                  ...c,
                  title: data.title,
                  description: data.description,
                  tags: data.tags,
                  isAnonymized: data.isAnonymized,
                  industry: data.industry,
                  scale: data.scale,
                  isPublished: true,
                }
              : c
          ),
        })),
      getPublishedCases: () => get().cases.filter((c) => c.isPublished),
      getCaseById: (id) => get().cases.find((c) => c.id === id),
    }),
    {
      name: 'case-storage',
      version: 1,
    }
  )
)
