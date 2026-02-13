# 智策云端 — 院长决策系统

> AI 驱动的研究院院长智能决策辅助平台，整合外部情报、内部管理与行动日程，让院长在碎片化时间内实现全局态势感知与高效决策。

## 功能概览

系统围绕院长日常决策场景，划分为 **8 大功能模块**：

| 模块 | 说明 |
|------|------|
| **院长早报** | 指挥中心首页 — AI 每日综述、必须关注告警、聚合指标卡、今日时间线 |
| **政策情报** | 国家/北京政策追踪、政策智能匹配、领导讲话解读 |
| **科技前沿** | 技术趋势分析、行业动态、热点话题与 KOL、备忘与机会 |
| **人才雷达** | 海外人才回流追踪、人才指数、学术流动分析 |
| **高校生态** | 同行动态对标、科研成果追踪、人事人才变动 |
| **院内管理** | 财务概览、项目督办、学生事务、舆情安全、中心绩效 |
| **人脉网络** | 人事变动感知、关系维护管理、社交行动建议 |
| **智能日程** | 日程总览、邀约 ROI 评估、时间冲突化解、活动推荐 |

**全局能力**：
- `Cmd+K` 全局搜索命令面板
- 通知中心（告警/截止日/人事变动）
- 浮动 AI 助手对话
- 骨架屏加载态 & 空状态
- 数据新鲜度指示器
- 响应式布局（≥1280px / 1024px / 移动端自适应）

## 技术栈

| 层面 | 技术 |
|------|------|
| 框架 | [Next.js 16](https://nextjs.org/) (Turbopack) |
| 语言 | TypeScript 5.7 |
| UI 组件 | [shadcn/ui](https://ui.shadcn.com/) (49 组件) + Radix UI 原语 |
| 样式 | Tailwind CSS 3.4 + tailwindcss-animate |
| 动画 | Framer Motion 12 |
| 图表 | Recharts 2.15 |
| 图标 | Lucide React |
| 表单 | React Hook Form + Zod 校验 |
| 通知 | Sonner |
| 搜索 | cmdk |

## 快速开始

```bash
# 安装依赖
npm install --legacy-peer-deps

# 启动开发服务器 (默认端口 8080)
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint

# 清理端口
npm run stop
```

访问 `http://localhost:8080` 查看应用。

## 项目结构

```
Dean-Agent/
├── app/                          # Next.js App Router
│   ├── globals.css               # 全局样式 + 设计 Token + 响应式断点
│   ├── layout.tsx                # 根布局 (字体 / 主题)
│   └── page.tsx                  # 应用入口 (路由状态管理)
│
├── components/
│   ├── app-shell.tsx             # 侧边栏导航 + 顶栏 (通知中心)
│   ├── module-layout.tsx         # 模块 Tab 容器 (响应式 Tab 滚动)
│   ├── floating-ai-assistant.tsx # 浮动 AI 助手对话窗
│   ├── motion.tsx                # Framer Motion 封装 (MotionCard/MotionPage)
│   │
│   ├── home/                     # 首页子组件
│   │   ├── ai-daily-summary.tsx  # AI 每日综述 (政策/人才/风险分段)
│   │   ├── must-know-alerts.tsx  # 必须关注告警列表
│   │   ├── aggregated-metric-cards.tsx  # 聚合指标卡
│   │   └── timeline-view.tsx     # 今日时间线
│   │
│   ├── modules/                  # 8 大功能模块
│   │   ├── home/                 # 院长早报
│   │   ├── policy-intel/         # 政策情报 (4 子页)
│   │   ├── tech-frontier/        # 科技前沿 (4 子页)
│   │   ├── talent-radar/         # 人才雷达 (3 子页)
│   │   ├── university-eco/       # 高校生态 (3 子页)
│   │   ├── internal-mgmt/        # 院内管理 (5 子页)
│   │   ├── network/              # 人脉网络 (3 子页)
│   │   └── smart-schedule/       # 智能日程 (4 子页)
│   │
│   ├── shared/                   # 共享组件
│   │   ├── command-palette.tsx   # Cmd+K 全局搜索
│   │   ├── ai-insight-panel.tsx  # 统一 AI 分析面板 (10 种主题色)
│   │   ├── skeleton-states.tsx   # 骨架屏加载态
│   │   ├── empty-state.tsx       # 通用空状态
│   │   ├── data-freshness.tsx    # 数据新鲜度指示器
│   │   └── placeholder-page.tsx  # 占位页面
│   │
│   ├── pages/                    # 页面级组件 (部分遗留)
│   │   ├── home-briefing.tsx     # 首页指挥中心布局
│   │   ├── dashboard.tsx         # 仪表板
│   │   └── policy.tsx            # 政策页
│   │
│   └── ui/                       # shadcn/ui 基础组件 (49 个)
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── sheet.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       └── ...
│
├── lib/
│   ├── utils.ts                  # 工具函数 (cn 样式合并)
│   ├── mock-data/                # Mock 数据层
│   │   ├── navigation.ts         # 导航配置 & 页面元数据
│   │   ├── home-briefing.ts      # 首页数据
│   │   ├── intelligence.ts       # 情报数据
│   │   ├── schedule.ts           # 日程数据
│   │   ├── operations.ts         # 运营数据
│   │   ├── policy-tracking.ts    # 政策追踪数据
│   │   ├── ai-assistant.ts       # AI 助手数据
│   │   └── index.ts              # 统一导出
│   └── types/                    # TypeScript 类型定义
│       ├── navigation.ts
│       ├── intelligence.ts
│       ├── schedule.ts
│       ├── policy-tracking.ts
│       ├── operations.ts
│       ├── ai-assistant.ts
│       └── index.ts
│
├── hooks/                        # 自定义 Hooks
│   ├── use-toast.ts              # Toast 通知
│   └── use-animated-number.ts    # 数字动画
│
├── docs/                         # 项目文档
│   ├── 信息架构设计方案.md
│   ├── 院长智能体.md
│   └── ...
│
├── tailwind.config.ts            # Tailwind 配置
├── tsconfig.json                 # TypeScript 配置
└── package.json
```

## 架构设计

### 路由模式

采用客户端 SPA 路由，由 `app/page.tsx` 中的 `activePage` 状态驱动模块切换，配合 Framer Motion 页面转场动画：

```
AppShell (侧边栏) → onNavigate → activePage → 模块组件
```

### 模块组织

每个功能模块遵循统一结构：

```
modules/{module-name}/
├── index.tsx          # 模块入口 (注册子页面 Tab)
├── sub-page-a.tsx     # 子页面 A
├── sub-page-b.tsx     # 子页面 B
└── ...
```

子页面通过 `ModuleLayout` 组件以 Tab 形式组织，共享一致的交互模式。

### 数据层

当前使用 Mock 数据层（`lib/mock-data/`），所有数据结构已通过 `lib/types/` 定义 TypeScript 接口，为后续接入真实 API 做好准备。

### 共享组件

| 组件 | 用途 |
|------|------|
| `AIInsightPanel` | 统一的 AI 分析面板，支持 10 种模块主题色，暗色渐变背景 |
| `CommandPalette` | Cmd+K 全局搜索，索引所有 Mock 数据 |
| `SkeletonStates` | 骨架屏（指标卡/表格行/AI面板） |
| `EmptyState` | 空状态提示（图标 + 标题 + 说明 + CTA） |
| `DataFreshness` | 数据新鲜度指示器，按时间梯度着色 |

## 开发指南

### 新增模块

1. 在 `components/modules/` 下创建模块目录
2. 创建 `index.tsx` 注册子页面配置
3. 在 `lib/mock-data/navigation.ts` 中添加导航项
4. 在 `app/page.tsx` 中添加条件渲染

### 新增子页面

1. 在对应模块目录下创建子页面组件
2. 在模块 `index.tsx` 的 `subPages` 数组中注册
3. 使用 `AIInsightPanel` 提供 AI 分析侧边栏
4. 使用 `DataFreshness` 标注数据更新时间

### 代码规范

- TypeScript 严格类型，优先函数组件 + Hooks
- Tailwind CSS 工具类优先，遵循 shadcn/ui 设计系统
- 组件单一职责，复杂逻辑提取为自定义 Hook
- 局部状态 `useState`，副作用 `useEffect`，复杂状态 `useReducer`

## 许可证

私有项目，仅限内部使用。
