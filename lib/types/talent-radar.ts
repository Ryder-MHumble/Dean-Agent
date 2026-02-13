export interface TalentEntry {
  id: string;
  name: string;
  institution: string;
  discipline: string;
  hIndex: number;
  influenceScore: number;
  cooperationStatus: "active" | "potential" | "none";
  cooperationLabel: string;
  topAwards: string[];
  recentPapers: number;
  aiAnalysis: string;
  profile: string;
}

export interface MobilityEvent {
  id: string;
  talentName: string;
  fromInstitution: string;
  toInstitution: string;
  direction: string;
  impact: "high" | "medium" | "low";
  impactLabel: string;
  date: string;
  type: "inflow" | "outflow" | "external";
  typeLabel: string;
  aiAnalysis: string;
  detail: string;
}

export interface TalentCandidate {
  id: string;
  name: string;
  institution: string;
  country: string;
  direction: string;
  intention: "high" | "medium" | "low";
  intentionLabel: string;
  status: string;
  yearsAbroad: number;
  publications: number;
  aiStrategy: string;
  profile: string;
}
