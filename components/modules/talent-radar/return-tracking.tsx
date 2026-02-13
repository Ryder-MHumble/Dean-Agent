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
  UserSearch,
  HeartHandshake,
  Plane,
  Sparkles,
  ChevronRight,
  FileText,
  MapPin,
  GraduationCap,
  Mail,
} from "lucide-react";
import {
  MotionNumber,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { TalentCandidate } from "@/lib/types/talent-radar";
import { mockReturnCandidates } from "@/lib/mock-data/talent-radar";

export default function ReturnTracking() {
  const [selectedCandidate, setSelectedCandidate] =
    useState<TalentCandidate | null>(null);
  const highIntentionCount = mockReturnCandidates.filter(
    (c) => c.intention === "high",
  ).length;
  const returningCount = mockReturnCandidates.filter(
    (c) => c.status === "即将回国",
  ).length;

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500">
              <UserSearch className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">追踪人才</p>
              <p className="text-xl font-bold font-tabular">
                <MotionNumber value={45} suffix="人" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">高意向</p>
              <p className="text-xl font-bold font-tabular text-orange-600">
                <MotionNumber value={highIntentionCount} suffix="人" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
              <Plane className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">近期回国</p>
              <p className="text-xl font-bold font-tabular text-blue-600">
                <MotionNumber value={returningCount} suffix="人" />
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
                  回流人才追踪列表
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">
                  按意向度排序
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-hidden">
                <div className="grid grid-cols-[100px_1fr_100px_80px_80px_40px] gap-2 px-3 py-2 text-[11px] font-medium text-muted-foreground border-b">
                  <span>姓名</span>
                  <span>机构</span>
                  <span>方向</span>
                  <span>意向度</span>
                  <span>状态</span>
                  <span></span>
                </div>
                <StaggerContainer>
                  {mockReturnCandidates.map((candidate) => (
                    <StaggerItem key={candidate.id}>
                      <button
                        type="button"
                        className="w-full grid grid-cols-[100px_1fr_100px_80px_80px_40px] gap-2 px-3 py-3 items-center text-left border-b last:border-0 hover:bg-muted/30 transition-colors group cursor-pointer"
                        onClick={() => setSelectedCandidate(candidate)}
                      >
                        <div className="flex items-center gap-2">
                          {candidate.intention === "high" && (
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-subtle shrink-0" />
                          )}
                          <span className="text-sm font-medium group-hover:text-emerald-600 transition-colors">
                            {candidate.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                          <span className="text-xs text-muted-foreground truncate">
                            {candidate.institution}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground truncate">
                          {candidate.direction}
                        </span>
                        <Badge
                          variant="outline"
                          className={cn("text-[10px] w-fit", {
                            "border-emerald-200 bg-emerald-50 text-emerald-700":
                              candidate.intention === "high",
                            "border-amber-200 bg-amber-50 text-amber-700":
                              candidate.intention === "medium",
                            "border-gray-200 bg-gray-50 text-gray-600":
                              candidate.intention === "low",
                          })}
                        >
                          {candidate.intentionLabel}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {candidate.status}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
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
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-semibold">AI 人才引进分析</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                当前追踪45位海外华人AI人才，其中8位表达高度回国意向。3位人才预计近期回国，建议优先推进陈雨桐博士的入职准备工作。
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    张明远（MIT）配偶已回国，窗口期3个月
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    李思琪下月参加北京AI安全论坛，面谈机会
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    王浩然意向中等，建议学术合作先行
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    陈雨桐已获青年人才计划，尽快落实入职
                  </span>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs"
                onClick={() => toast.success("正在生成人才引进策略报告...")}
              >
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                生成引才策略报告
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Sheet
        open={!!selectedCandidate}
        onOpenChange={() => setSelectedCandidate(null)}
      >
        <SheetContent className="sm:max-w-lg">
          {selectedCandidate && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg flex items-center gap-2">
                  {selectedCandidate.name}
                  <Badge
                    variant="outline"
                    className={cn("text-[10px]", {
                      "border-emerald-200 bg-emerald-50 text-emerald-700":
                        selectedCandidate.intention === "high",
                      "border-amber-200 bg-amber-50 text-amber-700":
                        selectedCandidate.intention === "medium",
                      "border-gray-200 bg-gray-50 text-gray-600":
                        selectedCandidate.intention === "low",
                    })}
                  >
                    {selectedCandidate.intentionLabel}
                  </Badge>
                </SheetTitle>
                <SheetDescription>
                  {selectedCandidate.institution} ({selectedCandidate.country})
                  &middot; {selectedCandidate.direction} &middot; 海外
                  {selectedCandidate.yearsAbroad}年
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    人才档案
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedCandidate.profile}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-[11px] text-muted-foreground">
                      发表论文
                    </p>
                    <p className="text-lg font-bold">
                      {selectedCandidate.publications}
                    </p>
                  </div>
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-[11px] text-muted-foreground">
                      海外年限
                    </p>
                    <p className="text-lg font-bold">
                      {selectedCandidate.yearsAbroad}年
                    </p>
                  </div>
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-[11px] text-muted-foreground">
                      当前状态
                    </p>
                    <p className="text-sm font-bold mt-0.5">
                      {selectedCandidate.status}
                    </p>
                  </div>
                </div>
                <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm font-semibold text-emerald-700">
                      AI 招引策略
                    </span>
                  </div>
                  <p className="text-sm text-emerald-700/80 leading-relaxed">
                    {selectedCandidate.aiStrategy}
                  </p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      toast.success("已安排人才引进对接");
                      setSelectedCandidate(null);
                    }}
                  >
                    <Mail className="h-3.5 w-3.5 mr-1.5" />
                    发送邀请
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.success("人才档案报告已生成")}
                  >
                    <FileText className="h-3.5 w-3.5 mr-1.5" />
                    导出档案
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
