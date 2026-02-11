"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react"
import { StaggerContainer, StaggerItem } from "@/components/motion"

export interface TimelineEvent {
  id: string
  time: string
  title: string
  type: 'meeting' | 'deadline' | 'task'
  status: 'upcoming' | 'conflict' | 'ready' | 'incomplete'
  metadata?: string
  actionLabel?: string
  onAction?: () => void
}

interface TimelineViewProps {
  todayEvents: TimelineEvent[]
  weekEvents: TimelineEvent[]
  longTermEvents: TimelineEvent[]
}

const getEventIcon = (type: string, status: string) => {
  if (status === 'conflict') {
    return <AlertTriangle className="h-4 w-4 text-red-600" />
  }
  if (status === 'ready') {
    return <CheckCircle2 className="h-4 w-4 text-green-600" />
  }
  return <Clock className="h-4 w-4 text-blue-600" />
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'conflict':
      return { text: '冲突', color: 'text-red-700', bgColor: 'bg-red-100' }
    case 'incomplete':
      return { text: '准备中', color: 'text-orange-700', bgColor: 'bg-orange-100' }
    case 'ready':
      return { text: '已就绪', color: 'text-green-700', bgColor: 'bg-green-100' }
    default:
      return { text: '待进行', color: 'text-blue-700', bgColor: 'bg-blue-100' }
  }
}

const getEventDotColor = (status: string) => {
  switch (status) {
    case 'conflict':
      return 'bg-red-500'
    case 'ready':
      return 'bg-green-500'
    case 'incomplete':
      return 'bg-amber-500'
    default:
      return 'bg-blue-400'
  }
}

const EventItem = ({ event, isLast }: { event: TimelineEvent; isLast: boolean }) => {
  const statusBadge = getStatusBadge(event.status)
  const dotColor = getEventDotColor(event.status)

  return (
    <div className="relative flex items-start gap-3 pl-6">
      {/* Timeline connector line */}
      {!isLast && (
        <div className="absolute left-[11px] top-8 w-0.5 h-[calc(100%+4px)] bg-gradient-to-b from-blue-200 to-blue-100" />
      )}

      {/* Event dot */}
      <div className={`absolute left-2 top-3 h-2 w-2 rounded-full ${dotColor} z-10`} />

      <div className="group flex-1 p-3 rounded-lg hover:bg-muted/30 transition-all duration-200">
        <div className="flex-shrink-0 mb-2">
          {getEventIcon(event.type, event.status)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-xs font-medium text-muted-foreground">
                {event.time}
              </span>
              <h4 className="text-sm font-medium text-foreground truncate">
                {event.title}
              </h4>
            </div>
            <Badge
              className={`${statusBadge.bgColor} ${statusBadge.color} flex-shrink-0`}
              variant="secondary"
            >
              {statusBadge.text}
            </Badge>
          </div>
          {event.metadata && (
            <p className="text-xs text-muted-foreground mb-2">{event.metadata}</p>
          )}
          {event.actionLabel && (
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-7"
              onClick={event.onAction}
            >
              {event.actionLabel}
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function TimelineView({
  todayEvents,
  weekEvents,
  longTermEvents,
}: TimelineViewProps) {
  const [activeTab, setActiveTab] = useState('today')

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-base font-semibold">时间轴</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          基于时间的行动清单和日程安排
        </p>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="today" className="text-xs">
              今日 ({todayEvents.length})
            </TabsTrigger>
            <TabsTrigger value="week" className="text-xs">
              本周 ({weekEvents.length})
            </TabsTrigger>
            <TabsTrigger value="longterm" className="text-xs">
              长期 ({longTermEvents.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today">
            {todayEvents.length === 0 ? (
              <div className="text-center py-8 text-sm text-muted-foreground">
                今日暂无安排
              </div>
            ) : (
              <StaggerContainer className="space-y-1">
                {todayEvents.map((event, index) => (
                  <StaggerItem key={event.id}>
                    <EventItem event={event} isLast={index === todayEvents.length - 1} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </TabsContent>

          <TabsContent value="week">
            {weekEvents.length === 0 ? (
              <div className="text-center py-8 text-sm text-muted-foreground">
                本周暂无其他安排
              </div>
            ) : (
              <StaggerContainer className="space-y-1">
                {weekEvents.map((event, index) => (
                  <StaggerItem key={event.id}>
                    <EventItem event={event} isLast={index === weekEvents.length - 1} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </TabsContent>

          <TabsContent value="longterm">
            {longTermEvents.length === 0 ? (
              <div className="text-center py-8 text-sm text-muted-foreground">
                暂无长期计划
              </div>
            ) : (
              <StaggerContainer className="space-y-1">
                {longTermEvents.map((event, index) => (
                  <StaggerItem key={event.id}>
                    <EventItem event={event} isLast={index === longTermEvents.length - 1} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
