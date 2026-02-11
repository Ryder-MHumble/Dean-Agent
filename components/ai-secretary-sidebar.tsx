"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Bot,
  CheckCircle2,
  Circle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Send,
  ChevronDown,
  ChevronUp,
  Calendar,
  Users,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TodoItem {
  id: string
  title: string
  priority: 'urgent' | 'important' | 'normal'
  deadline?: string
  completed: boolean
  actionLabel?: string
}

interface ScheduleConflict {
  id: string
  title: string
  time: string
  conflictWith: string
  suggestion: string
}

interface AIRecommendation {
  id: string
  icon: 'calendar' | 'users' | 'file'
  title: string
  description: string
}

const mockTodoItems: TodoItem[] = [
  {
    id: '1',
    title: '审查伦理委员会报告',
    priority: 'urgent',
    deadline: '今天 18:00',
    completed: false,
    actionLabel: '开始审阅',
  },
  {
    id: '2',
    title: '恭喜张教授当选院士',
    priority: 'important',
    completed: false,
    actionLabel: 'AI草稿已就绪',
  },
  {
    id: '3',
    title: '督办大模型基座项目采购',
    priority: 'important',
    deadline: '延期15天',
    completed: false,
    actionLabel: '催办负责人',
  },
  {
    id: '4',
    title: '审阅科技伦理政策影响分析',
    priority: 'normal',
    completed: false,
    actionLabel: '查看AI分析',
  },
  {
    id: '5',
    title: '处理日程冲突：人才引进委员会',
    priority: 'important',
    completed: false,
    actionLabel: '选择方案',
  },
]

const mockScheduleConflict: ScheduleConflict = {
  id: '1',
  title: '人才引进委员会',
  time: '今天 14:00',
  conflictWith: '部委电话会议',
  suggestion: '建议授权李副主任处理人才引进委员会',
}

const mockRecommendations: AIRecommendation[] = [
  {
    id: '1',
    icon: 'file',
    title: '关注科技伦理治理政策',
    description: '该政策与我院3个在研项目相关',
  },
  {
    id: '2',
    icon: 'users',
    title: '恭喜王教授当选IEEE Fellow',
    description: 'AI已起草祝贺邮件，点击查看',
  },
  {
    id: '3',
    icon: 'calendar',
    title: '北京科创大会邀请',
    description: 'ROI:95 | 建议接受邀请',
  },
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-100 text-red-700'
    case 'important':
      return 'bg-orange-100 text-orange-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

const getRecommendationIcon = (icon: string) => {
  switch (icon) {
    case 'calendar':
      return Calendar
    case 'users':
      return Users
    case 'file':
      return FileText
    default:
      return FileText
  }
}

export default function AISecretarySidebar() {
  const [todos, setTodos] = useState(mockTodoItems)
  const [chatInput, setChatInput] = useState('')
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    todos: true,
    conflict: true,
    recommendations: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      console.log('发送消息:', chatInput)
      setChatInput('')
    }
  }

  const incompleteTodos = todos.filter((t) => !t.completed)
  const urgentCount = incompleteTodos.filter((t) => t.priority === 'urgent').length

  return (
    <aside className="fixed right-0 top-16 z-30 h-[calc(100vh-64px)] w-[360px] border-l border-border bg-white overflow-hidden flex flex-col">
      {/* 头部 */}
      <div className="flex items-center gap-2 px-4 py-4 border-b border-border bg-blue-50">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-white">
          <Bot className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">AI 智能秘书</h3>
          <p className="text-xs text-muted-foreground">您的智能助手</p>
        </div>
        {urgentCount > 0 && (
          <Badge className="bg-red-500 text-white">{urgentCount} 特急</Badge>
        )}
      </div>

      {/* 滚动内容区域 */}
      <div className="flex-1 overflow-y-auto">
        {/* 今日待办 */}
        <div className="border-b border-border">
          <button
            type="button"
            className="flex items-center justify-between w-full px-4 py-3 hover:bg-muted/50 transition-colors"
            onClick={() => toggleSection('todos')}
          >
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-sm">今日待办</h4>
              <Badge variant="secondary" className="text-xs">
                {incompleteTodos.length}项
              </Badge>
            </div>
            {expandedSections.todos ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {expandedSections.todos && (
            <div className="px-4 pb-4 space-y-2">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className={cn(
                    "group flex items-start gap-3 p-3 rounded-lg border transition-all",
                    todo.completed
                      ? "bg-muted/30 border-muted"
                      : "bg-card border-border hover:border-blue-300 hover:shadow-sm"
                  )}
                >
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                    className="mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        className={`text-[10px] ${getPriorityColor(todo.priority)}`}
                        variant="secondary"
                      >
                        {todo.priority === 'urgent' && '特急'}
                        {todo.priority === 'important' && '重要'}
                        {todo.priority === 'normal' && '一般'}
                      </Badge>
                    </div>
                    <p
                      className={cn(
                        "text-xs font-medium mb-1",
                        todo.completed
                          ? "line-through text-muted-foreground"
                          : "text-foreground"
                      )}
                    >
                      {todo.title}
                    </p>
                    {todo.deadline && (
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground mb-2">
                        <Clock className="h-3 w-3" />
                        {todo.deadline}
                      </div>
                    )}
                    {todo.actionLabel && !todo.completed && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-[10px] h-6 mt-1"
                      >
                        {todo.actionLabel}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 日程冲突提醒 */}
        <div className="border-b border-border">
          <button
            type="button"
            className="flex items-center justify-between w-full px-4 py-3 hover:bg-muted/50 transition-colors"
            onClick={() => toggleSection('conflict')}
          >
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-sm">日程冲突提醒</h4>
              <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
                1个
              </Badge>
            </div>
            {expandedSections.conflict ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {expandedSections.conflict && (
            <div className="px-4 pb-4">
              <div className="p-3 rounded-lg border border-orange-200 bg-orange-50">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground mb-1">
                      {mockScheduleConflict.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground mb-1">
                      {mockScheduleConflict.time}
                    </p>
                    <p className="text-[10px] text-muted-foreground mb-2">
                      冲突：{mockScheduleConflict.conflictWith}
                    </p>
                    <div className="p-2 rounded bg-white/60 border border-orange-200 mb-2">
                      <p className="text-[10px] text-foreground">
                        💡 {mockScheduleConflict.suggestion}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="text-[10px] h-6 flex-1">
                        授权李副主任
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-[10px] h-6 flex-1"
                      >
                        调整时间
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI建议行动 */}
        <div className="border-b border-border">
          <button
            type="button"
            className="flex items-center justify-between w-full px-4 py-3 hover:bg-muted/50 transition-colors"
            onClick={() => toggleSection('recommendations')}
          >
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-sm">AI 建议行动</h4>
              <Badge variant="secondary" className="text-xs">
                {mockRecommendations.length}条
              </Badge>
            </div>
            {expandedSections.recommendations ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {expandedSections.recommendations && (
            <div className="px-4 pb-4 space-y-2">
              {mockRecommendations.map((rec) => {
                const Icon = getRecommendationIcon(rec.icon)
                return (
                  <div
                    key={rec.id}
                    className="flex items-start gap-2 p-3 rounded-lg border border-border bg-card hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <Icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground mb-1">
                        {rec.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {rec.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* 底部：AI对话输入框 */}
      <div className="border-t border-border p-4 bg-white">
        <div className="flex items-center gap-2 mb-2">
          <Bot className="h-4 w-4 text-blue-600" />
          <span className="text-xs font-medium text-muted-foreground">
            有什么可以帮您？
          </span>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="输入指令或问题..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage()
              }
            }}
            className="text-xs h-9"
          />
          <Button
            size="sm"
            className="h-9 px-3"
            onClick={handleSendMessage}
            disabled={!chatInput.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  )
}
