export type { TechTrend } from "./intelligence";

export interface IndustryNews {
  id: string;
  title: string;
  source: string;
  type: "投融资" | "新产品" | "政策" | "收购";
  date: string;
  impact: "重大" | "较大" | "一般";
  summary: string;
  aiAnalysis: string;
  relevance: string;
}

export interface HotTopic {
  id: string;
  title: string;
  heat: number;
  maxHeat: number;
  discussions: number;
  trend: "up" | "stable" | "new";
  tags: string[];
  summary: string;
  aiAnalysis: string;
}

export interface KOL {
  id: string;
  name: string;
  affiliation: string;
  hIndex: number;
  field: string;
  recentActivity: string;
  influence: "极高" | "高" | "中";
  summary: string;
  aiAnalysis: string;
}

export interface Opportunity {
  id: string;
  name: string;
  type: "合作" | "会议" | "内参";
  source: string;
  priority: "紧急" | "高" | "中" | "低";
  deadline: string;
  summary: string;
  aiAssessment: string;
  actionSuggestion: string;
}
