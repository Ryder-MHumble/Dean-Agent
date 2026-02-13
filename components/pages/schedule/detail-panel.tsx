"use client";

import { useState } from "react";
import {
  Calendar as CalendarIcon,
  MapPin,
  FileText,
  Eye,
  Users,
  Timer,
  ChevronDown,
  Check,
  Play,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MotionCard } from "@/components/motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { ScheduleEvent } from "@/lib/types/schedule";

function CollapsibleSection({
  title,
  icon,
  defaultOpen = false,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
      >
        <span className="flex items-center gap-2">
          {icon}
          {title}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-3 border-t border-border">{children}</div>
      )}
    </div>
  );
}

export default function DetailPanel({ event }: { event: ScheduleEvent }) {
  return (
    <ScrollArea className="h-[calc(100vh-220px)]">
      <div className="space-y-4 pr-2" key={event.title}>
        {/* Header */}
        <MotionCard delay={0}>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Badge
                  variant="secondary"
                  className={cn(
                    "text-[10px]",
                    event.confirmed
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700",
                  )}
                >
                  {event.confirmed ? (
                    <span className="flex items-center gap-1">
                      <Check className="h-2.5 w-2.5" />
                      已确认
                    </span>
                  ) : (
                    "待确认"
                  )}
                </Badge>
                {event.type === "conflict" && (
                  <Badge
                    variant="secondary"
                    className="text-[10px] bg-red-100 text-red-700"
                  >
                    存在冲突
                  </Badge>
                )}
                {event.type === "deadline" && (
                  <Badge
                    variant="secondary"
                    className="text-[10px] bg-amber-100 text-amber-700"
                  >
                    今日截止
                  </Badge>
                )}
              </div>

              <h2 className="text-lg font-bold text-foreground leading-snug">
                {event.title}
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                {event.subtitle}
              </p>

              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  <span>
                    {event.time} - {event.endTime}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{event.location}</span>
                </div>
              </div>

              {event.description && (
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed border-t border-border pt-3">
                  {event.description}
                </p>
              )}
            </CardContent>
          </Card>
        </MotionCard>

        {/* Stakeholders */}
        <MotionCard delay={0.1}>
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                参会人员
              </h3>
              <div className="space-y-2.5">
                {event.stakeholders.map((person) => (
                  <div key={person.name} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback
                        className={cn("text-xs font-bold", person.bgColor)}
                      >
                        {person.initial}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {person.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {person.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </MotionCard>

        {/* Talking Points */}
        <MotionCard delay={0.2}>
          <CollapsibleSection
            title={`谈话要点 (${event.talkingPoints.length})`}
            icon={
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            }
            defaultOpen
          >
            <ul className="space-y-2 pt-2">
              {event.talkingPoints.map((point, i) => (
                <li
                  key={`point-${i}`}
                  className="flex items-start gap-2 text-xs text-foreground"
                >
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </CollapsibleSection>
        </MotionCard>

        {/* Files */}
        <MotionCard delay={0.3}>
          <CollapsibleSection
            title={`准备材料 (${event.files.length})`}
            icon={<FileText className="h-4 w-4 text-muted-foreground" />}
          >
            <div className="space-y-2 pt-2">
              {event.files.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between rounded-lg border border-border p-2.5 hover:border-blue-200 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg",
                        file.iconBg,
                      )}
                    >
                      {file.icon === "doc" ? (
                        <FileText
                          className={cn("h-3.5 w-3.5", file.iconColor)}
                        />
                      ) : (
                        <Play
                          className={cn("h-3.5 w-3.5", file.iconColor)}
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">
                        {file.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {file.size} · {file.added}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      toast("正在打开文件...");
                    }}
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        </MotionCard>

        {/* Conflict action */}
        {event.type === "conflict" && (
          <MotionCard delay={0.4}>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-800 py-3 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
              onClick={() => toast.success("已授权李副主任代为出席")}
            >
              <Users className="h-4 w-4" />
              授权李副主任代为出席
            </button>
          </MotionCard>
        )}

        {/* Deadline action */}
        {event.type === "deadline" && (
          <MotionCard delay={0.4}>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-sm font-medium text-white hover:bg-amber-600 transition-colors"
              onClick={() => toast.success("已设置截止提醒")}
            >
              <Timer className="h-4 w-4" />
              设置截止提醒
            </button>
          </MotionCard>
        )}
      </div>
    </ScrollArea>
  );
}
