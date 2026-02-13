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
  AlertTriangle,
  Clock,
  Sparkles,
  Zap,
  Target,
  ChevronRight,
  FileText,
} from "lucide-react";
import {
  MotionNumber,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import DataFreshness from "@/components/shared/data-freshness";
import type { PolicyItem } from "@/lib/types/policy-intel";
import { mockPolicyMatches } from "@/lib/mock-data/policy-intel";

function MatchBar({ score }: { score: number }) {
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

export default function PolicyMatching() {
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyItem | null>(null);
  const [focusedPolicy, setFocusedPolicy] = useState<PolicyItem>(
    mockPolicyMatches[0],
  );
  const urgentCount = mockPolicyMatches.filter(
    (p) => p.status === "urgent",
  ).length;
  const avgMatch = Math.round(
    mockPolicyMatches.reduce((sum, p) => sum + p.matchScore, 0) /
      mockPolicyMatches.length,
  );

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">匹配政策</p>
              <p className="text-xl font-bold font-tabular">
                <MotionNumber value={mockPolicyMatches.length} />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-500">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">平均匹配度</p>
              <p className="text-xl font-bold font-tabular text-green-600">
                <MotionNumber value={avgMatch} suffix="%" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">紧急待办</p>
              <p className="text-xl font-bold font-tabular text-red-600">
                <MotionNumber value={urgentCount} suffix="项" />
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
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm font-semibold">
                    政策机会列表
                  </CardTitle>
                  <DataFreshness updatedAt={new Date(Date.now() - 1800000)} />
                </div>
                <Badge variant="secondary" className="text-[10px]">
                  按匹配度排序
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-hidden">
                <div className="grid grid-cols-[1fr_100px_90px_80px_70px_60px] gap-2 px-3 py-2 text-[11px] font-medium text-muted-foreground border-b">
                  <span>政策名称</span>
                  <span>发布机构</span>
                  <span>匹配度</span>
                  <span>资金规模</span>
                  <span>截止</span>
                  <span></span>
                </div>
                <StaggerContainer>
                  {mockPolicyMatches.map((policy) => (
                    <StaggerItem key={policy.id}>
                      <button
                        type="button"
                        className={cn(
                          "w-full grid grid-cols-[1fr_100px_90px_80px_70px_60px] gap-2 px-3 py-3 items-center text-left border-b last:border-0 hover:bg-muted/30 transition-all group cursor-pointer",
                          focusedPolicy?.id === policy.id &&
                            "bg-blue-50/50 ring-2 ring-blue-400/50 ring-inset",
                        )}
                        onClick={() => {
                          setFocusedPolicy(policy);
                          setSelectedPolicy(policy);
                        }}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {policy.status === "urgent" && (
                            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse-subtle shrink-0" />
                          )}
                          <span className="text-sm font-medium truncate group-hover:text-blue-600 transition-colors">
                            {policy.name}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className={cn("text-[10px] w-fit", {
                            "border-red-200 bg-red-50 text-red-700":
                              policy.agencyType === "national",
                            "border-blue-200 bg-blue-50 text-blue-700":
                              policy.agencyType === "beijing",
                            "border-gray-200 bg-gray-50 text-gray-700":
                              policy.agencyType === "ministry",
                          })}
                        >
                          {policy.agency}
                        </Badge>
                        <MatchBar score={policy.matchScore} />
                        <span className="text-xs text-foreground font-medium">
                          {policy.funding}
                        </span>
                        <div className="flex items-center gap-1">
                          <span
                            className={cn(
                              "text-xs font-tabular",
                              policy.daysLeft <= 7
                                ? "text-red-600 font-semibold"
                                : "text-muted-foreground",
                            )}
                          >
                            {policy.daysLeft}天
                          </span>
                        </div>
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
          <Card
            key={focusedPolicy.id}
            className="shadow-card bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0"
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-semibold">AI 政策解读</span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1.5">
                {focusedPolicy.name}
              </h4>
              <Badge
                variant="outline"
                className={cn("text-[10px] mb-3 border-slate-600", {
                  "border-red-400/50 bg-red-500/20 text-red-300":
                    focusedPolicy.agencyType === "national",
                  "border-blue-400/50 bg-blue-500/20 text-blue-300":
                    focusedPolicy.agencyType === "beijing",
                  "border-gray-400/50 bg-gray-500/20 text-gray-300":
                    focusedPolicy.agencyType === "ministry",
                })}
              >
                {focusedPolicy.agency}
              </Badge>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {focusedPolicy.aiInsight}
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-xs">
                  <div
                    className={cn(
                      "h-1.5 w-1.5 rounded-full mt-1.5 shrink-0",
                      focusedPolicy.matchScore >= 90
                        ? "bg-green-400"
                        : focusedPolicy.matchScore >= 70
                          ? "bg-blue-400"
                          : "bg-amber-400",
                    )}
                  />
                  <span className="text-slate-300">
                    匹配度 {focusedPolicy.matchScore}%
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    资金规模 {focusedPolicy.funding}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div
                    className={cn(
                      "h-1.5 w-1.5 rounded-full mt-1.5 shrink-0",
                      focusedPolicy.daysLeft <= 7
                        ? "bg-red-400"
                        : focusedPolicy.daysLeft <= 30
                          ? "bg-amber-400"
                          : "bg-blue-400",
                    )}
                  />
                  <span className="text-slate-300">
                    距截止 {focusedPolicy.daysLeft} 天（{focusedPolicy.deadline}
                    ）
                  </span>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs"
                onClick={() =>
                  toast.success(
                    `正在为「${focusedPolicy.name}」生成申报策略报告...`,
                  )
                }
              >
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                生成申报策略
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Sheet
        open={!!selectedPolicy}
        onOpenChange={() => setSelectedPolicy(null)}
      >
        <SheetContent className="sm:max-w-lg">
          {selectedPolicy && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg">
                  {selectedPolicy.name}
                </SheetTitle>
                <SheetDescription className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn("text-[10px]", {
                      "border-red-200 bg-red-50 text-red-700":
                        selectedPolicy.agencyType === "national",
                      "border-blue-200 bg-blue-50 text-blue-700":
                        selectedPolicy.agencyType === "beijing",
                    })}
                  >
                    {selectedPolicy.agency}
                  </Badge>
                  <span>匹配度 {selectedPolicy.matchScore}%</span>
                  <span>·</span>
                  <span>资金规模 {selectedPolicy.funding}</span>
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">详细分析</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedPolicy.detail}
                  </p>
                </div>
                <div className="rounded-lg bg-blue-50 border border-blue-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-semibold text-blue-700">
                      AI 建议
                    </span>
                  </div>
                  <p className="text-sm text-blue-700/80">
                    {selectedPolicy.aiInsight}
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    距截止: {selectedPolicy.daysLeft}天 (
                    {selectedPolicy.deadline})
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      toast.success("已分配给李副主任跟进");
                      setSelectedPolicy(null);
                    }}
                  >
                    分配负责人
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.success("申报材料模板已生成")}
                  >
                    生成申报材料
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
