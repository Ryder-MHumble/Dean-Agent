"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, AlertTriangle, TrendingUp, TrendingDown, Minus, CheckCircle2 } from "lucide-react"
import { AnimatedNumber, StaggerContainer, StaggerItem, motion } from "@/components/motion"
import { cn } from "@/lib/utils"

export interface SafetyDeduction {
  category: string
  points: number
  description: string
  responsiblePerson?: string
}

export interface SafetyIndexData {
  overallScore: number // 0-100
  deductions: SafetyDeduction[]
  trend: 'up' | 'down' | 'stable'
  lastUpdated: Date
}

interface SafetyIndexGaugeProps {
  data: SafetyIndexData
  onViewDetails?: () => void
}

export default function SafetyIndexGauge({
  data,
  onViewDetails,
}: SafetyIndexGaugeProps) {
  const { overallScore, deductions, trend } = data

  // 计算仪表盘的颜色和状态
  const getScoreColor = (score: number) => {
    if (score >= 90) return { color: '#22c55e', label: '优秀', bgGradient: 'bg-gradient-to-br from-green-50/80 to-emerald-50/40' }
    if (score >= 70) return { color: '#f59e0b', label: '关注', bgGradient: 'bg-gradient-to-br from-amber-50/80 to-yellow-50/40' }
    return { color: '#ef4444', label: '警戒', bgGradient: 'bg-gradient-to-br from-red-50/80 to-orange-50/40' }
  }

  const scoreInfo = getScoreColor(overallScore)

  // SVG仪表盘参数
  const radius = 80

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-green-600" />
      case 'down':
        return <TrendingDown className="h-3 w-3 text-red-600" />
      default:
        return <Minus className="h-3 w-3 text-gray-600" />
    }
  }

  return (
    <Card className={cn("shadow-card h-full", scoreInfo.bgGradient)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">今日安全指数</CardTitle>
          <Badge variant="secondary" className="flex items-center gap-1 text-[10px]">
            {getTrendIcon()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* 仪表盘 - 紧凑版 */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            {/* SVG半圆形仪表盘 - 缩小尺寸 */}
            <svg
              width="160"
              height="100"
              viewBox="0 0 200 120"
              className="overflow-visible"
            >
              {/* 背景弧线 */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="12"
                strokeLinecap="round"
              />
              {/* 渐变定义 */}
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
              {/* 进度弧线 - 使用 framer-motion 动画 */}
              <motion.path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="url(#gaugeGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: overallScore / 100 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>
            {/* 中心分数 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
              <div className="text-3xl font-bold" style={{ color: scoreInfo.color }}>
                <AnimatedNumber
                  value={overallScore}
                  duration={1.2}
                />
              </div>
              <div className="text-xs text-muted-foreground">/ 100</div>
              <Badge
                className="mt-1.5 text-[10px]"
                style={{ backgroundColor: scoreInfo.color, color: 'white' }}
              >
                {scoreInfo.label}
              </Badge>
            </div>
          </div>
        </div>

        {/* 扣分项列表 - 紧凑版 */}
        <div className="space-y-1.5">
          <div className="text-xs font-medium text-muted-foreground px-1">
            扣分项：
          </div>
          {deductions.length === 0 ? (
            <div className="text-center py-4 text-xs text-muted-foreground">
              <CheckCircle2 className="h-6 w-6 text-green-500 mx-auto mb-1" />
              <div>暂无扣分项</div>
            </div>
          ) : (
            <StaggerContainer className="space-y-1.5">
              {deductions.slice(0, 4).map((deduction, index) => (
                <StaggerItem key={index}>
                  <div
                    className="flex items-start gap-1.5 rounded-md glass-card p-2 text-xs hover:bg-white/80 transition-colors cursor-pointer"
                    onClick={onViewDetails}
                  >
                    <AlertTriangle className="h-3 w-3 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="font-medium text-[11px]">{deduction.category}</span>
                        <span className="font-bold text-red-600 text-[11px]">
                          {deduction.points}分
                        </span>
                      </div>
                      <div className="text-[10px] text-muted-foreground line-clamp-1">
                        {deduction.description}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>

        {deductions.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center text-[10px] h-7"
            onClick={onViewDetails}
          >
            查看详情
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
