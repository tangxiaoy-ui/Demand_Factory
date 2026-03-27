import type { Testimonial } from '@/components/home/TestimonialCarousel'

export const mockTestimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: '李娜',
    title: '产品副总裁',
    company: '星云数科',
    quote:
      '以前一次需求澄清要经历3-4轮会议，现在团队直接在平台里完成对话、确认文档、导出原型，交付效率提升了近一倍。',
    result: '交付周期缩短 45%',
  },
  {
    id: 'testimonial-2',
    name: 'Andrew Chen',
    title: 'Head of Engineering',
    company: 'Nova Robotics',
    quote:
      '大模型自动生成的PRD细致到字段级别，研发在 Jira 里就能直接拆任务。我们再也不担心需求缺漏。',
    result: '需求返工率下降 60%',
  },
  {
    id: 'testimonial-3',
    name: '王凯',
    title: 'PMO负责人',
    company: '澜峰能源',
    quote:
      '把过往方案导入做参考，AI可以给出更有经验的建议。客户演示中一键导出PPT直接过稿。',
    result: '售前转化率提升 32%',
  },
  {
    id: 'testimonial-4',
    name: '陈璐',
    title: '高级产品经理',
    company: 'Atlas Cloud',
    quote:
      '跨部门评审时，聊天记录+生成文档一目了然，大家关注点统一，讨论效率高很多。',
    result: '评审时间减少 3 天',
  },
]
