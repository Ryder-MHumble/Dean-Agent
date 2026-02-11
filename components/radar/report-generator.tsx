"use client"

import { FileText, Sparkles, Plus, TrendingUp, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StaggerContainer, StaggerItem } from "@/components/motion"

export default function ReportGenerator() {
  const topics = [
    {
      title: "算力基础设施风险评估",
      desc: "触发原因：新的出口管制新闻及英伟达发货延迟。",
    },
    {
      title: "Q3 人才引进计划",
      desc: "触发原因：欧盟区出现高\"回国意向\"指标。",
    },
  ]

  return (
    <div className="space-y-4">
      {/* AI Report Generator */}
      <Card className="shadow-card hover:shadow-card-hover transition-all rounded-xl border border-blue-100/50 bg-blue-50/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-semibold text-foreground">
                内部报告生成器
              </span>
            </div>
            <Badge className="bg-blue-500 text-white text-[10px] hover:bg-blue-500 border-0">
              AI 助手
            </Badge>
          </div>
          <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
            基于本周监测到的{" "}
            <span className="font-semibold text-foreground">142</span>
            {" "}个信号，AI建议以下董事会报告主题：
          </p>

          <StaggerContainer>
            <div className="mt-4 space-y-3">
              {topics.map((topic) => (
                <StaggerItem key={topic.title}>
                  <div className="rounded-lg border border-border/50 bg-white p-3 shadow-sm hover:shadow-md transition-all">
                    <p className="text-xs font-semibold text-foreground">
                      {topic.title}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {topic.desc}
                    </p>
                    <button
                      type="button"
                      className="mt-2 flex items-center gap-1.5 rounded-md border border-border/50 px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <Sparkles className="h-3 w-3" />
                      起草报告
                    </button>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          <button
            type="button"
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border/50 py-2.5 text-xs text-muted-foreground transition-colors hover:bg-white hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" />
            创建自定义主题
          </button>
        </CardContent>
      </Card>

      {/* Market Dynamics */}
      <Card className="shadow-card hover:shadow-card-hover transition-all rounded-xl border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <CardTitle className="text-sm font-semibold">
              市场动态
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="mt-2">
            <p className="text-xs text-muted-foreground">本周融资总额</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">
                $4.5亿
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50">
                <DollarSign className="h-4 w-4 text-green-500" />
              </div>
            </div>
          </div>

          <StaggerContainer>
            <div className="mt-4 space-y-3">
              <StaggerItem>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Anthropic
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      与AWS的新合作细节...
                    </p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 text-[10px] border-0">
                    D轮
                  </Badge>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Cohere
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      消息透露2024年底...
                    </p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-[10px] border-0">
                    IPO传闻
                  </Badge>
                </div>
              </StaggerItem>
            </div>
          </StaggerContainer>
        </CardContent>
      </Card>
    </div>
  )
}
