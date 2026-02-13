export interface KpiCard {
  id: string;
  label: string;
  value: string;
  icon: "users" | "dollar" | "file" | "alert";
  changeLabel?: string;
  changeBadgeColor?: string;
  changeDescription?: string;
  progressValue?: number;
  progressLabel?: string;
  progressTotal?: string;
  variant?: "default" | "danger";
}

export interface ProjectTimelineItem {
  name: string;
  status: "supply" | "budget" | "normal";
  statusLabel: string;
  statusColor: string;
  dotColor: string;
  owner: string;
  phase: string;
  bars: Array<{
    start: number;
    width: number;
    label: string;
    gradient: string;
    borderColor: string;
    textColor: string;
    hoverShadow: string;
  }>;
}

export interface CenterPerformanceItem {
  name: string;
  budget: number;
  budgetColor: string;
  score: number;
  status: string;
  statusColor: string;
}

export interface ApprovalTask {
  title: string;
  dept: string;
  deadline: string;
  status: "urgent" | "pending" | "done";
  statusLabel: string;
  done: boolean;
}

export interface ProjectInfoItem {
  id: string;
  name: string;
  status: string;
  statusColor: string;
  owner: string;
  department: string;
  progress: number;
  deadline: string;
  budget: string;
  spent: string;
}
