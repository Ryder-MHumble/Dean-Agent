export interface PolicyItem {
  id: string;
  title: string;
  summary: string;
  category: "国家政策" | "北京政策" | "领导讲话" | "政策机会";
  importance: "紧急" | "重要" | "关注" | "一般";
  date: string;
  source: string;
  tags: string[];
  matchScore: number;
  funding?: string | null;
  daysLeft?: number | null;
  leader?: string | null;
  relevance?: number | null;
  signals?: string[] | null;
  sourceUrl?: string | null;
  aiInsight?: string | null;
  detail?: string | null;
}

export interface TechTrend {
  id: string;
  topic: string;
  heatTrend: "surging" | "rising" | "stable" | "declining";
  heatLabel: string;
  ourStatus: "deployed" | "weak" | "none";
  ourStatusLabel: string;
  gapLevel: "high" | "medium" | "low";
  keyMetric: string;
  aiInsight: string;
  detail: string;
}

export interface Competitor {
  id: string;
  name: string;
  activityLevel: number;
  latestAction: string;
  actionType: string;
  threatLevel: "critical" | "warning" | "normal";
  recentCount: number;
  aiInsight: string;
  detail: string;
}
