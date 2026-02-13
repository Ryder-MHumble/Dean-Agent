export type { PolicyItem } from "./intelligence";

export interface SpeechItem {
  id: string;
  leader: string;
  title: string;
  occasion: string;
  date: string;
  keywords: string[];
  relevance: number;
  status: "high" | "medium" | "low";
  summary: string;
  signals: string[];
  aiAnalysis: string;
}
