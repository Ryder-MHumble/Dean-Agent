"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { ExpandableSection } from "@/components/motion";
import { cn } from "@/lib/utils";
import type { TechTopic } from "@/lib/types/tech-frontier";

const heatConfig = {
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

interface TopicCardProps {
  topic: TechTopic;
  isExpanded: boolean;
  isSelected?: boolean;
  /** When detail panel is open, render a compact row */
  compact?: boolean;
  onToggleExpand: () => void;
  onOpenDetail: () => void;
}

export default function TopicCard({
  topic,
  isExpanded,
  isSelected,
  compact,
  onToggleExpand,
  onOpenDetail,
}: TopicCardProps) {
  const heat = heatConfig[topic.heatTrend];
  const HeatIcon = heat.icon;

  const postCount = topic.trendingKeywords.reduce(
    (sum, kw) => sum + kw.posts.length,
    0,
  );
  const newsCount = topic.relatedNews.length;
  const kolCount = topic.kolVoices.length;

  return (
    <div className={cn("border-b last:border-0", isSelected && "bg-muted/40")}>
      {/* Collapsed Header */}
      <button
        type="button"
        className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-muted/30 transition-colors group cursor-pointer"
        onClick={onToggleExpand}
      >
        {/* Name */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {topic.gapLevel === "high" && (
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse-subtle shrink-0" />
          )}
          <span className="text-sm font-medium group-hover:text-blue-600 transition-colors truncate">
            {topic.topic}
          </span>
        </div>

        {/* Heat badge - always visible */}
        <div
          className={cn(
            "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium shrink-0",
            heat.bg,
            heat.color,
          )}
        >
          <HeatIcon className="h-3 w-3" />
          {heat.label}
        </div>

        {/* Extra badges - hidden in compact mode */}
        {!compact && (
          <>
            <Badge
              variant="outline"
              className={cn("text-[10px] shrink-0", {
                "border-green-200 bg-green-50 text-green-700":
                  topic.ourStatus === "deployed",
                "border-amber-200 bg-amber-50 text-amber-700":
                  topic.ourStatus === "weak",
                "border-red-200 bg-red-50 text-red-700":
                  topic.ourStatus === "none",
              })}
            >
              {topic.ourStatusLabel}
            </Badge>

            <Badge
              variant="outline"
              className={cn("text-[10px] shrink-0", {
                "border-red-200 bg-red-50 text-red-700":
                  topic.gapLevel === "high",
                "border-amber-200 bg-amber-50 text-amber-700":
                  topic.gapLevel === "medium",
                "border-green-200 bg-green-50 text-green-700":
                  topic.gapLevel === "low",
              })}
            >
              缺口
              {topic.gapLevel === "high"
                ? "高"
                : topic.gapLevel === "medium"
                  ? "中"
                  : "低"}
            </Badge>

            <span className="text-[11px] text-muted-foreground shrink-0">
              {topic.totalSignals}信号
            </span>
          </>
        )}

        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
        )}
      </button>

      {/* Expanded Section */}
      <ExpandableSection isOpen={isExpanded}>
        <div className="border-t px-4 pb-4 pt-3 space-y-3">
          {/* AI Summary */}
          <div className="rounded-lg bg-blue-50/70 border border-blue-100 p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-xs font-semibold text-blue-700">
                AI 摘要
              </span>
            </div>
            <p className="text-xs text-blue-700/80 leading-relaxed">
              {topic.aiSummary}
            </p>
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              动态 {postCount} · 新闻 {newsCount} · KOL {kolCount}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-blue-600 hover:text-blue-700 gap-1"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetail();
              }}
            >
              查看详情
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </ExpandableSection>
    </div>
  );
}
