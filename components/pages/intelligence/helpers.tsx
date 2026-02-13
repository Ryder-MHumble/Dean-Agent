"use client";

import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TechTrend, Competitor } from "@/lib/types/intelligence";

export function MatchBar({ score }: { score: number }) {
  const color =
    score >= 90
      ? "bg-green-500"
      : score >= 70
        ? "bg-blue-500"
        : score >= 50
          ? "bg-amber-500"
          : "bg-gray-300";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", color)}
          style={{ width: `${score}%` }}
        />
      </div>
      <span
        className={cn(
          "text-xs font-semibold font-tabular",
          score >= 90
            ? "text-green-600"
            : score >= 70
              ? "text-blue-600"
              : "text-muted-foreground",
        )}
      >
        {score}%
      </span>
    </div>
  );
}

export function HeatIndicator({ trend }: { trend: TechTrend["heatTrend"] }) {
  const config = {
    surging: {
      icon: TrendingUp,
      color: "text-red-500",
      bg: "bg-red-50",
      label: "飙升",
    },
    rising: {
      icon: TrendingUp,
      color: "text-amber-500",
      bg: "bg-amber-50",
      label: "上升",
    },
    stable: {
      icon: Activity,
      color: "text-blue-500",
      bg: "bg-blue-50",
      label: "稳定",
    },
    declining: {
      icon: TrendingDown,
      color: "text-gray-400",
      bg: "bg-gray-50",
      label: "下降",
    },
  };
  const c = config[trend];
  const Icon = c.icon;
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium",
        c.bg,
        c.color,
      )}
    >
      <Icon className="h-3 w-3" />
      {c.label}
    </div>
  );
}

export function ThreatBadge({ level }: { level: Competitor["threatLevel"] }) {
  const config = {
    critical: {
      color: "bg-red-100 text-red-700 border-red-200",
      label: "高威胁",
    },
    warning: {
      color: "bg-amber-100 text-amber-700 border-amber-200",
      label: "需关注",
    },
    normal: {
      color: "bg-green-100 text-green-700 border-green-200",
      label: "可控",
    },
  };
  const c = config[level];
  return (
    <Badge variant="outline" className={cn("text-[11px] font-medium", c.color)}>
      {c.label}
    </Badge>
  );
}

export function ActivityBar({ level }: { level: number }) {
  const segments = 5;
  const filled = Math.round((level / 100) * segments);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-3 w-1.5 rounded-sm transition-colors",
            i < filled
              ? level >= 80
                ? "bg-red-400"
                : level >= 60
                  ? "bg-amber-400"
                  : "bg-green-400"
              : "bg-muted",
          )}
        />
      ))}
    </div>
  );
}
