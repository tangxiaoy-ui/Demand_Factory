# 需求工厂原型Demo产品流程图

## 整体架构

```mermaid
graph TB
    subgraph 首页[首页 marketing]
        A1[Banner轮播区] --> A2[平台能力展示]
        A2 --> A3[客户案例]
        A3 --> A4[客户声音]
        A4 --> A5[CTA行动号召]
    end
    
    subgraph 认证[认证中心 auth]
        B1[微信扫码登录] --> B3[登录成功]
        B2[手机号登录] --> B3
    end
    
    subgraph 核心[核心功能 core]
        C1[AI需求收集] --> C2[需求文档生成]
        C2 --> C3[确认需求]
        C3 --> C4[生成PPT]
        C3 --> C5[生成原型]
    end
    
    subgraph 管理[需求管理 management]
        D1[需求列表] --> D2[需求详情]
        D2 --> D3[需求文档]
        D2 --> D4[方案PPT]
        D2 --> D5[产品原型]
        D2 --> D6[历史对话]
    end
    
    subgraph 案例[案例中心 cases]
        E1[案例列表] --> E2[筛选搜索]
        E2 --> E3[案例详情]
        E3 --> E4[复用需求]
    end
    
    A1 -->|立即体验| B1
    A1 -->|立即体验| B2
    A5 -->|免费试用| C1
    B3 --> C1
    C4 --> D1
    C5 --> D1
    A3 -->|查看案例| E1
    E3 -->|复用| C1
    D1 -->|新建需求| C1
```

## 用户旅程流程

```mermaid
sequenceDiagram
    participant 用户 as 用户
    participant 首页 as 首页
    participant 登录 as 登录页
    participant AI as AI需求收集
    participant 文档 as 需求文档
    participant 管理 as 需求管理
    
    用户->>首页: 访问平台
    首页-->>用户: 展示Banner/案例/能力
    用户->>首页: 点击"立即体验"
    首页->>登录: 跳转登录页
    用户->>登录: 选择登录方式
    登录-->>AI: 登录成功跳转
    
    用户->>AI: 输入项目名称
    AI-->>用户: AI分析并提问
    用户->>AI: 回答关键信息
    AI-->>用户: 显示分析进度20%
    用户->>AI: 继续对话(3轮)
    AI-->>用户: 分析进度50%/70%/100%
    AI->>文档: 自动生成需求文档
    
    用户->>文档: 查看预览
    文档-->>用户: 展示Markdown文档
    用户->>AI: 点击"确认需求"
    AI->>文档: 生成PPT方案
    AI->>文档: 生成交互原型
    
    用户->>管理: 进入需求管理
    管理-->>用户: 展示需求列表
    用户->>管理: 查看详情
    管理-->>用户: 展示完整资料
```

## 状态流转图

```mermaid
stateDiagram-v2
    [*] --> 草稿: 创建需求
    草稿 --> 草稿: 编辑/删除
    草稿 --> 已确认: 生成文档
    
    已确认 --> 已确认: 编辑
    已确认 --> 已提交开发: 提交开发
    
    已提交开发 --> 已提交开发: 撤回提交
    已提交开发 --> 开发中: 管理员采纳
    已提交开发 --> 已拒绝: 管理员拒绝
    
    已拒绝 --> 已拒绝: 编辑
    已拒绝 --> 已提交开发: 再次提交开发
    
    开发中 --> 已完成: 开发完成
    开发中 --> 开发中: 查看进度
    
    已完成 --> 已完成: 下载交付物
    已完成 --> [*]: 归档
```

### 状态说明

| 状态 | 说明 | 可用操作 |
|------|------|----------|
| **草稿** | 需求创建后初始状态 | 编辑、删除 |
| **已确认** | 需求文档已生成并确认 | 编辑、提交开发、下载产出物 |
| **已提交开发** | 已推送至管理员审核 | 撤回提交、等待审核 |
| **开发中** | 管理员已采纳，开发团队开发中 | 查看进度 |
| **已拒绝** | 管理员拒绝，需修改后重新提交 | 编辑、再次提交开发、下载产出物 |
| **已完成** | 开发完成 | 下载交付物、归档 |

### 审核流程说明

```
┌──────────────┐     提交开发      ┌────────────────┐
│   已确认     │ ──────────────▶  │  已提交开发    │
└──────────────┘                   └────────────────┘
                                          │
                              ┌───────────┴───────────┐
                              ▼                       ▼
                       ┌──────────┐           ┌──────────┐
                       │ 管理员   │           │ 管理员   │
                       │  采纳    │           │  拒绝    │
                       └──────────┘           └──────────┘
                              │                       │
                              ▼                       ▼
                       ┌──────────┐           ┌──────────┐
                       │  开发中  │           │  已拒绝  │
                       └──────────┘           └──────────┘
                                                     │
                                          编辑后再次 │ 提交开发
                                                     ▼
                                              ┌────────────────┐
                                              │  已提交开发    │
                                              └────────────────┘
```

## 页面结构图

```mermaid
graph LR
    subgraph Layout[布局结构]
        direction TB
        Nav[顶部导航栏] --> Content[内容区域]
        Content --> Footer[页脚]
    end
    
    subgraph Home[首页结构]
        H1[Banner轮播] 
        H2[4个能力卡片]
        H3[3个案例卡片]
        H4[客户评价轮播]
        H5[CTA区域]
    end
    
    subgraph Collection[AI收集页]
        C1[左侧对话区] 
        C2[右侧预览区]
        C1 -->|消息交互| C1
        C2 -->|标签切换| C3[需求文档]
        C2 -->|标签切换| C4[PPT]
        C2 -->|标签切换| C5[原型]
    end
    
    subgraph Detail[详情页结构]
        D0[左侧导航220px]
        D0 --> D1[概览]
        D0 --> D2[项目资料]
        D0 --> D3[历史对话]
        D0 --> D4[原始资料]
    end
```

## 数据流图

```mermaid
flowchart LR
    subgraph Input[输入层]
        A[用户输入] 
        B[案例复用]
        C[文件上传]
    end
    
    subgraph Process[处理层]
        D[AI对话引擎]
        E[需求解析]
        F[进度计算]
    end
    
    subgraph Output[输出层]
        G[需求文档]
        H[方案PPT]
        I[交互原型]
    end
    
    subgraph Storage[存储层]
        J[LocalStorage]
        K[Zustand Store]
    end
    
    A --> D
    B --> D
    D --> E
    E --> F
    F --> G
    F --> H
    F --> I
    G --> J
    H --> J
    I --> J
    J --> K
```

## 组件依赖图

```mermaid
graph TB
    subgraph Common[通用组件]
        Button[Button按钮]
        Card[Card卡片]
        Badge[Badge徽章]
        Input[Input输入框]
    end
    
    subgraph Layout[布局组件]
        Navbar[Navbar导航栏]
        PageLayout[PageLayout页面布局]
        SidebarNav[SidebarNav侧边栏]
    end
    
    subgraph Chat[对话组件]
        ChatWindow[ChatWindow对话窗口]
        MessageBubble[MessageBubble消息气泡]
        ChatInput[ChatInput输入框]
        ProgressBar[ProgressBar进度条]
    end
    
    subgraph Preview[预览组件]
        DocPreview[DocPreview文档预览]
        PPTPreview[PPTPreview方案预览]
        PrototypePreview[PrototypePreview原型预览]
    end
    
    subgraph HomeComp[首页组件]
        Banner[Banner轮播]
        FeatureCard[FeatureCard能力卡片]
        CaseCard[CaseCard案例卡片]
        TestimonialCarousel[客户评价轮播]
    end
    
    PageLayout --> Navbar
    ChatWindow --> MessageBubble
    ChatWindow --> ChatInput
    ChatWindow --> ProgressBar
    CaseCard --> Badge
    FeatureCard --> Card
```

## 路由结构图

```mermaid
graph TD
    A[/ /] --> B[HomePage首页]
    A --> C[/login] --> D[LoginPage登录]
    A --> E[/collection] --> F[AICollectionPage AI收集]
    A --> G[/requirements] --> H[RequirementsPage需求列表]
    A --> I[/requirements/:id] --> J[RequirementDetailPage需求详情]
    A --> K[/admin/requirements] --> L[RequirementManagementPage管理后台]
    A --> M[/cases] --> N[CasesPage案例列表]
    A --> O[/cases/:id] --> P[CaseDetailPage案例详情]
    
    style B fill:#e1f5fe
    style F fill:#e8f5e9
    style H fill:#fff3e0
    style J fill:#fff3e0
    style N fill:#fce4ec
    style P fill:#fce4ec
```

## 功能模块关系图

```mermaid
mindmap
  root((需求工厂))
    首页展示
      Banner轮播
      平台能力
      客户案例
      客户声音
      CTA转化
    用户认证
      微信登录
      手机号登录
      状态管理
    AI需求收集
      对话交互
      进度追踪
      文档生成
      多轮对话
    产出物管理
      需求文档
      方案PPT
      产品原型
      版本历史
    需求管理
      列表查看
      状态筛选
      操作按钮
      详情查看
    需求状态
      草稿
      已确认
      已提交开发
      开发中
      已拒绝
      已完成
    案例中心
      案例展示
      多维筛选
      详情查看
      需求复用
```

---

**说明：**
- 使用 Mermaid 语法绘制，支持在 Markdown 中直接渲染
- 包含整体架构、用户旅程、状态流转、页面结构、数据流、组件依赖、路由结构、功能模块等多个维度
- 可根据需要选择对应图表嵌入文档