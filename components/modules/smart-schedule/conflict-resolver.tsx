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
  AlertOctagon,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  FileText,
  Zap,
  Plane,
  Brain,
  ArrowRightLeft,
} from "lucide-react"
import { MotionNumber, StaggerContainer, StaggerItem } from "@/components/motion"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface ResolutionOption {
  label: string
  description: string
  confidence: number
  recommended: boolean
}

interface Conflict {
  id: string
  eventA: string
  eventB: string
  time: string
  conflictType: "时间重叠" | "精力冲突" | "出行冲突"
  conflictTypeIcon: "clock" | "brain" | "plane"
  severity: "high" | "medium" | "low"
  aiSuggestion: string
  detail: string
  resolutionOptions: ResolutionOption[]
}

const mockConflicts: Conflict[] = [
  {
    id: "c1",
    eventA: "教育部AI教育大会",
    eventB: "IEEE智能系统研讨会",
    time: "2025-05-20 ~ 05-21",
    conflictType: "时间重叠",
    conflictTypeIcon: "clock",
    severity: "high",
    aiSuggestion: "参加教育部大会（ROI 92），委派副院长参加IEEE会议",
    detail: "两场会议时间完全重叠。教育部AI教育大会为部级主办（ROI 92分），IEEE智能系统研讨会为国际顶级学术会议（ROI 85分）。两场活动均为高价值活动，但无法同时出席。",
    resolutionOptions: [
      {
        label: "方案A：院长参加教育部大会",
        description: "院长亲自参加教育部AI教育大会，委派张副院长和2名青年教师参加IEEE研讨会。教育部大会涉及政策资源分配，院长亲自出席更为关键。",
        confidence: 92,
        recommended: true,
      },
      {
        label: "方案B：院长参加IEEE研讨会",
        description: "院长参加IEEE国际研讨会以拓展学术影响力，委派李副院长参加教育部大会。适合学院当前更需要国际学术突破的情况。",
        confidence: 68,
        recommended: false,
      },
      {
        label: "方案C：协调教育部大会日程",
        description: "联系教育部大会组委会，申请将院长发言安排在第一天上午，下午乘高铁转场IEEE研讨会。风险：行程紧凑，可能影响深度交流。",
        confidence: 45,
        recommended: false,
      },
    ],
  },
  {
    id: "c2",
    eventA: "上午：博士答辩（3场）",
    eventB: "下午：省厅来访接待",
    time: "2025-04-22",
    conflictType: "精力冲突",
    conflictTypeIcon: "brain",
    severity: "medium",
    aiSuggestion: "博士答辩后安排30分钟休息缓冲，调整省厅接待至15:00",
    detail: "上午连续3场博士答辩（8:30-12:00），下午13:30省科技厅领导来访接待。3场答辩消耗精力较大，直接衔接重要接待可能影响状态和决策质量。",
    resolutionOptions: [
      {
        label: "方案A：调整省厅接待时间",
        description: "与省科技厅沟通，将接待时间推迟至15:00。中午安排简短午休和准备时间。已确认省厅方面可接受15:00-17:00时段。",
        confidence: 88,
        recommended: true,
      },
      {
        label: "方案B：压缩答辩时间",
        description: "将3场答辩压缩为每场40分钟（原60分钟），11:00前结束所有答辩，留出2.5小时缓冲。但可能影响答辩质量。",
        confidence: 55,
        recommended: false,
      },
      {
        label: "方案C：分派答辩主席",
        description: "院长仅主持第1场答辩，第2、3场委托学科带头人主持。院长腾出时间为省厅接待做充分准备。",
        confidence: 72,
        recommended: false,
      },
    ],
  },
  {
    id: "c3",
    eventA: "WAIC 2025（上海）",
    eventB: "深圳市政府座谈会",
    time: "2025-07-04 ~ 07-05",
    conflictType: "出行冲突",
    conflictTypeIcon: "plane",
    severity: "high",
    aiSuggestion: "WAIC第一天参加主论坛，第二天早班飞深圳参加座谈会",
    detail: "WAIC 2025在上海举办（7月3-5日），深圳市政府座谈会安排在7月5日上午。两地之间需要飞行2小时。WAIC的核心议程集中在前两天，第三天为闭幕和Workshop。",
    resolutionOptions: [
      {
        label: "方案A：WAIC前两天+第三天飞深圳",
        description: "院长参加WAIC 7月3日-4日核心议程（主论坛+专题论坛），7月5日早班飞机赴深圳参加下午的座谈会。已查询：7月5日07:20上海-深圳航班，09:40到达。",
        confidence: 90,
        recommended: true,
      },
      {
        label: "方案B：协调深圳座谈改期",
        description: "联系深圳市政府办公室，申请将座谈会推迟至7月7日。需确认深圳方面的日程灵活度。",
        confidence: 65,
        recommended: false,
      },
      {
        label: "方案C：委派出席深圳座谈",
        description: "委派分管产学研的副院长代为参加深圳座谈会。但深圳市政府明确邀请院长本人，委派出席可能影响合作诚意。",
        confidence: 40,
        recommended: false,
      },
    ],
  },
  {
    id: "c4",
    eventA: "学院教职工大会",
    eventB: "校长办公会汇报",
    time: "2025-04-28 14:00-16:00",
    conflictType: "时间重叠",
    conflictTypeIcon: "clock",
    severity: "medium",
    aiSuggestion: "教职工大会改至上午，校长办公会汇报按原计划进行",
    detail: "学院教职工大会原定14:00-16:00，与校长办公会院长汇报环节（14:30-15:00）时间重叠。校长办公会为校级会议，时间不可调整。教职工大会为院级会议，时间相对灵活。",
    resolutionOptions: [
      {
        label: "方案A：教职工大会改至上午",
        description: "将教职工大会调整至当天上午9:00-11:00。已确认大会议室上午时段可用，通知全院教职工变更时间。校长办公会按原计划参加。",
        confidence: 95,
        recommended: true,
      },
      {
        label: "方案B：教职工大会延期",
        description: "教职工大会推迟一周（5月6日14:00）。但可能影响学期工作部署节奏。",
        confidence: 60,
        recommended: false,
      },
    ],
  },
]

function ConflictTypeTag({ type, iconType }: { type: string; iconType: string }) {
  const Icon = iconType === "clock" ? Clock : iconType === "brain" ? Brain : Plane
  const colorMap: Record<string, string> = {
    时间重叠: "bg-red-50 text-red-600",
    精力冲突: "bg-amber-50 text-amber-600",
    出行冲突: "bg-blue-50 text-blue-600",
  }
  return (
    <div className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium", colorMap[type])}>
      <Icon className="h-3 w-3" />
      {type}
    </div>
  )
}

export default function ConflictResolver() {
  const [selectedConflict, setSelectedConflict] = useState<Conflict | null>(null)
  const activeCount = mockConflicts.length
  const resolvedCount = 12
  const pendingCount = mockConflicts.filter((c) => c.severity === "high").length

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-50 text-rose-500">
              <AlertOctagon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">当前冲突</p>
              <p className="text-xl font-bold font-tabular text-rose-600">
                <MotionNumber value={activeCount} suffix="个" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-500">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">已解决</p>
              <p className="text-xl font-bold font-tabular text-green-600">
                <MotionNumber value={resolvedCount} suffix="个" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">待确认方案</p>
              <p className="text-xl font-bold font-tabular text-amber-600">
                <MotionNumber value={pendingCount} suffix="个" />
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
                <CardTitle className="text-sm font-semibold">日程冲突列表</CardTitle>
                <Badge variant="secondary" className="text-[10px]">按严重程度排序</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-hidden">
                <div className="grid grid-cols-[1fr_100px_90px_1fr_40px] gap-2 px-3 py-2 text-[11px] font-medium text-muted-foreground border-b">
                  <span>冲突事项</span>
                  <span>时间</span>
                  <span>冲突类型</span>
                  <span>AI建议方案</span>
                  <span></span>
                </div>
                <StaggerContainer>
                  {mockConflicts.map((conflict) => (
                    <StaggerItem key={conflict.id}>
                      <button
                        type="button"
                        className="w-full grid grid-cols-[1fr_100px_90px_1fr_40px] gap-2 px-3 py-3 items-center text-left border-b last:border-0 hover:bg-muted/30 transition-colors group cursor-pointer"
                        onClick={() => setSelectedConflict(conflict)}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {conflict.severity === "high" && (
                            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse-subtle shrink-0" />
                          )}
                          <div className="min-w-0">
                            <span className="text-sm font-medium group-hover:text-rose-600 transition-colors flex items-center gap-1">
                              <span className="truncate">{conflict.eventA}</span>
                              <ArrowRightLeft className="h-3 w-3 text-muted-foreground shrink-0" />
                              <span className="truncate">{conflict.eventB}</span>
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-foreground font-tabular">
                          {conflict.time.length > 12 ? conflict.time.slice(5) : conflict.time.slice(5)}
                        </span>
                        <ConflictTypeTag type={conflict.conflictType} iconType={conflict.conflictTypeIcon} />
                        <span className="text-xs text-muted-foreground truncate">
                          {conflict.aiSuggestion}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-rose-500 group-hover:translate-x-0.5 transition-all" />
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
                <Sparkles className="h-4 w-4 text-rose-400" />
                <span className="text-sm font-semibold">AI 冲突化解策略</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                检测到{activeCount}个日程冲突，其中{pendingCount}个为高优先级需立即处理。AI已为每个冲突生成多套化解方案，综合考虑了活动价值、时间可调性和出行可行性。
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">教育部大会与IEEE会议冲突，建议优先教育部</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">答辩与接待精力冲突，已协调缓冲时间</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">WAIC与深圳座谈可通过早班航班衔接</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">教职工大会可调至上午，冲突最易化解</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-rose-500 hover:bg-rose-600 text-white text-xs"
                  onClick={() => toast.success("正在生成冲突化解方案报告...")}
                >
                  <FileText className="h-3.5 w-3.5 mr-1.5" />
                  化解报告
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 text-xs"
                  onClick={() => toast.success("已应用AI推荐方案并更新日程...")}
                >
                  <Zap className="h-3.5 w-3.5 mr-1.5" />
                  一键化解
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Sheet open={!!selectedConflict} onOpenChange={() => setSelectedConflict(null)}>
        <SheetContent className="sm:max-w-lg">
          {selectedConflict && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg flex items-center gap-2">
                  冲突详情
                  <ConflictTypeTag type={selectedConflict.conflictType} iconType={selectedConflict.conflictTypeIcon} />
                </SheetTitle>
                <SheetDescription>
                  {selectedConflict.eventA} vs {selectedConflict.eventB} · {selectedConflict.time}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">冲突分析</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedConflict.detail}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-3">化解方案</h4>
                  <div className="space-y-3">
                    {selectedConflict.resolutionOptions.map((option, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "rounded-lg border p-3 transition-colors",
                          option.recommended
                            ? "border-rose-200 bg-rose-50"
                            : "border-border hover:bg-muted/30"
                        )}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={cn(
                            "text-sm font-semibold",
                            option.recommended ? "text-rose-700" : "text-foreground"
                          )}>
                            {option.label}
                          </span>
                          <div className="flex items-center gap-2">
                            {option.recommended && (
                              <Badge className="bg-rose-500 text-white text-[10px]">AI推荐</Badge>
                            )}
                            <Badge
                              variant="outline"
                              className={cn("text-[10px] font-tabular", {
                                "border-green-200 bg-green-50 text-green-700": option.confidence >= 80,
                                "border-amber-200 bg-amber-50 text-amber-700": option.confidence >= 50 && option.confidence < 80,
                                "border-gray-200 bg-gray-50 text-gray-600": option.confidence < 50,
                              })}
                            >
                              可行度 {option.confidence}%
                            </Badge>
                          </div>
                        </div>
                        <p className={cn(
                          "text-xs leading-relaxed",
                          option.recommended ? "text-rose-700/70" : "text-muted-foreground"
                        )}>
                          {option.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      const recommended = selectedConflict.resolutionOptions.find((o) => o.recommended)
                      toast.success(`已采纳方案：${recommended?.label || "AI推荐方案"}`)
                      setSelectedConflict(null)
                    }}
                  >
                    采纳AI推荐
                  </Button>
                  <Button variant="outline" onClick={() => toast.success("已标记为手动处理，稍后提醒")}>
                    手动处理
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
