"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MotionCard, ExpandableSection } from "@/components/motion"
import { Shield, Cpu, Eye, ChevronDown, ChevronUp } from "lucide-react"
import SignalFeed from "@/components/radar/signal-feed"
import TalentRadar from "@/components/radar/talent-radar"
import ReportGenerator from "@/components/radar/report-generator"

// Placeholder components for the three main tabs
function PolicyOpportunityPool() {
  return (
    <div className="rounded-xl bg-muted/30 p-8 text-center">
      <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
      <h3 className="text-lg font-semibold text-foreground mb-2">政策红利池</h3>
      <p className="text-sm text-muted-foreground">
        政策机会分析和红利追踪功能即将推出
      </p>
    </div>
  )
}

function TechnologyTrends() {
  return (
    <div className="rounded-xl bg-muted/30 p-8 text-center">
      <Cpu className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
      <h3 className="text-lg font-semibold text-foreground mb-2">技术风向标</h3>
      <p className="text-sm text-muted-foreground">
        前沿技术趋势分析和预测功能即将推出
      </p>
    </div>
  )
}

function CompetitorMonitoring() {
  return (
    <div className="rounded-xl bg-muted/30 p-8 text-center">
      <Eye className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
      <h3 className="text-lg font-semibold text-foreground mb-2">竞对监测</h3>
      <p className="text-sm text-muted-foreground">
        竞争对手动态追踪和分析功能即将推出
      </p>
    </div>
  )
}

export default function IntelligencePage() {
  const [showSecondary, setShowSecondary] = useState(false)

  return (
    <div className="p-6 space-y-5">
      {/* Summary stats bar */}
      <MotionCard delay={0}>
        <div className="flex items-center gap-6 p-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">新政策</span>
            <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100 border-0">
              3
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">技术突破</span>
            <Badge variant="default" className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0">
              2
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">竞对动态</span>
            <Badge variant="default" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-0">
              5
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">风险预警</span>
            <Badge variant="default" className="bg-red-100 text-red-700 hover:bg-red-100 border-0">
              1
            </Badge>
          </div>
        </div>
      </MotionCard>

      {/* Primary tabs */}
      <MotionCard delay={0.1}>
        <Tabs defaultValue="policy" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="policy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              政策红利池
            </TabsTrigger>
            <TabsTrigger value="tech" className="flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              技术风向标
            </TabsTrigger>
            <TabsTrigger value="competitor" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              竞对监测
            </TabsTrigger>
          </TabsList>

          <TabsContent value="policy">
            <PolicyOpportunityPool />
          </TabsContent>
          <TabsContent value="tech">
            <TechnologyTrends />
          </TabsContent>
          <TabsContent value="competitor">
            <CompetitorMonitoring />
          </TabsContent>
        </Tabs>
      </MotionCard>

      {/* Secondary section toggle */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowSecondary(!showSecondary)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-lg hover:bg-muted/50"
        >
          {showSecondary ? "收起更多" : "展开更多：信号流 · 人才雷达 · 报告生成"}
          {showSecondary ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {/* Secondary expandable section */}
      <ExpandableSection isOpen={showSecondary}>
        <div className="grid grid-cols-12 gap-5 pt-2">
          <div className="col-span-4">
            <SignalFeed />
          </div>
          <div className="col-span-5">
            <TalentRadar />
          </div>
          <div className="col-span-3">
            <ReportGenerator />
          </div>
        </div>
      </ExpandableSection>
    </div>
  )
}
