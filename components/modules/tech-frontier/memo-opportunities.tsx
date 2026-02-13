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
  Handshake,
  CalendarCheck,
  FileStack,
  Sparkles,
  ChevronRight,
  FileText,
  Clock,
  Star,
} from "lucide-react"
import { MotionNumber, StaggerContainer, StaggerItem } from "@/components/motion"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface Opportunity {
  id: string
  name: string
  type: "合作" | "会议" | "内参"
  source: string
  priority: "紧急" | "高" | "中" | "低"
  deadline: string
  summary: string
  aiAssessment: string
  actionSuggestion: string
}

const mockOpportunities: Opportunity[] = [
  {
    id: "o1",
    name: "ICML 2025 特邀报告邀请",
    type: "会议",
    source: "ICML组委会",
    priority: "紧急",
    deadline: "2025-01-20",
    summary: "ICML 2025组委会发来特邀报告邀请，主题为「大模型时代的AI安全与对齐」。这是顶级会议的高规格邀请，需尽快确认是否出席并提交摘要。会议定于7月在维也纳举办。",
    aiAssessment: "ICML特邀报告是提升我院国际影响力的重要机会，建议院长亲自出席或指定顶级教授代表。该报告主题与我院AI安全研究方向契合，可借此机会展示研究成果并拓展国际合作网络。",
    actionSuggestion: "建议3日内确认出席，安排教授准备报告大纲",
  },
  {
    id: "o2",
    name: "华为-高校AI联合实验室共建计划",
    type: "合作",
    source: "华为2012实验室",
    priority: "高",
    deadline: "2025-02-15",
    summary: "华为2012实验室拟与5所高校共建AI联合实验室，涉及大模型训练优化、端侧推理和AI编译器方向。每个联合实验室配套经费约2000万元/年，共建期3年。",
    aiAssessment: "华为联合实验室项目资金充裕且技术方向前沿。我院在大模型训练优化方向有积累，建议重点申报该方向。需注意知识产权条款的谈判，确保学术发表自由度。",
    actionSuggestion: "建议立即成立申报团队，2周内完成项目计划书",
  },
  {
    id: "o3",
    name: "MIT CSAIL学术访问交流项目",
    type: "合作",
    source: "MIT CSAIL",
    priority: "高",
    deadline: "2025-03-01",
    summary: "MIT计算机科学与人工智能实验室发来学术访问邀请，拟开展为期6个月的联合研究计划，方向为多模态学习与机器人控制。可派遣2-3名青年教师及博士生。",
    aiAssessment: "MIT CSAIL是全球顶级AI实验室，此次访问机会对我院青年教师成长和国际化布局具有战略意义。多模态+机器人方向也有助于弥补我院在具身智能方向的空白。",
    actionSuggestion: "建议遴选2名青年骨干教师和3名优秀博士生",
  },
  {
    id: "o4",
    name: "AI赋能教育改革内参选题",
    type: "内参",
    source: "教育部高教司",
    priority: "中",
    deadline: "2025-02-28",
    summary: "教育部高教司征集「AI赋能高等教育改革」内参稿件，拟选编10篇优秀内参报送国务院参考。这是展示我院AI教育实践成果的良好契机。",
    aiAssessment: "内参报送是提升我院在教育系统影响力的重要渠道。建议围绕「AI赋能计算机专业教学改革」主题撰写，结合我院LLM辅助教学试点项目的实际数据和成效。",
    actionSuggestion: "建议指派副院长牵头，1周内完成内参初稿",
  },
  {
    id: "o5",
    name: "国家自然科学基金AI重大专项预申报",
    type: "合作",
    source: "国家自然科学基金委",
    priority: "紧急",
    deadline: "2025-01-25",
    summary: "国家自然科学基金委发布2025年度AI重大研究专项预申报通知，涵盖基础理论、关键技术和应用示范三个板块，单项资助额度最高5000万元。",
    aiAssessment: "重大专项是获取大规模科研经费的核心渠道。建议组织3-5个方向的预申报团队，重点布局AI基础理论（大模型可解释性）和关键技术（高效推理）两个板块。需院长亲自协调跨课题组资源。",
    actionSuggestion: "建议立即召开教授会议讨论申报策略，5日内确定方向",
  },
]

const typeConfig: Record<Opportunity["type"], { color: string; bg: string }> = {
  "合作": { color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
  "会议": { color: "text-green-700", bg: "bg-green-50 border-green-200" },
  "内参": { color: "text-purple-700", bg: "bg-purple-50 border-purple-200" },
}

const priorityConfig: Record<Opportunity["priority"], { color: string; bg: string }> = {
  "紧急": { color: "text-red-700", bg: "bg-red-50 border-red-200" },
  "高": { color: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
  "中": { color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
  "低": { color: "text-gray-700", bg: "bg-gray-50 border-gray-200" },
}

export default function MemoOpportunities() {
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null)

  const cooperationCount = mockOpportunities.filter((o) => o.type === "合作").length
  const conferenceCount = mockOpportunities.filter((o) => o.type === "会议").length

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-500">
              <Handshake className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">合作机会</p>
              <p className="text-xl font-bold font-tabular">
                <MotionNumber value={6} suffix="个" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-500">
              <CalendarCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">会议邀请</p>
              <p className="text-xl font-bold font-tabular text-green-600">
                <MotionNumber value={4} suffix="个" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-500">
              <FileStack className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">内参推送</p>
              <p className="text-xl font-bold font-tabular text-purple-600">
                <MotionNumber value={9} suffix="篇" />
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
                <CardTitle className="text-sm font-semibold">机会追踪清单</CardTitle>
                <Badge variant="secondary" className="text-[10px]">按优先级排序</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-hidden">
                <div className="grid grid-cols-[1fr_60px_90px_60px_85px_40px] gap-2 px-3 py-2 text-[11px] font-medium text-muted-foreground border-b">
                  <span>机会名称</span>
                  <span>类型</span>
                  <span>来源</span>
                  <span>优先级</span>
                  <span>截止日期</span>
                  <span></span>
                </div>
                <StaggerContainer>
                  {mockOpportunities.map((opp) => (
                    <StaggerItem key={opp.id}>
                      <button
                        type="button"
                        className="w-full grid grid-cols-[1fr_60px_90px_60px_85px_40px] gap-2 px-3 py-3 items-center text-left border-b last:border-0 hover:bg-muted/30 transition-colors group cursor-pointer"
                        onClick={() => setSelectedOpp(opp)}
                      >
                        <div className="flex items-center gap-2">
                          {opp.priority === "紧急" && (
                            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse-subtle shrink-0" />
                          )}
                          <span className="text-sm font-medium group-hover:text-blue-600 transition-colors truncate">
                            {opp.name}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className={cn("text-[10px] w-fit", typeConfig[opp.type].bg, typeConfig[opp.type].color)}
                        >
                          {opp.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground truncate">{opp.source}</span>
                        <Badge
                          variant="outline"
                          className={cn("text-[10px] w-fit", priorityConfig[opp.priority].bg, priorityConfig[opp.priority].color)}
                        >
                          {opp.priority}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{opp.deadline}</span>
                        </div>
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
                <Sparkles className="h-4 w-4 text-teal-400" />
                <span className="text-sm font-semibold">AI 机会评估</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                本周有2项紧急机会需院长决策：ICML特邀报告（1月20日截止）和国家自然科学基金重大专项预申报（1月25日截止）。华为联合实验室项目经费充裕，建议重点推进。
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">2项紧急机会本月截止，需优先处理</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">华为联合实验室年均2000万配套经费</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">MIT访问有助弥补具身智能方向空白</span>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full bg-teal-500 hover:bg-teal-600 text-white text-xs"
                onClick={() => toast.success("正在生成机会优先级评估报告...")}
              >
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                生成评估报告
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Sheet open={!!selectedOpp} onOpenChange={() => setSelectedOpp(null)}>
        <SheetContent className="sm:max-w-lg">
          {selectedOpp && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg flex items-center gap-2">
                  {selectedOpp.name}
                </SheetTitle>
                <SheetDescription>
                  来源: {selectedOpp.source} · 截止日期: {selectedOpp.deadline}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn("text-xs", typeConfig[selectedOpp.type].bg, typeConfig[selectedOpp.type].color)}
                  >
                    {selectedOpp.type}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn("text-xs", priorityConfig[selectedOpp.priority].bg, priorityConfig[selectedOpp.priority].color)}
                  >
                    优先级: {selectedOpp.priority}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                    <Clock className="h-3.5 w-3.5" />
                    <span>截止: {selectedOpp.deadline}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">机会详情</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedOpp.summary}</p>
                </div>
                <div className="rounded-lg bg-teal-50 border border-teal-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-teal-500" />
                    <span className="text-sm font-semibold text-teal-700">AI 优先级评估</span>
                  </div>
                  <p className="text-sm text-teal-700/80">{selectedOpp.aiAssessment}</p>
                </div>
                <div className="rounded-lg bg-slate-50 border p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-semibold">建议行动</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedOpp.actionSuggestion}</p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1" onClick={() => { toast.success("已列入院长待办事项"); setSelectedOpp(null) }}>
                    立即跟进
                  </Button>
                  <Button variant="outline" onClick={() => toast.success("机会分析报告已生成")}>
                    生成分析报告
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
