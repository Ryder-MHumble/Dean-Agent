"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

export interface DailySummaryData {
  summary: string
  generatedAt: Date
}

interface AIDailySummaryProps {
  data: DailySummaryData
}

export default function AIDailySummary({ data }: AIDailySummaryProps) {
  return (
    <Card className="bg-gradient-to-br from-blue-50/90 via-indigo-50/60 to-violet-50/40 border-blue-200/50 shadow-card h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-blue-600 animate-pulse-soft" />
          <CardTitle className="text-sm font-semibold">AI 每日综述</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-[13px] leading-relaxed text-foreground">
          {data.summary}
        </div>
      </CardContent>
    </Card>
  )
}
