import type { PriorityItemWithScore } from "@/lib/priority-scoring";
import type { DailySummaryData } from "@/components/home/ai-daily-summary";
import type { MetricCardData } from "@/components/home/aggregated-metric-cards";
import type { TimelineEvent } from "@/components/home/timeline-view";

export const rawAlerts: PriorityItemWithScore[] = [
  {
    id: "1",
    title: "舆情激增：负面占比15% (↑5%)",
    description:
      "小红书和知乎上出现关于实验室管理的负面评论，需要及时处理以避免扩散",
    category: "risk",
    riskLevel: 3,
    timeUrgency: 3,
    impact: 2,
    requiresDeanDecision: true,
    actionType: "decide",
    responsiblePerson: "张主任（公关部）",
    metadata: "负面占比15% (↑5%)",
    priorityScore: 90,
  },
  {
    id: "2",
    title: "申报倒计时：距科技部AI专项截止仅剩3天",
    description:
      '科技部"新一代人工智能"重大专项申报截止时间临近，材料准备进度30%',
    category: "deadline",
    riskLevel: 2,
    timeUrgency: 3,
    impact: 3,
    requiresDeanDecision: true,
    actionType: "supervise",
    responsiblePerson: "王教授（科研处）",
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    metadata: "准备进度：30% | 距截止：3天",
    priorityScore: 85,
  },
  {
    id: "3",
    title: "政策匹配度98%：北京算力补贴政策发布",
    description:
      "北京科委发布算力补贴政策，预估资金规模500-1000万，与我院算力平台二期高度匹配",
    category: "opportunity",
    riskLevel: 1,
    timeUrgency: 2,
    impact: 3,
    requiresDeanDecision: true,
    actionType: "review",
    responsiblePerson: "李副主任",
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    metadata: "匹配度：98/100 | 资金规模：500-1000万 | 剩余5天",
    priorityScore: 80,
  },
  {
    id: "4",
    title: "预算执行滞后：Q1执行率仅12% (红线25%)",
    description: "一季度预算执行严重滞后，多个项目采购流程卡住，需要紧急协调",
    category: "finance",
    riskLevel: 2,
    timeUrgency: 2,
    impact: 2,
    requiresDeanDecision: true,
    actionType: "supervise",
    responsiblePerson: "财务处长",
    metadata: "执行率：12% | 目标：25% | 差距：-13%",
    priorityScore: 75,
  },
  {
    id: "5",
    title: "大模型基座项目延期15天",
    description:
      '重点项目"大模型基座"采购审批停滞于李某某处，已延期15天影响整体进度',
    category: "supervision",
    riskLevel: 2,
    timeUrgency: 2,
    impact: 2,
    requiresDeanDecision: false,
    actionType: "contact",
    responsiblePerson: "李某某（采购处）",
    metadata: "延期：15天 | 卡点：采购审批",
    priorityScore: 70,
  },
];

export const mockDailySummary: DailySummaryData = {
  summary:
    "今日重点关注北京科委发布的算力补贴政策（关联度High，建议李副主任牵头申报）；内部需督办大模型基座项目的采购进度（延期15天，卡在李某某处）；清华AIR发布2项新成果（具身智能方向），建议关注竞争态势并评估我院布局。",
  generatedAt: new Date(),
};

export const mockMetricCards: MetricCardData[] = [
  {
    id: "policy-intel",
    title: "政策情报",
    icon: "policy",
    metrics: [
      { label: "新政策", value: "3条", variant: "success" },
      { label: "高匹配", value: "2条", variant: "warning" },
      { label: "待申报", value: "1项" },
    ],
  },
  {
    id: "tech-frontier",
    title: "科技前沿",
    icon: "tech",
    metrics: [
      { label: "技术突破", value: "2项", variant: "success" },
      { label: "行业动态", value: "5条" },
      { label: "热点KOL", value: "3位" },
    ],
  },
  {
    id: "talent-radar",
    title: "人才雷达",
    icon: "talent",
    metrics: [
      { label: "高意向", value: "3人", variant: "success" },
      { label: "回流追踪", value: "12人" },
      { label: "新动态", value: "5条" },
    ],
  },
  {
    id: "university-eco",
    title: "高校生态",
    icon: "university",
    metrics: [
      { label: "同行动态", value: "5条" },
      { label: "新成果", value: "3项", variant: "success" },
      { label: "人事变动", value: "2条", variant: "warning" },
    ],
  },
  {
    id: "internal-mgmt",
    title: "院内管理",
    icon: "building",
    metrics: [
      { label: "异常事项", value: "2项", variant: "warning" },
      { label: "预算执行", value: "42%", variant: "danger" },
      { label: "重点项目", value: "8个" },
    ],
  },
  {
    id: "network",
    title: "人脉网络",
    icon: "users",
    metrics: [
      { label: "待恭喜", value: "5人", variant: "warning" },
      { label: "新变动", value: "3条" },
      { label: "半年未联系", value: "2人" },
    ],
  },
  {
    id: "smart-schedule",
    title: "智能日程",
    icon: "calendar",
    metrics: [
      { label: "今日ROI", value: "85", variant: "success" },
      { label: "日程冲突", value: "1个", variant: "warning" },
      { label: "待准备", value: "2个" },
    ],
  },
];

export const mockTodayEvents: TimelineEvent[] = [
  {
    id: "1",
    time: "09:00",
    title: "Q3战略技术审查会",
    type: "meeting",
    status: "ready",
    metadata: "ROI: 85 | 参会：市领导、技术委员会",
    actionLabel: "查看简报",
  },
  {
    id: "2",
    time: "14:00",
    title: "人才引进委员会",
    type: "meeting",
    status: "conflict",
    metadata: '与"部委电话会议"时间冲突',
    actionLabel: "处理冲突",
  },
  {
    id: "3",
    time: "18:00",
    title: "审查伦理委员会报告",
    type: "task",
    status: "upcoming",
    metadata: "截止今天18:00",
    actionLabel: "开始审阅",
  },
];

export const mockWeekEvents: TimelineEvent[] = [
  {
    id: "4",
    time: "明天 10:00",
    title: "科技部AI专项申报截止",
    type: "deadline",
    status: "incomplete",
    metadata: "准备度: 30% | 负责人: 王教授",
    actionLabel: "督办进度",
  },
  {
    id: "5",
    time: "周三 09:00",
    title: "中关村管委会调研",
    type: "meeting",
    status: "upcoming",
    metadata: "ROI: 92 | 重点汇报算力平台进展",
    actionLabel: "查看材料",
  },
  {
    id: "6",
    time: "周五 14:00",
    title: "学术委员会季度会议",
    type: "meeting",
    status: "upcoming",
    metadata: "审议3个重大项目立项",
  },
];

export const mockLongTermEvents: TimelineEvent[] = [
  {
    id: "7",
    time: "3月25日",
    title: "北京市科技创新大会",
    type: "meeting",
    status: "upcoming",
    metadata: "ROI: 95 | 同框：市长、科委主任",
    actionLabel: "确认出席",
  },
  {
    id: "8",
    time: "4月10日",
    title: "Q2重点项目中期评审",
    type: "task",
    status: "upcoming",
    metadata: "涉及8个项目，需提前准备评审材料",
  },
];
