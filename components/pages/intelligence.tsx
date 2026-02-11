"use client"

import {
  Rss,
  SlidersHorizontal,
  RefreshCw,
  Globe,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  FileText,
  Plus,
  DollarSign,
  ExternalLink,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// ==================
// Signal Feed
// ==================
function SignalFeed() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Rss className="h-5 w-5 text-blue-500" />
          <h2 className="text-base font-semibold text-foreground">
            {"全球人工智能信号"}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Signal Cards */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-[10px] font-medium">
              {"ARXIV 论文"}
            </Badge>
            <span className="text-[11px] text-muted-foreground">
              {"2小时前"}
            </span>
          </div>
          <h3 className="mt-2 text-sm font-semibold text-foreground leading-snug">
            {"大型语言模型作为芯片设计的优化器"}
          </h3>
          <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
            {"探索LLM生成优化平面图和逻辑综合脚本的能力，通过微调提升ED..."}
          </p>
          <div className="mt-3 rounded-lg bg-blue-50 p-3">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-xs font-medium text-blue-700">
                {"研究院影响评估"}
              </span>
            </div>
            <p className="mt-1 text-xs text-blue-600 leading-relaxed">
              {"高相关性。直接对标\"硅计划\"项目。建议重点审查第4.2节的基准测试数据。"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Badge
              variant="secondary"
              className="text-[10px] font-medium"
            >
              {"X / 推特"}
            </Badge>
            <span className="text-[11px] text-muted-foreground">
              {"45分钟前"}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
              {"AK"}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {"Andrej Karpathy"}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {"意见领袖 (KOL)"}
              </p>
            </div>
          </div>
          <div className="mt-3 rounded-lg bg-slate-50 p-3">
            <p className="text-xs text-foreground leading-relaxed italic">
              {"\"小模型的改进速度正超过大模型的扩展定律。效率是新的护城河。\""}
            </p>
          </div>
          <div className="mt-3 rounded-lg bg-green-50 p-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-green-700">{"💡"}</span>
              <span className="text-xs font-medium text-green-700">
                {"战略备注"}
              </span>
            </div>
            <p className="mt-1 text-xs text-green-600 leading-relaxed">
              {"验证了我们向边缘计算AI研究的转型。可用作Q3基金会演示的引用。"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-[10px] font-medium">
              {"TECHCRUNCH"}
            </Badge>
            <span className="text-[11px] text-muted-foreground">
              {"4小时前"}
            </span>
          </div>
          <h3 className="mt-2 text-sm font-semibold text-foreground">
            {"Mistral AI 以60亿欧元估值融资6亿欧元"}
          </h3>
          <div className="mt-3 rounded-lg bg-red-50 p-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-red-600">{"⚠"}</span>
              <span className="text-xs font-medium text-red-600">
                {"人才流失风险"}
              </span>
            </div>
            <p className="mt-1 text-xs text-red-500 leading-relaxed">
              {"预计Mistral将在欧盟地区进行激进招聘。我们有3名高级研究员位于巴黎。"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ==================
// Talent Radar
// ==================
function TalentRadar() {
  const scholars = [
    {
      name: "刘凯文 博士",
      field: "计算机视觉",
      institution: "斯坦福大学",
      hIndex: 48,
      returnIntent: "high",
      change: 3,
      changeDir: "up" as const,
    },
    {
      name: "金莎拉 教授",
      field: "NLP / Transformer",
      institution: "DeepMind (伦敦)",
      hIndex: 62,
      returnIntent: "medium",
      change: 0,
      changeDir: "none" as const,
    },
    {
      name: "M. 拉赫曼 博士",
      field: "机器人学",
      institution: "卡内基梅隆 (CMU)",
      hIndex: 35,
      returnIntent: "low",
      change: 1,
      changeDir: "down" as const,
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-500" />
          <h2 className="text-base font-semibold text-foreground">
            {"人才雷达 (海外)"}
          </h2>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            className="rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-white"
          >
            {"地图视图"}
          </button>
          <button
            type="button"
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground"
          >
            {"列表视图"}
          </button>
        </div>
      </div>

      {/* Map placeholder */}
      <Card>
        <CardContent className="p-0">
          <div className="relative h-48 overflow-hidden rounded-t-lg bg-slate-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 800 400"
                className="h-full w-full opacity-20"
                fill="none"
              >
                <ellipse
                  cx="400"
                  cy="200"
                  rx="350"
                  ry="150"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-slate-400"
                />
                <ellipse
                  cx="400"
                  cy="200"
                  rx="250"
                  ry="100"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-slate-400"
                />
              </svg>
            </div>
            {/* Dots on map */}
            <div className="absolute left-[35%] top-[40%] flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white shadow-lg">
              {"84"}
            </div>
            <div className="absolute left-[60%] top-[30%] flex h-6 w-6 items-center justify-center rounded-full bg-blue-400 text-[10px] font-bold text-white shadow">
              {"32"}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="text-center">
              <p className="text-xs text-blue-600">{"已追踪学者"}</p>
              <p className="text-xl font-bold text-foreground">{"1,248"}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-green-600">{"高回国意向"}</p>
              <p className="text-xl font-bold text-foreground">{"42"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scholar Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold">
              {"回国意向监控列表"}
            </CardTitle>
            <button
              type="button"
              className="text-xs text-blue-500 hover:underline"
            >
              {"查看全部"}
            </button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-[11px] text-muted-foreground">
                  <th className="pb-2 font-medium">{"学者姓名"}</th>
                  <th className="pb-2 font-medium">{"所属机构"}</th>
                  <th className="pb-2 font-medium text-center">
                    {"H-INDEX"}
                  </th>
                  <th className="pb-2 font-medium">{"回国意向"}</th>
                  <th className="pb-2 font-medium text-center">
                    {"排名变动"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {scholars.map((s) => (
                  <tr key={s.name} className="border-b last:border-0">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                          {s.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-foreground">
                            {s.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {s.field}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-xs text-muted-foreground">
                      {s.institution}
                    </td>
                    <td className="py-3 text-center text-xs font-medium text-foreground">
                      {s.hIndex}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${
                              s.returnIntent === "high"
                                ? "bg-red-500 w-[80%]"
                                : s.returnIntent === "medium"
                                  ? "bg-blue-500 w-[50%]"
                                  : "bg-slate-400 w-[25%]"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-[10px] font-medium ${
                            s.returnIntent === "high"
                              ? "text-red-600"
                              : s.returnIntent === "medium"
                                ? "text-blue-600"
                                : "text-slate-500"
                          }`}
                        >
                          {s.returnIntent === "high"
                            ? "高"
                            : s.returnIntent === "medium"
                              ? "中"
                              : "低"}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      {s.changeDir === "up" && (
                        <div className="flex items-center justify-center gap-0.5 text-green-600">
                          <ArrowUpRight className="h-3.5 w-3.5" />
                          <span className="text-xs font-medium">{s.change}</span>
                        </div>
                      )}
                      {s.changeDir === "down" && (
                        <div className="flex items-center justify-center gap-0.5 text-red-600">
                          <ArrowDownRight className="h-3.5 w-3.5" />
                          <span className="text-xs font-medium">{s.change}</span>
                        </div>
                      )}
                      {s.changeDir === "none" && (
                        <Minus className="mx-auto h-4 w-4 text-muted-foreground" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ==================
// Report Generator Sidebar
// ==================
function ReportGenerator() {
  const topics = [
    {
      title: "算力基础设施风险评估",
      desc: "触发原因：新的出口管制新闻及英伟达发货延迟。",
    },
    {
      title: "Q3 人才引进计划",
      desc: "触发原因：欧盟区出现高\"回国意向\"指标。",
    },
  ]

  return (
    <div className="space-y-4">
      {/* AI Report Generator */}
      <Card className="border-blue-200 bg-blue-50/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-semibold text-foreground">
                {"内部报告生成器"}
              </span>
            </div>
            <Badge className="bg-blue-500 text-white text-[10px] hover:bg-blue-500">
              {"AI 助手"}
            </Badge>
          </div>
          <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
            {"基于本周监测到的 "}
            <span className="font-semibold text-foreground">{"142"}</span>
            {" 个信号，AI建议以下董事会报告主题："}
          </p>

          <div className="mt-4 space-y-3">
            {topics.map((topic) => (
              <div
                key={topic.title}
                className="rounded-lg border border-border bg-white p-3"
              >
                <p className="text-xs font-semibold text-foreground">
                  {topic.title}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {topic.desc}
                </p>
                <button
                  type="button"
                  className="mt-2 flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted"
                >
                  <Sparkles className="h-3 w-3" />
                  {"起草报告"}
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2.5 text-xs text-muted-foreground transition-colors hover:bg-white"
          >
            <Plus className="h-3.5 w-3.5" />
            {"创建自定义主题"}
          </button>
        </CardContent>
      </Card>

      {/* Market Dynamics */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <CardTitle className="text-sm font-semibold">
              {"市场动态"}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="mt-2">
            <p className="text-xs text-muted-foreground">{"本周融资总额"}</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">
                {"$4.5亿"}
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50">
                <DollarSign className="h-4 w-4 text-green-500" />
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {"Anthropic"}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {"与AWS的新合作细节..."}
                </p>
              </div>
              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 text-[10px]">
                {"D轮"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {"Cohere"}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {"消息透露2024年底..."}
                </p>
              </div>
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-[10px]">
                {"IPO传闻"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ==================
// Intelligence Page
// ==================
export default function IntelligencePage() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-12 gap-5">
        {/* Left: Signal Feed */}
        <div className="col-span-4">
          <SignalFeed />
        </div>

        {/* Center: Talent Radar */}
        <div className="col-span-5">
          <TalentRadar />
        </div>

        {/* Right: Report Generator */}
        <div className="col-span-3">
          <ReportGenerator />
        </div>
      </div>
    </div>
  )
}
