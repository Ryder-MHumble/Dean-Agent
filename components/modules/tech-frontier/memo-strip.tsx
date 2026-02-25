"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StaggerContainer, StaggerItem } from "@/components/motion";
import { Clock, ChevronRight, PenTool } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Opportunity } from "@/lib/types/tech-frontier";

const priorityOrder: Record<string, number> = {
  紧急: 0,
  高: 1,
  中: 2,
  低: 3,
};

const typeConfig: Record<string, { color: string; bg: string }> = {
  合作: { color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
  会议: { color: "text-green-700", bg: "bg-green-50 border-green-200" },
  内参: { color: "text-purple-700", bg: "bg-purple-50 border-purple-200" },
};

const priorityConfig: Record<string, { color: string; bg: string }> = {
  紧急: { color: "text-red-700", bg: "bg-red-50 border-red-200" },
  高: { color: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
  中: { color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
  低: { color: "text-gray-700", bg: "bg-gray-50 border-gray-200" },
};

interface MemoStripProps {
  opportunities: Opportunity[];
  selectedId: string | null;
  onSelect: (opp: Opportunity) => void;
}

export default function MemoStrip({
  opportunities,
  selectedId,
  onSelect,
}: MemoStripProps) {
  const [expanded, setExpanded] = useState(false);

  const sortedOpportunities = useMemo(
    () =>
      [...opportunities].sort(
        (a, b) =>
          (priorityOrder[a.priority] ?? 99) -
          (priorityOrder[b.priority] ?? 99),
      ),
    [opportunities],
  );

  const urgentCount = useMemo(
    () => opportunities.filter((o) => o.priority === "紧急").length,
    [opportunities],
  );

  const displayedItems = expanded
    ? sortedOpportunities
    : sortedOpportunities.slice(0, 3);

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm font-semibold">内参机会</CardTitle>
          </div>
          <div className="flex items-center gap-1.5">
            {urgentCount > 0 && (
              <Badge
                variant="outline"
                className="text-[10px] border-red-200 bg-red-50 text-red-700"
              >
                紧急 {urgentCount}
              </Badge>
            )}
            <Badge variant="secondary" className="text-[10px]">
              总计 {opportunities.length}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        <StaggerContainer className="space-y-1">
          {displayedItems.map((opp) => {
            const tc = typeConfig[opp.type] || {
              color: "text-gray-700",
              bg: "bg-gray-50 border-gray-200",
            };
            const pc = priorityConfig[opp.priority] || {
              color: "text-gray-700",
              bg: "bg-gray-50 border-gray-200",
            };
            const isSelected = selectedId === opp.id;

            return (
              <StaggerItem key={opp.id}>
                <button
                  type="button"
                  className={cn(
                    "w-full flex items-center gap-2 px-2.5 py-2 rounded-md text-left transition-colors cursor-pointer group",
                    "hover:bg-muted/30",
                    isSelected && "bg-muted/40",
                  )}
                  onClick={() => onSelect(opp)}
                >
                  {/* Pulsing dot for urgent items */}
                  {opp.priority === "紧急" ? (
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse-subtle shrink-0" />
                  ) : (
                    <span className="h-2 w-2 shrink-0" />
                  )}

                  {/* Name */}
                  <span className="text-sm font-medium truncate flex-1 min-w-0">
                    {opp.name}
                  </span>

                  {/* Type badge */}
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] shrink-0",
                      tc.bg,
                      tc.color,
                    )}
                  >
                    {opp.type}
                  </Badge>

                  {/* Priority badge */}
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] shrink-0",
                      pc.bg,
                      pc.color,
                    )}
                  >
                    {opp.priority}
                  </Badge>

                  {/* Deadline */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                    <Clock className="h-3 w-3" />
                    <span>{opp.deadline}</span>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Expand/collapse button */}
        {sortedOpportunities.length > 3 && (
          <div className="flex justify-center pt-1">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded
                ? "收起"
                : `展开全部 ${sortedOpportunities.length} 条`}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
