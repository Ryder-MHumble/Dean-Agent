"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Bot,
  X,
  Minimize2,
  Clock,
  AlertTriangle,
  Send,
  Sparkles,
  Calendar,
  Users,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "@/components/motion"

interface TodoItem {
  id: string
  title: string
  priority: 'urgent' | 'important' | 'normal'
  deadline?: string
  completed: boolean
  actionLabel?: string
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
]

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
    description: 'AI已起草祝贺邮件',
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

export default function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [todos, setTodos] = useState(mockTodoItems)
  const [chatInput, setChatInput] = useState('')
  const [notifications, setNotifications] = useState(2)

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
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-elevated hover:shadow-glow-blue transition-shadow flex items-center justify-center group"
          >
            <Bot className="h-7 w-7 transition-transform group-hover:scale-110" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {notifications}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-6 right-6 z-50 w-96 shadow-elevated rounded-2xl glass-card overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AI 智能秘书</h3>
                  {urgentCount > 0 && (
                    <p className="text-xs text-white/80">{urgentCount} 项特急待办</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Minimize2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false)
                    setIsMinimized(false)
                    setNotifications(0)
                  }}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Content area */}
            <AnimatePresence initial={false}>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="flex flex-col" style={{ height: 480 }}>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {/* Today's todos */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-600" />
                            今日待办
                          </h4>
                          <Badge variant="secondary" className="text-xs">
                            {incompleteTodos.length}项
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          {todos.slice(0, 3).map((todo) => (
                            <motion.div
                              key={todo.id}
                              layout
                              transition={{ duration: 0.2 }}
                              className={cn(
                                "flex items-start gap-2 p-2.5 rounded-xl border transition-all duration-200",
                                todo.completed
                                  ? "bg-muted/30 border-muted"
                                  : "bg-card border-border/50 hover:shadow-sm"
                              )}
                            >
                              <Checkbox
                                checked={todo.completed}
                                onCheckedChange={() => toggleTodo(todo.id)}
                                className="mt-0.5"
                              />
                              <div className="flex-1 min-w-0">
                                <Badge
                                  className={`text-[9px] mb-1 ${getPriorityColor(todo.priority)}`}
                                  variant="secondary"
                                >
                                  {todo.priority === 'urgent' && '特急'}
                                  {todo.priority === 'important' && '重要'}
                                  {todo.priority === 'normal' && '一般'}
                                </Badge>
                                <p
                                  className={cn(
                                    "text-xs font-medium transition-all duration-200",
                                    todo.completed
                                      ? "line-through text-muted-foreground"
                                      : "text-foreground"
                                  )}
                                >
                                  {todo.title}
                                </p>
                                {todo.deadline && (
                                  <div className="text-[10px] text-muted-foreground mt-0.5">
                                    {todo.deadline}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* AI Recommendations */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="h-4 w-4 text-blue-600" />
                          <h4 className="font-medium text-sm">AI 智能推荐</h4>
                        </div>
                        <div className="space-y-2">
                          {mockRecommendations.map((rec) => {
                            const Icon = getRecommendationIcon(rec.icon)
                            return (
                              <div
                                key={rec.id}
                                className="flex items-start gap-2 p-2.5 rounded-xl border border-border/50 bg-gradient-to-br from-blue-50/80 to-indigo-50/40 hover:shadow-sm transition-all duration-200 cursor-pointer"
                              >
                                <Icon className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-foreground mb-0.5">
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
                      </div>

                      {/* Schedule conflict alert */}
                      <div className="p-3 rounded-xl border border-orange-200/60 bg-orange-50/50">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-medium text-foreground mb-1">
                              日程冲突提醒
                            </p>
                            <p className="text-[10px] text-muted-foreground mb-2">
                              14:00 人才引进委员会与部委电话会议冲突
                            </p>
                            <Button size="sm" className="text-[10px] h-6 w-full">
                              查看处理方案
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom input */}
                    <div className="border-t border-border/30 p-3 bg-muted/20">
                      <div className="flex gap-2">
                        <Input
                          placeholder="有什么可以帮您？"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSendMessage()
                            }
                          }}
                          className="text-xs h-9 flex-1 rounded-xl border-border/50 bg-white/80"
                        />
                        <Button
                          size="sm"
                          className="h-9 px-3 rounded-xl"
                          onClick={handleSendMessage}
                          disabled={!chatInput.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
