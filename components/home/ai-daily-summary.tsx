"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, FileText, Users, AlertTriangle } from "lucide-react"

export interface DailySummaryData {
  summary: string
  generatedAt: Date
  sections?: {
    icon: "policy" | "talent" | "risk"
    label: string
    text: string
  }[]
}

interface AIDailySummaryProps {
  data: DailySummaryData
}

const sectionIcons = {
  policy: FileText,
  talent: Users,
  risk: AlertTriangle,
}

const sectionColors = {
  policy: "text-blue-500 bg-blue-50",
  talent: "text-green-500 bg-green-50",
  risk: "text-amber-500 bg-amber-50",
}

export default function AIDailySummary({ data }: AIDailySummaryProps) {
  const sections = data.sections || [
    {
      icon: "policy" as const,
      label: "重要政策",
      text: "北京科委发布算力补贴政策，关联度High，建议李副主任牵头申报",
    },
    {
      icon: "talent" as const,
      label: "人才动态",
      text: "清华AIR发布2项新成果（具身智能方向），建议关注竞争态势",
    },
    {
      icon: "risk" as const,
      label: "风险预警",
      text: "大模型基座项目采购审批延期15天，卡在李某某处，需督办",
    },
  ]

  return (
    <Card className="bg-gradient-to-br from-blue-50/90 via-indigo-50/60 to-violet-50/40 border-blue-200/50 shadow-card h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-blue-600 animate-pulse-soft" />
          <CardTitle className="text-sm font-semibold">AI 每日综述</CardTitle>
          <span className="ml-auto text-[10px] text-muted-foreground">
            {data.generatedAt.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })} 生成
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {sections.map((section, i) => {
          const Icon = sectionIcons[section.icon]
          const colorClass = sectionColors[section.icon]
          return (
            <div key={i} className="flex items-start gap-2.5">
              <div className={`flex h-6 w-6 items-center justify-center rounded-md shrink-0 mt-0.5 ${colorClass}`}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-foreground">{section.label}</span>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                  {section.text}
                </p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
