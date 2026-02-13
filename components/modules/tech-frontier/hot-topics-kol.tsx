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
  Flame,
  Users,
  BookOpen,
  Sparkles,
  ChevronRight,
  FileText,
  TrendingUp,
  MessageSquare,
  GraduationCap,
} from "lucide-react"
import { MotionNumber, StaggerContainer, StaggerItem } from "@/components/motion"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface HotTopic {
  id: string
  title: string
  heat: number
  maxHeat: number
  discussions: number
  trend: "up" | "stable" | "new"
  tags: string[]
  summary: string
  aiAnalysis: string
}

interface KOL {
  id: string
  name: string
  affiliation: string
  hIndex: number
  field: string
  recentActivity: string
  influence: "极高" | "高" | "中"
  summary: string
  aiAnalysis: string
}

const mockTopics: HotTopic[] = [
  {
    id: "tp1",
    title: "Scaling Law是否已触及天花板",
    heat: 92,
    maxHeat: 100,
    discussions: 3420,
    trend: "up",
    tags: ["大模型", "理论"],
    summary: "近期多篇论文对Scaling Law的持续有效性提出质疑，认为在特定任务上模型规模增长带来的性能提升正在放缓。OpenAI内部也传出调整策略的消息，社区讨论激烈。",
    aiAnalysis: "该话题直接影响我院大模型研究路线选择。如果Scaling Law收益递减，Small Model和高效推理方向将成为新重点。建议组织学术研讨会深入讨论，评估是否需要调整研究资源配置。",
  },
  {
    id: "tp2",
    title: "World Model与视频生成新范式",
    heat: 87,
    maxHeat: 100,
    discussions: 2180,
    trend: "new",
    tags: ["世界模型", "视频生成"],
    summary: "Sora引发的世界模型讨论持续升温。学术界对物理世界模拟能力的研究快速推进，多个团队发布了结合物理引擎的视频生成模型，引发对AGI路线的新思考。",
    aiAnalysis: "世界模型是AGI研究的潜在关键方向。我院在视觉理解方面有一定积累，可考虑拓展至世界模型领域。建议与计算机视觉团队联合立项，抢占学术制高点。",
  },
  {
    id: "tp3",
    title: "AI安全与对齐研究的紧迫性",
    heat: 78,
    maxHeat: 100,
    discussions: 1560,
    trend: "up",
    tags: ["AI安全", "对齐"],
    summary: "随着模型能力增强，AI安全问题引发广泛关注。Anthropic发布新的安全评估框架，多国政府加速AI监管立法。学术界关于对齐技术的研究论文数量激增。",
    aiAnalysis: "AI安全是国家战略重点方向，经费充裕且竞争相对较小。建议尽快组建AI安全研究小组，可从RLHF改进和模型可解释性两个方向切入。",
  },
  {
    id: "tp4",
    title: "端侧大模型部署与量化技术",
    heat: 71,
    maxHeat: 100,
    discussions: 1230,
    trend: "stable",
    tags: ["模型压缩", "端侧部署"],
    summary: "Apple、Qualcomm等芯片厂商推动端侧AI，模型量化和蒸馏技术成为焦点。1B参数级别模型在手机端达到可用水平，催生新的应用场景和研究课题。",
    aiAnalysis: "端侧部署是模型落地的关键环节。建议与硬件团队合作，在模型压缩和推理优化方向加大投入。可争取手机厂商横向课题。",
  },
  {
    id: "tp5",
    title: "多智能体协作系统设计",
    heat: 85,
    maxHeat: 100,
    discussions: 1890,
    trend: "up",
    tags: ["Agent", "协作"],
    summary: "多Agent系统在复杂任务中展现出超越单Agent的能力。AutoGen、CrewAI等框架获得广泛关注，企业级应用案例开始涌现。学术界关于Agent间通信和协调机制的研究快速增长。",
    aiAnalysis: "该方向与我院AI Agent研究高度契合。建议将多Agent协作作为重点研究方向之一，可结合我院强化学习团队的优势，在协作策略优化方向形成突破。",
  },
]

const mockKOLs: KOL[] = [
  {
    id: "k1",
    name: "Yann LeCun",
    affiliation: "Meta / NYU",
    hIndex: 168,
    field: "深度学习",
    recentActivity: "公开质疑LLM路线，力推World Model",
    influence: "极高",
    summary: "图灵奖得主，Meta首席AI科学家。近期频繁发声反对纯LLM路线，主张结合世界模型和因果推理，对学术界研究方向有重要引导作用。",
    aiAnalysis: "LeCun的观点值得高度关注。他提出的JEPA架构可能成为下一代AI架构候选方案。建议安排研究团队深入研读其最新论文，评估JEPA方向的布局可能性。",
  },
  {
    id: "k2",
    name: "朱松纯",
    affiliation: "北京大学 / 北京通用人工智能研究院",
    hIndex: 112,
    field: "通用人工智能",
    recentActivity: "发布「通智2.0」通用智能体平台",
    influence: "极高",
    summary: "北京大学讲席教授，通用人工智能研究院院长。其团队在具身智能和认知架构方向处于国内领先地位，「通智」平台已成为学术界标杆。",
    aiAnalysis: "朱松纯团队是具身智能领域国内最重要的合作伙伴候选。建议院长亲自对接，探讨联合培养博士生和共建实验室的可能性。",
  },
  {
    id: "k3",
    name: "唐杰",
    affiliation: "清华大学",
    hIndex: 98,
    field: "知识图谱与大模型",
    recentActivity: "ChatGLM系列模型持续更新，发布GLM-4-Plus",
    influence: "高",
    summary: "清华大学计算机系教授，智谱AI联合创始人。在知识图谱和大模型领域有深厚积累，ChatGLM系列是国内最具影响力的开源大模型之一。",
    aiAnalysis: "唐杰教授团队在产学研结合方面是标杆。建议学习其智谱AI模式，评估我院是否可在特定垂直领域打造类似的产学研平台。",
  },
  {
    id: "k4",
    name: "Ilya Sutskever",
    affiliation: "Safe Superintelligence Inc.",
    hIndex: 132,
    field: "AI安全与超级对齐",
    recentActivity: "创办SSI公司，融资超10亿美元",
    influence: "极高",
    summary: "前OpenAI首席科学家，AlexNet论文共同作者。离开OpenAI后创办专注超级AI安全的公司SSI，引发学术界对AI安全方向的新一轮关注。",
    aiAnalysis: "Sutskever的转向表明AI安全将成为顶级研究者的首选方向。建议我院在AI安全领域提前布局，可尝试联系SSI探讨学术合作。",
  },
  {
    id: "k5",
    name: "鄂维南",
    affiliation: "北京大学 / 普林斯顿大学",
    hIndex: 95,
    field: "AI for Science",
    recentActivity: "发表AI驱动分子动力学新方法，Nature正刊",
    influence: "高",
    summary: "中科院院士，在AI与科学计算交叉领域有深远影响。其Deep Potential方法已成为AI for Science领域的标志性工作。",
    aiAnalysis: "鄂维南院士团队在AI for Science方向是国内翘楚。我院已有相关布局，建议加强与其团队在分子模拟和科学计算方向的合作深度。",
  },
]

type DetailItem = { kind: "topic"; data: HotTopic } | { kind: "kol"; data: KOL }

export default function HotTopicsKol() {
  const [selected, setSelected] = useState<DetailItem | null>(null)

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">热门话题</p>
              <p className="text-xl font-bold font-tabular">
                <MotionNumber value={12} suffix="个" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">活跃KOL</p>
              <p className="text-xl font-bold font-tabular text-blue-600">
                <MotionNumber value={28} suffix="位" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-500">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">高引用论文</p>
              <p className="text-xl font-bold font-tabular text-green-600">
                <MotionNumber value={5} suffix="篇" />
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8 space-y-4">
          {/* Hot Topics Section */}
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-500" />
                  热门话题
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">按热度排序</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <StaggerContainer className="grid grid-cols-2 gap-3">
                {mockTopics.map((topic) => (
                  <StaggerItem key={topic.id}>
                    <button
                      type="button"
                      className="w-full text-left rounded-lg border p-3 hover:bg-muted/30 transition-colors group cursor-pointer"
                      onClick={() => setSelected({ kind: "topic", data: topic })}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium group-hover:text-blue-600 transition-colors line-clamp-1">
                          {topic.title}
                        </span>
                        {topic.trend === "new" && (
                          <Badge className="bg-red-500 text-white text-[9px] shrink-0 ml-1">NEW</Badge>
                        )}
                        {topic.trend === "up" && (
                          <TrendingUp className="h-3.5 w-3.5 text-red-500 shrink-0 ml-1" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        {topic.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-[9px] px-1.5 py-0">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-muted-foreground">热度</span>
                          <span className="font-medium">{topic.heat}/100</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              topic.heat >= 85 ? "bg-red-500" : topic.heat >= 70 ? "bg-orange-400" : "bg-amber-300"
                            )}
                            style={{ width: `${(topic.heat / topic.maxHeat) * 100}%` }}
                          />
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground pt-0.5">
                          <MessageSquare className="h-3 w-3" />
                          <span>{topic.discussions.toLocaleString()} 讨论</span>
                        </div>
                      </div>
                    </button>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </CardContent>
          </Card>

          {/* KOL Section */}
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-blue-500" />
                  学术KOL动态
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">按影响力排序</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-hidden">
                <div className="grid grid-cols-[1fr_120px_70px_70px_1fr_40px] gap-2 px-3 py-2 text-[11px] font-medium text-muted-foreground border-b">
                  <span>姓名</span>
                  <span>机构</span>
                  <span>h-index</span>
                  <span>影响力</span>
                  <span>近期动态</span>
                  <span></span>
                </div>
                <StaggerContainer>
                  {mockKOLs.map((kol) => (
                    <StaggerItem key={kol.id}>
                      <button
                        type="button"
                        className="w-full grid grid-cols-[1fr_120px_70px_70px_1fr_40px] gap-2 px-3 py-3 items-center text-left border-b last:border-0 hover:bg-muted/30 transition-colors group cursor-pointer"
                        onClick={() => setSelected({ kind: "kol", data: kol })}
                      >
                        <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                          {kol.name}
                        </span>
                        <span className="text-xs text-muted-foreground truncate">{kol.affiliation}</span>
                        <span className="text-xs font-mono font-medium">{kol.hIndex}</span>
                        <Badge
                          variant="outline"
                          className={cn("text-[10px] w-fit", {
                            "border-red-200 bg-red-50 text-red-700": kol.influence === "极高",
                            "border-amber-200 bg-amber-50 text-amber-700": kol.influence === "高",
                            "border-gray-200 bg-gray-50 text-gray-700": kol.influence === "中",
                          })}
                        >
                          {kol.influence}
                        </Badge>
                        <span className="text-xs text-muted-foreground truncate">{kol.recentActivity}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-4">
          <Card className="shadow-card bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-orange-400" />
                <span className="text-sm font-semibold">AI 热点趋势</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                本周学术热点集中在Scaling Law反思和世界模型两大方向。多位顶级KOL对大模型发展路线发表重要观点，可能影响未来1-2年的研究资源配置。
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">Scaling Law争论或改变大模型研究路线</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">LeCun力推World Model，建议跟踪研究</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">AI安全方向人才和经费机遇窗口打开</span>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs"
                onClick={() => toast.success("正在生成热点趋势分析报告...")}
              >
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                生成趋势报告
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent className="sm:max-w-lg">
          {selected?.kind === "topic" && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg flex items-center gap-2">
                  {selected.data.title}
                </SheetTitle>
                <SheetDescription>
                  热度: {selected.data.heat}/100 · 讨论数: {selected.data.discussions.toLocaleString()}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2">
                  {selected.data.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">话题概要</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.data.summary}</p>
                </div>
                <div className="rounded-lg bg-orange-50 border border-orange-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-semibold text-orange-700">AI 趋势分析</span>
                  </div>
                  <p className="text-sm text-orange-700/80">{selected.data.aiAnalysis}</p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1" onClick={() => { toast.success("已加入重点关注话题"); setSelected(null) }}>
                    重点关注
                  </Button>
                  <Button variant="outline" onClick={() => toast.success("相关论文汇总已生成")}>
                    汇总论文
                  </Button>
                </div>
              </div>
            </>
          )}
          {selected?.kind === "kol" && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg flex items-center gap-2">
                  {selected.data.name}
                  <Badge
                    variant="outline"
                    className={cn("text-[10px]", {
                      "border-red-200 bg-red-50 text-red-700": selected.data.influence === "极高",
                      "border-amber-200 bg-amber-50 text-amber-700": selected.data.influence === "高",
                      "border-gray-200 bg-gray-50 text-gray-700": selected.data.influence === "中",
                    })}
                  >
                    影响力: {selected.data.influence}
                  </Badge>
                </SheetTitle>
                <SheetDescription>
                  {selected.data.affiliation} · h-index: {selected.data.hIndex} · 领域: {selected.data.field}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">近期动态</h4>
                  <p className="text-sm text-muted-foreground">{selected.data.recentActivity}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">人物简介</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.data.summary}</p>
                </div>
                <div className="rounded-lg bg-orange-50 border border-orange-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-semibold text-orange-700">AI 合作建议</span>
                  </div>
                  <p className="text-sm text-orange-700/80">{selected.data.aiAnalysis}</p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1" onClick={() => { toast.success("已安排秘书准备对接材料"); setSelected(null) }}>
                    安排对接
                  </Button>
                  <Button variant="outline" onClick={() => toast.success("KOL关系图谱已生成")}>
                    查看关系图谱
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
