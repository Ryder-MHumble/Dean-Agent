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
  BookOpen,
  Lightbulb,
  Trophy,
  Sparkles,
  ChevronRight,
  FileText,
  TrendingUp,
} from "lucide-react";
import {
  MotionNumber,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ResearchOutput {
  id: string;
  title: string;
  institution: string;
  type: "论文" | "专利" | "获奖";
  influence: "高" | "中" | "低";
  date: string;
  field: string;
  authors: string;
  aiAnalysis: string;
  detail: string;
}

const mockOutputs: ResearchOutput[] = [
  {
    id: "r1",
    title: "基于多模态大模型的具身智能感知框架",
    institution: "清华大学",
    type: "论文",
    influence: "高",
    date: "2025-05-08",
    field: "具身智能",
    authors: "张明远、李华、王磊等",
    aiAnalysis:
      "该论文在多模态融合方面提出了新的架构方案，直接对标我院同类研究方向。清华在该领域已连续发表3篇顶会论文，形成系统性领先。建议加强我院在视觉-语言联合建模方面的投入。",
    detail:
      "清华大学人工智能研究院在ICRA 2025发表的该论文，提出了一种融合视觉、语言和触觉信号的具身智能感知框架。实验表明该方法在操作任务上提升23%成功率。论文已获领域内高度关注，两周内被引用12次。",
  },
  {
    id: "r2",
    title: "量子纠错码的拓扑优化方法",
    institution: "中科院",
    type: "论文",
    influence: "高",
    date: "2025-05-05",
    field: "量子计算",
    authors: "陈思远、刘伟航等",
    aiAnalysis:
      "中科院在量子纠错码方面取得突破性进展，该方向为量子计算核心瓶颈。建议关注该团队后续研究动态，评估与我院量子计算团队的合作空间。",
    detail:
      "中科院物理所在Nature Physics发表论文，提出了一种新型拓扑量子纠错方案，将逻辑错误率降低了2个数量级。这是国内团队首次在该方向上取得国际领先成果。",
  },
  {
    id: "r3",
    title: "新型锂硫电池正极材料制备工艺（发明专利）",
    institution: "浙江大学",
    type: "专利",
    influence: "中",
    date: "2025-04-28",
    field: "新能源材料",
    authors: "赵俊峰团队",
    aiAnalysis:
      "浙大在新能源材料领域持续布局，该专利具有较高的产业化价值。建议评估我院在类似方向的专利布局是否完整，避免技术路线被抢占。",
    detail:
      "浙江大学化学工程学院获批的该发明专利，公开了一种低成本、高循环稳定性的锂硫电池正极材料制备方法。已与宁德时代建立联合实验室进行中试。",
  },
  {
    id: "r4",
    title: "国家自然科学奖二等奖（脑机接口方向）",
    institution: "北京大学",
    type: "获奖",
    influence: "高",
    date: "2025-04-20",
    field: "脑科学",
    authors: "王建华教授团队",
    aiAnalysis:
      "北大脑机接口团队获得国家级奖项，标志其在该方向的长期积累获得认可。我院脑科学方向需加快高水平成果产出，争取在下一轮评奖中有所突破。",
    detail:
      "北京大学脑科学与类脑研究中心王建华教授团队，凭借「高通量无创脑机接口关键技术及应用」获得2024年度国家自然科学奖二等奖。该团队长期深耕脑机接口领域，已积累专利30余项。",
  },
  {
    id: "r5",
    title: "面向自动驾驶的端到端决策规划算法",
    institution: "上海交通大学",
    type: "论文",
    influence: "中",
    date: "2025-04-15",
    field: "自动驾驶",
    authors: "刘昊天、周明等",
    aiAnalysis:
      "上交在自动驾驶端到端方案上有持续产出，但整体影响力尚未达到头部水平。可持续关注但无需过度警惕。建议我院相关团队重点关注其开源代码的技术路线。",
    detail:
      "上海交通大学计算机科学学院在CVPR 2025发表论文，提出了一种将感知、预测和规划统一在单一Transformer架构中的端到端自动驾驶方案。在nuScenes基准上取得了新的SOTA结果。",
  },
];

function TypeBadge({ type }: { type: ResearchOutput["type"] }) {
  const config = {
    论文: { color: "bg-blue-100 text-blue-700 border-blue-200" },
    专利: { color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
    获奖: { color: "bg-amber-100 text-amber-700 border-amber-200" },
  };
  const c = config[type];
  return (
    <Badge variant="outline" className={cn("text-[11px] font-medium", c.color)}>
      {type}
    </Badge>
  );
}

function InfluenceBadge({ level }: { level: ResearchOutput["influence"] }) {
  const config = {
    高: { color: "bg-red-100 text-red-700 border-red-200", label: "高影响力" },
    中: {
      color: "bg-amber-100 text-amber-700 border-amber-200",
      label: "中影响力",
    },
    低: {
      color: "bg-green-100 text-green-700 border-green-200",
      label: "低影响力",
    },
  };
  const c = config[level];
  return (
    <Badge variant="outline" className={cn("text-[11px] font-medium", c.color)}>
      {c.label}
    </Badge>
  );
}

export default function ResearchTracking() {
  const [selectedOutput, setSelectedOutput] = useState<ResearchOutput | null>(
    null,
  );

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">同行论文</p>
              <p className="text-xl font-bold font-tabular">
                <MotionNumber value={32} suffix="篇" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">新专利</p>
              <p className="text-xl font-bold font-tabular">
                <MotionNumber value={8} suffix="项" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">重大获奖</p>
              <p className="text-xl font-bold font-tabular">
                <MotionNumber value={3} suffix="项" />
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
                  同行机构科研成果追踪
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">
                  按影响力排序
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <StaggerContainer className="space-y-3">
                {mockOutputs.map((output) => (
                  <StaggerItem key={output.id}>
                    <button
                      type="button"
                      className="w-full rounded-lg border p-4 hover:border-purple-200 hover:shadow-sm transition-all group cursor-pointer text-left"
                      onClick={() => setSelectedOutput(output)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600">
                            {output.institution.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold group-hover:text-purple-600 transition-colors">
                              {output.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[11px] text-muted-foreground">
                                {output.institution}
                              </span>
                              <span className="text-[11px] text-muted-foreground">
                                ·
                              </span>
                              <span className="text-[11px] text-muted-foreground">
                                {output.field}
                              </span>
                              <span className="text-[11px] text-muted-foreground">
                                ·
                              </span>
                              <span className="text-[11px] text-muted-foreground">
                                {output.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <InfluenceBadge level={output.influence} />
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-[52px]">
                        <TypeBadge type={output.type} />
                        <span className="text-xs text-muted-foreground truncate max-w-[300px]">
                          {output.authors}
                        </span>
                      </div>
                    </button>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-4">
          <Card className="shadow-card bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-semibold">AI 竞争态势分析</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                近期同行机构科研产出活跃，清华在具身智能方向连续发表顶会论文，中科院在量子计算取得突破，北大获国家级奖项。建议重点关注具身智能和量子计算两个方向的人才和资源布局。
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    清华具身智能方向形成系统性领先
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    中科院量子纠错码突破，国际领先
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    浙大新能源专利产业化加速
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    北大脑机接口获国家自然科学奖
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    上交自动驾驶方向稳步推进
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Button
                  size="sm"
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white text-xs"
                  onClick={() => toast.success("正在生成科研竞争态势报告...")}
                >
                  <FileText className="h-3.5 w-3.5 mr-1.5" />
                  生成竞争分析报告
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white text-xs"
                  onClick={() => toast.success("已订阅科研动态周报")}
                >
                  <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
                  订阅科研动态周报
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Sheet
        open={!!selectedOutput}
        onOpenChange={() => setSelectedOutput(null)}
      >
        <SheetContent className="sm:max-w-lg">
          {selectedOutput && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg flex items-center gap-2">
                  {selectedOutput.title}
                </SheetTitle>
                <SheetDescription>
                  {selectedOutput.institution} · {selectedOutput.field} ·{" "}
                  {selectedOutput.date}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2">
                  <TypeBadge type={selectedOutput.type} />
                  <InfluenceBadge level={selectedOutput.influence} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1">作者/团队</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedOutput.authors}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">详细信息</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedOutput.detail}
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 border border-purple-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-semibold text-purple-700">
                      AI 竞争分析
                    </span>
                  </div>
                  <p className="text-sm text-purple-700/80">
                    {selectedOutput.aiAnalysis}
                  </p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      toast.success("已加入重点跟踪列表");
                      setSelectedOutput(null);
                    }}
                  >
                    重点跟踪
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.success("详细分析报告已生成")}
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
