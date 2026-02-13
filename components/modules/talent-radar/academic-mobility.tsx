"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  TrendingUp,
  Sparkles,
  ChevronRight,
  FileText,
  ArrowRight,
  Calendar,
  AlertCircle,
} from "lucide-react";
import {
  MotionNumber,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { MobilityEvent } from "@/lib/types/talent-radar";
import { mockMobilityEvents } from "@/lib/mock-data/talent-radar";

export default function AcademicMobility() {
  const [selectedEvent, setSelectedEvent] = useState<MobilityEvent | null>(
    null,
  );
  const inflowCount = mockMobilityEvents.filter(
    (e) => e.type === "inflow",
  ).length;
  const outflowCount = mockMobilityEvents.filter(
    (e) => e.type === "outflow",
  ).length;
  const netGrowth = inflowCount - outflowCount;

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
              <ArrowDownToLine className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">流入</p>
              <p className="text-xl font-bold font-tabular text-blue-600">
                <MotionNumber value={12} suffix="人" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500">
              <ArrowUpFromLine className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">流出</p>
              <p className="text-xl font-bold font-tabular text-red-600">
                <MotionNumber value={5} suffix="人" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">净增长</p>
              <p className="text-xl font-bold font-tabular text-emerald-600">
                <MotionNumber value={7} prefix="+" suffix="人" />
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">
                  人才流动事件
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">
                  按时间排序
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-hidden">
                <div className="grid grid-cols-[80px_1fr_100px_80px_90px_40px] gap-2 px-3 py-2 text-[11px] font-medium text-muted-foreground border-b">
                  <span>人才</span>
                  <span>流动方向</span>
                  <span>研究方向</span>
                  <span>影响</span>
                  <span>日期</span>
                  <span></span>
                </div>
                <StaggerContainer>
                  {mockMobilityEvents.map((event) => (
                    <StaggerItem key={event.id}>
                      <button
                        type="button"
                        className="w-full grid grid-cols-[80px_1fr_100px_80px_90px_40px] gap-2 px-3 py-3 items-center text-left border-b last:border-0 hover:bg-muted/30 transition-colors group cursor-pointer"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="flex items-center gap-2">
                          {event.impact === "high" && (
                            <span
                              className={cn(
                                "h-2 w-2 rounded-full animate-pulse-subtle shrink-0",
                                event.type === "inflow"
                                  ? "bg-blue-500"
                                  : "bg-red-500",
                              )}
                            />
                          )}
                          <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                            {event.talentName}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <span className="truncate max-w-[100px]">
                            {event.fromInstitution}
                          </span>
                          <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground/50" />
                          <span className="truncate max-w-[100px]">
                            {event.toInstitution}
                          </span>
                          <Badge
                            variant="outline"
                            className={cn("text-[9px] ml-1 shrink-0", {
                              "border-blue-200 bg-blue-50 text-blue-700":
                                event.type === "inflow",
                              "border-red-200 bg-red-50 text-red-700":
                                event.type === "outflow",
                              "border-gray-200 bg-gray-50 text-gray-600":
                                event.type === "external",
                            })}
                          >
                            {event.typeLabel}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground truncate">
                          {event.direction}
                        </span>
                        <Badge
                          variant="outline"
                          className={cn("text-[10px] w-fit", {
                            "border-red-200 bg-red-50 text-red-700":
                              event.impact === "high" &&
                              event.type === "outflow",
                            "border-emerald-200 bg-emerald-50 text-emerald-700":
                              event.impact === "high" &&
                              event.type === "inflow",
                            "border-blue-200 bg-blue-50 text-blue-700":
                              event.impact === "medium" &&
                              event.type !== "outflow",
                            "border-amber-200 bg-amber-50 text-amber-700":
                              event.impact === "medium" &&
                              event.type === "outflow",
                            "border-gray-200 bg-gray-50 text-gray-600":
                              event.impact === "low",
                          })}
                        >
                          {event.impactLabel}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-tabular">
                          {event.date}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-4">
          <Card className="shadow-card bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-semibold">AI 流动趋势分析</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                近期人才流动呈净流入态势（+7人），但NLP和大模型方向出现关键人才流失。产业界高薪挖角是主要威胁，建议从制度层面建立人才保留机制。
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    NLP方向学术带头人流失，需紧急补充
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    大模型人才向产业界流失趋势加剧
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    强化学习和CV方向引才成效显著
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    建议推行产学研融合教职，减少流失
                  </span>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs"
                onClick={() => toast.success("正在生成人才流动分析报告...")}
              >
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                生成流动分析报告
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Sheet open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <SheetContent className="sm:max-w-lg">
          {selectedEvent && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg flex items-center gap-2">
                  {selectedEvent.talentName}
                  <Badge
                    variant="outline"
                    className={cn("text-[10px]", {
                      "border-blue-200 bg-blue-50 text-blue-700":
                        selectedEvent.type === "inflow",
                      "border-red-200 bg-red-50 text-red-700":
                        selectedEvent.type === "outflow",
                      "border-gray-200 bg-gray-50 text-gray-600":
                        selectedEvent.type === "external",
                    })}
                  >
                    {selectedEvent.typeLabel}
                  </Badge>
                </SheetTitle>
                <SheetDescription>
                  {selectedEvent.fromInstitution} &rarr;{" "}
                  {selectedEvent.toInstitution} &middot;{" "}
                  {selectedEvent.direction} &middot; {selectedEvent.date}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    事件详情
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedEvent.detail}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-[11px] text-muted-foreground">
                      流动类型
                    </p>
                    <p
                      className={cn("text-sm font-bold mt-0.5", {
                        "text-blue-600": selectedEvent.type === "inflow",
                        "text-red-600": selectedEvent.type === "outflow",
                        "text-gray-600": selectedEvent.type === "external",
                      })}
                    >
                      {selectedEvent.typeLabel}
                    </p>
                  </div>
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-[11px] text-muted-foreground">
                      影响程度
                    </p>
                    <p className="text-sm font-bold mt-0.5">
                      {selectedEvent.impactLabel}
                    </p>
                  </div>
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-[11px] text-muted-foreground">
                      研究方向
                    </p>
                    <p className="text-sm font-bold mt-0.5">
                      {selectedEvent.direction}
                    </p>
                  </div>
                </div>
                {selectedEvent.type === "outflow" && (
                  <div className="rounded-lg bg-red-50 border border-red-100 p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-semibold text-red-700">
                        流失预警
                      </span>
                    </div>
                    <p className="text-xs text-red-600/80">
                      该方向人才流失可能对相关课题和研究生培养产生影响，请关注后续应对方案。
                    </p>
                  </div>
                )}
                <div className="rounded-lg bg-blue-50 border border-blue-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-semibold text-blue-700">
                      AI 分析与建议
                    </span>
                  </div>
                  <p className="text-sm text-blue-700/80 leading-relaxed">
                    {selectedEvent.aiAnalysis}
                  </p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      toast.success("已标记为重点关注事件");
                      setSelectedEvent(null);
                    }}
                  >
                    <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
                    标记关注
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.success("流动影响评估报告已生成")}
                  >
                    <FileText className="h-3.5 w-3.5 mr-1.5" />
                    影响评估
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
