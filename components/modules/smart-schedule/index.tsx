"use client"

import ModuleLayout from "@/components/module-layout"
import type { SubPageConfig } from "@/components/module-layout"
import { CalendarDays, Star, Lightbulb, GitMerge } from "lucide-react"
import ScheduleOverview from "./schedule-overview"
import InvitationEval from "./invitation-eval"
import ActivityRecommend from "./activity-recommend"
import ConflictResolver from "./conflict-resolver"

const subPages: SubPageConfig[] = [
  { id: "overview", label: "日程总览", icon: CalendarDays, component: ScheduleOverview },
  { id: "invitation", label: "邀约评估", icon: Star, component: InvitationEval },
  { id: "recommend", label: "活动推荐", icon: Lightbulb, component: ActivityRecommend },
  { id: "conflict", label: "冲突化解", icon: GitMerge, component: ConflictResolver },
]

export default function SmartScheduleModule() {
  return <ModuleLayout subPages={subPages} />
}
