export interface Contact {
  id: string;
  name: string;
  org: string;
  title: string;
  strength: number;
  lastContact: string;
  lastContactDays: number;
  status: "active" | "cooling" | "dormant";
  statusLabel: string;
  suggestion: string;
  tags: string[];
  history: { date: string; event: string }[];
  talkingPoints: string[];
  detail: string;
}

export interface RelationshipSummary {
  coreContacts: number;
  pendingFollowUp: number;
  growthRate: number;
  halfYearUncontacted: number;
}
