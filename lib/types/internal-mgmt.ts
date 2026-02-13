export interface BudgetItem {
  id: string;
  department: string;
  annualBudget: number;
  spent: number;
  executionRate: number;
  status: "normal" | "warning" | "danger";
  statusLabel: string;
  recentChange: string;
  aiInsight: string;
  detail: string;
}

export interface StudentAlert {
  id: string;
  name: string;
  grade: string;
  major: string;
  type: "心理预警" | "学业预警" | "考勤异常" | "经济困难";
  level: "紧急" | "关注" | "提醒";
  summary: string;
  detail: string;
  aiRecommendation: string;
}

export interface StudentSummary {
  totalStudents: number;
  employmentRate: number;
}

export interface SentimentData {
  score: number;
  positive: number;
  neutral: number;
  negative: number;
}
