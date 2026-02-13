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
  Mail,
  Star,
  ThumbsDown,
  Sparkles,
  ChevronRight,
  FileText,
  UserCheck,
  CalendarCheck,
} from "lucide-react";
import {
  MotionNumber,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Invitation {
  id: string;
  eventName: string;
  host: string;
  date: string;
  location: string;
  roiScore: number;
  aiSuggestion: "参加" | "考虑" | "拒绝";
  guestHighlights: string;
  hostAnalysis: string;
  aiRecommendation: string;
  detail: string;
}

const mockInvitations: Invitation[] = [
  {
    id: "inv1",
    eventName: "全国人工智能教育大会",
    host: "教育部高教司",
    date: "2025-04-18",
    location: "北京·国家会议中心",
    roiScore: 92,
    aiSuggestion: "参加",
    guestHighlights: "教育部副部长、清华/北大/浙大AI学院院长",
    hostAnalysis:
      "教育部高教司为主管单位，规格极高。历年参会院长平均获得1.5个合作机会。去年参会院校中85%在后续获得政策资源倾斜。",
    aiRecommendation:
      "强烈建议参加。该会议为部级主办，参会嘉宾级别高，可与教育部领导当面汇报学院AI+教育成果，争取试点资格。建议提前准备5分钟主题汇报材料。",
    detail:
      "全国人工智能教育大会是教育部年度重要会议，聚焦AI赋能教育改革。今年主题为「大模型时代的高等教育变革」，预计200+高校领导参会。",
  },
  {
    id: "inv2",
    eventName: "北京市产学研协同创新论坛",
    host: "北京市科委",
    date: "2025-04-25",
    location: "北京·中关村论坛永久会址",
    roiScore: 78,
    aiSuggestion: "参加",
    guestHighlights: "北京市副市长、中关村科技企业负责人",
    hostAnalysis:
      "北京市科委为地方科技主管部门，与学院多个横向课题相关。北京市近期拟出台AI专项扶持政策，参会有利于提前获取政策信息。",
    aiRecommendation:
      "建议参加。北京市AI专项扶持政策即将出台，此次论坛是获取一手政策信息的重要窗口。可与市科委领导沟通学院在京科研布局。",
    detail:
      "北京市产学研协同创新论坛是中关村论坛的分论坛之一，聚焦产学研深度融合。今年重点讨论AI产业化路径。",
  },
  {
    id: "inv3",
    eventName: "某地产集团教育品牌发布会",
    host: "恒达地产集团",
    date: "2025-05-10",
    location: "上海·外滩某酒店",
    roiScore: 25,
    aiSuggestion: "拒绝",
    guestHighlights: "地产公司高管、教培机构负责人",
    hostAnalysis:
      "恒达地产近期面临财务困境，此次活动本质是借高校背书进行品牌营销。",
    aiRecommendation:
      "建议拒绝。该企业近期负面舆情较多，参与发布会可能被解读为学院为其背书。已检索到该企业3个月内有2次负面报道。",
    detail:
      "恒达地产拟推出「教育地产」品牌，邀请多所高校领导站台。该企业近期债务问题频出，媒体报道负面。",
  },
  {
    id: "inv4",
    eventName: "IEEE 智能系统国际研讨会",
    host: "IEEE 计算机学会",
    date: "2025-05-20",
    location: "深圳·南山科技园",
    roiScore: 85,
    aiSuggestion: "参加",
    guestHighlights: "IEEE Fellow 15人、国际AI领域知名学者",
    hostAnalysis:
      "IEEE计算机学会为国际顶级学术组织，本次研讨会聚焦智能系统前沿。参会有助于扩大学院国际学术影响力和人才招募。",
    aiRecommendation:
      "建议参加。该研讨会有15名IEEE Fellow参与，是拓展国际学术网络的重要机会。建议安排学院2-3名青年教师随行，进行学术交流和人才对接。",
    detail:
      "IEEE智能系统国际研讨会汇聚全球智能系统领域顶尖学者，每年一届。今年主题为「通用人工智能的系统挑战」。",
  },
  {
    id: "inv5",
    eventName: "某互联网公司年度合作伙伴晚宴",
    host: "星云科技",
    date: "2025-05-08",
    location: "杭州·某五星酒店",
    roiScore: 45,
    aiSuggestion: "考虑",
    guestHighlights: "星云科技CTO、多家高校计算机学院院长",
    hostAnalysis:
      "星云科技为国内二线AI企业，与学院有1个在研横向课题。此次晚宴社交性质偏强，直接学术收益有限。",
    aiRecommendation:
      "可考虑派副院长参加。与星云科技存在合作关系，完全不参与可能影响合作推进。但院长亲自出席的必要性不高，建议委派副院长或合作项目负责人代为参加。",
    detail:
      "星云科技年度合作伙伴晚宴，以维护企业合作关系为目的。与会者多为合作高校和企业伙伴代表。",
  },
];

function RoiScoreBadge({ score }: { score: number }) {
  const color =
    score >= 80
      ? "text-green-600 bg-green-50 border-green-200"
      : score >= 50
        ? "text-amber-600 bg-amber-50 border-amber-200"
        : "text-red-600 bg-red-50 border-red-200";
  return (
    <Badge
      variant="outline"
      className={cn("text-[10px] font-tabular w-fit", color)}
    >
      ROI {score}
    </Badge>
  );
}

function SuggestionBadge({
  suggestion,
}: {
  suggestion: Invitation["aiSuggestion"];
}) {
  const config = {
    参加: "border-green-200 bg-green-50 text-green-700",
    考虑: "border-amber-200 bg-amber-50 text-amber-700",
    拒绝: "border-red-200 bg-red-50 text-red-700",
  };
  return (
    <Badge
      variant="outline"
      className={cn("text-[10px] w-fit", config[suggestion])}
    >
      {suggestion}
    </Badge>
  );
}

export default function InvitationEval() {
  const [selectedItem, setSelectedItem] = useState<Invitation | null>(null);
  const pendingCount = mockInvitations.length;
  const highValueCount = mockInvitations.filter((i) => i.roiScore >= 75).length;
  const rejectCount = mockInvitations.filter(
    (i) => i.aiSuggestion === "拒绝",
  ).length;

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-500">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">待评估邀约</p>
              <p className="text-xl font-bold font-tabular">
                <MotionNumber value={pendingCount} suffix="个" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-500">
              <Star className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">高价值</p>
              <p className="text-xl font-bold font-tabular text-green-600">
                <MotionNumber value={highValueCount} suffix="个" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500">
              <ThumbsDown className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">建议拒绝</p>
              <p className="text-xl font-bold font-tabular text-red-600">
                <MotionNumber value={rejectCount} suffix="个" />
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
                  邀约评估列表
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">
                  按ROI评分排序
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-hidden">
                <div className="grid grid-cols-[1fr_100px_90px_80px_80px_40px] gap-2 px-3 py-2 text-[11px] font-medium text-muted-foreground border-b">
                  <span>活动名称</span>
                  <span>主办方</span>
                  <span>日期</span>
                  <span>ROI评分</span>
                  <span>AI建议</span>
                  <span></span>
                </div>
                <StaggerContainer>
                  {mockInvitations.map((item) => (
                    <StaggerItem key={item.id}>
                      <button
                        type="button"
                        className="w-full grid grid-cols-[1fr_100px_90px_80px_80px_40px] gap-2 px-3 py-3 items-center text-left border-b last:border-0 hover:bg-muted/30 transition-colors group cursor-pointer"
                        onClick={() => setSelectedItem(item)}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {item.aiSuggestion === "拒绝" && (
                            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse-subtle shrink-0" />
                          )}
                          <span className="text-sm font-medium truncate group-hover:text-violet-600 transition-colors">
                            {item.eventName}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground truncate">
                          {item.host}
                        </span>
                        <span className="text-xs text-foreground font-tabular">
                          {item.date}
                        </span>
                        <RoiScoreBadge score={item.roiScore} />
                        <SuggestionBadge suggestion={item.aiSuggestion} />
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-violet-500 group-hover:translate-x-0.5 transition-all" />
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
                <Sparkles className="h-4 w-4 text-violet-400" />
                <span className="text-sm font-semibold">AI 邀约价值分析</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                本周收到{pendingCount}封邀约，其中{highValueCount}
                个为高价值活动（ROI&ge;75），{rejectCount}
                个建议拒绝。重点推荐参加教育部全国AI教育大会和IEEE智能系统研讨会。
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    教育部大会ROI最高（92分），可争取AI教育试点
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    IEEE研讨会有助于拓展国际学术网络
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    恒达地产发布会存在声誉风险，建议婉拒
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    星云科技晚宴可委派副院长代为出席
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-violet-500 hover:bg-violet-600 text-white text-xs"
                  onClick={() => toast.success("正在生成邀约分析报告...")}
                >
                  <FileText className="h-3.5 w-3.5 mr-1.5" />
                  分析报告
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 text-xs"
                  onClick={() => toast.success("已批量处理低价值邀约...")}
                >
                  <CalendarCheck className="h-3.5 w-3.5 mr-1.5" />
                  批量处理
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
                <SheetTitle className="text-lg flex items-center gap-2">
                  {selectedItem.eventName}
                  <SuggestionBadge suggestion={selectedItem.aiSuggestion} />
                </SheetTitle>
                <SheetDescription>
                  {selectedItem.host} · {selectedItem.date} ·{" "}
                  {selectedItem.location}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">活动详情</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedItem.detail}
                  </p>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <UserCheck className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-semibold">主办方分析</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedItem.hostAnalysis}
                  </p>
                </div>
                <div className="rounded-lg border p-3">
                  <h4 className="text-sm font-semibold mb-1">重要嘉宾</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedItem.guestHighlights}
                  </p>
                </div>
                <div className="rounded-lg bg-violet-50 border border-violet-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-violet-500" />
                    <span className="text-sm font-semibold text-violet-700">
                      AI 参会建议
                    </span>
                  </div>
                  <p className="text-sm text-violet-700/80">
                    {selectedItem.aiRecommendation}
                  </p>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                  <span className="text-sm font-medium">ROI 综合评分</span>
                  <span
                    className={cn(
                      "text-2xl font-bold font-tabular",
                      selectedItem.roiScore >= 80
                        ? "text-green-600"
                        : selectedItem.roiScore >= 50
                          ? "text-amber-600"
                          : "text-red-600",
                    )}
                  >
                    {selectedItem.roiScore}
                  </span>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      toast.success(
                        selectedItem.aiSuggestion === "拒绝"
                          ? "已发送婉拒回复"
                          : "已确认参加并加入日程",
                      );
                      setSelectedItem(null);
                    }}
                  >
                    {selectedItem.aiSuggestion === "拒绝"
                      ? "确认婉拒"
                      : "确认参加"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.success("已转发给秘书处理")}
                  >
                    转发秘书
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
