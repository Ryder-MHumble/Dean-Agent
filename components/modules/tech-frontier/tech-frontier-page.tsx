"use client";

import { useState, useMemo } from "react";
import MasterDetailView from "@/components/shared/master-detail-view";
import { useDetailView } from "@/hooks/use-detail-view";
import { MotionCard, StaggerContainer, StaggerItem } from "@/components/motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DataFreshness from "@/components/shared/data-freshness";
import AIBriefingBar from "./ai-briefing-bar";
import SignalFeed from "./signal-feed";
import MemoStrip from "./memo-strip";
import {
  DetailContent,
  getDetailHeader,
  getDetailFooter,
} from "./detail-panels";
import TopicCard from "./topic-card";
import type { DetailTarget } from "@/lib/types/tech-frontier";
import {
  mockTechTopics,
  mockOpportunities,
  mockTechBriefing,
  flattenSignals,
} from "@/lib/mock-data/tech-frontier";
import { cn } from "@/lib/utils";

const heatOrder: Record<string, number> = {
  surging: 0,
  rising: 1,
  stable: 2,
  declining: 3,
};

const gapOrder: Record<string, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

type SortBy = "heat" | "gap" | "signals";

export default function TechFrontierPage() {
  const { selectedItem, open, close, isOpen } = useDetailView<DetailTarget>();
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>("heat");

  const allSignals = useMemo(() => flattenSignals(mockTechTopics), []);

  const sortedTopics = useMemo(() => {
    const topics = [...mockTechTopics];
    switch (sortBy) {
      case "heat":
        return topics.sort(
          (a, b) =>
            (heatOrder[a.heatTrend] ?? 99) - (heatOrder[b.heatTrend] ?? 99),
        );
      case "gap":
        return topics.sort(
          (a, b) => (gapOrder[a.gapLevel] ?? 99) - (gapOrder[b.gapLevel] ?? 99),
        );
      case "signals":
        return topics.sort((a, b) => b.totalSignals - a.totalSignals);
      default:
        return topics;
    }
  }, [sortBy]);

  const selectedSignalId =
    selectedItem?.kind === "news" || selectedItem?.kind === "kol"
      ? selectedItem.data.id
      : null;

  const selectedOppId =
    selectedItem?.kind === "opportunity" ? selectedItem.data.id : null;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden p-5 gap-3">
      {/* AI Briefing - collapsible */}
      <MotionCard delay={0} className="shrink-0">
        <AIBriefingBar briefing={mockTechBriefing} />
      </MotionCard>

      {/* Main Content with MasterDetailView */}
      <MotionCard delay={0.1} className="flex-1 min-h-0">
        <MasterDetailView
          isOpen={isOpen}
          onClose={close}
          listWidth={42}
          className="h-full"
          detailHeader={
            selectedItem ? getDetailHeader(selectedItem) : undefined
          }
          detailContent={
            selectedItem ? <DetailContent target={selectedItem} /> : null
          }
          detailFooter={
            selectedItem ? getDetailFooter(selectedItem, close) : undefined
          }
        >
          <div className="space-y-4 p-1">
            {/* Tech Topic Matrix Section */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-sm font-semibold">
                      技术矩阵
                    </CardTitle>
                    <DataFreshness updatedAt={new Date(Date.now() - 7200000)} />
                  </div>
                  <div className="flex items-center gap-1">
                    {(
                      [
                        { key: "heat", label: "按热度" },
                        { key: "gap", label: "按缺口" },
                        { key: "signals", label: "按信号量" },
                      ] as const
                    ).map(({ key, label }) => (
                      <button
                        key={key}
                        type="button"
                        className={cn(
                          "text-[11px] font-medium px-2.5 py-1 rounded-md transition-colors",
                          sortBy === key
                            ? "bg-foreground text-background"
                            : "bg-muted/50 text-muted-foreground hover:bg-muted",
                        )}
                        onClick={() => setSortBy(key)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <StaggerContainer>
                  {sortedTopics.map((topic) => (
                    <StaggerItem key={topic.id}>
                      <TopicCard
                        topic={topic}
                        isExpanded={expandedTopicId === topic.id}
                        isSelected={
                          selectedItem?.kind === "topic" &&
                          selectedItem.data.id === topic.id
                        }
                        compact={isOpen}
                        onToggleExpand={() =>
                          setExpandedTopicId(
                            expandedTopicId === topic.id ? null : topic.id,
                          )
                        }
                        onOpenDetail={() =>
                          open({ kind: "topic", data: topic })
                        }
                      />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </CardContent>
            </Card>

            {/* Signal Feed Section */}
            <SignalFeed
              signals={allSignals}
              selectedId={selectedSignalId}
              onSelectSignal={(target) => open(target)}
            />

            {/* Memo Strip Section */}
            <MemoStrip
              opportunities={mockOpportunities}
              selectedId={selectedOppId}
              onSelect={(opp) => open({ kind: "opportunity", data: opp })}
            />
          </div>
        </MasterDetailView>
      </MotionCard>
    </div>
  );
}
