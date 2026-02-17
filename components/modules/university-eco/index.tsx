"use client";

import ModuleLayout from "@/components/module-layout";
import type { SubPageConfig } from "@/components/module-layout";
import { Building2, BookOpen } from "lucide-react";
import PeerDynamics from "./peer-dynamics";
import ResearchTracking from "./research-tracking";

const subPages: SubPageConfig[] = [
  { id: "peers", label: "同行动态", icon: Building2, component: PeerDynamics },
  {
    id: "research",
    label: "科研成果追踪",
    icon: BookOpen,
    component: ResearchTracking,
  },
];

export default function UniversityEcoModule() {
  return <ModuleLayout subPages={subPages} />;
}
