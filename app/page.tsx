"use client"

import { useState } from "react"
import AppShell, { TopBar } from "@/components/app-shell"
import DashboardPage from "@/components/pages/dashboard"
import IntelligencePage from "@/components/pages/intelligence"
import OperationsPage from "@/components/pages/operations"
import PolicyPage from "@/components/pages/policy"
import SchedulePage from "@/components/pages/schedule"

const pageMeta: Record<string, { title: string; subtitle?: string }> = {
  dashboard: { title: "决策总览", subtitle: "院长决策系统 - 全局态势感知" },
  intelligence: {
    title: "人才与技术情报库",
    subtitle: "实时追踪政策、技术、人才及内部运营动态",
  },
  operations: {
    title: "学院运营与风险",
    subtitle: "Internal Ops & Risk",
  },
  policy: {
    title: "政策与人才监控",
    subtitle: "Policy & Personnel Monitor",
  },
  schedule: {
    title: "智能日程与建议",
    subtitle: "AI Advisor Active",
  },
}

export default function Page() {
  const [activePage, setActivePage] = useState("dashboard")
  const meta = pageMeta[activePage] || pageMeta.dashboard

  return (
    <div className="flex min-h-screen bg-background">
      <AppShell activePage={activePage} onNavigate={setActivePage} />
      <main className="ml-[220px] flex-1">
        <TopBar title={meta.title} subtitle={meta.subtitle} />
        <div className="min-h-[calc(100vh-64px)]">
          {activePage === "dashboard" && <DashboardPage />}
          {activePage === "intelligence" && <IntelligencePage />}
          {activePage === "operations" && <OperationsPage />}
          {activePage === "policy" && <PolicyPage />}
          {activePage === "schedule" && <SchedulePage />}
        </div>
      </main>
    </div>
  )
}
