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
  Database,
  Crown,
  Handshake,
  Sparkles,
  ChevronRight,
  FileText,
  BarChart3,
  BookOpen,
  Star,
} from "lucide-react"
import { MotionNumber, StaggerContainer, StaggerItem } from "@/components/motion"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface TalentEntry {
  id: string
  name: string
  institution: string
  discipline: string
  hIndex: number
  influenceScore: number
  cooperationStatus: "active" | "potential" | "none"
  cooperationLabel: string
  topAwards: string[]
  recentPapers: number
  aiAnalysis: string
  profile: string
}

const mockTalents: TalentEntry[] = [
  {
    id: "ti1",
    name: "Andrew Ng",
    institution: "Stanford University",
    discipline: "机器学习",
    hIndex: 168,
    influenceScore: 98,
    cooperationStatus: "potential",
    cooperationLabel: "意向中",
    topAwards: ["AAAI Fellow", "ACM Fellow"],
    recentPapers: 12,
    aiAnalysis:
      "吴恩达教授在AI教育和产业化方面具有全球影响力。建议通过其在线教育平台合作切入，探讨联合开设AI课程或共建AI教育实验室的可能性。",
    profile:
      "斯坦福大学计算机系客座教授，Coursera联合创始人，Landing AI创始人。曾任百度首席科学家、Google Brain创始人。在深度学习和AI教育方面具有开创性贡献。",
  },
  {
    id: "ti2",
    name: "Yann LeCun",
    institution: "Meta AI / NYU",
    discipline: "深度学习",
    hIndex: 182,
    influenceScore: 97,
    cooperationStatus: "none",
    cooperationLabel: "未接触",
    topAwards: ["图灵奖", "IEEE Fellow", "ACM Fellow"],
    recentPapers: 8,
    aiAnalysis:
      "LeCun教授是深度学习三巨头之一，学术影响力极高。建议通过其在NYU的实验室寻找博士后合作机会，或邀请其参加我院学术论坛作为主讲嘉宾。",
    profile:
      "Meta首席AI科学家，纽约大学Silver教授。2018年图灵奖获得者（与Hinton、Bengio共享）。卷积神经网络先驱，对计算机视觉和自监督学习有奠基性贡献。",
  },
  {
    id: "ti3",
    name: "李飞飞",
    institution: "Stanford HAI",
    discipline: "计算机视觉",
    hIndex: 145,
    influenceScore: 95,
    cooperationStatus: "active",
    cooperationLabel: "合作中",
    topAwards: ["ACM Fellow", "NAE Member"],
    recentPapers: 15,
    aiAnalysis:
      "李飞飞教授已与我院建立合作关系，联合培养2名博士生。建议深化合作：共同申请中美联合研究基金，并邀请其担任我院国际学术委员会成员。",
    profile:
      "斯坦福大学计算机系教授，Stanford HAI联合主任。ImageNet创始人，视觉智能领域先驱。美国国家工程院院士。曾任Google Cloud AI/ML首席科学家。",
  },
  {
    id: "ti4",
    name: "Demis Hassabis",
    institution: "Google DeepMind",
    discipline: "人工通用智能",
    hIndex: 98,
    influenceScore: 96,
    cooperationStatus: "potential",
    cooperationLabel: "意向中",
    topAwards: ["诺贝尔化学奖", "FRS"],
    recentPapers: 6,
    aiAnalysis:
      "Hassabis博士领导的DeepMind在AI for Science方面成果卓著。建议通过AlphaFold相关的蛋白质研究方向寻求合作切入点，与我院生物计算课题组对接。",
    profile:
      "Google DeepMind联合创始人兼CEO。2024年诺贝尔化学奖获得者（AlphaFold）。在强化学习、神经科学与AI交叉领域做出突破性贡献。",
  },
  {
    id: "ti5",
    name: "朱松纯",
    institution: "北京大学",
    discipline: "认知AI",
    hIndex: 112,
    influenceScore: 92,
    cooperationStatus: "active",
    cooperationLabel: "合作中",
    topAwards: ["Helmholtz Prize", "ACM Fellow"],
    recentPapers: 18,
    aiAnalysis:
      "朱松纯教授在通用人工智能理论方面国内领先。当前合作项目进展顺利，建议扩展合作范围至具身智能和认知推理方向，共同申请科技部重点研发计划。",
    profile:
      "北京大学人工智能研究院院长，讲席教授。曾任UCLA统计系与计算机系教授20余年。在视觉认知、场景理解和通用AI理论方面有深厚积累。Marr Prize获得者。",
  },
]

export default function TalentIndex() {
  const [selectedTalent, setSelectedTalent] = useState<TalentEntry | null>(null)
  const topTalentCount = mockTalents.filter((t) => t.influenceScore >= 95).length
  const activeCoopCount = mockTalents.filter((t) => t.cooperationStatus === "active").length

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-500">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">人才库</p>
              <p className="text-xl font-bold font-tabular">
                <MotionNumber value={320} suffix="人" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
              <Crown className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">顶尖人才</p>
              <p className="text-xl font-bold font-tabular text-amber-600">
                <MotionNumber value={42} suffix="人" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
              <Handshake className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">合作意向</p>
              <p className="text-xl font-bold font-tabular text-indigo-600">
                <MotionNumber value={15} suffix="人" />
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
                <CardTitle className="text-sm font-semibold">人才指数排行榜</CardTitle>
                <Badge variant="secondary" className="text-[10px]">按影响力评分排序</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-hidden">
                <div className="grid grid-cols-[100px_1fr_90px_70px_90px_80px_40px] gap-2 px-3 py-2 text-[11px] font-medium text-muted-foreground border-b">
                  <span>姓名</span>
                  <span>机构</span>
                  <span>学科</span>
                  <span>H指数</span>
                  <span>影响力</span>
                  <span>合作状态</span>
                  <span></span>
                </div>
                <StaggerContainer>
                  {mockTalents.map((talent, index) => (
                    <StaggerItem key={talent.id}>
                      <button
                        type="button"
                        className="w-full grid grid-cols-[100px_1fr_90px_70px_90px_80px_40px] gap-2 px-3 py-3 items-center text-left border-b last:border-0 hover:bg-muted/30 transition-colors group cursor-pointer"
                        onClick={() => setSelectedTalent(talent)}
                      >
                        <div className="flex items-center gap-2">
                          {index < 3 && (
                            <Star className="h-3 w-3 text-amber-500 shrink-0 fill-amber-500" />
                          )}
                          <span className="text-sm font-medium group-hover:text-green-600 transition-colors">
                            {talent.name}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground truncate">{talent.institution}</span>
                        <span className="text-xs text-muted-foreground">{talent.discipline}</span>
                        <span className="text-xs font-semibold font-tabular">{talent.hIndex}</span>
                        <div className="flex items-center gap-1.5">
                          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
                              style={{ width: `${talent.influenceScore}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-tabular text-muted-foreground w-6 text-right">
                            {talent.influenceScore}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className={cn("text-[10px] w-fit", {
                            "border-green-200 bg-green-50 text-green-700": talent.cooperationStatus === "active",
                            "border-blue-200 bg-blue-50 text-blue-700": talent.cooperationStatus === "potential",
                            "border-gray-200 bg-gray-50 text-gray-600": talent.cooperationStatus === "none",
                          })}
                        >
                          {talent.cooperationLabel}
                        </Badge>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-green-500 group-hover:translate-x-0.5 transition-all" />
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
                <Sparkles className="h-4 w-4 text-green-400" />
                <span className="text-sm font-semibold">AI 人才引进策略</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                人才库共320位全球AI领域学者，其中42位为顶尖人才（H指数≥80）。当前已建立15个合作意向，2个活跃合作项目。建议重点推进以下策略：
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">深化与李飞飞教授合作，扩展联合培养规模</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">与朱松纯团队共同申请科技部重点研发计划</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">通过AI for Science方向对接DeepMind团队</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">筹备国际AI学术论坛，邀请LeCun等大师出席</span>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full bg-green-500 hover:bg-green-600 text-white text-xs"
                onClick={() => toast.success("正在生成人才引进策略方案...")}
              >
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                生成引才策略方案
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Sheet open={!!selectedTalent} onOpenChange={() => setSelectedTalent(null)}>
        <SheetContent className="sm:max-w-lg">
          {selectedTalent && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg flex items-center gap-2">
                  {selectedTalent.name}
                  <Badge
                    variant="outline"
                    className={cn("text-[10px]", {
                      "border-green-200 bg-green-50 text-green-700": selectedTalent.cooperationStatus === "active",
                      "border-blue-200 bg-blue-50 text-blue-700": selectedTalent.cooperationStatus === "potential",
                      "border-gray-200 bg-gray-50 text-gray-600": selectedTalent.cooperationStatus === "none",
                    })}
                  >
                    {selectedTalent.cooperationLabel}
                  </Badge>
                </SheetTitle>
                <SheetDescription>
                  {selectedTalent.institution} &middot; {selectedTalent.discipline} &middot; H指数 {selectedTalent.hIndex}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    学者档案
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedTalent.profile}</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-[11px] text-muted-foreground">H指数</p>
                    <p className="text-lg font-bold font-tabular">{selectedTalent.hIndex}</p>
                  </div>
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-[11px] text-muted-foreground">影响力</p>
                    <p className="text-lg font-bold font-tabular">{selectedTalent.influenceScore}</p>
                  </div>
                  <div className="rounded-lg border p-3 text-center">
                    <p className="text-[11px] text-muted-foreground">近期论文</p>
                    <p className="text-lg font-bold font-tabular">{selectedTalent.recentPapers}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">重要荣誉</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTalent.topAwards.map((award) => (
                      <Badge key={award} variant="secondary" className="text-[10px]">
                        {award}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg bg-green-50 border border-green-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-semibold text-green-700">AI 合作潜力分析</span>
                  </div>
                  <p className="text-sm text-green-700/80 leading-relaxed">{selectedTalent.aiAnalysis}</p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      toast.success("已发起合作意向对接")
                      setSelectedTalent(null)
                    }}
                  >
                    <Handshake className="h-3.5 w-3.5 mr-1.5" />
                    发起合作
                  </Button>
                  <Button variant="outline" onClick={() => toast.success("学者影响力报告已生成")}>
                    <BarChart3 className="h-3.5 w-3.5 mr-1.5" />
                    影响力报告
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
