"use client";

import MustKnowAlerts from "@/components/home/must-know-alerts";
import AIDailySummary from "@/components/home/ai-daily-summary";
import AggregatedMetricCards from "@/components/home/aggregated-metric-cards";
import TimelineView from "@/components/home/timeline-view";
import { filterForHomePage } from "@/lib/priority-scoring";
import { MotionCard } from "@/components/motion";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  rawAlerts,
  mockDailySummary,
  mockMetricCards,
  mockTodayEvents,
  mockWeekEvents,
  mockLongTermEvents,
} from "@/lib/mock-data/home-briefing";

const mockAlerts = filterForHomePage(rawAlerts);

export default function HomeBriefingPage({
  onNavigate,
}: {
  onNavigate?: (page: string) => void;
}) {
  const handleAlertClick = (alertId: string) => {
    toast("查看详情", { description: "已打开提醒 #" + alertId });
  };

  const handleActionClick = (alertId: string, actionType: string) => {
    toast.success("操作已执行: " + actionType);
  };

  const handleMetricCardClick = (cardId: string) => {
    onNavigate?.(cardId);
  };

  return (
    <div className="p-5 space-y-4">
      {/* Compact Header Row */}
      <MotionCard delay={0}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-foreground">早安，院长</h2>
            <Separator orientation="vertical" className="h-5" />
            <span className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString("zh-CN", {
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </span>
          </div>
        </div>
      </MotionCard>

      {/* Main 2-column layout: Alerts (8) + AI Summary & Safety (4) */}
      <div className="grid grid-cols-12 gap-4">
        <MotionCard delay={0.1} className="col-span-8">
          <MustKnowAlerts
            alerts={mockAlerts}
            onAlertClick={handleAlertClick}
            onActionClick={handleActionClick}
          />
        </MotionCard>

        <div className="col-span-4">
          <MotionCard delay={0.15}>
            <AIDailySummary data={mockDailySummary} />
          </MotionCard>
        </div>
      </div>

      {/* Timeline View */}
      <MotionCard delay={0.25}>
        <TimelineView
          todayEvents={mockTodayEvents}
          weekEvents={mockWeekEvents}
          longTermEvents={mockLongTermEvents}
          onNavigateToSchedule={() => onNavigate?.("smart-schedule")}
        />
      </MotionCard>

      {/* Aggregated Metric Cards - Navigator */}
      <MotionCard delay={0.3}>
        <AggregatedMetricCards
          cards={mockMetricCards}
          onCardClick={handleMetricCardClick}
        />
      </MotionCard>
    </div>
  );
}
