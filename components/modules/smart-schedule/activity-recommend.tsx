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
  Compass,
  Flame,
  Award,
  Sparkles,
  ChevronRight,
  FileText,
  MapPin,
  CalendarDays,
  Target,
  BookOpen,
} from "lucide-react";
import {
  MotionNumber,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Activity {
  id: string;
  name: string;
  date: string;
  location: string;
  category: string;
  relevanceScore: number;
  reason: string;
  detail: string;
  preparation: string;
  aiExplanation: string;
  highlights: string[];
}

const mockActivities: Activity[] = [
  {
    id: "act1",
    name: "世界人工智能大会 (WAIC 2025)",
    date: "2025-07-03 ~ 07-05",
    location: "上海·世博中心",
    category: "国际会议",
    relevanceScore: 96,
    reason: "AI领域最高规格国际会议，与学院核心方向高度匹配",
    detail:
      "世界人工智能大会是国内AI领域最高规格的年度盛会，由上海市政府主办。今年主题为「智能涌现·共创未来」，预计全球500+企业、300+学术机构参展。主论坛聚焦通用人工智能、具身智能、AI治理等前沿话题。",
    preparation:
      "建议准备：1) 学院AI成果展板（3块）；2) 5分钟院长主旨发言PPT；3) 安排3-5名教师参与分论坛；4) 预约5家目标企业的合作洽谈时间。",
    aiExplanation:
      "该会议与学院在多模态大模型、AI Agent等方向的研究布局高度匹配。去年参会后促成了与华为、阿里的2个横向合作项目，ROI极高。今年新增具身智能分论坛，与学院正在筹建的方向完美契合。",
    highlights: [
      "李飞飞教授做主旨演讲",
      "具身智能专题论坛首次设立",
      "企业合作对接专区",
    ],
  },
  {
    id: "act2",
    name: "教育部新工科建设研讨会",
    date: "2025-05-15 ~ 05-16",
    location: "武汉·华中科技大学",
    category: "教育政策",
    relevanceScore: 88,
    reason: "教育部主导，AI+新工科政策方向直接影响学院发展",
    detail:
      "教育部高等教育司主办的新工科建设研讨会，聚焦AI时代工科教育改革。会议将讨论新一轮学科目录调整方案、AI课程体系建设标准、产教融合新模式等核心议题。",
    preparation:
      "建议准备：1) 学院AI课程改革经验报告；2) 与教育部高教司相关负责人预约会面；3) 收集学院近3年教学改革数据。",
    aiExplanation:
      "该研讨会将直接影响下一轮学科评估标准和专业设置方向。学院在AI课程改革方面的经验可作为典型案例分享，有利于提升学院在教育部的影响力。参会可获取学科目录调整的一手信息。",
    highlights: [
      "学科目录调整内部讨论",
      "新工科认证标准更新",
      "AI课程体系建设白皮书发布",
    ],
  },
  {
    id: "act3",
    name: "ACM SIGKDD 2025",
    date: "2025-08-03 ~ 08-07",
    location: "多伦多·Metro Convention Centre",
    category: "学术顶会",
    relevanceScore: 85,
    reason: "数据挖掘顶级学术会议，学院有3篇论文录用",
    detail:
      "ACM SIGKDD是数据挖掘与知识发现领域的顶级国际学术会议。今年大会主题为「AI for Social Good」。学院有3篇论文被录用（1篇Oral、2篇Poster）。",
    preparation:
      "建议准备：1) 安排论文作者参会并做报告；2) 组织学院研讨团参加Workshop；3) 利用会议机会与国际学者洽谈合作；4) 考虑在Industry Track展示学院产学研成果。",
    aiExplanation:
      "学院今年在KDD的论文录用量创历史新高，是提升学院国际学术声誉的重要机会。建议院长参加并主持一场Panel Discussion，可同时推进2-3个国际合作意向。",
    highlights: [
      "学院3篇论文录用（历史最佳）",
      "可主持Panel Discussion",
      "MIT/Stanford学者与会",
    ],
  },
  {
    id: "act4",
    name: "长三角高校科技成果转化大会",
    date: "2025-06-20",
    location: "南京·紫金山实验室",
    category: "成果转化",
    relevanceScore: 72,
    reason: "科技成果转化专场，可推动学院专利技术落地",
    detail:
      "长三角三省一市科技厅联合主办的成果转化大会，设有AI、新材料、生物医药三个专场对接会。参会企业500+，包括多家上市公司的技术需求发布。",
    preparation:
      "建议准备：1) 筛选学院可转化的3-5项专利技术；2) 制作技术成果宣传册；3) 指派技术转移中心负责人随行。",
    aiExplanation:
      "学院目前有8项AI相关专利尚未转化，其中3项与参会企业需求匹配度较高。参会可直接对接产业需求，加速成果转化。去年类似会议平均促成2-3个技术转让协议。",
    highlights: ["500+企业参会", "AI专场对接", "紫金山实验室参观"],
  },
  {
    id: "act5",
    name: "全球AI人才峰会",
    date: "2025-09-12 ~ 09-13",
    location: "深圳·前海国际会议中心",
    category: "人才引进",
    relevanceScore: 80,
    reason: "海外AI人才集聚，直接服务学院人才引进战略",
    detail:
      "由深圳市人才局主办的全球AI人才峰会，邀请200+海外AI领域华人学者回国交流。设有学术报告、人才对接、政策宣讲等环节。深圳市提供最高500万人才引进资金。",
    preparation:
      "建议准备：1) 学院人才引进政策手册（中英文）；2) 拟引进岗位的JD（3-5个）；3) 已联系的目标候选人名单；4) 学院宣传视频。",
    aiExplanation:
      "学院在具身智能、AI Agent两个方向亟需高端人才。根据AI分析，本次峰会参会学者中有8人与学院需求高度匹配，其中3人已在学院人才雷达系统中被标记为重点关注对象。",
    highlights: [
      "200+海外华人AI学者",
      "深圳500万引才资金",
      "8名高匹配候选人参会",
    ],
  },
];

function RelevanceBadge({ score }: { score: number }) {
  const color =
    score >= 85
      ? "text-green-600 bg-green-50 border-green-200"
      : score >= 70
        ? "text-blue-600 bg-blue-50 border-blue-200"
        : "text-gray-600 bg-gray-50 border-gray-200";
  return (
    <Badge
      variant="outline"
      className={cn("text-[10px] font-tabular w-fit", color)}
    >
      {score}分
    </Badge>
  );
}

export default function ActivityRecommend() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  );
  const totalCount = mockActivities.length;
  const highMatchCount = mockActivities.filter(
    (a) => a.relevanceScore >= 85,
  ).length;
  const monthlyPicks = mockActivities.filter(
    (a) => a.date.includes("05-") || a.date.includes("06-"),
  ).length;

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">推荐活动</p>
              <p className="text-xl font-bold font-tabular">
                <MotionNumber value={totalCount} suffix="个" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">高匹配</p>
              <p className="text-xl font-bold font-tabular text-orange-600">
                <MotionNumber value={highMatchCount} suffix="个" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">本月精选</p>
              <p className="text-xl font-bold font-tabular text-blue-600">
                <MotionNumber value={monthlyPicks} suffix="个" />
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <StaggerContainer className="space-y-3">
            {mockActivities.map((activity) => (
              <StaggerItem key={activity.id}>
                <Card
                  className="shadow-card hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => setSelectedActivity(activity)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-semibold group-hover:text-indigo-600 transition-colors truncate">
                            {activity.name}
                          </h3>
                          <Badge
                            variant="secondary"
                            className="text-[10px] shrink-0"
                          >
                            {activity.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <CalendarDays className="h-3 w-3" />
                            {activity.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {activity.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <RelevanceBadge score={activity.relevanceScore} />
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Target className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {activity.reason}
                      </p>
                    </div>
                    {activity.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {activity.highlights.map((h, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] text-indigo-600"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <div className="col-span-4">
          <Card className="shadow-card bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <span className="text-sm font-semibold">AI 活动匹配引擎</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                基于学院战略方向、近期科研动态和院长社交网络分析，AI为您筛选出
                {totalCount}个高匹配活动。其中{highMatchCount}
                个匹配度超过85分，强烈建议参加。
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    WAIC 2025匹配度最高（96分），建议重点参与
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    教育部研讨会可获取学科目录调整一手信息
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    KDD 2025学院论文录用量创历史新高
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    人才峰会有8名高匹配候选人，与引才计划联动
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-xs"
                  onClick={() => toast.success("正在生成活动参加规划...")}
                >
                  <FileText className="h-3.5 w-3.5 mr-1.5" />
                  参会规划
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 text-xs"
                  onClick={() => toast.success("已同步到日程系统...")}
                >
                  <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                  同步日程
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Sheet
        open={!!selectedActivity}
        onOpenChange={() => setSelectedActivity(null)}
      >
        <SheetContent className="sm:max-w-lg">
          {selectedActivity && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg flex items-center gap-2">
                  {selectedActivity.name}
                  <RelevanceBadge score={selectedActivity.relevanceScore} />
                </SheetTitle>
                <SheetDescription>
                  {selectedActivity.date} · {selectedActivity.location} ·{" "}
                  {selectedActivity.category}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">活动详情</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedActivity.detail}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">核心亮点</h4>
                  <div className="space-y-1.5">
                    {selectedActivity.highlights.map((h, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg bg-indigo-50 border border-indigo-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-indigo-500" />
                    <span className="text-sm font-semibold text-indigo-700">
                      AI 匹配分析
                    </span>
                  </div>
                  <p className="text-sm text-indigo-700/80">
                    {selectedActivity.aiExplanation}
                  </p>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-semibold">参会准备建议</span>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {selectedActivity.preparation}
                  </p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      toast.success("已加入日程并通知秘书准备材料");
                      setSelectedActivity(null);
                    }}
                  >
                    确认参加
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.success("已标记为待定并设置提醒")}
                  >
                    标记待定
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
