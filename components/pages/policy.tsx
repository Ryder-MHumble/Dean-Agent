"use client"

import { Filter, ArrowRight, Sparkles, Shield, AlertTriangle, CheckCircle2, Users, Zap, ExternalLink, CheckIcon as Checkbox } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// ==================
// Policy Feed
// ==================
function PolicyFeed() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          {"最新政策动态"}
        </h2>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="all">
            <TabsList className="h-8 bg-muted/50">
              <TabsTrigger value="all" className="text-xs px-3 h-6">
                {"全部"}
              </TabsTrigger>
              <TabsTrigger value="national" className="text-xs px-3 h-6">
                {"国家级"}
              </TabsTrigger>
              <TabsTrigger value="beijing" className="text-xs px-3 h-6">
                {"北京市"}
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted"
          >
            <Filter className="h-3.5 w-3.5" />
            {"筛选来源"}
          </button>
        </div>
      </div>

      {/* Policy Card 1 */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-[10px]">
                {"科技部"}
              </Badge>
              <span className="text-[11px] text-muted-foreground">
                {"2023-11-14 | 09:30 AM"}
              </span>
            </div>
            <Badge
              variant="secondary"
              className="bg-red-100 text-red-700 text-[10px]"
            >
              {"! 高影响"}
            </Badge>
          </div>

          <h3 className="mt-3 text-base font-semibold text-foreground leading-snug">
            {"关于印发《科技伦理治理指南(2023年修订)》的通知"}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {"科技部发布了关于生成式AI伦理、数据隐私标准和跨境数据传输协议的更新指南。"}
          </p>

          <div className="mt-3">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-100"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {"AI 影响分析"}
            </button>
          </div>

          <div className="mt-3 space-y-2 rounded-lg bg-slate-50 p-3">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
              <p className="text-xs text-foreground leading-relaxed">
                <span className="font-semibold">{"直接行动："}</span>
                {"需要立即审查我院\"Lab B\"数据协议。Q4项目资金可能取决于合规性。"}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
              <p className="text-xs text-foreground leading-relaxed">
                <span className="font-semibold">{"风险："}</span>
                {"第4.2条暗示更严格的国际合作限制，未经事先批准不得进行。"}
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex gap-1.5">
              <Badge variant="outline" className="text-[10px]">
                {"#AI伦理"}
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                {"#合规"}
              </Badge>
            </div>
            <button
              type="button"
              className="flex items-center gap-1 text-xs font-medium text-blue-500 hover:underline"
            >
              {"阅读完整政策"}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Policy Card 2 */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-[10px]">
              {"发改委"}
            </Badge>
            <span className="text-[11px] text-muted-foreground">
              {"2023-11-13 | 14:00 PM"}
            </span>
          </div>

          <h3 className="mt-3 text-base font-semibold text-foreground leading-snug">
            {"北京市高级别自动驾驶试点区发展规划"}
          </h3>

          <div className="mt-3 rounded-lg bg-blue-50 p-3">
            <div className="flex items-start gap-2">
              <Zap className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
              <p className="text-xs text-foreground leading-relaxed">
                <span className="font-semibold">{"机遇："}</span>
                {"为交通系统部门开辟了新的市政拨款窗口。与当前\"智慧城市\"计划一致。"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Policy Card 3 */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-2">
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-[10px]">
              {"教育部"}
            </Badge>
            <span className="text-[11px] text-muted-foreground">
              {"2023-11-12 | 11:15 AM"}
            </span>
          </div>

          <h3 className="mt-3 text-sm font-semibold text-foreground leading-snug">
            {"关于加强高校基础研究人才培养的通知"}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {"关于博士项目资助分配的一般性政策更新。"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

// ==================
// Personnel Intelligence
// ==================
function PersonnelIntelligence() {
  const people = [
    {
      initials: "LZ",
      color: "bg-blue-500",
      name: "李 张",
      change: "任清华大学AI副院长",
      relation: "Strong",
      relationColor: "text-blue-600",
      bars: 4,
      note: "863计划前合作者。良好的合作渠道。",
    },
    {
      initials: "WW",
      color: "bg-red-500",
      name: "王 伟",
      change: "调至MIT，系主任",
      relation: "Weak",
      relationColor: "text-slate-400",
      bars: 2,
    },
    {
      initials: "JC",
      color: "bg-green-500",
      name: "陈 静",
      change: "晋升，中科院院士",
      relation: "Moderate",
      relationColor: "text-yellow-600",
      bars: 3,
    },
  ]

  return (
    <div className="space-y-4">
      {/* Personnel Card */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <CardTitle className="text-sm font-semibold">
                {"人事情报"}
              </CardTitle>
            </div>
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-600 text-[10px]"
            >
              {"3 新动态"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {people.map((person) => (
              <div key={person.name}>
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${person.color}`}
                  >
                    {person.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground">
                        {person.name}
                      </p>
                      <div className="text-right">
                        <p className="text-[10px] text-muted-foreground">
                          {"关联度"}
                        </p>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <div
                              key={`bar-${person.name}-${i}`}
                              className={`h-3 w-1.5 rounded-sm ${
                                i < person.bars
                                  ? person.bars === 4
                                    ? "bg-blue-500"
                                    : person.bars === 3
                                      ? "bg-yellow-500"
                                      : "bg-slate-300"
                                  : "bg-slate-100"
                              }`}
                            />
                          ))}
                        </div>
                        <p
                          className={`text-[10px] font-medium ${person.relationColor}`}
                        >
                          {person.relation}
                        </p>
                      </div>
                    </div>
                    <p className="mt-0.5 text-xs text-blue-500">
                      {"-> "}
                      {person.change}
                    </p>
                    {person.note && (
                      <div className="mt-2 rounded bg-slate-50 p-2">
                        <p className="text-[11px] text-muted-foreground">
                          {person.note}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-4 w-full text-center text-xs font-medium text-blue-500 hover:underline"
          >
            {"查看全部变动"}
          </button>
        </CardContent>
      </Card>

      {/* Key Signals */}
      <Card className="bg-slate-800 text-white">
        <CardContent className="p-5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              {"关键信号"}
            </span>
          </div>
          <blockquote className="mt-3 text-sm italic leading-relaxed text-slate-100">
            {"\"创新必须驱动新质生产力。我们必须加速数字经济和实体经济的融合。\""}
          </blockquote>
          <p className="mt-3 text-xs text-slate-400">
            {"-- 高层领导讲话，经济工作会议"}
          </p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              className="flex-1 rounded-lg border border-slate-600 py-2 text-center text-xs font-medium text-slate-200 hover:bg-slate-700"
            >
              {"阅读分析"}
            </button>
            <button
              type="button"
              className="flex-1 rounded-lg bg-blue-500 py-2 text-center text-xs font-medium text-white hover:bg-blue-600"
            >
              {"起草备忘录"}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Actions */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {"建议行动"}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-2">
          <div className="rounded-lg border border-border p-3">
            <div className="flex items-start gap-2">
              <div className="mt-0.5 h-4 w-4 rounded border border-border" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {"审查数据合规性"}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {"截止 11月20日 | 由科技部政策触发"}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border p-3">
            <div className="flex items-start gap-2">
              <div className="mt-0.5 h-4 w-4 rounded border border-border" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {"恭喜张教授"}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {"公关部已起草邮件"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ==================
// Policy Page
// ==================
export default function PolicyPage() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-8">
          <PolicyFeed />
        </div>
        <div className="col-span-4">
          <PersonnelIntelligence />
        </div>
      </div>
    </div>
  )
}
