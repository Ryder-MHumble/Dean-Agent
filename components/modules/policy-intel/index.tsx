"use client"

import ModuleLayout from "@/components/module-layout"
import type { SubPageConfig } from "@/components/module-layout"
import { Landmark, MapPin, Mic, Target } from "lucide-react"
import NationalPolicy from "./national-policy"
import BeijingPolicy from "./beijing-policy"
import LeadershipSpeeches from "./leadership-speeches"
import PolicyMatching from "./policy-matching"

const subPages: SubPageConfig[] = [
  { id: "national", label: "国家政策", icon: Landmark, component: NationalPolicy },
  { id: "beijing", label: "北京政策", icon: MapPin, component: BeijingPolicy },
  { id: "speeches", label: "领导讲话", icon: Mic, component: LeadershipSpeeches },
  { id: "matching", label: "政策机会匹配", icon: Target, component: PolicyMatching, badge: 3 },
]

export default function PolicyIntelModule() {
  return <ModuleLayout subPages={subPages} />
}
