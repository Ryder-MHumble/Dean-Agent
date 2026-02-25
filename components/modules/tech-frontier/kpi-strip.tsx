"use client";

import { Cpu, TrendingUp, AlertTriangle, PenTool } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { MotionNumber } from "@/components/motion";
import { cn } from "@/lib/utils";
import type { TechFrontierKPIs } from "@/lib/types/tech-frontier";
import type { LucideIcon } from "lucide-react";

interface KPIItem {
  label: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  valueKey: keyof TechFrontierKPIs;
  suffix: string;
  subtitle?: string | ((kpis: TechFrontierKPIs) => string);
}

const kpiItems: KPIItem[] = [
  {
    label: "追踪方向",
    icon: Cpu,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    valueKey: "totalTopics",
    suffix: "个",
  },
  {
    label: "飙升趋势",
    icon: TrendingUp,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    valueKey: "surgingCount",
    suffix: "个",
  },
  {
    label: "布局缺口",
    icon: AlertTriangle,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    valueKey: "highGapCount",
    suffix: "个",
    subtitle: "需关注",
  },
  {
    label: "内参机会",
    icon: PenTool,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
    valueKey: "urgentOpportunities",
    suffix: "紧急",
    subtitle: (kpis) => `共 ${kpis.totalOpportunities} 个机会`,
  },
];

interface KPIStripProps {
  kpis: TechFrontierKPIs;
  className?: string;
}

export default function KPIStrip({ kpis, className }: KPIStripProps) {
  return (
    <div className={cn("grid grid-cols-4 gap-3", className)}>
      {kpiItems.map((item) => {
        const Icon = item.icon;
        const value = kpis[item.valueKey];
        const subtitle =
          typeof item.subtitle === "function"
            ? item.subtitle(kpis)
            : item.subtitle;

        return (
          <Card key={item.label} className="shadow-card">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg shrink-0",
                    item.iconBg,
                  )}
                >
                  <Icon className={cn("h-5 w-5", item.iconColor)} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-muted-foreground">
                    {item.label}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <MotionNumber
                      value={value}
                      className="text-xl font-bold font-tabular"
                    />
                    <span className="text-xs text-muted-foreground">
                      {item.suffix}
                    </span>
                  </div>
                  {subtitle && (
                    <p className="text-[10px] text-muted-foreground">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
