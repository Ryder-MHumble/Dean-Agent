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
  Cpu,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  FileText,
  Activity,
} from "lucide-react";
import {
  MotionNumber,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface TechTrend {
  id: string;
  topic: string;
  heatTrend: "surging" | "rising" | "stable" | "declining";
  heatLabel: string;
  ourStatus: "deployed" | "weak" | "none";
  ourStatusLabel: string;
  gapLevel: "high" | "medium" | "low";
  keyMetric: string;
  aiInsight: string;
  detail: string;
}

const mockTechTrends: TechTrend[] = [
  {
    id: "t1",
    topic: "具身智能",
    heatTrend: "surging",
    heatLabel: "+180%",
    ourStatus: "none",
    ourStatusLabel: "未布局",
    gapLevel: "high",
    keyMetric: "清华AIR发布2篇顶会论文",
    aiInsight:
      "建议紧急组建3-5人先导小组，重点关注机器人操作与导航方向。可与清华AIR探讨合作可能性。",
    detail:
      "具身智能是将AI与物理世界交互的关键技术方向。清华AIR在该方向已发布2篇ICRA 2024论文，团队扩至15人。我院在该方向布局为空，存在技术路线踏空风险。",
  },
  {
    id: "t2",
    topic: "多模态大模型",
    heatTrend: "rising",
    heatLabel: "+45%",
    ourStatus: "deployed",
    ourStatusLabel: "已布局",
    gapLevel: "low",
    keyMetric: "GPT-4o引发新一轮研究热潮",
    aiInsight: "我院在该方向已有深厚积累，建议保持投入并加强与产业界合作。",
    detail:
      "多模态大模型整合视觉、语音、文本等多种模态，是大模型发展的重要方向。我院在文本-图像多模态方面有3个在研项目和5篇顶会论文积累。",
  },
  {
    id: "t3",
    topic: "AI Agent",
    heatTrend: "surging",
    heatLabel: "+210%",
    ourStatus: "weak",
    ourStatusLabel: "基础薄弱",
    gapLevel: "medium",
    keyMetric: "OpenAI发布Operator产品",
    aiInsight: "我院有理论基础但缺乏工程化能力，建议引进2名工程化人才。",
    detail:
      "AI Agent是自主完成复杂任务的智能代理系统。OpenAI、Anthropic等公司相继发布Agent产品。我院在强化学习方向有理论积累，但工程化落地能力不足。",
  },
  {
    id: "t4",
    topic: "AI for Science",
    heatTrend: "stable",
    heatLabel: "+12%",
    ourStatus: "deployed",
    ourStatusLabel: "已布局",
    gapLevel: "low",
    keyMetric: "Nature连发3篇AI+生物论文",
    aiInsight:
      "当前布局良好，建议加强跨学科合作，尤其是与生命科学学院的联合课题。",
    detail:
      "AI for Science利用AI加速科学发现的新范式。我院在药物发现、蛋白质结构预测方向有2个在研课题。",
  },
  {
    id: "t5",
    topic: "端侧AI推理",
    heatTrend: "rising",
    heatLabel: "+65%",
    ourStatus: "none",
    ourStatusLabel: "未布局",
    gapLevel: "high",
    keyMetric: "Apple发布端侧AI芯片",
    aiInsight: "存在技术路线空白，但该方向偏硬件，可暂时通过合作方式参与。",
    detail:
      "端侧AI将AI推理从云端迁移到边缘设备，涉及模型压缩、专用芯片等技术。Apple、Qualcomm等公司正大力投入。",
  },
];

function HeatIndicator({ trend }: { trend: TechTrend["heatTrend"] }) {
  const config = {
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
  const c = config[trend];
  const Icon = c.icon;
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium",
        c.bg,
        c.color,
      )}
    >
      <Icon className="h-3 w-3" />
      {c.label}
    </div>
  );
}

export default function TechTrends() {
  const [selectedTech, setSelectedTech] = useState<TechTrend | null>(null);
  const highGapCount = mockTechTrends.filter(
    (t) => t.gapLevel === "high",
  ).length;
  const surgingCount = mockTechTrends.filter(
    (t) => t.heatTrend === "surging",
  ).length;

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-500">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">追踪技术</p>
              <p className="text-xl font-bold font-tabular">
                <MotionNumber value={mockTechTrends.length} />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">热度飙升</p>
              <p className="text-xl font-bold font-tabular text-red-600">
                <MotionNumber value={surgingCount} suffix="项" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">覆盖缺口</p>
              <p className="text-xl font-bold font-tabular text-amber-600">
                <MotionNumber value={highGapCount} suffix="项" />
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
                  技术趋势追踪
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">
                  按覆盖缺口排序
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-hidden">
                <div className="grid grid-cols-[1fr_80px_90px_80px_1fr_50px] gap-2 px-3 py-2 text-[11px] font-medium text-muted-foreground border-b">
                  <span>技术方向</span>
                  <span>热度趋势</span>
                  <span>我院状态</span>
                  <span>缺口</span>
                  <span>关键信号</span>
                  <span></span>
                </div>
                <StaggerContainer>
                  {mockTechTrends.map((tech) => (
                    <StaggerItem key={tech.id}>
                      <button
                        type="button"
                        className="w-full grid grid-cols-[1fr_80px_90px_80px_1fr_50px] gap-2 px-3 py-3 items-center text-left border-b last:border-0 hover:bg-muted/30 transition-colors group cursor-pointer"
                        onClick={() => setSelectedTech(tech)}
                      >
                        <div className="flex items-center gap-2">
                          {tech.gapLevel === "high" && (
                            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse-subtle shrink-0" />
                          )}
                          <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                            {tech.topic}
                          </span>
                        </div>
                        <HeatIndicator trend={tech.heatTrend} />
                        <Badge
                          variant="outline"
                          className={cn("text-[10px] w-fit", {
                            "border-green-200 bg-green-50 text-green-700":
                              tech.ourStatus === "deployed",
                            "border-amber-200 bg-amber-50 text-amber-700":
                              tech.ourStatus === "weak",
                            "border-red-200 bg-red-50 text-red-700":
                              tech.ourStatus === "none",
                          })}
                        >
                          {tech.ourStatusLabel}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={cn("text-[10px] w-fit", {
                            "border-red-200 bg-red-50 text-red-700":
                              tech.gapLevel === "high",
                            "border-amber-200 bg-amber-50 text-amber-700":
                              tech.gapLevel === "medium",
                            "border-green-200 bg-green-50 text-green-700":
                              tech.gapLevel === "low",
                          })}
                        >
                          {tech.gapLevel === "high"
                            ? "高"
                            : tech.gapLevel === "medium"
                              ? "中"
                              : "低"}
                        </Badge>
                        <span className="text-xs text-muted-foreground truncate">
                          {tech.keyMetric}
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
                <Sparkles className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-semibold">AI 技术简报</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                本周重点关注具身智能方向——清华AIR已发布2篇相关顶会论文，而我院在该方向布局为空。AI
                Agent方向热度飙升（+210%），我院有理论基础但缺乏工程化能力。
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    具身智能方向尚未布局，存在覆盖缺口
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    AI Agent需引进工程化人才
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    多模态与AI4Science方向布局良好
                  </span>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full bg-purple-500 hover:bg-purple-600 text-white text-xs"
                onClick={() => toast.success("正在生成本周技术简报...")}
              >
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                生成技术简报
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Sheet open={!!selectedTech} onOpenChange={() => setSelectedTech(null)}>
        <SheetContent className="sm:max-w-lg">
          {selectedTech && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg flex items-center gap-2">
                  {selectedTech.topic}
                  <HeatIndicator trend={selectedTech.heatTrend} />
                </SheetTitle>
                <SheetDescription>
                  热度变化: {selectedTech.heatLabel} · 覆盖程度:{" "}
                  {selectedTech.gapLevel === "high"
                    ? "高"
                    : selectedTech.gapLevel === "medium"
                      ? "中"
                      : "低"}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">详细分析</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedTech.detail}
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 border border-purple-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-semibold text-purple-700">
                      AI 建议
                    </span>
                  </div>
                  <p className="text-sm text-purple-700/80">
                    {selectedTech.aiInsight}
                  </p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      toast.success("已安排技术委员会评估");
                      setSelectedTech(null);
                    }}
                  >
                    安排技术评估
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.success("详细技术报告已生成")}
                  >
                    生成报告
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
