import type {
  ProjectTimelineItem,
  CenterPerformanceItem,
  ApprovalTask,
  ProjectInfoItem,
} from "@/lib/types/operations";

export const kpiData = {
  students: { value: "1,240", change: "~12%", description: "对比上一学年" },
  budget: {
    value: "¥4,520万",
    usedPercent: 37,
    total: "¥1.2亿",
  },
  research: { value: "85 篇论文", pending: 12 },
  risk: { value: "3 项紧急", newCount: 1, since: "自昨日起" },
};

export const projectTimelineItems: ProjectTimelineItem[] = [
  {
    name: "量子芯片 Alpha",
    status: "supply",
    statusLabel: "供应链问题",
    statusColor: "text-red-500",
    dotColor: "bg-red-500",
    owner: "张教授",
    phase: "第二阶段",
    bars: [
      {
        start: 2,
        width: 3,
        label: "第二阶段(延期)",
        gradient: "bg-gradient-to-r from-red-200 to-red-300",
        borderColor: "border-red-300",
        textColor: "text-red-700",
        hoverShadow: "hover:shadow-md hover:shadow-red-100",
      },
    ],
  },
  {
    name: "生物合成实验室",
    status: "budget",
    statusLabel: "预算审查",
    statusColor: "text-yellow-600",
    dotColor: "bg-yellow-500",
    owner: "李主任",
    phase: "采购阶段",
    bars: [
      {
        start: 1,
        width: 2,
        label: "采购阶段",
        gradient: "bg-gradient-to-r from-yellow-200 to-amber-200",
        borderColor: "border-yellow-300",
        textColor: "text-yellow-700",
        hoverShadow: "hover:shadow-md hover:shadow-yellow-100",
      },
    ],
  },
  {
    name: "神经网络训练",
    status: "normal",
    statusLabel: "运行稳定",
    statusColor: "text-green-600",
    dotColor: "bg-green-500",
    owner: "王博士",
    phase: "数据处理",
    bars: [
      {
        start: 3,
        width: 2,
        label: "数据处理",
        gradient: "bg-gradient-to-r from-blue-200 to-indigo-200",
        borderColor: "border-blue-300",
        textColor: "text-blue-700",
        hoverShadow: "hover:shadow-md hover:shadow-blue-100",
      },
    ],
  },
];

export const centerPerformanceData: CenterPerformanceItem[] = [
  {
    name: "AI & 机器人实验室",
    budget: 80,
    budgetColor: "bg-green-500",
    score: 92,
    status: "优",
    statusColor: "bg-blue-100 text-blue-700",
  },
  {
    name: "量子计算中心",
    budget: 95,
    budgetColor: "bg-red-500",
    score: 88,
    status: "超支",
    statusColor: "bg-red-100 text-red-700",
  },
  {
    name: "先进材料研究院",
    budget: 60,
    budgetColor: "bg-yellow-500",
    score: 74,
    status: "需关注",
    statusColor: "bg-yellow-100 text-yellow-700",
  },
];

export const approvalTasks: ApprovalTask[] = [
  {
    title: "签署秋季学期预算案",
    dept: "财务部",
    deadline: "明天",
    status: "urgent",
    statusLabel: "追期",
    done: false,
  },
  {
    title: "审查伦理委员会报告",
    dept: "合规部",
    deadline: "今天",
    status: "pending",
    statusLabel: "待处理",
    done: false,
  },
  {
    title: "批准新教职王采用",
    dept: "人力资源部",
    deadline: "2小时前",
    status: "done",
    statusLabel: "已完成",
    done: true,
  },
];

export const projectInfoData: ProjectInfoItem[] = [
  {
    id: "1",
    name: "AI & 机器人实验室扩建",
    status: "进行中",
    statusColor: "bg-blue-100 text-blue-700",
    owner: "李主任",
    department: "科研中心",
    progress: 65,
    deadline: "2024-06-30",
    budget: "¥500万",
    spent: "¥325万",
  },
  {
    id: "2",
    name: "量子计算中心二期",
    status: "风险",
    statusColor: "bg-red-100 text-red-700",
    owner: "王教授",
    department: "量子研究所",
    progress: 42,
    deadline: "2024-05-15",
    budget: "¥800万",
    spent: "¥680万",
  },
  {
    id: "3",
    name: "生物医学工程平台",
    status: "已完成",
    statusColor: "bg-green-100 text-green-700",
    owner: "赵博士",
    department: "生物医学中心",
    progress: 100,
    deadline: "2024-02-28",
    budget: "¥350万",
    spent: "¥340万",
  },
];
