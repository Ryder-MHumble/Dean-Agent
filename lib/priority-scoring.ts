/**
 * 优先级评分系统
 * 用于决定哪些信息应该在院长早报首页显示
 */

export type AlertCategory =
  | "risk"
  | "deadline"
  | "finance"
  | "opportunity"
  | "supervision";
export type ActionType = "decide" | "review" | "contact" | "supervise" | "fyi";
export type TimeUrgencyLevel = 1 | 2 | 3;
export type RiskLevel = 1 | 2 | 3;
export type ImpactLevel = 1 | 2 | 3;

export interface PriorityItem {
  id: string;
  title: string;
  description: string;
  category: AlertCategory;
  riskLevel: RiskLevel; // 1=低风险 2=中风险 3=高风险
  timeUrgency: TimeUrgencyLevel; // 1=7天+ 2=3天内 3=24小时内
  impact: ImpactLevel; // 1=个人项目 2=部门运营 3=院级战略
  requiresDeanDecision: boolean;
  actionType: ActionType;
  responsiblePerson?: string;
  deadline?: Date;
  relatedItems?: string[];
  metadata?: string;
}

export interface PriorityItemWithScore extends PriorityItem {
  priorityScore: number;
}

/**
 * 计算优先级分数
 * 公式：Priority Score = (Risk × 40) + (Time Urgency × 30) + (Impact × 20) + (Requires Dean × 10)
 * 分数范围：0-100
 */
export function calculatePriority(item: PriorityItem): number {
  const riskScore = item.riskLevel * 40;
  const urgencyScore = item.timeUrgency * 30;
  const impactScore = item.impact * 20;
  const deanDecisionScore = item.requiresDeanDecision ? 10 : 0;

  return riskScore + urgencyScore + impactScore + deanDecisionScore;
}

/**
 * 为优先级项添加分数
 */
export function addPriorityScore(item: PriorityItem): PriorityItemWithScore {
  return {
    ...item,
    priorityScore: calculatePriority(item),
  };
}

/**
 * 过滤出适合在首页显示的高优先级项
 * 规则：Priority Score >= 60
 */
export function filterForHomePage(
  items: PriorityItem[],
): PriorityItemWithScore[] {
  return items
    .map(addPriorityScore)
    .filter((item) => item.priorityScore >= 60)
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 5); // 最多显示5条
}

/**
 * 获取优先级徽章信息
 */
export function getPriorityBadge(score: number): {
  text: string;
  color: string;
  bgColor: string;
} {
  if (score >= 80) {
    return {
      text: "特急",
      color: "text-red-700",
      bgColor: "bg-red-100",
    };
  } else if (score >= 60) {
    return {
      text: "重要",
      color: "text-orange-700",
      bgColor: "bg-orange-100",
    };
  } else if (score >= 40) {
    return {
      text: "关注",
      color: "text-yellow-700",
      bgColor: "bg-yellow-100",
    };
  } else {
    return {
      text: "一般",
      color: "text-gray-700",
      bgColor: "bg-gray-100",
    };
  }
}

/**
 * 获取类别徽章信息
 */
export function getCategoryBadge(category: AlertCategory): {
  text: string;
  color: string;
  bgColor: string;
  icon: string;
} {
  const badges = {
    risk: {
      text: "关注",
      color: "text-slate-700",
      bgColor: "bg-slate-50",
      icon: "AlertTriangle",
    },
    deadline: {
      text: "时效",
      color: "text-orange-700",
      bgColor: "bg-orange-50",
      icon: "Clock",
    },
    finance: {
      text: "财务",
      color: "text-yellow-700",
      bgColor: "bg-yellow-50",
      icon: "DollarSign",
    },
    opportunity: {
      text: "机遇",
      color: "text-green-700",
      bgColor: "bg-green-50",
      icon: "TrendingUp",
    },
    supervision: {
      text: "督办",
      color: "text-blue-700",
      bgColor: "bg-blue-50",
      icon: "FileText",
    },
  };
  return badges[category];
}

/**
 * 获取操作类型信息
 */
export function getActionInfo(actionType: ActionType): {
  text: string;
  color: string;
  bgColor: string;
} {
  const actions = {
    decide: {
      text: "拍板",
      color: "text-green-700",
      bgColor: "bg-green-100 hover:bg-green-200",
    },
    review: {
      text: "审阅",
      color: "text-blue-700",
      bgColor: "bg-blue-100 hover:bg-blue-200",
    },
    contact: {
      text: "联系",
      color: "text-purple-700",
      bgColor: "bg-purple-100 hover:bg-purple-200",
    },
    supervise: {
      text: "督办",
      color: "text-orange-700",
      bgColor: "bg-orange-100 hover:bg-orange-200",
    },
    fyi: {
      text: "知晓",
      color: "text-gray-700",
      bgColor: "bg-gray-100",
    },
  };
  return actions[actionType];
}

/**
 * 计算时效性状态
 */
export function getUrgencyStatus(deadline?: Date): {
  text: string;
  icon: string;
  color: string;
} {
  if (!deadline) {
    return {
      text: "进展正常",
      icon: "🟢",
      color: "text-green-600",
    };
  }

  const now = new Date();
  const timeLeft = deadline.getTime() - now.getTime();
  const hoursLeft = timeLeft / (1000 * 60 * 60);
  const daysLeft = Math.ceil(hoursLeft / 24);

  if (timeLeft < 0) {
    return {
      text: "已超期",
      icon: "🔴",
      color: "text-red-600",
    };
  } else if (hoursLeft < 24) {
    return {
      text: "24小时内",
      icon: "🟡",
      color: "text-orange-600",
    };
  } else if (daysLeft <= 3) {
    return {
      text: `T-${daysLeft}天`,
      icon: "⏱️",
      color: "text-yellow-600",
    };
  } else {
    return {
      text: "进展正常",
      icon: "🟢",
      color: "text-green-600",
    };
  }
}

/**
 * 生成相对时间文本
 */
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) {
    return "刚刚";
  } else if (diffMins < 60) {
    return `${diffMins}分钟前`;
  } else if (diffHours < 24) {
    return `${diffHours}小时前`;
  } else if (diffDays === 1) {
    return "昨天";
  } else if (diffDays < 7) {
    return `${diffDays}天前`;
  } else {
    return date.toLocaleDateString("zh-CN");
  }
}
