"use client"

import ModuleLayout from "@/components/module-layout"
import type { SubPageConfig } from "@/components/module-layout"
import { Plane, Award, ArrowLeftRight } from "lucide-react"
import ReturnTracking from "./return-tracking"
import TalentIndex from "./talent-index"
import AcademicMobility from "./academic-mobility"

const subPages: SubPageConfig[] = [
  { id: "return", label: "回流追踪", icon: Plane, component: ReturnTracking },
  { id: "index", label: "人才指数", icon: Award, component: TalentIndex },
  { id: "mobility", label: "学术人才流动", icon: ArrowLeftRight, component: AcademicMobility },
]

export default function TalentRadarModule() {
  return <ModuleLayout subPages={subPages} />
}
