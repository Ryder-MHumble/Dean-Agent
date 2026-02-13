"use client"

import ModuleLayout from "@/components/module-layout"
import type { SubPageConfig } from "@/components/module-layout"
import {
  DollarSign,
  ClipboardList,
  GraduationCap,
  ShieldAlert,
  BarChart3,
} from "lucide-react"
import SentimentSafety from "./sentiment-safety"
import ProjectSupervision from "./project-supervision"
import CenterPerformance from "./center-performance"
import Finance from "./finance"
import StudentAffairs from "./student-affairs"

const subPages: SubPageConfig[] = [
  { id: "finance", label: "财务管理", icon: DollarSign, component: Finance },
  {
    id: "project",
    label: "项目督办",
    icon: ClipboardList,
    component: ProjectSupervision,
  },
  {
    id: "student",
    label: "学生事务",
    icon: GraduationCap,
    component: StudentAffairs,
  },
  {
    id: "sentiment",
    label: "舆情安全",
    icon: ShieldAlert,
    component: SentimentSafety,
  },
  {
    id: "center",
    label: "中心绩效",
    icon: BarChart3,
    component: CenterPerformance,
  },
]

export default function InternalMgmtModule() {
  return <ModuleLayout subPages={subPages} />
}
