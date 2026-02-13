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
  GraduationCap,
  Heart,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  Users,
  TrendingUp,
  FileText,
  ShieldAlert,
} from "lucide-react"
import { MotionNumber, StaggerContainer, StaggerItem } from "@/components/motion"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface StudentAlert {
  id: string
  name: string
  grade: string
  major: string
  type: "心理预警" | "学业预警" | "考勤异常" | "经济困难"
  level: "紧急" | "关注" | "提醒"
  summary: string
  detail: string
  aiRecommendation: string
}

const mockAlerts: StudentAlert[] = [
  {
    id: "s1",
    name: "张明远",
    grade: "2023级硕士",
    major: "计算机科学与技术",
    type: "心理预警",
    level: "紧急",
    summary: "连续两周未参加组会，导师反馈情绪异常低落",
    detail:
      "该生近期表现明显异常：连续两周未参加课题组组会，导师李教授反馈其近一个月情绪持续低落，与同学交流减少。宿舍同学反映该生作息紊乱，经常深夜独自外出。上学期成绩优异（GPA 3.8），但本学期已缺交两次课程作业。",
    aiRecommendation:
      "建议立即启动心理危机干预流程：1) 辅导员24小时内进行一对一面谈；2) 协调心理咨询中心安排专业评估；3) 通知导师暂时减轻其科研压力；4) 联系家长了解家庭近况。该生属于高危预警，需要多方协同跟进。",
  },
  {
    id: "s2",
    name: "李思雨",
    grade: "2022级博士",
    major: "人工智能",
    type: "学业预警",
    level: "关注",
    summary: "博士中期考核未通过，论文进展严重滞后",
    detail:
      "该生博士中期考核未通过，论文实验数据不足，研究方向与导师存在分歧。已延期1学期。导师王教授建议调整研究课题方向，但该生对此有较大抵触情绪。当前已发表论文0篇（同期博士生平均1.5篇）。",
    aiRecommendation:
      "建议安排学业帮扶方案：1) 协调研究生院延长中期考核补考时间；2) 安排副导师或高年级博士进行学术辅导；3) 组织导师与学生进行深度沟通，调解研究方向分歧；4) 关注该生情绪变化，防止学业压力引发心理问题。",
  },
  {
    id: "s3",
    name: "王浩然",
    grade: "2024级硕士",
    major: "网络安全",
    type: "考勤异常",
    level: "提醒",
    summary: "本月旷课3次，实验室打卡记录不规律",
    detail:
      "该生本月旷课3次（《高级密码学》2次、《网络安全前沿》1次），实验室打卡记录显示经常下午才到。该生入学成绩排名第3，上学期表现良好。近期班主任了解到该生正在参与一个校外创业项目。",
    aiRecommendation:
      "建议进行常规谈话了解情况：1) 班主任约谈了解校外活动详情；2) 强调学业优先的原则，明确考勤纪律；3) 如校外项目与专业相关，可引导其纳入研究课题；4) 持续关注后续出勤情况，如无改善则进一步处理。",
  },
  {
    id: "s4",
    name: "陈雪",
    grade: "2023级硕士",
    major: "数据科学",
    type: "心理预警",
    level: "关注",
    summary: "心理普测异常，SCL-90多项因子超标",
    detail:
      "该生在本学期心理健康普测中，SCL-90量表中强迫、抑郁、焦虑三项因子分均超过预警线。该生平时性格内向，社交圈子较小。成绩正常（GPA 3.5），科研进展顺利。但宿舍关系一般，曾申请调换宿舍。",
    aiRecommendation:
      "建议开展关怀性介入：1) 辅导员以学业关心为切入点进行自然接触；2) 推荐参加学院心理成长工作坊；3) 协调宿舍调换事宜，改善生活环境；4) 安排一次心理咨询中心的初步评估；5) 在导师知情的前提下给予适当关注。",
  },
  {
    id: "s5",
    name: "赵鹏飞",
    grade: "2022级硕士",
    major: "智能制造",
    type: "经济困难",
    level: "提醒",
    summary: "助学贷款到期，家庭突发变故申请困难补助",
    detail:
      "该生家庭所在地区遭遇自然灾害，父亲因伤住院，家庭经济状况急剧恶化。已提交困难补助申请。该生平时勤奋刻苦，成绩优秀（GPA 3.7），担任课题组技术骨干。目前依靠助学贷款和勤工俭学维持学业。",
    aiRecommendation:
      "建议启动紧急资助通道：1) 加急审批困难补助申请（建议特等助学金）；2) 协调勤工助学岗位，优先安排科研助理；3) 推荐校友基金会专项救助；4) 导师可考虑提高其课题劳务费；5) 持续关注其心理状态，防止经济压力影响学业。",
  },
]

export default function StudentAffairs() {
  const [selectedAlert, setSelectedAlert] = useState<StudentAlert | null>(null)

  const totalStudents = 186
  const mentalWarnings = mockAlerts.filter((a) => a.type === "心理预警").length
  const pendingAlerts = mockAlerts.length
  const employmentRate = 94

  return (
    <>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">在读研究生</p>
              <p className="text-xl font-bold font-tabular">
                <MotionNumber value={totalStudents} suffix="人" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">心理预警</p>
              <p className="text-xl font-bold font-tabular text-red-600">
                <MotionNumber value={mentalWarnings} suffix="人" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">待处理预警</p>
              <p className="text-xl font-bold font-tabular text-amber-600">
                <MotionNumber value={pendingAlerts} suffix="条" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-500">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">就业率</p>
              <p className="text-xl font-bold font-tabular text-green-600">
                <MotionNumber value={employmentRate} suffix="%" />
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
                <CardTitle className="text-sm font-semibold">学生预警列表</CardTitle>
                <Badge variant="secondary" className="text-[10px]">按紧急程度排序</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-hidden">
                <div className="grid grid-cols-[80px_90px_80px_60px_1fr_40px] gap-2 px-3 py-2 text-[11px] font-medium text-muted-foreground border-b">
                  <span>学生</span>
                  <span>年级</span>
                  <span>类型</span>
                  <span>级别</span>
                  <span>摘要</span>
                  <span></span>
                </div>
                <StaggerContainer>
                  {mockAlerts.map((alert) => (
                    <StaggerItem key={alert.id}>
                      <button
                        type="button"
                        className="w-full grid grid-cols-[80px_90px_80px_60px_1fr_40px] gap-2 px-3 py-3 items-center text-left border-b last:border-0 hover:bg-muted/30 transition-colors group cursor-pointer"
                        onClick={() => setSelectedAlert(alert)}
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          {alert.level === "紧急" && (
                            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse-subtle shrink-0" />
                          )}
                          <span className="text-sm font-medium truncate group-hover:text-blue-600 transition-colors">
                            {alert.name}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground truncate">
                          {alert.grade}
                        </span>
                        <Badge
                          variant="outline"
                          className={cn("text-[10px] w-fit", {
                            "border-red-200 bg-red-50 text-red-700": alert.type === "心理预警",
                            "border-amber-200 bg-amber-50 text-amber-700": alert.type === "学业预警",
                            "border-blue-200 bg-blue-50 text-blue-700": alert.type === "考勤异常",
                            "border-purple-200 bg-purple-50 text-purple-700": alert.type === "经济困难",
                          })}
                        >
                          {alert.type}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={cn("text-[10px] w-fit", {
                            "border-red-200 bg-red-50 text-red-700": alert.level === "紧急",
                            "border-amber-200 bg-amber-50 text-amber-700": alert.level === "关注",
                            "border-gray-200 bg-gray-50 text-gray-600": alert.level === "提醒",
                          })}
                        >
                          {alert.level}
                        </Badge>
                        <span className="text-xs text-muted-foreground truncate">
                          {alert.summary}
                        </span>
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
                <Sparkles className="h-4 w-4 text-red-400" />
                <span className="text-sm font-semibold">学生关怀分析</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                当前共有{pendingAlerts}条学生预警待处理，其中{mentalWarnings}例心理预警需优先关注。张明远同学情况较为紧急，建议24小时内启动干预流程。整体学生心理健康状况稳定，但临近学期末压力期需加强巡查。
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">张明远心理预警为紧急级别，需立即干预</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">李思雨博士学业滞后，需协调导师关系</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">赵鹏飞家庭突变，建议加急困难补助</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">整体就业率94%，高于院系平均水平</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs"
                  onClick={() => toast.success("正在生成学生关怀报告...")}
                >
                  <FileText className="h-3.5 w-3.5 mr-1.5" />
                  关怀报告
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 text-xs"
                  onClick={() => toast.success("正在生成预警处置方案...")}
                >
                  <ShieldAlert className="h-3.5 w-3.5 mr-1.5" />
                  处置方案
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Sheet open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
        <SheetContent className="sm:max-w-lg">
          {selectedAlert && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg">{selectedAlert.name}</SheetTitle>
                <SheetDescription className="flex items-center gap-2 flex-wrap">
                  <span>{selectedAlert.grade}</span>
                  <span>·</span>
                  <span>{selectedAlert.major}</span>
                  <span>·</span>
                  <Badge
                    variant="outline"
                    className={cn("text-[10px]", {
                      "border-red-200 bg-red-50 text-red-700": selectedAlert.type === "心理预警",
                      "border-amber-200 bg-amber-50 text-amber-700": selectedAlert.type === "学业预警",
                      "border-blue-200 bg-blue-50 text-blue-700": selectedAlert.type === "考勤异常",
                      "border-purple-200 bg-purple-50 text-purple-700": selectedAlert.type === "经济困难",
                    })}
                  >
                    {selectedAlert.type}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn("text-[10px]", {
                      "border-red-200 bg-red-50 text-red-700": selectedAlert.level === "紧急",
                      "border-amber-200 bg-amber-50 text-amber-700": selectedAlert.level === "关注",
                      "border-gray-200 bg-gray-50 text-gray-600": selectedAlert.level === "提醒",
                    })}
                  >
                    {selectedAlert.level}
                  </Badge>
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">预警详情</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedAlert.detail}
                  </p>
                </div>
                <div className="rounded-lg bg-red-50 border border-red-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-semibold text-red-700">AI 建议</span>
                  </div>
                  <p className="text-sm text-red-700/80 leading-relaxed">
                    {selectedAlert.aiRecommendation}
                  </p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      toast.success("已分配辅导员跟进处理")
                      setSelectedAlert(null)
                    }}
                  >
                    <Users className="h-3.5 w-3.5 mr-1.5" />
                    分配辅导员
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.success("已生成干预方案")}
                  >
                    生成干预方案
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
