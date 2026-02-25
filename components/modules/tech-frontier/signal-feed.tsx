"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DataFreshness from "@/components/shared/data-freshness";
import { StaggerContainer, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";
import type {
  IndustrySignalItem,
  DetailTarget,
  TopicNews,
  KOLVoice,
} from "@/lib/types/tech-frontier";

const newsTypeColors: Record<string, { color: string; bg: string }> = {
  投融资: { color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
  新产品: { color: "text-green-700", bg: "bg-green-50 border-green-200" },
  政策: { color: "text-purple-700", bg: "bg-purple-50 border-purple-200" },
  收购: { color: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
  合作: { color: "text-teal-700", bg: "bg-teal-50 border-teal-200" },
};

type FilterKey = "全部" | "投融资" | "新产品" | "政策" | "收购" | "KOL观点";

interface SignalFeedProps {
  signals: IndustrySignalItem[];
  selectedId: string | null;
  onSelectSignal: (target: DetailTarget) => void;
}

export default function SignalFeed({
  signals,
  selectedId,
  onSelectSignal,
}: SignalFeedProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("全部");
  const [expanded, setExpanded] = useState(false);

  // Compute counts per filter category
  const counts = useMemo(() => {
    const result: Record<FilterKey, number> = {
      全部: signals.length,
      投融资: 0,
      新产品: 0,
      政策: 0,
      收购: 0,
      KOL观点: 0,
    };
    for (const signal of signals) {
      if (signal.kind === "kol") {
        result["KOL观点"]++;
      } else {
        const news = signal.data as TopicNews;
        if (news.type in result) {
          result[news.type as FilterKey]++;
        }
      }
    }
    return result;
  }, [signals]);

  // Filter signals based on active filter
  const filteredSignals = useMemo(() => {
    if (activeFilter === "全部") return signals;
    if (activeFilter === "KOL观点") {
      return signals.filter((s) => s.kind === "kol");
    }
    return signals.filter(
      (s) => s.kind === "news" && (s.data as TopicNews).type === activeFilter,
    );
  }, [signals, activeFilter]);

  const displayedSignals = expanded
    ? filteredSignals
    : filteredSignals.slice(0, 6);

  const filters: FilterKey[] = [
    "全部",
    "投融资",
    "新产品",
    "政策",
    "收购",
    "KOL观点",
  ];

  function handleSelect(signal: IndustrySignalItem) {
    if (signal.kind === "news") {
      onSelectSignal({ kind: "news", data: signal.data as TopicNews });
    } else {
      onSelectSignal({ kind: "kol", data: signal.data as KOLVoice });
    }
  }

  function getSignalId(signal: IndustrySignalItem): string {
    return signal.data.id;
  }

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">产业信号流</CardTitle>
          <DataFreshness updatedAt={new Date(Date.now() - 3600000)} />
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        {/* Filter tabs */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {filters.map((key) => (
            <button
              key={key}
              type="button"
              className={cn(
                "text-[11px] font-medium px-2.5 py-1 rounded-md transition-colors",
                activeFilter === key
                  ? "bg-foreground text-background"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted",
              )}
              onClick={() => {
                setActiveFilter(key);
                setExpanded(false);
              }}
            >
              {key}({counts[key]})
            </button>
          ))}
        </div>

        {/* Signal items list */}
        <StaggerContainer className="space-y-1">
          {displayedSignals.map((signal) => {
            const id = getSignalId(signal);
            const isSelected = selectedId === id;

            if (signal.kind === "news") {
              const news = signal.data as TopicNews;
              const tc = newsTypeColors[news.type] || {
                color: "text-gray-700",
                bg: "bg-gray-50 border-gray-200",
              };

              return (
                <StaggerItem key={id}>
                  <button
                    type="button"
                    className={cn(
                      "w-full flex items-start gap-2.5 p-2.5 rounded-md text-left transition-colors cursor-pointer",
                      "hover:bg-muted/30",
                      isSelected && "bg-muted/40",
                    )}
                    onClick={() => handleSelect(signal)}
                  >
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[9px] px-1.5 py-0.5 shrink-0 mt-0.5",
                        tc.bg,
                        tc.color,
                      )}
                    >
                      {news.type}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-medium line-clamp-1">
                        {news.title}
                      </span>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                        <span>{news.source}</span>
                        <span>{news.date}</span>
                        <Badge
                          variant="outline"
                          className={cn("text-[8px] px-1 py-0", {
                            "border-red-200 text-red-600":
                              news.impact === "重大",
                            "border-amber-200 text-amber-600":
                              news.impact === "较大",
                            "border-gray-200 text-gray-500":
                              news.impact === "一般",
                          })}
                        >
                          {news.impact}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="text-[8px] px-1.5 py-0"
                        >
                          {signal.parentTopicName}
                        </Badge>
                      </div>
                    </div>
                  </button>
                </StaggerItem>
              );
            }

            // KOL voice
            const kol = signal.data as KOLVoice;

            return (
              <StaggerItem key={id}>
                <button
                  type="button"
                  className={cn(
                    "w-full flex items-start gap-2.5 p-2.5 rounded-md text-left transition-colors cursor-pointer",
                    "hover:bg-muted/30",
                    isSelected && "bg-muted/40",
                  )}
                  onClick={() => handleSelect(signal)}
                >
                  <Badge className="text-[9px] px-1.5 py-0.5 shrink-0 mt-0.5 bg-indigo-100 text-indigo-700">
                    KOL
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium">{kol.name}</span>
                      <span className="text-[10px] text-muted-foreground truncate">
                        &ldquo;{kol.statement}&rdquo;
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                      <span>{kol.affiliation}</span>
                      <span>{kol.date}</span>
                      <Badge
                        variant="outline"
                        className={cn("text-[8px] px-1 py-0", {
                          "border-red-200 text-red-600":
                            kol.influence === "极高",
                          "border-amber-200 text-amber-600":
                            kol.influence === "高",
                          "border-gray-200 text-gray-500":
                            kol.influence === "中",
                        })}
                      >
                        影响力{kol.influence}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="text-[8px] px-1.5 py-0"
                      >
                        {signal.parentTopicName}
                      </Badge>
                    </div>
                  </div>
                </button>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Expand/collapse button */}
        {filteredSignals.length > 6 && (
          <div className="flex justify-center pt-1">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded
                ? "收起"
                : `查看全部 ${filteredSignals.length} 条信号`}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
