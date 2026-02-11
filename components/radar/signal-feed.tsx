"use client"

import { Rss, SlidersHorizontal, RefreshCw, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StaggerContainer, StaggerItem } from "@/components/motion"

export default function SignalFeed() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Rss className="h-5 w-5 text-blue-500" />
          <h2 className="text-base font-semibold text-foreground">
            全球人工智能信号
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Signal Cards */}
      <StaggerContainer>
        <StaggerItem>
          <Card className="shadow-card hover:shadow-card-hover transition-all rounded-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-[10px] font-medium border-0">
                  ARXIV 论文
                </Badge>
                <span className="text-[11px] text-muted-foreground">
                  2小时前
                </span>
              </div>
              <h3 className="mt-2 text-sm font-semibold text-foreground leading-snug">
                大型语言模型作为芯片设计的优化器
              </h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                探索LLM生成优化平面图和逻辑综合脚本的能力，通过微调提升ED...
              </p>
              <div className="mt-3 rounded-lg bg-blue-50 p-3 border border-blue-100/50">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                  <span className="text-xs font-medium text-blue-700">
                    研究院影响评估
                  </span>
                </div>
                <p className="mt-1 text-xs text-blue-600 leading-relaxed">
                  高相关性。直接对标"硅计划"项目。建议重点审查第4.2节的基准测试数据。
                </p>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="shadow-card hover:shadow-card-hover transition-all rounded-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Badge
                  variant="secondary"
                  className="text-[10px] font-medium border-0"
                >
                  X / 推特
                </Badge>
                <span className="text-[11px] text-muted-foreground">
                  45分钟前
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
                  AK
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Andrej Karpathy
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    意见领袖 (KOL)
                  </p>
                </div>
              </div>
              <div className="mt-3 rounded-lg bg-slate-50 p-3 border border-slate-100/50">
                <p className="text-xs text-foreground leading-relaxed italic">
                  "小模型的改进速度正超过大模型的扩展定律。效率是新的护城河。"
                </p>
              </div>
              <div className="mt-3 rounded-lg bg-green-50 p-3 border border-green-100/50">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-green-700">💡</span>
                  <span className="text-xs font-medium text-green-700">
                    战略备注
                  </span>
                </div>
                <p className="mt-1 text-xs text-green-600 leading-relaxed">
                  验证了我们向边缘计算AI研究的转型。可用作Q3基金会演示的引用。
                </p>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="shadow-card hover:shadow-card-hover transition-all rounded-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-[10px] font-medium border-0">
                  TECHCRUNCH
                </Badge>
                <span className="text-[11px] text-muted-foreground">
                  4小时前
                </span>
              </div>
              <h3 className="mt-2 text-sm font-semibold text-foreground">
                Mistral AI 以60亿欧元估值融资6亿欧元
              </h3>
              <div className="mt-3 rounded-lg bg-red-50 p-3 border border-red-100/50">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-red-600">⚠</span>
                  <span className="text-xs font-medium text-red-600">
                    人才流失风险
                  </span>
                </div>
                <p className="mt-1 text-xs text-red-500 leading-relaxed">
                  预计Mistral将在欧盟地区进行激进招聘。我们有3名高级研究员位于巴黎。
                </p>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerContainer>
    </div>
  )
}
