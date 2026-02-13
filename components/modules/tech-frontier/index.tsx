"use client"

import ModuleLayout from "@/components/module-layout"
import type { SubPageConfig } from "@/components/module-layout"
import { Cpu, TrendingUp, MessageSquare, PenTool } from "lucide-react"
import TechTrends from "./tech-trends"
import IndustryDynamics from "./industry-dynamics"
import HotTopicsKol from "./hot-topics-kol"
import MemoOpportunities from "./memo-opportunities"

const subPages: SubPageConfig[] = [
  { id: "trends", label: "技术趋势", icon: Cpu, component: TechTrends },
  { id: "industry", label: "行业动态", icon: TrendingUp, component: IndustryDynamics },
  { id: "kol", label: "热点与KOL", icon: MessageSquare, component: HotTopicsKol },
  { id: "memo", label: "内参机会", icon: PenTool, component: MemoOpportunities },
]

export default function TechFrontierModule() {
  return <ModuleLayout subPages={subPages} />
}
