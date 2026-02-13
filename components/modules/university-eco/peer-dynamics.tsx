"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import {
  Building2,
  Eye,
  Activity,
  Sparkles,
  ChevronRight,
  FileText,
} from "lucide-react"
import { MotionNumber, StaggerContainer, StaggerItem } from "@/components/motion"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface PeerInstitution {
  id: string
  name: string
  activityLevel: number
  latestAction: string
  actionType: string
  threatLevel: "critical" | "warning" | "normal"
  recentCount: number
  aiInsight: string
  detail: string
}

const mockPeers: PeerInstitution[] = [
  {
    id: "c1",
    name: "清华AIR",
    activityLevel: 92,
    latestAction: "发布具身智能实验室2篇ICRA论文",
    actionType: "科研成果",
    threatLevel: "critical",
    recentCount: 5,
    aiInsight: "清华AIR在具身智能方向形成明显领先，该团队已扩至15人。建议密切关注其研究路线，评估合作可能性。",
    detail: "清华AIR近期在具身智能、多模态大模型方向密集产出。已发表ICRA 2024论文2篇，获批国家级项目1项，团队规模扩至15人。",
  },
  {
    id: "c2",
    name: "智源研究院",
    activityLevel: 78,
    latestAction: "获批算力基础设施建设资金",
    actionType: "资金动态",
    threatLevel: "warning",
    recentCount: 3,
    aiInsight: "智源在算力方面获得大量资金支持。我院需关注其算力开放策略是否影响我院合作方获取资源。",
    detail: "智源研究院近期获批过亿资金用于算力基础设施建设，预计新增10000 GPU小时算力。",
  },
  {
    id: "c3",
    name: "北大AI Lab",
    activityLevel: 55,
    latestAction: "NLP团队发布ChatBench评测基准",
    actionType: "学术发布",
    threatLevel: "normal",
    recentCount: 2,
    aiInsight: "北大AI Lab在传统NLP领域保持稳定产出，整体威胁可控。其新发布的评测基准可作为我院论文引用参考。",
    detail: "北大AI Lab近期发布ChatBench大模型评测基准，在NLP领域保持稳定产出，团队规模基本不变。",
  },
]

function ThreatBadge({ level }: { level: PeerInstitution["threatLevel"] }) {
  const config = {
    critical: { color: "bg-red-100 text-red-700 border-red-200", label: "重点关注" },
    warning: { color: "bg-amber-100 text-amber-700 border-amber-200", label: "需关注" },
    normal: { color: "bg-green-100 text-green-700 border-green-200", label: "可控" },
  }
  const c = config[level]
  return (
    <Badge variant="outline" className={cn("text-[11px] font-medium", c.color)}>
      {c.label}
    </Badge>
  )
}

function ActivityBar({ level }: { level: number }) {
  const segments = 5
  const filled = Math.round((level / 100) * segments)
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-3 w-1.5 rounded-sm transition-colors",
            i < filled ? (level >= 80 ? "bg-red-400" : level >= 60 ? "bg-amber-400" : "bg-green-400") : "bg-muted"
          )}
        />
      ))}
    </div>
  )
}

export default function PeerDynamics() {
  const [selectedPeer, setSelectedPeer] = useState<PeerInstitution | null>(null)
  const criticalCount = mockPeers.filter((c) => c.threatLevel === "critical").length
  const totalActions = mockPeers.reduce((sum, c) => sum + c.recentCount, 0)

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">追踪机构</p>
              <p className="text-xl font-bold font-tabular">
                <MotionNumber value={mockPeers.length} />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">近期动态</p>
              <p className="text-xl font-bold font-tabular">
                <MotionNumber value={totalActions} suffix="条" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500">
              <Eye className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">重点关注</p>
              <p className="text-xl font-bold font-tabular text-red-600">
                <MotionNumber value={criticalCount} suffix="家" />
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">同行机构态势总览</CardTitle>
                <Badge variant="secondary" className="text-[10px]">按关注度排序</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <StaggerContainer className="space-y-3">
                {mockPeers.map((peer) => (
                  <StaggerItem key={peer.id}>
                    <button
                      type="button"
                      className="w-full rounded-lg border p-4 hover:border-blue-200 hover:shadow-sm transition-all group cursor-pointer text-left"
                      onClick={() => setSelectedPeer(peer)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600">
                            {peer.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold group-hover:text-blue-600 transition-colors">
                              {peer.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <ActivityBar level={peer.activityLevel} />
                              <span className="text-[11px] text-muted-foreground">
                                活跃度 {peer.activityLevel}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <ThreatBadge level={peer.threatLevel} />
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-[52px]">
                        <Badge variant="outline" className="text-[10px]">{peer.actionType}</Badge>
                        <span className="text-xs text-muted-foreground">{peer.latestAction}</span>
                        <Badge variant="secondary" className="text-[10px] ml-auto">{peer.recentCount}条动态</Badge>
                      </div>
                    </button>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-4">
          <Card className="shadow-card bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <span className="text-sm font-semibold">AI 同行态势分析</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                清华AIR在具身智能方向形成领先优势，需重点关注。智源在算力基础设施方面投入巨大。北大AI Lab在传统NLP领域保持稳定。建议重点关注具身智能方向的人才储备和资金争取。
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">清华AIR具身智能团队扩至15人</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">智源获批资金过亿</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">北大AI Lab整体威胁可控</span>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-xs"
                onClick={() => toast.success("正在生成同行态势报告...")}
              >
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                生成态势报告
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Sheet open={!!selectedPeer} onOpenChange={() => setSelectedPeer(null)}>
        <SheetContent className="sm:max-w-lg">
          {selectedPeer && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg flex items-center gap-2">
                  {selectedPeer.name}
                  <ThreatBadge level={selectedPeer.threatLevel} />
                </SheetTitle>
                <SheetDescription>
                  活跃度: {selectedPeer.activityLevel}/100 · 近期动态: {selectedPeer.recentCount}条
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">详细分析</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedPeer.detail}</p>
                </div>
                <div className="rounded-lg bg-indigo-50 border border-indigo-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-indigo-500" />
                    <span className="text-sm font-semibold text-indigo-700">AI 建议</span>
                  </div>
                  <p className="text-sm text-indigo-700/80">{selectedPeer.aiInsight}</p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1" onClick={() => { toast.success("已设置持续监控"); setSelectedPeer(null) }}>
                    设置监控
                  </Button>
                  <Button variant="outline" onClick={() => toast.success("同行分析报告已生成")}>
                    生成报告
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
