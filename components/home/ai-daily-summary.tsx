"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, ChevronDown, ChevronUp, AlertCircle } from "lucide-react"
import { ExpandableSection } from "@/components/motion"

export interface DailySummaryData {
  summary: string
  fullReport?: string
  overdueItems: number
  riskLevel: 'low' | 'medium' | 'high'
  generatedAt: Date
}

interface AIDailySummaryProps {
  data: DailySummaryData
}

export default function AIDailySummary({ data }: AIDailySummaryProps) {
  const [expanded, setExpanded] = useState(false)

  const getRiskLevelInfo = (level: string) => {
    switch (level) {
      case 'high':
        return {
          text: 'High',
          color: 'text-red-700',
          bgColor: 'bg-red-100',
          dotColor: 'bg-red-500',
        }
      case 'medium':
        return {
          text: 'Medium',
          color: 'text-yellow-700',
          bgColor: 'bg-yellow-100',
          dotColor: 'bg-yellow-500',
        }
      default:
        return {
          text: 'Low',
          color: 'text-green-700',
          bgColor: 'bg-green-100',
          dotColor: 'bg-green-500',
        }
    }
  }

  const riskInfo = getRiskLevelInfo(data.riskLevel)

  return (
    <Card className="bg-gradient-to-br from-blue-50/90 via-indigo-50/60 to-violet-50/40 border-blue-200/50 shadow-card h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-blue-600 animate-pulse-soft" />
          <CardTitle className="text-sm font-semibold">AI 每日综述</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* 主要综述 - 紧凑版 */}
        <div className="text-[13px] leading-relaxed text-foreground">
          {data.summary}
        </div>

        {/* 展开的完整报告 */}
        <ExpandableSection isOpen={expanded}>
          {data.fullReport && (
            <div className="p-2 rounded-lg bg-white/60 border border-blue-200 max-h-64 overflow-y-auto">
              <p className="text-[13px] leading-relaxed text-foreground whitespace-pre-line">
                {data.fullReport}
              </p>
            </div>
          )}
        </ExpandableSection>

        {/* 底部元数据 - 紧凑版 */}
        <div className="space-y-2">
          {data.overdueItems > 0 && (
            <div className="flex items-center gap-1.5 text-[10px] p-2 rounded-md bg-orange-50 border border-orange-200">
              <AlertCircle className="h-3 w-3 text-orange-600 flex-shrink-0" />
              <span className="text-muted-foreground">超期未决：</span>
              <Badge className="bg-orange-100 text-orange-700 text-[9px] h-4" variant="secondary">
                {data.overdueItems}项
              </Badge>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-[10px] p-2 rounded-md bg-white/60">
            <span className="text-muted-foreground">风险等级：</span>
            <Badge
              className={`${riskInfo.bgColor} ${riskInfo.color} text-[9px] h-4 flex items-center gap-1.5 ${
                data.riskLevel === 'high' ? 'animate-pulse-soft' : ''
              }`}
              variant="secondary"
            >
              <span className={`h-2 w-2 rounded-full ${riskInfo.dotColor}`} />
              {riskInfo.text}
            </Badge>
          </div>
        </div>

        {data.fullReport && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-[10px] text-blue-600 hover:text-blue-700 h-7"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                收起详情
                <ChevronUp className="ml-1 h-3 w-3" />
              </>
            ) : (
              <>
                展开详情
                <ChevronDown className="ml-1 h-3 w-3" />
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
