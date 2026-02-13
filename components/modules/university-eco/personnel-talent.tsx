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
  Users,
  UserPlus,
  UserMinus,
  Sparkles,
  ChevronRight,
  FileText,
  Bell,
} from "lucide-react"
import { MotionNumber, StaggerContainer, StaggerItem } from "@/components/motion"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface PersonnelChange {
  id: string
  person: string
  fromPosition: string
  toPosition: string
  institution: string
  type: "任命" | "离职" | "调动"
  impact: "重大" | "较大" | "一般"
  date: string
  background: string
  aiAnalysis: string
  detail: string
}

const mockChanges: PersonnelChange[] = [
  {
    id: "p1",
    person: "张伟教授",
    fromPosition: "清华大学计算机系副主任",
    toPosition: "清华大学人工智能研究院院长",
    institution: "清华大学",
    type: "任命",
    impact: "重大",
    date: "2025-05-10",
    background: "ACM Fellow，长期从事计算机视觉和多模态学习研究，H-index 85",
    aiAnalysis:
      "张伟教授升任AI研究院院长，意味着清华将进一步加强人工智能方向的战略投入。该任命可能带来清华AI研究院在资源获取和人才招募方面的显著提升。建议密切关注其上任后的战略规划和人才招聘动向。",
    detail:
      "张伟教授于2025年5月正式就任清华大学人工智能研究院院长。此前他担任计算机系副主任长达6年，在计算机视觉领域具有深厚积累。此次任命被认为是清华大学加强AI布局的关键一步。",
  },
  {
    id: "p2",
    person: "李明远教授",
    fromPosition: "北京大学智能学院副院长",
    toPosition: "离职赴美（斯坦福大学访问教授）",
    institution: "北京大学",
    type: "离职",
    impact: "重大",
    date: "2025-05-06",
    background: "国家杰青，NLP方向领军人物，带走3名博士后",
    aiAnalysis:
      "李明远教授的离职对北大NLP方向将产生较大冲击，其团队核心成员可能面临流散。这对我院是一个引才窗口期。建议立即评估其团队中可争取的青年人才，特别是NLP方向的博士后研究员。",
    detail:
      "李明远教授因个人发展原因，将赴斯坦福大学担任访问教授（为期2年）。其在北大的NLP实验室目前有在读博士8人，博士后3人。据悉其中3名博士后将随其赴美，实验室日常管理将移交副教授刘芳。",
  },
  {
    id: "p3",
    person: "陈思远研究员",
    fromPosition: "中科院物理所研究员",
    toPosition: "中科院量子信息重点实验室主任",
    institution: "中科院",
    type: "任命",
    impact: "较大",
    date: "2025-04-28",
    background: "量子计算领域顶级专家，Nature/Science发文6篇",
    aiAnalysis:
      "陈思远研究员主导的量子纠错码研究近期取得重大突破。其担任实验室主任后，中科院在量子计算领域的投入预计将大幅增加。建议评估与该实验室建立合作关系的可行性。",
    detail:
      "陈思远研究员近期在量子纠错码领域取得Nature Physics发文突破后，被任命为中科院量子信息重点实验室主任。该实验室现有固定研究人员25人，年度经费约8000万元。",
  },
  {
    id: "p4",
    person: "赵俊峰教授",
    fromPosition: "浙江大学化工学院教授",
    toPosition: "浙江大学能源研究院常务副院长",
    institution: "浙江大学",
    type: "调动",
    impact: "较大",
    date: "2025-04-22",
    background: "新能源材料专家，与宁德时代等企业有深度合作",
    aiAnalysis:
      "赵俊峰教授调任能源研究院常务副院长，预示浙大将进一步整合能源方向的产学研资源。其与产业界的密切关系可能为浙大带来更多横向经费和成果转化机会。建议关注浙大能源研究院的发展动向。",
    detail:
      "赵俊峰教授从化工学院调任能源研究院，负责日常管理工作。此次调动被认为是浙大加强新能源方向布局的重要举措。其团队的锂硫电池专利已进入产业化中试阶段。",
  },
  {
    id: "p5",
    person: "王强教授",
    fromPosition: "上海交通大学电子信息学院副院长",
    toPosition: "离职创业（AI芯片公司）",
    institution: "上海交通大学",
    type: "离职",
    impact: "一般",
    date: "2025-04-15",
    background: "集成电路设计专家，拥有多项AI芯片专利",
    aiAnalysis:
      "王强教授离职创业对上交电子信息学院有一定影响，但其方向偏向产业化，对学术竞争格局影响有限。可关注其创业公司的技术路线，评估未来产学研合作的可能性。",
    detail:
      "王强教授辞去上海交通大学教职，创办AI芯片公司「智芯科技」，已获红杉中国A轮投资。其在上交的研究团队将由副教授周磊接管。该离职事件对上交集成电路方向的学科评估可能产生一定影响。",
  },
]

function TypeBadge({ type }: { type: PersonnelChange["type"] }) {
  const config = {
    任命: { color: "bg-blue-100 text-blue-700 border-blue-200" },
    离职: { color: "bg-red-100 text-red-700 border-red-200" },
    调动: { color: "bg-amber-100 text-amber-700 border-amber-200" },
  }
  const c = config[type]
  return (
    <Badge variant="outline" className={cn("text-[11px] font-medium", c.color)}>
      {type}
    </Badge>
  )
}

function ImpactBadge({ level }: { level: PersonnelChange["impact"] }) {
  const config = {
    重大: { color: "bg-red-100 text-red-700 border-red-200" },
    较大: { color: "bg-amber-100 text-amber-700 border-amber-200" },
    一般: { color: "bg-green-100 text-green-700 border-green-200" },
  }
  const c = config[level]
  return (
    <Badge variant="outline" className={cn("text-[11px] font-medium", c.color)}>
      {level}影响
    </Badge>
  )
}

export default function PersonnelTalent() {
  const [selectedChange, setSelectedChange] = useState<PersonnelChange | null>(null)

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-500">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">人事变动</p>
              <p className="text-xl font-bold font-tabular">
                <MotionNumber value={15} suffix="条" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">新任命</p>
              <p className="text-xl font-bold font-tabular">
                <MotionNumber value={6} suffix="人" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500">
              <UserMinus className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">关键离职</p>
              <p className="text-xl font-bold font-tabular text-red-600">
                <MotionNumber value={3} suffix="人" />
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
                <CardTitle className="text-sm font-semibold">同行机构人事变动追踪</CardTitle>
                <Badge variant="secondary" className="text-[10px]">按影响评估排序</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <StaggerContainer className="space-y-3">
                {mockChanges.map((change) => (
                  <StaggerItem key={change.id}>
                    <button
                      type="button"
                      className="w-full rounded-lg border p-4 hover:border-violet-200 hover:shadow-sm transition-all group cursor-pointer text-left"
                      onClick={() => setSelectedChange(change)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600">
                            {change.person.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold group-hover:text-violet-600 transition-colors">
                              {change.person}
                            </h4>
                            <div className="flex items-center gap-1 mt-0.5">
                              <span className="text-[11px] text-muted-foreground">
                                {change.fromPosition}
                              </span>
                              <span className="text-[11px] text-violet-500 font-medium mx-1">→</span>
                              <span className="text-[11px] text-muted-foreground">
                                {change.toPosition}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <ImpactBadge level={change.impact} />
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-violet-500 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-[52px]">
                        <TypeBadge type={change.type} />
                        <span className="text-[11px] text-muted-foreground">{change.institution}</span>
                        <span className="text-[11px] text-muted-foreground ml-auto">{change.date}</span>
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
                <Sparkles className="h-4 w-4 text-violet-400" />
                <span className="text-sm font-semibold">AI 人事影响分析</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                近期同行机构人事变动频繁，清华AI研究院新院长上任将强化其竞争力。北大NLP领军人物离职带来引才窗口。建议把握当前人才流动期，主动出击争取优质人才资源。
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">清华AI研究院换帅，竞争力将提升</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">北大NLP方向人才流散，引才窗口期</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">中科院量子方向人才集聚加速</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">浙大能源方向产学研整合加强</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">上交芯片方向教授创业，影响有限</span>
                </div>
              </div>
              <div className="space-y-2">
                <Button
                  size="sm"
                  className="w-full bg-violet-500 hover:bg-violet-600 text-white text-xs"
                  onClick={() => toast.success("正在生成人事影响分析报告...")}
                >
                  <FileText className="h-3.5 w-3.5 mr-1.5" />
                  生成人事分析报告
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white text-xs"
                  onClick={() => toast.success("已开启人事变动实时提醒")}
                >
                  <Bell className="h-3.5 w-3.5 mr-1.5" />
                  开启变动提醒
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Sheet open={!!selectedChange} onOpenChange={() => setSelectedChange(null)}>
        <SheetContent className="sm:max-w-lg">
          {selectedChange && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg flex items-center gap-2">
                  {selectedChange.person}
                  <TypeBadge type={selectedChange.type} />
                </SheetTitle>
                <SheetDescription>
                  {selectedChange.institution} · {selectedChange.date}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2">
                  <ImpactBadge level={selectedChange.impact} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1">职位变动</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{selectedChange.fromPosition}</span>
                    <span className="text-violet-500 font-medium">→</span>
                    <span>{selectedChange.toPosition}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1">人物背景</h4>
                  <p className="text-sm text-muted-foreground">{selectedChange.background}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">详细信息</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedChange.detail}
                  </p>
                </div>
                <div className="rounded-lg bg-violet-50 border border-violet-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-violet-500" />
                    <span className="text-sm font-semibold text-violet-700">AI 影响分析</span>
                  </div>
                  <p className="text-sm text-violet-700/80">{selectedChange.aiAnalysis}</p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      toast.success("已加入重点关注人物")
                      setSelectedChange(null)
                    }}
                  >
                    重点关注
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.success("人事分析报告已生成")}
                  >
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
