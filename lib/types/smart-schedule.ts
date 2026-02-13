export interface ResolutionOption {
  label: string;
  description: string;
  confidence: number;
  recommended: boolean;
}

export interface ScheduleConflict {
  id: string;
  eventA: string;
  eventB: string;
  time: string;
  conflictType: "时间重叠" | "精力冲突" | "出行冲突";
  conflictTypeIcon: "clock" | "brain" | "plane";
  severity: "high" | "medium" | "low";
  aiSuggestion: string;
  detail: string;
  resolutionOptions: ResolutionOption[];
}

export interface Invitation {
  id: string;
  eventName: string;
  host: string;
  date: string;
  location: string;
  roiScore: number;
  aiSuggestion: "参加" | "考虑" | "拒绝";
  guestHighlights: string;
  hostAnalysis: string;
  aiRecommendation: string;
  detail: string;
}

export interface RecommendedActivity {
  id: string;
  name: string;
  date: string;
  location: string;
  category: string;
  relevanceScore: number;
  reason: string;
  detail: string;
  preparation: string;
  aiExplanation: string;
  highlights: string[];
}
