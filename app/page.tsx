"use client";

import { useState } from "react";
import AppShell, { TopBar } from "@/components/app-shell";
import FloatingAIAssistant from "@/components/floating-ai-assistant";
import HomeModule from "@/components/modules/home";
import PolicyIntelModule from "@/components/modules/policy-intel";
import TechFrontierModule from "@/components/modules/tech-frontier";
import TalentRadarModule from "@/components/modules/talent-radar";
import UniversityEcoModule from "@/components/modules/university-eco";
import InternalMgmtModule from "@/components/modules/internal-mgmt";
import NetworkModule from "@/components/modules/network";
import SmartScheduleModule from "@/components/modules/smart-schedule";
import { MotionPage } from "@/components/motion";
import { Toaster } from "sonner";
import { pageMeta } from "@/lib/mock-data/navigation";

export default function Page() {
  const [activePage, setActivePage] = useState("home");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const meta = pageMeta[activePage] || pageMeta.home;

  return (
    <div className="flex min-h-screen bg-background">
      <AppShell
        activePage={activePage}
        onNavigate={setActivePage}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
      />
      <main
        className="flex-1 transition-[margin-left] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ marginLeft: sidebarCollapsed ? 70 : 220 }}
      >
        <TopBar title={meta.title} subtitle={meta.subtitle} />
        <div className="min-h-[calc(100vh-64px)]">
          <MotionPage pageKey={activePage}>
            {activePage === "home" && <HomeModule onNavigate={setActivePage} />}
            {activePage === "policy-intel" && <PolicyIntelModule />}
            {activePage === "tech-frontier" && <TechFrontierModule />}
            {activePage === "talent-radar" && <TalentRadarModule />}
            {activePage === "university-eco" && <UniversityEcoModule />}
            {activePage === "internal-mgmt" && <InternalMgmtModule />}
            {activePage === "network" && <NetworkModule />}
            {activePage === "smart-schedule" && <SmartScheduleModule />}
          </MotionPage>
        </div>
      </main>
      <FloatingAIAssistant />
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}
