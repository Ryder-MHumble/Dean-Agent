"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, AlertTriangle, Clock, DollarSign, TrendingUp, FileText, User, CheckCircle2 } from "lucide-react"
import { StaggerContainer, StaggerItem } from "@/components/motion"
import { cn } from "@/lib/utils"
import {
  type PriorityItemWithScore,
  getCategoryBadge,
  getActionInfo,
  getUrgencyStatus,
  getPriorityBadge,
} from "@/lib/priority-scoring"

interface MustKnowAlertsProps {
  alerts: PriorityItemWithScore[]
  onAlertClick?: (alertId: string) => void
  onActionClick?: (alertId: string, actionType: string) => void
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'risk':
      return AlertTriangle
    case 'deadline':
      return Clock
    case 'finance':
      return DollarSign
    case 'opportunity':
      return TrendingUp
    case 'supervision':
      return FileText
    default:
      return AlertTriangle
  }
}

const getCategoryBorderColor = (category: string) => {
  switch (category) {
    case 'risk':
      return 'border-l-red-500'
    case 'deadline':
      return 'border-l-amber-500'
    case 'finance':
      return 'border-l-orange-500'
    case 'opportunity':
      return 'border-l-green-500'
    case 'supervision':
      return 'border-l-blue-500'
    default:
      return 'border-l-gray-500'
  }
}

export default function MustKnowAlerts({
  alerts,
  onAlertClick,
  onActionClick,
}: MustKnowAlertsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">必须关注</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {alerts.length} 项需要处理
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          高优先级事项，需要您的关注或决策
        </p>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CheckCircle2 className="h-10 w-10 text-green-500 mb-3" />
            <div className="text-sm font-medium text-foreground mb-1">
              暂无紧急事项
            </div>
            <div className="text-xs text-muted-foreground">
              一切运转正常，无需特别关注
            </div>
          </div>
        ) : (
          <StaggerContainer className="space-y-3">
            {alerts.map((alert) => {
              const categoryBadge = getCategoryBadge(alert.category)
              const actionInfo = getActionInfo(alert.actionType)
              const priorityBadge = getPriorityBadge(alert.priorityScore)
              const urgencyStatus = getUrgencyStatus(alert.deadline)
              const CategoryIcon = getCategoryIcon(alert.category)
              const borderColor = getCategoryBorderColor(alert.category)

              return (
                <StaggerItem key={alert.id}>
                  <div
                    className={cn(
                      "group relative rounded-xl p-4 transition-all cursor-pointer",
                      "shadow-card hover:shadow-card-hover",
                      "border border-transparent hover:border-blue-200/50",
                      "bg-white hover:translate-x-0.5",
                      "border-l-[3px]",
                      borderColor
                    )}
                    onClick={() => onAlertClick?.(alert.id)}
                  >
                    {/* 顶部：类别标签和优先级 */}
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        className={`${categoryBadge.bgColor} ${categoryBadge.color} flex items-center gap-1`}
                        variant="secondary"
                      >
                        <CategoryIcon className="h-3 w-3" />
                        {categoryBadge.text}
                      </Badge>
                      <Badge
                        className={`${priorityBadge.bgColor} ${priorityBadge.color}`}
                        variant="secondary"
                      >
                        {priorityBadge.text}
                      </Badge>
                      {alert.deadline && (
                        <Badge
                          className={`ml-auto ${urgencyStatus.color}`}
                          variant="secondary"
                        >
                          {urgencyStatus.icon} {urgencyStatus.text}
                        </Badge>
                      )}
                    </div>

                    {/* 标题 */}
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-blue-600 transition-colors">
                      {alert.title}
                    </h3>

                    {/* 描述 */}
                    <p className="text-sm text-muted-foreground mb-3">
                      {alert.description}
                    </p>

                    {/* Metadata */}
                    {alert.metadata && (
                      <div className="text-xs text-muted-foreground mb-3 bg-muted/50 rounded px-2 py-1 inline-block">
                        {alert.metadata}
                      </div>
                    )}

                    {/* 底部：负责人和操作按钮 */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {alert.responsiblePerson && (
                          <>
                            <User className="h-3 w-3" />
                            <span>{alert.responsiblePerson}</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs active:scale-95 transition-all duration-150"
                          onClick={(e) => {
                            e.stopPropagation()
                            onAlertClick?.(alert.id)
                          }}
                        >
                          查看详情
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                        {alert.actionType !== 'fyi' && (
                          <Button
                            size="sm"
                            className={`text-xs active:scale-95 transition-all duration-150 ${actionInfo.bgColor} ${actionInfo.color}`}
                            onClick={(e) => {
                              e.stopPropagation()
                              onActionClick?.(alert.id, alert.actionType)
                            }}
                          >
                            {actionInfo.text}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        )}
      </CardContent>
    </Card>
  )
}
