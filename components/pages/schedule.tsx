"use client"

import { useState } from "react"
import {
  Calendar as CalendarIcon,
  MapPin,
  FileText,
  Eye,
  AlertTriangle,
  Sparkles,
  Send,
  ChevronLeft,
  ChevronRight,
  Play,
  Clock,
  Users,
  Star,
  Shield,
  ExternalLink,
  Plus,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// ==================
// Calendar Sidebar
// ==================
function CalendarSidebar() {
  const [selectedDay] = useState(7)
  const days = [
    { day: "一", dates: [" ", "30", "31", "1", "2", "3", "4", "5"] },
  ]

  const calendarGrid = [
    [30, 31, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
  ]

  const weekDays = ["一", "二", "三", "四", "五", "六", "日"]

  const events = [
    {
      time: "09:00 - 10:30",
      title: "Q3 战略技术审查",
      subtitle: "与科技部联席会议",
      color: "bg-blue-500",
      hasAction: true,
    },
    {
      time: "11:00 - 12:00",
      title: "内部运营审计",
      subtitle: "财务部 302室",
      color: "bg-slate-300",
      hasAction: false,
    },
    {
      time: "14:00 - 15:30",
      title: "人才引进委员会",
      subtitle: "人力资源会议室",
      color: "bg-red-500",
      isWarning: true,
    },
  ]

  return (
    <div className="space-y-4">
      {/* Mini Calendar */}
      <Card className="bg-slate-800 text-white border-slate-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">{"2023年 11 月"}</h3>
            <div className="flex gap-1">
              <Tabs defaultValue="week">
                <TabsList className="h-7 bg-slate-700 border-0">
                  <TabsTrigger
                    value="week"
                    className="text-[10px] px-2 h-5 text-slate-300 data-[state=active]:bg-slate-600 data-[state=active]:text-white"
                  >
                    {"周视图"}
                  </TabsTrigger>
                  <TabsTrigger
                    value="month"
                    className="text-[10px] px-2 h-5 text-slate-300 data-[state=active]:bg-slate-600 data-[state=active]:text-white"
                  >
                    {"月视图"}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Calendar grid */}
          <div className="mt-3">
            <div className="grid grid-cols-7 gap-1 mb-1">
              {weekDays.map((d) => (
                <div
                  key={d}
                  className="text-center text-[10px] text-slate-400 pb-1"
                >
                  {d}
                </div>
              ))}
            </div>
            {calendarGrid.map((week, wi) => (
              <div key={`week-${wi}`} className="grid grid-cols-7 gap-1">
                {week.map((date) => (
                  <button
                    key={`d-${wi}-${date}`}
                    type="button"
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                      date === selectedDay
                        ? "bg-blue-500 text-white font-bold"
                        : date < 6 && wi === 0
                          ? "text-slate-500"
                          : "text-slate-200 hover:bg-slate-700"
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Badge className="bg-slate-600 text-white text-[10px] hover:bg-slate-600">
              {"全部日程"}
            </Badge>
            <Badge
              variant="outline"
              className="border-slate-600 text-slate-300 text-[10px] bg-transparent"
            >
              {"政策"}
            </Badge>
            <Badge
              variant="outline"
              className="border-slate-600 text-slate-300 text-[10px] bg-transparent"
            >
              {"技术"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Today's Events */}
      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground">
          {"今天, 11月7日"}
        </p>
        {events.map((event) => (
          <Card
            key={event.title}
            className={`${
              event.isWarning
                ? "border-red-200 bg-red-50/30"
                : "border-border"
            }`}
          >
            <CardContent className="p-3">
              <div className="flex items-start gap-3">
                <div
                  className={`mt-1 h-1 w-1 shrink-0 rounded-full ${event.color}`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={`text-[10px] ${
                        event.isWarning
                          ? "bg-red-100 text-red-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {event.time}
                    </Badge>
                    {event.hasAction && (
                      <button type="button" className="text-muted-foreground hover:text-foreground">
                        <Play className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {event.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {event.subtitle}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ==================
// Meeting Detail
// ==================
function MeetingDetail() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <Card>
        <CardContent className="p-5">
          <div className="flex gap-2">
            <Badge className="bg-blue-500 text-white text-[10px] hover:bg-blue-500">
              {"战略优先级"}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-700 text-[10px]"
            >
              {"已确认"}
            </Badge>
          </div>

          <h2 className="mt-3 text-xl font-bold text-foreground leading-snug text-balance">
            {"Q3 战略技术审查: AI 与量子计算倡议"}
          </h2>

          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="h-3.5 w-3.5" />
              <span>{"11月7日, 09:00 - 10:30"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span>{"A号主会议厅 (Main Conf Hall A)"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strategic Relevance */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-semibold text-foreground">
              {"事项价值分析"}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="relative">
              <svg viewBox="0 0 100 100" className="h-24 w-24">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(85 / 100) * 251} 251`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-foreground">
                  {"85"}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {"综合评分"}
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {"关键战略相关性"}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {"资金续批潜力极高。基于历史数据，与该单位的会议在3个月内的政策批准相关性高达70%。"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Stakeholders */}
      <Card>
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold text-foreground">
            {"关键利益相关者 & 影响力"}
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 rounded-lg border border-border p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
                {"张"}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {"张部长"}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {"科技部"}
                </p>
                <Badge className="mt-1 bg-blue-500 text-white text-[9px] hover:bg-blue-500">
                  {"高影响力"}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
                {"吴"}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {"Dr. Emily Wu"}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {"AI 实验室主任"}
                </p>
                <Badge
                  variant="secondary"
                  className="mt-1 text-[9px] bg-slate-100"
                >
                  {"技术负责人"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History */}
      <Card>
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold text-foreground">
            {"单位历史: 创新司"}
          </h3>
          <div className="mt-3 space-y-2">
            <div className="flex items-start gap-2 text-xs">
              <div className="mt-1 h-2 w-2 rounded-full bg-green-500 shrink-0" />
              <p className="text-foreground">
                <span className="font-medium">
                  {"上次互动 (8月12日):"}
                </span>
                {" 量子资金联合提案已获批准。"}
              </p>
            </div>
            <div className="flex items-start gap-2 text-xs">
              <div className="mt-1 h-2 w-2 rounded-full bg-slate-300 shrink-0" />
              <p className="text-muted-foreground">
                <span className="font-medium">{"待处理:"}</span>
                {" 上个月提交的伦理准则审查。"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Briefing Materials */}
      <Card>
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold text-foreground">
            {"简报材料"}
          </h3>
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100">
                  <FileText className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {"Q3_技术报告_终稿.pdf"}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {"2.4 MB . 昨天添加"}
                  </p>
                </div>
              </div>
              <button type="button" className="text-muted-foreground hover:text-foreground">
                <Eye className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
                  <Play className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {"战略_审查_演示文稿_v2.pptx"}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {"5.1 MB . 2小时前添加"}
                  </p>
                </div>
              </div>
              <button type="button" className="text-muted-foreground hover:text-foreground">
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ==================
// AI Advisor
// ==================
function AIAdvisor() {
  return (
    <div className="space-y-4">
      {/* Advisor Header */}
      <Card className="border-blue-200 bg-blue-50/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-semibold text-foreground">
              {"智能顾问 Smart Advisor"}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {"实时情报 & 决策建议"}
          </p>
        </CardContent>
      </Card>

      {/* Speech Draft */}
      <Card className="border-green-200 bg-green-50/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
              <Sparkles className="h-3 w-3" />
            </div>
            <span className="text-sm font-semibold text-foreground">
              {"发言提纲已就绪"}
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            {"基于参会者名单和您的Q3目标，我起草了强调\"跨部门效率\"的谈话要点。"}
          </p>
          <ul className="mt-3 space-y-1.5">
            <li className="flex items-start gap-2 text-xs text-foreground">
              <div className="mt-1 h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
              {"重点提及计算成本降低了15%。"}
            </li>
            <li className="flex items-start gap-2 text-xs text-foreground">
              <div className="mt-1 h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
              {"提议与政策部门立联合AI工作组。"}
            </li>
            <li className="flex items-start gap-2 text-xs text-foreground">
              <div className="mt-1 h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
              {"主动回应关于道德AI的担忧。"}
            </li>
          </ul>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="flex-1 rounded-lg bg-blue-500 py-2 text-center text-xs font-medium text-white hover:bg-blue-600"
            >
              {"查看完整草稿"}
            </button>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted"
            >
              <FileText className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Conflict Detection */}
      <Card className="border-red-200 bg-red-50/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <span className="text-sm font-semibold text-foreground">
              {"检测到日程冲突"}
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            <span className="font-medium text-red-600">
              {"人才引进委员会"}
            </span>
            {" (14:00) 与部委电话会议时间重叠。"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {"建议: 此为运营事务，是否授权副手处理？"}
          </p>
          <button
            type="button"
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-800 py-2 text-xs font-medium text-white hover:bg-slate-700"
          >
            <Users className="h-3.5 w-3.5" />
            {"授权李副主任处理"}
          </button>
        </CardContent>
      </Card>

      {/* Recommended Activity */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-semibold text-foreground">
                {"推荐活动"}
              </span>
            </div>
            <Badge
              variant="outline"
              className="text-[10px] bg-transparent"
            >
              {"外部"}
            </Badge>
          </div>
          <div className="mt-3 flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-lg">
              {"AI"}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {"全球AI治理峰会"}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {"线上 . 11月12日 . 20:00"}
              </p>
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            {"与您当前关注的AI伦理高度相关。Dr. Sutton 将发表主旨演讲。"}
          </p>
          <button
            type="button"
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 py-2 text-xs font-medium text-blue-600 hover:bg-blue-100"
          >
            <Plus className="h-3.5 w-3.5" />
            {"添加到日程"}
          </button>
        </CardContent>
      </Card>

      {/* Chat Input */}
      <div className="relative">
        <Input
          placeholder="要求顾问重新安排或准备数据..."
          className="h-10 pr-10 text-xs"
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500 text-white hover:bg-blue-600"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

// ==================
// Schedule Page
// ==================
export default function SchedulePage() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-12 gap-5">
        {/* Left: Calendar */}
        <div className="col-span-3">
          <CalendarSidebar />
        </div>

        {/* Center: Meeting Detail */}
        <div className="col-span-6">
          <MeetingDetail />
        </div>

        {/* Right: AI Advisor */}
        <div className="col-span-3">
          <AIAdvisor />
        </div>
      </div>
    </div>
  )
}
