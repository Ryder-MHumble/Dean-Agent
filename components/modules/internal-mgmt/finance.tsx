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
  DollarSign,
  TrendingDown,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  FileText,
  Wallet,
  PiggyBank,
} from "lucide-react";
import {
  MotionNumber,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BudgetItem {
  id: string;
  department: string;
  annualBudget: number;
  spent: number;
  executionRate: number;
  status: "normal" | "warning" | "danger";
  statusLabel: string;
  recentChange: string;
  aiInsight: string;
  detail: string;
}

const mockBudgets: BudgetItem[] = [
  {
    id: "b1",
    department: "AI & 机器人实验室",
    annualBudget: 2800,
    spent: 980,
    executionRate: 35,
    status: "normal",
    statusLabel: "正常",
    recentChange: "本月支出120万（设备采购）",
    aiInsight: "预算执行节奏正常，Q2有大额设备采购计划，建议提前启动审批流程。",
    detail:
      "年度预算2800万，主要用于算力平台建设、GPU集群扩容和实验室改造。当前已执行980万，执行率35%。Q2计划采购新一批A100 GPU集群（预算800万）。",
  },
  {
    id: "b2",
    department: "量子计算中心",
    annualBudget: 1500,
    spent: 1425,
    executionRate: 95,
    status: "danger",
    statusLabel: "超支预警",
    recentChange: "超支提示：低温设备维修追加150万",
    aiInsight:
      "已超支预警，低温设备维修费用超出预期。建议紧急协调校级应急资金或从其他中心调剂。",
    detail:
      "年度预算1500万，因低温设备频繁故障已追加维修费用150万。若不及时调剂，预计Q2将出现资金断裂。建议与校财务处协商紧急拨款。",
  },
  {
    id: "b3",
    department: "先进材料研究院",
    annualBudget: 1200,
    spent: 240,
    executionRate: 20,
    status: "warning",
    statusLabel: "执行滞后",
    recentChange: "采购审批卡在流程中",
    aiInsight:
      "执行率仅20%，远低于季度目标。主因是3个大额采购审批流程停滞。建议院长直接推动。",
    detail:
      "年度预算1200万，主要用于材料采购和仪器设备。当前执行滞后，3个大额采购（合计450万）审批停滞在采购处。",
  },
  {
    id: "b4",
    department: "科研项目专项基金",
    annualBudget: 1800,
    spent: 720,
    executionRate: 40,
    status: "normal",
    statusLabel: "正常",
    recentChange: "新增2个国家级项目配套",
    aiInsight: "执行率正常，新增的国家级项目配套资金已到位，建议加快项目启动。",
    detail:
      "年度预算1800万，覆盖院级、省部级和国家级项目配套。本月新增2个国家级项目配套共350万。",
  },
  {
    id: "b5",
    department: "行政与人员经费",
    annualBudget: 1200,
    spent: 600,
    executionRate: 50,
    status: "normal",
    statusLabel: "正常",
    recentChange: "人才引进签约奖金支出",
    aiInsight: "人员经费执行正常，但人才引进计划可能导致Q3-Q4压力增大。",
    detail:
      "年度预算1200万，包含人员工资、绩效奖金和人才引进费用。本月因引进1名海外人才支出签约奖金50万。",
  },
];

function BudgetBar({ rate, status }: { rate: number; status: string }) {
  const color =
    status === "danger"
      ? "bg-red-500"
      : status === "warning"
        ? "bg-amber-500"
        : rate > 80
          ? "bg-blue-500"
          : "bg-green-500";
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", color)}
          style={{ width: `${Math.min(rate, 100)}%` }}
        />
      </div>
      <span
        className={cn(
          "text-xs font-semibold font-tabular",
          status === "danger"
            ? "text-red-600"
            : status === "warning"
              ? "text-amber-600"
              : "text-foreground",
        )}
      >
        {rate}%
      </span>
    </div>
  );
}

export default function Finance() {
  const [selectedItem, setSelectedItem] = useState<BudgetItem | null>(null);
  const totalBudget = mockBudgets.reduce((s, b) => s + b.annualBudget, 0);
  const totalSpent = mockBudgets.reduce((s, b) => s + b.spent, 0);
  const overallRate = Math.round((totalSpent / totalBudget) * 100);
  const abnormalCount = mockBudgets.filter(
    (b) => b.status === "danger" || b.status === "warning",
  ).length;

  return (
    <>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">预算执行率</p>
              <p className="text-xl font-bold font-tabular text-amber-600">
                <MotionNumber value={overallRate} suffix="%" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">年度总预算</p>
              <p className="text-xl font-bold font-tabular">
                <MotionNumber value={totalBudget} />
                <span className="text-sm font-normal text-muted-foreground ml-0.5">
                  万
                </span>
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
              <p className="text-[11px] text-muted-foreground">异常项目</p>
              <p className="text-xl font-bold font-tabular text-red-600">
                <MotionNumber value={abnormalCount} suffix="个" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-500">
              <PiggyBank className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Q1结余</p>
              <p className="text-xl font-bold font-tabular text-green-600">
                <MotionNumber value={totalBudget - totalSpent} />
                <span className="text-sm font-normal text-muted-foreground ml-0.5">
                  万
                </span>
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
                  各部门预算执行
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">
                  按执行状态排序
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-hidden">
                <div className="grid grid-cols-[1fr_100px_110px_100px_1fr_50px] gap-2 px-3 py-2 text-[11px] font-medium text-muted-foreground border-b">
                  <span>部门</span>
                  <span>年度预算</span>
                  <span>执行率</span>
                  <span>状态</span>
                  <span>近期变动</span>
                  <span></span>
                </div>
                <StaggerContainer>
                  {mockBudgets.map((item) => (
                    <StaggerItem key={item.id}>
                      <button
                        type="button"
                        className="w-full grid grid-cols-[1fr_100px_110px_100px_1fr_50px] gap-2 px-3 py-3 items-center text-left border-b last:border-0 hover:bg-muted/30 transition-colors group cursor-pointer"
                        onClick={() => setSelectedItem(item)}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {item.status !== "normal" && (
                            <span
                              className={cn(
                                "h-2 w-2 rounded-full shrink-0",
                                item.status === "danger"
                                  ? "bg-red-500 animate-pulse-subtle"
                                  : "bg-amber-500",
                              )}
                            />
                          )}
                          <span className="text-sm font-medium truncate group-hover:text-blue-600 transition-colors">
                            {item.department}
                          </span>
                        </div>
                        <span className="text-xs text-foreground font-tabular">
                          {item.annualBudget}万
                        </span>
                        <BudgetBar
                          rate={item.executionRate}
                          status={item.status}
                        />
                        <Badge
                          variant="outline"
                          className={cn("text-[10px] w-fit", {
                            "border-green-200 bg-green-50 text-green-700":
                              item.status === "normal",
                            "border-amber-200 bg-amber-50 text-amber-700":
                              item.status === "warning",
                            "border-red-200 bg-red-50 text-red-700":
                              item.status === "danger",
                          })}
                        >
                          {item.statusLabel}
                        </Badge>
                        <span className="text-xs text-muted-foreground truncate">
                          {item.recentChange}
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
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-semibold">AI 财务状况分析</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                整体预算执行率{overallRate}
                %，略低于季度目标。量子计算中心超支预警需立即处理，先进材料研究院采购审批停滞已影响执行进度。
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    量子中心超支95%，需紧急调剂资金
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    材料院采购停滞，建议院长推动审批
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    AI实验室和科研基金执行正常
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    Q2设备采购高峰，需提前预留现金流
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white text-xs"
                  onClick={() => toast.success("正在生成财务分析报告...")}
                >
                  <FileText className="h-3.5 w-3.5 mr-1.5" />
                  财务报告
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 text-xs"
                  onClick={() => toast.success("正在生成预算调剂方案...")}
                >
                  <TrendingDown className="h-3.5 w-3.5 mr-1.5" />
                  调剂方案
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Sheet open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <SheetContent className="sm:max-w-lg">
          {selectedItem && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg">
                  {selectedItem.department}
                </SheetTitle>
                <SheetDescription className="flex items-center gap-2">
                  <span>年度预算 {selectedItem.annualBudget}万</span>
                  <span>·</span>
                  <span>已执行 {selectedItem.spent}万</span>
                  <span>·</span>
                  <Badge
                    variant="outline"
                    className={cn("text-[10px]", {
                      "border-green-200 bg-green-50 text-green-700":
                        selectedItem.status === "normal",
                      "border-amber-200 bg-amber-50 text-amber-700":
                        selectedItem.status === "warning",
                      "border-red-200 bg-red-50 text-red-700":
                        selectedItem.status === "danger",
                    })}
                  >
                    {selectedItem.statusLabel}
                  </Badge>
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">预算详情</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedItem.detail}
                  </p>
                </div>
                <div className="rounded-lg bg-amber-50 border border-amber-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-semibold text-amber-700">
                      AI 建议
                    </span>
                  </div>
                  <p className="text-sm text-amber-700/80">
                    {selectedItem.aiInsight}
                  </p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      toast.success("已发送督办通知");
                      setSelectedItem(null);
                    }}
                  >
                    督办跟进
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.success("预算明细已导出")}
                  >
                    导出明细
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
