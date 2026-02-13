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
  Mic,
  Sparkles,
  ChevronRight,
  FileText,
  Search,
  Signal,
  Eye,
  MessageSquareQuote,
} from "lucide-react";
import {
  MotionNumber,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { SpeechItem } from "@/lib/types/policy-intel";
import { mockSpeeches } from "@/lib/mock-data/policy-intel";

function RelevanceBar({ score }: { score: number }) {
  const color =
    score >= 85
      ? "bg-green-500"
      : score >= 65
        ? "bg-blue-500"
        : score >= 45
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
          score >= 85
            ? "text-green-600"
            : score >= 65
              ? "text-blue-600"
              : "text-muted-foreground",
        )}
      >
        {score}%
      </span>
    </div>
  );
}

export default function LeadershipSpeeches() {
  const [selectedSpeech, setSelectedSpeech] = useState<SpeechItem | null>(null);
  const [focusedSpeech, setFocusedSpeech] = useState<SpeechItem>(
    mockSpeeches[0],
  );

  const totalSpeeches = 8;
  const keySignals = 12;
  const highRelevance = mockSpeeches.filter((s) => s.status === "high").length;
  const pendingAnalysis = 5;

  return (
    <>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
              <Mic className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">本月讲话</p>
              <p className="text-xl font-bold font-tabular">
                <MotionNumber value={totalSpeeches} suffix="篇" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
              <Signal className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">关键信号</p>
              <p className="text-xl font-bold font-tabular text-amber-600">
                <MotionNumber value={keySignals} suffix="条" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-500">
              <Eye className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">高相关度</p>
              <p className="text-xl font-bold font-tabular text-green-600">
                <MotionNumber value={highRelevance} suffix="篇" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-500">
              <Search className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">待解读</p>
              <p className="text-xl font-bold font-tabular text-purple-600">
                <MotionNumber value={pendingAnalysis} suffix="篇" />
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
                  领导讲话追踪
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">
                  按相关度排序
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-hidden">
                <div className="grid grid-cols-[90px_1fr_90px_90px_40px] gap-2 px-3 py-2 text-[11px] font-medium text-muted-foreground border-b">
                  <span>领导人</span>
                  <span>场合</span>
                  <span>日期</span>
                  <span>相关度</span>
                  <span></span>
                </div>
                <StaggerContainer>
                  {mockSpeeches.map((speech) => (
                    <StaggerItem key={speech.id}>
                      <button
                        type="button"
                        className={cn(
                          "w-full grid grid-cols-[90px_1fr_90px_90px_40px] gap-2 px-3 py-3 items-center text-left border-b last:border-0 hover:bg-muted/30 transition-all group cursor-pointer",
                          focusedSpeech?.id === speech.id &&
                            "ring-2 ring-blue-400/50 bg-blue-50/50 rounded-md",
                        )}
                        onClick={() => {
                          setFocusedSpeech(speech);
                          setSelectedSpeech(speech);
                        }}
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          {speech.status === "high" && (
                            <span className="h-2 w-2 rounded-full bg-green-500 shrink-0" />
                          )}
                          <span className="text-sm font-medium truncate group-hover:text-blue-600 transition-colors">
                            {speech.leader}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <span className="text-sm text-foreground truncate block">
                            {speech.occasion}
                          </span>
                          <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                            {speech.keywords.map((kw) => (
                              <span
                                key={kw}
                                className="text-[10px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded"
                              >
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {speech.date}
                        </span>
                        <RelevanceBar score={speech.relevance} />
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
            key={focusedSpeech.id}
            className="shadow-card bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0"
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-semibold">AI 讲话信号提取</span>
              </div>
              <div className="mb-3">
                <p className="text-xs font-semibold text-white">
                  {focusedSpeech.leader}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                  {focusedSpeech.title}
                </p>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] text-slate-400">相关度</span>
                <div className="flex-1 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      focusedSpeech.relevance >= 85
                        ? "bg-green-400"
                        : focusedSpeech.relevance >= 65
                          ? "bg-blue-400"
                          : "bg-amber-400",
                    )}
                    style={{ width: `${focusedSpeech.relevance}%` }}
                  />
                </div>
                <span
                  className={cn(
                    "text-xs font-semibold font-tabular",
                    focusedSpeech.relevance >= 85
                      ? "text-green-400"
                      : focusedSpeech.relevance >= 65
                        ? "text-blue-400"
                        : "text-amber-400",
                  )}
                >
                  {focusedSpeech.relevance}%
                </span>
              </div>
              <div className="space-y-2 mb-3">
                {focusedSpeech.signals.map((signal, idx) => {
                  const dotColors = [
                    "bg-green-400",
                    "bg-amber-400",
                    "bg-blue-400",
                    "bg-purple-400",
                  ];
                  return (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <div
                        className={cn(
                          "h-1.5 w-1.5 rounded-full mt-1.5 shrink-0",
                          dotColors[idx % dotColors.length],
                        )}
                      />
                      <span className="text-slate-300">{signal}</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                {focusedSpeech.aiAnalysis.length > 100
                  ? `${focusedSpeech.aiAnalysis.slice(0, 100)}...`
                  : focusedSpeech.aiAnalysis}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs"
                  onClick={() =>
                    toast.success(
                      `正在为「${focusedSpeech.leader}」讲话生成信号研判报告...`,
                    )
                  }
                >
                  <FileText className="h-3.5 w-3.5 mr-1.5" />
                  信号研判
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 text-xs"
                  onClick={() =>
                    toast.success(
                      `正在为「${focusedSpeech.leader}」讲话生成应对策略...`,
                    )
                  }
                >
                  <MessageSquareQuote className="h-3.5 w-3.5 mr-1.5" />
                  应对策略
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Sheet
        open={!!selectedSpeech}
        onOpenChange={() => setSelectedSpeech(null)}
      >
        <SheetContent className="sm:max-w-lg">
          {selectedSpeech && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg">
                  {selectedSpeech.title}
                </SheetTitle>
                <SheetDescription className="flex items-center gap-2 flex-wrap">
                  <Badge
                    variant="outline"
                    className="text-[10px] border-blue-200 bg-blue-50 text-blue-700"
                  >
                    {selectedSpeech.leader}
                  </Badge>
                  <span>{selectedSpeech.occasion}</span>
                  <span>·</span>
                  <span>{selectedSpeech.date}</span>
                  <span>·</span>
                  <span>相关度 {selectedSpeech.relevance}%</span>
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">讲话摘要</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedSpeech.summary}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">关键信号</h4>
                  <div className="space-y-1.5">
                    {selectedSpeech.signals.map((signal, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                        <span>{signal}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSpeech.keywords.map((kw) => (
                    <Badge key={kw} variant="secondary" className="text-[10px]">
                      {kw}
                    </Badge>
                  ))}
                </div>
                <div className="rounded-lg bg-blue-50 border border-blue-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-semibold text-blue-700">
                      AI 研判分析
                    </span>
                  </div>
                  <p className="text-sm text-blue-700/80 leading-relaxed">
                    {selectedSpeech.aiAnalysis}
                  </p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      toast.success("已生成应对策略报告");
                      setSelectedSpeech(null);
                    }}
                  >
                    生成应对策略
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.success("已加入院务会议议题")}
                  >
                    加入会议议题
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
