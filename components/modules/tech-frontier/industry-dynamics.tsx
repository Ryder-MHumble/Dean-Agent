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
  Newspaper,
  DollarSign,
  Landmark,
  Sparkles,
  ChevronRight,
  FileText,
  ExternalLink,
  TrendingUp,
} from "lucide-react"
import { MotionNumber, StaggerContainer, StaggerItem } from "@/components/motion"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface IndustryNews {
  id: string
  title: string
  source: string
  type: "投融资" | "新产品" | "政策" | "收购"
  date: string
  impact: "重大" | "较大" | "一般"
  summary: string
  aiAnalysis: string
  relevance: string
}

const mockNews: IndustryNews[] = [
  {
    id: "n1",
    title: "OpenAI完成新一轮融资，估值达3000亿美元",
    source: "Reuters",
    type: "投融资",
    date: "2025-01-10",
    impact: "重大",
    summary: "OpenAI完成由软银领投的新一轮融资，估值达3000亿美元，创下AI领域融资纪录。资金将用于扩大算力基础设施和AGI研究。",
    aiAnalysis: "OpenAI估值飙升反映市场对AGI路线的高度认可。建议关注其技术路线变化，我院在大模型对齐和安全方向可寻求合作窗口。该融资可能引发新一轮人才争夺，需警惕核心研究人员被高薪挖角。",
    relevance: "与我院大模型研究方向高度相关，可探索学术合作机会",
  },
  {
    id: "n2",
    title: "Google正式发布Gemini 2.0，多模态能力大幅提升",
    source: "TechCrunch",
    type: "新产品",
    date: "2025-01-08",
    impact: "重大",
    summary: "Google发布新一代多模态模型Gemini 2.0，在视觉理解、代码生成和推理能力上均有显著突破，支持100万token上下文窗口。",
    aiAnalysis: "Gemini 2.0在多模态基准测试中部分超越GPT-4o。建议我院多模态团队密切跟踪其技术报告，评估我院现有模型的差距。长上下文窗口技术值得重点研究。",
    relevance: "与我院多模态大模型研究直接相关",
  },
  {
    id: "n3",
    title: "字节跳动收购AI芯片设计公司芯驰科技",
    source: "36氪",
    type: "收购",
    date: "2025-01-06",
    impact: "较大",
    summary: "字节跳动以约50亿元收购芯驰科技，加速布局AI推理芯片自研。此举标志着大型互联网公司加速向AI全栈自主化方向发展。",
    aiAnalysis: "字节收购芯片公司表明大厂正加速AI全栈化布局。端侧AI芯片领域我院尚未布局，建议通过产学研合作方式参与。可与字节跳动探讨联合实验室可能性。",
    relevance: "与我院AI芯片方向潜在研究契合",
  },
  {
    id: "n4",
    title: "百度发布文心大模型5.0，首次集成多Agent协作",
    source: "界面新闻",
    type: "新产品",
    date: "2025-01-05",
    impact: "较大",
    summary: "百度发布文心大模型5.0版本，首次内置多Agent协作框架，支持自动化工作流编排，在企业应用场景中表现突出。",
    aiAnalysis: "多Agent协作是我院AI Agent方向的重要落地场景。建议与百度AI研究院对接，探讨在Agent协作框架上的学术合作。该方向可作为我院Agent研究工程化的突破口。",
    relevance: "与我院AI Agent研究方向紧密相关",
  },
  {
    id: "n5",
    title: "国务院发布《人工智能产业高质量发展指导意见》",
    source: "新华社",
    type: "政策",
    date: "2025-01-03",
    impact: "重大",
    summary: "国务院正式发布AI产业发展指导意见，明确提出加大基础研究投入、培育AI人才梯队、推动产学研深度融合等重点任务，配套设立500亿元AI发展专项基金。",
    aiAnalysis: "国家级政策利好明显，500亿专项基金为高校AI研究提供重大机遇。建议立即组织政策解读会，梳理可申报方向。重点关注基础研究和人才培育两个板块的资金申请窗口。",
    relevance: "直接影响我院科研经费申请和学科建设",
  },
]

const typeConfig: Record<IndustryNews["type"], { color: string; bg: string }> = {
  "投融资": { color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
  "新产品": { color: "text-green-700", bg: "bg-green-50 border-green-200" },
  "政策": { color: "text-purple-700", bg: "bg-purple-50 border-purple-200" },
  "收购": { color: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
}

const impactConfig: Record<IndustryNews["impact"], { color: string; bg: string }> = {
  "重大": { color: "text-red-700", bg: "bg-red-50 border-red-200" },
  "较大": { color: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
  "一般": { color: "text-gray-700", bg: "bg-gray-50 border-gray-200" },
}

export default function IndustryDynamics() {
  const [selectedNews, setSelectedNews] = useState<IndustryNews | null>(null)

  const newsCount = mockNews.length
  const investCount = mockNews.filter((n) => n.type === "投融资" || n.type === "收购").length
  const policyCount = mockNews.filter((n) => n.type === "政策").length

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-500">
              <Newspaper className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">行业新闻</p>
              <p className="text-xl font-bold font-tabular">
                <MotionNumber value={15} suffix="条" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">投融资事件</p>
              <p className="text-xl font-bold font-tabular text-blue-600">
                <MotionNumber value={8} suffix="起" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-500">
              <Landmark className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">产业政策</p>
              <p className="text-xl font-bold font-tabular text-purple-600">
                <MotionNumber value={3} suffix="条" />
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
                <CardTitle className="text-sm font-semibold">行业动态追踪</CardTitle>
                <Badge variant="secondary" className="text-[10px]">按影响等级排序</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-hidden">
                <div className="grid grid-cols-[1fr_70px_70px_80px_70px_40px] gap-2 px-3 py-2 text-[11px] font-medium text-muted-foreground border-b">
                  <span>标题</span>
                  <span>来源</span>
                  <span>类型</span>
                  <span>日期</span>
                  <span>影响</span>
                  <span></span>
                </div>
                <StaggerContainer>
                  {mockNews.map((news) => (
                    <StaggerItem key={news.id}>
                      <button
                        type="button"
                        className="w-full grid grid-cols-[1fr_70px_70px_80px_70px_40px] gap-2 px-3 py-3 items-center text-left border-b last:border-0 hover:bg-muted/30 transition-colors group cursor-pointer"
                        onClick={() => setSelectedNews(news)}
                      >
                        <div className="flex items-center gap-2">
                          {news.impact === "重大" && (
                            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse-subtle shrink-0" />
                          )}
                          <span className="text-sm font-medium group-hover:text-blue-600 transition-colors truncate">
                            {news.title}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">{news.source}</span>
                        <Badge
                          variant="outline"
                          className={cn("text-[10px] w-fit", typeConfig[news.type].bg, typeConfig[news.type].color)}
                        >
                          {news.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{news.date}</span>
                        <Badge
                          variant="outline"
                          className={cn("text-[10px] w-fit", impactConfig[news.impact].bg, impactConfig[news.impact].color)}
                        >
                          {news.impact}
                        </Badge>
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
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-semibold">AI 行业洞察</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                本周行业聚焦：OpenAI完成3000亿美元融资，AI产业资本热度持续攀升。国务院发布AI产业指导意见，500亿专项基金为高校研究带来重大机遇。
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">国务院政策专项基金申请窗口即将开启</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">大厂AI全栈化布局加速，人才争夺加剧</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">多Agent协作方向产学研合作机会涌现</span>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white text-xs"
                onClick={() => toast.success("正在生成行业动态周报...")}
              >
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                生成行业周报
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Sheet open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
        <SheetContent className="sm:max-w-lg">
          {selectedNews && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg flex items-center gap-2">
                  {selectedNews.title}
                </SheetTitle>
                <SheetDescription>
                  来源: {selectedNews.source} · {selectedNews.date} · 影响评估: {selectedNews.impact}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant="outline"
                      className={cn("text-xs", typeConfig[selectedNews.type].bg, typeConfig[selectedNews.type].color)}
                    >
                      {selectedNews.type}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={cn("text-xs", impactConfig[selectedNews.impact].bg, impactConfig[selectedNews.impact].color)}
                    >
                      影响: {selectedNews.impact}
                    </Badge>
                  </div>
                  <h4 className="text-sm font-semibold mb-2">事件概要</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedNews.summary}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">与我院关联</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedNews.relevance}</p>
                </div>
                <div className="rounded-lg bg-cyan-50 border border-cyan-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm font-semibold text-cyan-700">AI 影响分析</span>
                  </div>
                  <p className="text-sm text-cyan-700/80">{selectedNews.aiAnalysis}</p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1" onClick={() => { toast.success("已加入院长关注清单"); setSelectedNews(null) }}>
                    加入关注清单
                  </Button>
                  <Button variant="outline" onClick={() => toast.success("深度分析报告已生成")}>
                    <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
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
