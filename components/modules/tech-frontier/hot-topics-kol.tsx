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
  Flame,
  Users,
  BookOpen,
  Sparkles,
  ChevronRight,
  FileText,
  TrendingUp,
  MessageSquare,
  GraduationCap,
} from "lucide-react";
import {
  MotionNumber,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { HotTopic, KOL } from "@/lib/types/tech-frontier";
import { mockHotTopics, mockKOLs } from "@/lib/mock-data/tech-frontier";

type DetailItem =
  | { kind: "topic"; data: HotTopic }
  | { kind: "kol"; data: KOL };

export default function HotTopicsKol() {
  const [selected, setSelected] = useState<DetailItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">热门话题</p>
              <p className="text-xl font-bold font-tabular">
                <MotionNumber value={12} suffix="个" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">活跃KOL</p>
              <p className="text-xl font-bold font-tabular text-blue-600">
                <MotionNumber value={28} suffix="位" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-500">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">高引用论文</p>
              <p className="text-xl font-bold font-tabular text-green-600">
                <MotionNumber value={5} suffix="篇" />
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8 space-y-4">
          {/* Hot Topics Section */}
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-500" />
                  热门话题
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">
                  按热度排序
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <StaggerContainer className="grid grid-cols-2 gap-3">
                {mockHotTopics.map((topic) => (
                  <StaggerItem key={topic.id}>
                    <button
                      type="button"
                      className="w-full text-left rounded-lg border p-3 hover:bg-muted/30 transition-colors group cursor-pointer"
                      onClick={() =>
                        setSelected({ kind: "topic", data: topic })
                      }
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium group-hover:text-blue-600 transition-colors line-clamp-1">
                          {topic.title}
                        </span>
                        {topic.trend === "new" && (
                          <Badge className="bg-red-500 text-white text-[9px] shrink-0 ml-1">
                            NEW
                          </Badge>
                        )}
                        {topic.trend === "up" && (
                          <TrendingUp className="h-3.5 w-3.5 text-red-500 shrink-0 ml-1" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        {topic.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-[9px] px-1.5 py-0"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-muted-foreground">热度</span>
                          <span className="font-medium">{topic.heat}/100</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              topic.heat >= 85
                                ? "bg-red-500"
                                : topic.heat >= 70
                                  ? "bg-orange-400"
                                  : "bg-amber-300",
                            )}
                            style={{
                              width: `${(topic.heat / topic.maxHeat) * 100}%`,
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground pt-0.5">
                          <MessageSquare className="h-3 w-3" />
                          <span>{topic.discussions.toLocaleString()} 讨论</span>
                        </div>
                      </div>
                    </button>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </CardContent>
          </Card>

          {/* KOL Section */}
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-blue-500" />
                  学术KOL动态
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">
                  按影响力排序
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-hidden">
                <div className="grid grid-cols-[1fr_120px_70px_70px_1fr_40px] gap-2 px-3 py-2 text-[11px] font-medium text-muted-foreground border-b">
                  <span>姓名</span>
                  <span>机构</span>
                  <span>h-index</span>
                  <span>影响力</span>
                  <span>近期动态</span>
                  <span></span>
                </div>
                <StaggerContainer>
                  {mockKOLs.map((kol) => (
                    <StaggerItem key={kol.id}>
                      <button
                        type="button"
                        className="w-full grid grid-cols-[1fr_120px_70px_70px_1fr_40px] gap-2 px-3 py-3 items-center text-left border-b last:border-0 hover:bg-muted/30 transition-colors group cursor-pointer"
                        onClick={() => setSelected({ kind: "kol", data: kol })}
                      >
                        <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                          {kol.name}
                        </span>
                        <span className="text-xs text-muted-foreground truncate">
                          {kol.affiliation}
                        </span>
                        <span className="text-xs font-mono font-medium">
                          {kol.hIndex}
                        </span>
                        <Badge
                          variant="outline"
                          className={cn("text-[10px] w-fit", {
                            "border-red-200 bg-red-50 text-red-700":
                              kol.influence === "极高",
                            "border-amber-200 bg-amber-50 text-amber-700":
                              kol.influence === "高",
                            "border-gray-200 bg-gray-50 text-gray-700":
                              kol.influence === "中",
                          })}
                        >
                          {kol.influence}
                        </Badge>
                        <span className="text-xs text-muted-foreground truncate">
                          {kol.recentActivity}
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
                <Sparkles className="h-4 w-4 text-orange-400" />
                <span className="text-sm font-semibold">AI 热点趋势</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                本周学术热点集中在Scaling
                Law反思和世界模型两大方向。多位顶级KOL对大模型发展路线发表重要观点，可能影响未来1-2年的研究资源配置。
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    Scaling Law争论或改变大模型研究路线
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    LeCun力推World Model，建议跟踪研究
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    AI安全方向人才和经费机遇窗口打开
                  </span>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs"
                onClick={() => toast.success("正在生成热点趋势分析报告...")}
              >
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                生成趋势报告
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent className="sm:max-w-lg">
          {selected?.kind === "topic" && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg flex items-center gap-2">
                  {selected.data.title}
                </SheetTitle>
                <SheetDescription>
                  热度: {selected.data.heat}/100 · 讨论数:{" "}
                  {selected.data.discussions.toLocaleString()}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2">
                  {selected.data.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">话题概要</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selected.data.summary}
                  </p>
                </div>
                <div className="rounded-lg bg-orange-50 border border-orange-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-semibold text-orange-700">
                      AI 趋势分析
                    </span>
                  </div>
                  <p className="text-sm text-orange-700/80">
                    {selected.data.aiAnalysis}
                  </p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      toast.success("已加入重点关注话题");
                      setSelected(null);
                    }}
                  >
                    重点关注
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.success("相关论文汇总已生成")}
                  >
                    汇总论文
                  </Button>
                </div>
              </div>
            </>
          )}
          {selected?.kind === "kol" && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg flex items-center gap-2">
                  {selected.data.name}
                  <Badge
                    variant="outline"
                    className={cn("text-[10px]", {
                      "border-red-200 bg-red-50 text-red-700":
                        selected.data.influence === "极高",
                      "border-amber-200 bg-amber-50 text-amber-700":
                        selected.data.influence === "高",
                      "border-gray-200 bg-gray-50 text-gray-700":
                        selected.data.influence === "中",
                    })}
                  >
                    影响力: {selected.data.influence}
                  </Badge>
                </SheetTitle>
                <SheetDescription>
                  {selected.data.affiliation} · h-index: {selected.data.hIndex}{" "}
                  · 领域: {selected.data.field}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">近期动态</h4>
                  <p className="text-sm text-muted-foreground">
                    {selected.data.recentActivity}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">人物简介</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selected.data.summary}
                  </p>
                </div>
                <div className="rounded-lg bg-orange-50 border border-orange-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-semibold text-orange-700">
                      AI 合作建议
                    </span>
                  </div>
                  <p className="text-sm text-orange-700/80">
                    {selected.data.aiAnalysis}
                  </p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      toast.success("已安排秘书准备对接材料");
                      setSelected(null);
                    }}
                  >
                    安排对接
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.success("KOL关系图谱已生成")}
                  >
                    查看关系图谱
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
