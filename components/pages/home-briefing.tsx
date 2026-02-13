"use client";

import { useState } from "react";
import MustKnowAlerts from "@/components/home/must-know-alerts";
import AIDailySummary from "@/components/home/ai-daily-summary";
import AggregatedMetricCards from "@/components/home/aggregated-metric-cards";
import TimelineView from "@/components/home/timeline-view";
import { filterForHomePage } from "@/lib/priority-scoring";
import { MotionCard } from "@/components/motion";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  FileCheck,
  MessageSquare,
  ClipboardCheck,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  rawAlerts,
  mockDailySummary,
  mockMetricCards,
  mockTodayEvents,
  mockWeekEvents,
  mockLongTermEvents,
} from "@/lib/mock-data/home-briefing";

const mockAlerts = filterForHomePage(rawAlerts);

// Only show modules with anomalies/changes (not all 7)
const anomalyCards = mockMetricCards.filter((card) =>
  card.metrics.some(
    (m) =>
      m.variant === "warning" ||
      m.variant === "danger" ||
      m.variant === "success",
  ),
);

interface QuickAction {
  id: string;
  label: string;
  type: "approve" | "reply" | "review";
  from: string;
  urgent: boolean;
}

const quickActions: QuickAction[] = [
  {
    id: "qa1",
    label: "审批：量子计算中心设备采购",
    type: "approve",
    from: "财务处",
    urgent: true,
  },
  {
    id: "qa2",
    label: "回复：教育部座谈会邀请函",
    type: "reply",
    from: "办公室",
    urgent: true,
  },
  {
    id: "qa3",
    label: "审阅：Q1预算执行情况报告",
    type: "review",
    from: "财务处",
    urgent: false,
  },
  {
    id: "qa4",
    label: "确认：张明远博士面谈时间",
    type: "reply",
    from: "人事处",
    urgent: false,
  },
];

const actionIcons = {
  approve: FileCheck,
  reply: MessageSquare,
  review: ClipboardCheck,
};

export default function HomeBriefingPage({
  onNavigate,
}: {
  onNavigate?: (page: string) => void;
}) {
  const [completedActions, setCompletedActions] = useState<Set<string>>(
    new Set(),
  );

  const handleAlertClick = (alertId: string) => {
    toast("查看详情", { description: "已打开提醒 #" + alertId });
  };

  const handleActionClick = (alertId: string, actionType: string) => {
    toast.success("操作已执行: " + actionType);
  };

  const handleMetricCardClick = (cardId: string) => {
    onNavigate?.(cardId);
  };

  const handleQuickAction = (actionId: string, label: string) => {
    setCompletedActions((prev) => new Set(prev).add(actionId));
    toast.success(`已处理：${label}`);
  };

  const pendingActions = quickActions.filter(
    (a) => !completedActions.has(a.id),
  );

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
          {pendingActions.length > 0 && (
            <Badge
              variant="secondary"
              className="bg-amber-50 text-amber-700 border-amber-200 text-xs"
            >
              {pendingActions.length} 项待处理
            </Badge>
          )}
        </div>
      </MotionCard>

      {/* Main 2-column layout: Alerts (8) + AI Summary (4) */}
      <div className="grid grid-cols-12 gap-4">
        <MotionCard delay={0.1} className="col-span-8">
          <MustKnowAlerts
            alerts={mockAlerts}
            onAlertClick={handleAlertClick}
            onActionClick={handleActionClick}
          />
        </MotionCard>

        <div className="col-span-4 space-y-4">
          <MotionCard delay={0.15}>
            <AIDailySummary data={mockDailySummary} />
          </MotionCard>

          {/* Quick Actions */}
          <MotionCard delay={0.2}>
            <Card className="shadow-card">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">
                    待处理事项
                  </CardTitle>
                  <Badge variant="secondary" className="text-[10px]">
                    {pendingActions.length} 项
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-1.5">
                {quickActions.map((action) => {
                  const Icon = actionIcons[action.type];
                  const isDone = completedActions.has(action.id);
                  return (
                    <button
                      key={action.id}
                      className={cn(
                        "w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-all",
                        isDone
                          ? "bg-green-50/50 opacity-50"
                          : "hover:bg-muted/50",
                      )}
                      onClick={() =>
                        !isDone && handleQuickAction(action.id, action.label)
                      }
                      disabled={isDone}
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                      ) : (
                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0",
                            action.urgent
                              ? "text-red-500"
                              : "text-muted-foreground",
                          )}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            "text-xs font-medium truncate",
                            isDone && "line-through text-muted-foreground",
                          )}
                        >
                          {action.label}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          来自 {action.from}
                        </p>
                      </div>
                      {!isDone && action.urgent && (
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          </MotionCard>
        </div>
      </div>

      {/* Timeline + Module Cards side by side to reduce vertical scroll */}
      <div className="grid grid-cols-12 gap-4">
        <MotionCard delay={0.25} className="col-span-7">
          <TimelineView
            todayEvents={mockTodayEvents}
            weekEvents={mockWeekEvents}
            longTermEvents={mockLongTermEvents}
            onNavigateToSchedule={() => onNavigate?.("smart-schedule")}
          />
        </MotionCard>

        <MotionCard delay={0.3} className="col-span-5">
          <AggregatedMetricCards
            cards={anomalyCards}
            onCardClick={handleMetricCardClick}
            columns={2}
          />
          {anomalyCards.length < mockMetricCards.length && (
            <div className="mt-3 text-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground"
                onClick={() => onNavigate?.("home")}
              >
                其余 {mockMetricCards.length - anomalyCards.length}{" "}
                个模块运行正常
              </Button>
            </div>
          )}
        </MotionCard>
      </div>
    </div>
  );
}
