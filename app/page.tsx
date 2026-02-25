"use client";

import { useState, useEffect } from "react";
import AppShell, { TopBar } from "@/components/app-shell";
import FloatingAIAssistant from "@/components/floating-ai-assistant";
import dynamic from "next/dynamic";

const HomeModule = dynamic(() => import("@/components/modules/home"), {
  ssr: false,
  loading: () => <PageLoadingSkeleton />,
});
const PolicyIntelModule = dynamic(
  () => import("@/components/modules/policy-intel"),
  { ssr: false, loading: () => <PageLoadingSkeleton /> },
);
const TechFrontierModule = dynamic(
  () => import("@/components/modules/tech-frontier"),
  { ssr: false, loading: () => <PageLoadingSkeleton /> },
);
const TalentRadarModule = dynamic(
  () => import("@/components/modules/talent-radar"),
  { ssr: false, loading: () => <PageLoadingSkeleton /> },
);
const UniversityEcoModule = dynamic(
  () => import("@/components/modules/university-eco"),
  { ssr: false, loading: () => <PageLoadingSkeleton /> },
);
const InternalMgmtModule = dynamic(
  () => import("@/components/modules/internal-mgmt"),
  { ssr: false, loading: () => <PageLoadingSkeleton /> },
);
const NetworkModule = dynamic(() => import("@/components/modules/network"), {
  ssr: false,
  loading: () => <PageLoadingSkeleton />,
});
const SmartScheduleModule = dynamic(
  () => import("@/components/modules/smart-schedule"),
  { ssr: false, loading: () => <PageLoadingSkeleton /> },
);
import CommandPalette from "@/components/shared/command-palette";
import { MotionPage, PageLoadingSkeleton } from "@/components/motion";
import { Toaster } from "sonner";
import { pageMeta } from "@/lib/mock-data/navigation";

export default function Page() {
  const [activePage, setActivePage] = useState("home");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const meta = pageMeta[activePage] || pageMeta.home;

  // Auto-collapse sidebar on narrow screens
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) setSidebarCollapsed(true);
    };
    handler(mq);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <AppShell
        activePage={activePage}
        onNavigate={setActivePage}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
      />
      <main
        className="flex-1 transition-[margin-left] duration-200 ease-out"
        style={{ marginLeft: sidebarCollapsed ? 70 : 220 }}
      >
        <TopBar
          title={meta.title}
          subtitle={meta.subtitle}
          onNavigate={setActivePage}
          searchSlot={<CommandPalette onNavigate={setActivePage} />}
        />
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
