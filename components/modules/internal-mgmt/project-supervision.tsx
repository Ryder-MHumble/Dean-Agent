"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { MoreHorizontal } from "lucide-react"
import { motion } from "framer-motion"
import { StaggerContainer, StaggerItem } from "@/components/motion"
import { toast } from "sonner"

const months = ["1月", "2月", "3月", "4月", "5月", "6月"]
const timelineProjects = [
  {
    name: "量子芯片 Alpha",
    status: "supply",
    statusLabel: "供应链问题",
    statusColor: "text-red-500",
    dotColor: "bg-red-500",
    owner: "张教授",
    phase: "第二阶段",
    bars: [
      {
        start: 2,
        width: 3,
        label: "第二阶段(延期)",
        gradient: "bg-gradient-to-r from-red-200 to-red-300",
        borderColor: "border-red-300",
        textColor: "text-red-700",
        hoverShadow: "hover:shadow-md hover:shadow-red-100",
      },
    ],
  },
  {
    name: "生物合成实验室",
    status: "budget",
    statusLabel: "预算审查",
    statusColor: "text-yellow-600",
    dotColor: "bg-yellow-500",
    owner: "李主任",
    phase: "采购阶段",
    bars: [
      {
        start: 1,
        width: 2,
        label: "采购阶段",
        gradient: "bg-gradient-to-r from-yellow-200 to-amber-200",
        borderColor: "border-yellow-300",
        textColor: "text-yellow-700",
        hoverShadow: "hover:shadow-md hover:shadow-yellow-100",
      },
    ],
  },
  {
    name: "神经网络训练",
    status: "normal",
    statusLabel: "运行稳定",
    statusColor: "text-green-600",
    dotColor: "bg-green-500",
    owner: "王博士",
    phase: "数据处理",
    bars: [
      {
        start: 3,
        width: 2,
        label: "数据处理",
        gradient: "bg-gradient-to-r from-blue-200 to-indigo-200",
        borderColor: "border-blue-300",
        textColor: "text-blue-700",
        hoverShadow: "hover:shadow-md hover:shadow-blue-100",
      },
    ],
  },
]

const tableProjects = [
  {
    id: "1",
    name: "AI & 机器人实验室扩建",
    status: "进行中",
    statusColor: "bg-blue-100 text-blue-700",
    owner: "李主任",
    department: "科研中心",
    progress: 65,
    deadline: "2024-06-30",
    budget: "¥500万",
    spent: "¥325万",
  },
  {
    id: "2",
    name: "量子计算中心二期",
    status: "风险",
    statusColor: "bg-red-100 text-red-700",
    owner: "王教授",
    department: "量子研究所",
    progress: 42,
    deadline: "2024-05-15",
    budget: "¥800万",
    spent: "¥680万",
  },
  {
    id: "3",
    name: "生物医学工程平台",
    status: "已完成",
    statusColor: "bg-green-100 text-green-700",
    owner: "赵博士",
    department: "生物医学中心",
    progress: 100,
    deadline: "2024-02-28",
    budget: "¥350万",
    spent: "¥340万",
  },
]

export default function ProjectSupervision() {
  return (
    <div className="space-y-5">
      {/* Timeline */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">
                关键项目时间线
              </CardTitle>
              <p className="mt-0.5 text-xs text-muted-foreground">
                监控 12 个活跃的战略项目
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-[11px] text-muted-foreground">正常</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <span className="text-[11px] text-muted-foreground">预警</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <span className="text-[11px] text-muted-foreground">严重</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <TooltipProvider delayDuration={200}>
            <div className="flex">
              <div className="w-40 shrink-0 border-b pb-2 text-[11px] font-medium text-muted-foreground">
                项目名称
              </div>
              <div className="grid flex-1 grid-cols-6 border-b">
                {months.map((m, i) => (
                  <div
                    key={m}
                    className={`pb-2 text-center text-[11px] font-medium text-muted-foreground ${i % 2 === 1 ? "bg-muted/20" : ""}`}
                  >
                    {m}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute top-0 bottom-0 z-10 pointer-events-none"
                style={{ left: `calc(${(1.3 / 6) * 100}% + 160px)` }}
              >
                <div className="flex flex-col items-center h-full">
                  <div className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-2 py-0.5 text-[9px] font-medium text-white shadow-glow-blue">
                    今日
                  </div>
                  <div className="flex-1 w-0.5 bg-gradient-to-b from-blue-500 to-blue-200 animate-glow-pulse" />
                </div>
              </div>

              <StaggerContainer>
                {timelineProjects.map((project) => (
                  <StaggerItem key={project.name}>
                    <div className="group flex items-center border-b py-4 hover:bg-muted/20 transition-colors rounded-sm">
                      <div className="w-40 shrink-0 pl-1">
                        <p className="text-sm font-medium text-foreground group-hover:text-blue-600 transition-colors">
                          {project.name}
                        </p>
                        <div className="mt-1 flex items-center gap-1">
                          <div
                            className={`h-1.5 w-1.5 rounded-full ${project.dotColor} ${project.status === "supply" ? "animate-pulse-subtle" : ""}`}
                          />
                          <span
                            className={`text-[10px] ${project.statusColor}`}
                          >
                            {project.statusLabel}
                          </span>
                        </div>
                      </div>
                      <div className="relative grid flex-1 grid-cols-6">
                        {months.map((_, i) => (
                          <div
                            key={i}
                            className={`absolute top-0 bottom-0 ${i % 2 === 1 ? "bg-muted/10" : ""}`}
                            style={{
                              left: `${(i / 6) * 100}%`,
                              width: `${(1 / 6) * 100}%`,
                            }}
                          />
                        ))}
                        {project.bars.map((bar) => (
                          <Tooltip key={bar.label}>
                            <TooltipTrigger asChild>
                              <motion.div
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: 1 }}
                                transition={{
                                  duration: 0.5,
                                  ease: [0.25, 0.46, 0.45, 0.94],
                                  delay: 0.3,
                                }}
                                style={{
                                  gridColumnStart: bar.start,
                                  gridColumnEnd: bar.start + bar.width,
                                  transformOrigin: "left",
                                }}
                                className={`relative z-[1] flex h-8 items-center justify-center rounded-md border text-[10px] font-medium cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${bar.gradient} ${bar.borderColor} ${bar.textColor} ${bar.hoverShadow}`}
                              >
                                {bar.label}
                              </motion.div>
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              className="max-w-[200px]"
                            >
                              <div className="space-y-1">
                                <p className="font-semibold text-sm">
                                  {project.name}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>阶段: {project.phase}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>负责人: {project.owner}</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs">
                                  <span
                                    className={`${project.dotColor} h-1.5 w-1.5 rounded-full`}
                                  />
                                  <span className={project.statusColor}>
                                    {project.statusLabel}
                                  </span>
                                </div>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>

      {/* Project Info Table */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              重点项目进度
            </CardTitle>
            <button
              type="button"
              className="text-muted-foreground"
              onClick={() =>
                toast("重点项目进度", {
                  description: "正在加载完整项目列表...",
                })
              }
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <table className="w-full">
            <thead>
              <tr className="border-b text-[11px] text-muted-foreground">
                <th className="pb-2 text-left font-medium">项目名称</th>
                <th className="pb-2 text-left font-medium">状态</th>
                <th className="pb-2 text-left font-medium">负责人</th>
                <th className="pb-2 text-left font-medium">进度</th>
                <th className="pb-2 text-left font-medium">截止日期</th>
                <th className="pb-2 text-left font-medium">预算</th>
              </tr>
            </thead>
            <tbody>
              {tableProjects.map((project) => (
                <tr key={project.id} className="border-b last:border-0">
                  <td className="py-3 text-sm font-medium text-foreground">
                    {project.name}
                  </td>
                  <td className="py-3">
                    <Badge
                      variant="secondary"
                      className={`text-[10px] ${project.statusColor}`}
                    >
                      {project.status}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <div>
                      <div className="text-sm text-foreground">
                        {project.owner}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {project.department}
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {project.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-muted-foreground">
                    {project.deadline}
                  </td>
                  <td className="py-3">
                    <div>
                      <div className="text-sm text-foreground">
                        {project.spent}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        / {project.budget}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
