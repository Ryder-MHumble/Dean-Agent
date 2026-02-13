"use client";

import { AlertTriangle, Timer, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ScheduleEvent } from "@/lib/types/schedule";

export default function TimelineRow({
  event,
  isSelected,
  onClick,
}: {
  event: ScheduleEvent;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full text-left flex gap-4 p-4 rounded-xl transition-all group",
        isSelected
          ? "bg-white shadow-md ring-1 ring-blue-200"
          : "hover:bg-white/80 hover:shadow-sm",
      )}
    >
      {/* Time column */}
      <div className="flex flex-col items-end w-14 shrink-0 pt-0.5">
        <span className="text-sm font-bold text-foreground">{event.time}</span>
        <span className="text-[10px] text-muted-foreground">
          {event.endTime}
        </span>
      </div>

      {/* Timeline dot & line */}
      <div className="flex flex-col items-center pt-1.5">
        <div
          className={cn(
            "h-3 w-3 rounded-full border-2 border-white shadow-sm shrink-0",
            event.color,
          )}
        />
        <div className="w-px flex-1 bg-border mt-1" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="text-sm font-semibold text-foreground">
            {event.title}
          </h4>
          {event.type === "conflict" && (
            <Badge
              variant="secondary"
              className="text-[10px] bg-red-100 text-red-700 gap-1"
            >
              <AlertTriangle className="h-2.5 w-2.5" />
              冲突
            </Badge>
          )}
          {event.type === "deadline" && (
            <Badge
              variant="secondary"
              className="text-[10px] bg-amber-100 text-amber-700 gap-1"
            >
              <Timer className="h-2.5 w-2.5" />
              今日截止
            </Badge>
          )}
          <Badge
            variant="secondary"
            className={cn(
              "text-[10px]",
              event.confirmed
                ? "bg-green-50 text-green-700"
                : "bg-yellow-50 text-yellow-700",
            )}
          >
            {event.confirmed ? "已确认" : "待确认"}
          </Badge>
        </div>

        <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {event.location}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {event.stakeholders.length}人
          </span>
        </div>

        {event.conflictNote && (
          <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            {event.conflictNote}
          </p>
        )}
      </div>
    </button>
  );
}
