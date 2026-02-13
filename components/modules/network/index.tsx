"use client"

import ModuleLayout from "@/components/module-layout"
import type { SubPageConfig } from "@/components/module-layout"
import { UserCog, Heart, MessageCircle } from "lucide-react"
import PersonnelChanges from "./personnel-changes"
import RelationshipMgmt from "./relationship-mgmt"
import SocialActions from "./social-actions"

const subPages: SubPageConfig[] = [
  { id: "personnel", label: "人事变动", icon: UserCog, component: PersonnelChanges },
  { id: "relationship", label: "关系维护", icon: Heart, component: RelationshipMgmt },
  { id: "social", label: "社交行动", icon: MessageCircle, component: SocialActions },
]

export default function NetworkModule() {
  return <ModuleLayout subPages={subPages} />
}
