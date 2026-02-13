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

interface SpeechItem {
  id: string;
  leader: string;
  title: string;
  occasion: string;
  date: string;
  keywords: string[];
  relevance: number;
  status: "high" | "medium" | "low";
  summary: string;
  signals: string[];
  aiAnalysis: string;
}

const mockSpeeches: SpeechItem[] = [
  {
    id: "sp1",
    leader: "科技部部长",
    title: "加快建设科技强国，构建新型举国体制",
    occasion: "全国科技工作会议",
    date: "2025-01-18",
    keywords: ["举国体制", "基础研究", "人才引育"],
    relevance: 96,
    status: "high",
    summary:
      "部长在全国科技工作会议上强调，要加快构建新型举国体制，强化国家战略科技力量布局。重点提及：1) 加大基础研究投入，2025年基础研究经费占比提升至8.5%；2) 推动高校成为基础研究主力军；3) 实施「人才强基计划」，重点引进海外顶尖科学家。",
    signals: [
      "基础研究经费将大幅增长，高校是重点投入方向",
      "「人才强基计划」将启动新一轮海外人才引进",
      "新型举国体制下高校需承担更多国家任务",
    ],
    aiAnalysis:
      "该讲话释放三个关键信号与我院高度相关：1) 基础研究经费增长意味着国自然项目和基础研究专项资金将增加，建议加大申报力度；2) 海外人才引进新政策即将出台，我院「人才强院」计划应提前布局；3) 新型举国体制意味着更多「揭榜挂帅」项目机会。建议院长在下周院务会议上专题讨论应对策略。",
  },
  {
    id: "sp2",
    leader: "教育部副部长",
    title: "深化研究生教育改革，提升拔尖创新人才培养质量",
    occasion: "研究生教育工作座谈会",
    date: "2025-01-15",
    keywords: ["研究生改革", "交叉学科", "产教融合"],
    relevance: 89,
    status: "high",
    summary:
      "副部长在研究生教育工作座谈会上指出，要深化研究生教育改革，重点推进：1) 交叉学科研究生培养模式创新；2) 产教融合培养机制建设；3) 博士生分流与退出机制完善；4) 研究生导师分类评价体系建设。",
    signals: [
      "交叉学科将获得更多研究生招生名额",
      "产教融合将成为研究生培养评估重要指标",
      "博士生淘汰机制将趋严",
    ],
    aiAnalysis:
      "该讲话对我院研究生培养有直接影响：1) 交叉学科招生名额扩大利好我院「AI+X」培养方向，建议加快申报交叉学科学位点；2) 产教融合考核要求我院加强与企业联合培养基地建设；3) 博士生分流机制需尽快制定院级实施细则，当前我院有3名博士进展严重滞后。",
  },
  {
    id: "sp3",
    leader: "北京市市长",
    title: "打造全球数字经济标杆城市",
    occasion: "北京市数字经济大会",
    date: "2025-01-12",
    keywords: ["数字经济", "算力中心", "AI产业"],
    relevance: 82,
    status: "high",
    summary:
      "市长在北京市数字经济大会上提出，要加快打造全球数字经济标杆城市。重点举措包括：1) 建设三个千卡级智算中心；2) 设立100亿数字经济产业基金；3) 推动高校AI学科建设和人才培养；4) 打造中关村AI创新走廊。",
    signals: [
      "北京市将大规模投资算力基础设施",
      "100亿产业基金将惠及高校科研项目",
      "中关村AI创新走廊与我院地理位置高度契合",
    ],
    aiAnalysis:
      "北京市数字经济布局与我院发展战略高度契合：1) 智算中心建设可争取算力资源共享合作；2) 100亿产业基金中将设立高校专项，建议积极对接市科委；3) 中关村AI创新走廊规划覆盖我院所在园区，可借此争取更多政策支持和产业合作机会。",
  },
  {
    id: "sp4",
    leader: "中国科学院院长",
    title: "强化原始创新，抢占科技制高点",
    occasion: "中科院年度工作会议",
    date: "2025-01-08",
    keywords: ["原始创新", "0到1突破", "院校合作"],
    relevance: 68,
    status: "medium",
    summary:
      "院长在中科院年度工作会议上强调，要聚焦原始创新和「从0到1」的突破，加强院校合作机制。提出将遴选20个院校联合创新中心，重点支持量子信息、人工智能、生命科学三大领域。",
    signals: [
      "中科院将新建20个院校联合创新中心",
      "量子信息和AI是重点支持方向",
      "院校合作将有专项经费支持",
    ],
    aiAnalysis:
      "中科院院校联合创新中心是我院重要机会：1) 我院已与中科院计算所有合作基础，可作为申报优势；2) AI方向是重点支持领域，建议以大模型安全方向申报；3) 需注意申报窗口期预计在3月，建议提前准备材料。该讲话信号关联度为中等，建议持续跟踪。",
  },
  {
    id: "sp5",
    leader: "国家发改委副主任",
    title: "加快新型基础设施建设，培育新质生产力",
    occasion: "新型基础设施建设推进会",
    date: "2025-01-05",
    keywords: ["新基建", "新质生产力", "数据要素"],
    relevance: 55,
    status: "low",
    summary:
      "副主任在新型基础设施建设推进会上提出，要加快新基建步伐，推动数据要素市场化，培育新质生产力。2025年新基建投资将增长25%，重点方向包括5G-A、算力网络和工业互联网。",
    signals: [
      "新基建投资增长25%，算力网络是重点方向",
      "数据要素市场化将催生新研究课题",
      "新质生产力方向可能影响学科评估指标",
    ],
    aiAnalysis:
      "该讲话与我院关联度一般，但有两点值得关注：1) 算力网络投资增长可能为我院算力平台建设带来间接利好；2) 「新质生产力」概念正在成为政策热词，建议在项目申报和学科建设中适当引用。无需紧急行动，建议列入政策跟踪清单。",
  },
];

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
