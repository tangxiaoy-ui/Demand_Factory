# 需求工厂 Demo 原型

这是一个基于 React + TypeScript + Tailwind CSS 的需求工厂平台演示原型。

## 快速开始

```bash
# 1. 进入项目目录
cd demo

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

## 功能模块

### 1. 首页 (/)
- Banner轮播（2张）
- 平台能力介绍（4个能力卡片）
- 客户案例展示（3个案例）
- 客户声音轮播（3条评价）

### 2. AI引导需求收集页 (/collection)
- 单列对话布局（收集阶段）
- 双列分屏布局（文档生成后）
- AI模拟对话流程
- 进度条显示
- 需求文档/PPT/原型预览

### 3. 需求管理列表页 (/requirements)
- 需求列表表格
- 搜索与筛选
- 状态徽章

### 4. 需求详情页 (/requirements/:id)
- 左侧导航（两级菜单）
- 概览/项目资料/原始资料切换
- 文件列表展示

### 5. 登录页 (/login)
- 微信扫码登录（模拟）
- 手机号登录

## 技术栈

- React 18 + TypeScript
- Tailwind CSS
- React Router v6
- Zustand（状态管理）
- Lucide React（图标）

## 项目结构

```
src/
├── components/       # 组件
│   ├── common/      # 通用组件
│   ├── layout/      # 布局组件
│   ├── home/        # 首页组件
│   ├── chat/        # 对话组件
│   ├── preview/     # 预览组件
│   └── requirement/ # 需求管理组件
├── pages/           # 页面
├── stores/          # 状态管理
├── mock/            # Mock数据
├── types/           # 类型定义
└── utils/           # 工具函数
```

## 演示流程

1. 访问首页，浏览平台介绍
2. 点击"立即体验"，进入登录页
3. 登录后进入AI引导需求收集页
4. 通过AI对话收集需求，生成文档
5. 确认需求后生成PPT和原型
6. 进入需求管理页查看需求列表
7. 点击需求进入详情页查看详情
