"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  TrendingUp,
  Sparkles,
  ChevronRight,
  FileText,
  ArrowRight,
  Calendar,
  AlertCircle,
} from "lucide-react"
import { MotionNumber, StaggerContainer, StaggerItem } from "@/components/motion"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface MobilityEvent {
  id: string
  talentName: string
  fromInstitution: string
  toInstitution: string
  direction: string
  impact: "high" | "medium" | "low"
  impactLabel: string
  date: string
  type: "inflow" | "outflow" | "external"
  typeLabel: string
  aiAnalysis: string
  detail: string
}

const mockEvents: MobilityEvent[] = [
  {
    id: "am1",
    talentName: "赵伟强",
    fromInstitution: "清华大学",
    toInstitution: "我院",
    direction: "强化学习",
    impact: "high",
    impactLabel: "重大利好",
    date: "2025-01-15",
    type: "inflow",
    typeLabel: "流入",
    aiAnalysis:
      "赵伟强教授从清华大学加盟我院，将显著增强我院在强化学习方向的研究实力。建议为其配备3名博士生和1名博士后，优先安排其参与国家重点研发项目申报。其在清华的研究团队中有2名学生有意随行，建议积极争取。",
    detail:
      "赵伟强，清华大学计算机系副教授，强化学习方向知名学者。发表NeurIPS/ICML论文22篇。因获得我院人才特聘计划支持，决定全职加盟。预计2月正式入职。",
  },
  {
    id: "am2",
    talentName: "孙梦瑶",
    fromInstitution: "我院",
    toInstitution: "上海交通大学",
    direction: "自然语言处理",
    impact: "high",
    impactLabel: "重大损失",
    date: "2025-01-08",
    type: "outflow",
    typeLabel: "流出",
    aiAnalysis:
      "孙梦瑶教授的离职对我院NLP方向影响重大，她带走了3个在研项目和2名核心博士生。建议紧急启动NLP方向人才补充计划，同时与孙教授保持学术联系，争取后续合作可能。短期内可安排其他教师接手在研课题。",
    detail:
      "孙梦瑶，我院NLP方向学术带头人，副教授。上海交通大学以长聘教授岗位、实验室主任职位及200万安家费将其挖走。她在我院工作6年，培养硕博士15人。",
  },
  {
    id: "am3",
    talentName: "陈国栋",
    fromInstitution: "浙江大学",
    toInstitution: "我院",
    direction: "计算机视觉",
    impact: "medium",
    impactLabel: "正面影响",
    date: "2024-12-20",
    type: "inflow",
    typeLabel: "流入",
    aiAnalysis:
      "陈国栋博士以特聘研究员身份加盟，填补了我院在3D视觉方向的空白。建议安排其与现有CV团队整合，共同开展跨方向合作研究。可推荐其申报北京市科技新星计划。",
    detail:
      "陈国栋，浙江大学博士后出站，3D计算机视觉方向。在CVPR/ICCV发表论文12篇，获CVPR 2024最佳论文提名。我院以特聘研究员岗位和50万启动经费引进。",
  },
  {
    id: "am4",
    talentName: "林志远",
    fromInstitution: "北京大学",
    toInstitution: "中国科学院",
    direction: "AI for Science",
    impact: "medium",
    impactLabel: "值得关注",
    date: "2024-12-10",
    type: "external",
    typeLabel: "外部",
    aiAnalysis:
      "林志远教授从北大转入中科院，反映出AI for Science方向人才竞争加剧。我院该方向目前有2名教师，建议关注北大因此空出的合作机会，同时加强与中科院的联系。",
    detail:
      "林志远，北京大学前沿计算研究中心副教授，AI for Science方向。中科院以研究员岗位+重大科学装置使用权吸引其加盟。此举将影响北大在AI+生物方向的布局。",
  },
  {
    id: "am5",
    talentName: "黄晓峰",
    fromInstitution: "我院",
    toInstitution: "华为2012实验室",
    direction: "大模型训练",
    impact: "medium",
    impactLabel: "人才流失",
    date: "2024-11-28",
    type: "outflow",
    typeLabel: "流出",
    aiAnalysis:
      "黄晓峰副教授转投产业界，薪资是原来的4倍。这反映了大模型方向高校人才向产业流失的趋势。建议出台产学研融合政策，允许教师在保留教职的同时参与企业研发，从机制上减少人才流失。",
    detail:
      "黄晓峰，我院副教授，大模型分布式训练方向。华为2012实验室以年薪200万+股票期权将其挖走。其在我院负责的GPU集群管理和大模型训练平台工作需要紧急交接。",
  },
]

export default function AcademicMobility() {
  const [selectedEvent, setSelectedEvent] = useState<MobilityEvent | null>(null)
  const inflowCount = mockEvents.filter((e) => e.type === "inflow").length
  const outflowCount = mockEvents.filter((e) => e.type === "outflow").length
  const netGrowth = inflowCount - outflowCount

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
              <ArrowDownToLine className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">流入</p>
              <p className="text-xl font-bold font-tabular text-blue-600">
                <MotionNumber value={12} suffix="人" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500">
              <ArrowUpFromLine className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">流出</p>
              <p className="text-xl font-bold font-tabular text-red-600">
                <MotionNumber value={5} suffix="人" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">净增长</p>
              <p className="text-xl font-bold font-tabular text-emerald-600">
                <MotionNumber value={7} prefix="+" suffix="人" />
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
                <CardTitle className="text-sm font-semibold">人才流动事件</CardTitle>
                <Badge variant="secondary" className="text-[10px]">按时间排序</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-hidden">
                <div className="grid grid-cols-[80px_1fr_100px_80px_90px_40px] gap-2 px-3 py-2 text-[11px] font-medium text-muted-foreground border-b">
                  <span>人才</span>
                  <span>流动方向</span>
                  <span>研究方向</span>
                  <span>影响</span>
                  <span>日期</span>
                  <span></span>
                </div>
                <StaggerContainer>
                  {mockEvents.map((event) => (
                    <StaggerItem key={event.id}>
                      <button
                        type="button"
                        className="w-full grid grid-cols-[80px_1fr_100px_80px_90px_40px] gap-2 px-3 py-3 items-center text-left border-b last:border-0 hover:bg-muted/30 transition-colors group cursor-pointer"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="flex items-center gap-2">
                          {event.impact === "high" && (
                            <span className={cn(
                              "h-2 w-2 rounded-full animate-pulse-subtle shrink-0",
                              event.type === "inflow" ? "bg-blue-500" : "bg-red-500"
                            )} />
                          )}
                          <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                            {event.talentName}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <span className="truncate max-w-[100px]">{event.fromInstitution}</span>
                          <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground/50" />
                          <span className="truncate max-w-[100px]">{event.toInstitution}</span>
                          <Badge
                            variant="outline"
                            className={cn("text-[9px] ml-1 shrink-0", {
                              "border-blue-200 bg-blue-50 text-blue-700": event.type === "inflow",
                              "border-red-200 bg-red-50 text-red-700": event.type === "outflow",
                              "border-gray-200 bg-gray-50 text-gray-600": event.type === "external",
                            })}
                          >
                            {event.typeLabel}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground truncate">{event.direction}</span>
                        <Badge
                          variant="outline"
                          className={cn("text-[10px] w-fit", {
                            "border-red-200 bg-red-50 text-red-700": event.impact === "high" && event.type === "outflow",
                            "border-emerald-200 bg-emerald-50 text-emerald-700": event.impact === "high" && event.type === "inflow",
                            "border-blue-200 bg-blue-50 text-blue-700": event.impact === "medium" && event.type !== "outflow",
                            "border-amber-200 bg-amber-50 text-amber-700": event.impact === "medium" && event.type === "outflow",
                            "border-gray-200 bg-gray-50 text-gray-600": event.impact === "low",
                          })}
                        >
                          {event.impactLabel}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-tabular">{event.date}</span>
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
                <Sparkles className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-semibold">AI 流动趋势分析</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                近期人才流动呈净流入态势（+7人），但NLP和大模型方向出现关键人才流失。产业界高薪挖角是主要威胁，建议从制度层面建立人才保留机制。
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">NLP方向学术带头人流失，需紧急补充</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">大模型人才向产业界流失趋势加剧</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">强化学习和CV方向引才成效显著</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">建议推行产学研融合教职，减少流失</span>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs"
                onClick={() => toast.success("正在生成人才流动分析报告...")}
              >
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                生成流动分析报告
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Sheet open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <SheetContent className="sm:max-w-lg">
          {selectedEvent && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg flex items-center gap-2">
                  {selectedEvent.talentName}
                  <Badge
                    variant="outline"
                    className={cn("text-[10px]", {
                      "border-blue-200 bg-blue-50 text-blue-700": selectedEvent.type === "inflow",
                      "border-red-200 bg-red-50 text-red-700": selectedEvent.type === "outflow",
                      "border-gray-200 bg-gray-50 text-gray-600": selectedEvent.type === "external",
                    })}
                  >
                    {selectedEvent.typeLabel}
                  </Badge>
                </SheetTitle>
                <SheetDescription>
                  {selectedEvent.fromInstitution} &rarr; {selectedEvent.toInstitution} &middot; {selectedEvent.direction} &middot; {selectedEvent.date}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    事件详情
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedEvent.detail}</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-[11px] text-muted-foreground">流动类型</p>
                    <p className={cn("text-sm font-bold mt-0.5", {
                      "text-blue-600": selectedEvent.type === "inflow",
                      "text-red-600": selectedEvent.type === "outflow",
                      "text-gray-600": selectedEvent.type === "external",
                    })}>
                      {selectedEvent.typeLabel}
                    </p>
                  </div>
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-[11px] text-muted-foreground">影响程度</p>
                    <p className="text-sm font-bold mt-0.5">{selectedEvent.impactLabel}</p>
                  </div>
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-[11px] text-muted-foreground">研究方向</p>
                    <p className="text-sm font-bold mt-0.5">{selectedEvent.direction}</p>
                  </div>
                </div>
                {selectedEvent.type === "outflow" && (
                  <div className="rounded-lg bg-red-50 border border-red-100 p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-semibold text-red-700">流失预警</span>
                    </div>
                    <p className="text-xs text-red-600/80">该方向人才流失可能对相关课题和研究生培养产生影响，请关注后续应对方案。</p>
                  </div>
                )}
                <div className="rounded-lg bg-blue-50 border border-blue-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-semibold text-blue-700">AI 分析与建议</span>
                  </div>
                  <p className="text-sm text-blue-700/80 leading-relaxed">{selectedEvent.aiAnalysis}</p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      toast.success("已标记为重点关注事件")
                      setSelectedEvent(null)
                    }}
                  >
                    <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
                    标记关注
                  </Button>
                  <Button variant="outline" onClick={() => toast.success("流动影响评估报告已生成")}>
                    <FileText className="h-3.5 w-3.5 mr-1.5" />
                    影响评估
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
