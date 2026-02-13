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
  Clock,
  TrendingUp,
  UserX,
  Sparkles,
  ChevronRight,
  MessageSquare,
  Phone,
  Gift,
  CalendarCheck,
  Star,
} from "lucide-react"
import { MotionNumber, StaggerContainer, StaggerItem } from "@/components/motion"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface Contact {
  id: string
  name: string
  org: string
  title: string
  strength: number
  lastContact: string
  lastContactDays: number
  status: "active" | "cooling" | "dormant"
  statusLabel: string
  suggestion: string
  tags: string[]
  history: { date: string; event: string }[]
  talkingPoints: string[]
  detail: string
}

const mockContacts: Contact[] = [
  {
    id: "c1",
    name: "张明远",
    org: "教育部高教司",
    title: "副司长",
    strength: 92,
    lastContact: "2026-02-08",
    lastContactDays: 5,
    status: "active",
    statusLabel: "活跃",
    suggestion: "下周教育部将召开新工科座谈会，可借机当面沟通学科评估事宜",
    tags: ["政府", "学科评估", "核心"],
    history: [
      { date: "2026-02-08", event: "电话沟通新工科评估标准细节" },
      { date: "2026-01-15", event: "共同出席全国高教论坛，晚宴交流" },
      { date: "2025-12-20", event: "递送学院年度报告及新年贺礼" },
      { date: "2025-11-10", event: "邀请来院指导本科教学审核评估" },
    ],
    talkingPoints: [
      "感谢上次座谈会的指导意见，学院已据此调整培养方案",
      "AI+教育跨学科项目进展可作为典型案例汇报",
      "可提及正在申报的教育部重点实验室，请教申报策略",
    ],
    detail: "教育部高教司分管工程教育与新工科建设，与我院学科发展密切相关。张司长对AI赋能教育改革持开放态度，是推动学科评估和重点实验室申报的关键人物。",
  },
  {
    id: "c2",
    name: "李文华",
    org: "清华大学计算机学院",
    title: "院长",
    strength: 85,
    lastContact: "2026-01-22",
    lastContactDays: 22,
    status: "active",
    statusLabel: "活跃",
    suggestion: "李院长近期发表Nature子刊论文，可发送祝贺并探讨合作可能",
    tags: ["高校", "科研合作", "核心"],
    history: [
      { date: "2026-01-22", event: "联合研讨会上讨论AI大模型合作" },
      { date: "2025-12-05", event: "共同参加CCF年度大会" },
      { date: "2025-10-18", event: "互访交流研究生联合培养" },
    ],
    talkingPoints: [
      "祝贺Nature Machine Intelligence论文发表，探讨联合研究方向",
      "研究生联合培养项目第一批学生反馈良好，可商议扩大规模",
      "双方共建实验室的设备采购进展更新",
    ],
    detail: "清华计算机学院是国内顶尖CS院系，李院长在AI大模型和系统研究领域有深厚积累。双方已建立研究生联合培养机制和共建实验室合作关系。",
  },
  {
    id: "c3",
    name: "王建国",
    org: "华为技术有限公司",
    title: "2012实验室副总裁",
    strength: 71,
    lastContact: "2025-12-15",
    lastContactDays: 60,
    status: "cooling",
    statusLabel: "待维护",
    suggestion: "华为近期发布新一代昇腾芯片，可借机重启产学研合作洽谈",
    tags: ["企业", "产学研", "重要"],
    history: [
      { date: "2025-12-15", event: "校企合作座谈，讨论联合实验室" },
      { date: "2025-09-20", event: "华为开发者大会相遇交流" },
    ],
    talkingPoints: [
      "昇腾AI芯片新品可作为联合实验室核心算力平台",
      "我院3名博士生在华为实习表现优异，可深化人才输送",
      "产学研合作基地挂牌事宜需尽快推进",
    ],
    detail: "华为2012实验室是华为核心研究机构，王总裁主管AI基础研究。双方曾就联合实验室、人才培养和芯片适配开展初步合作。近期联系减少，关系有降温趋势。",
  },
  {
    id: "c4",
    name: "陈晓薇",
    org: "北京市科委",
    title: "高新处处长",
    strength: 65,
    lastContact: "2025-11-28",
    lastContactDays: 77,
    status: "cooling",
    statusLabel: "待维护",
    suggestion: "北京市科技计划即将发布指南，需尽快拜访了解申报方向",
    tags: ["政府", "科技项目", "重要"],
    history: [
      { date: "2025-11-28", event: "参加北京市科技创新大会" },
      { date: "2025-08-10", event: "陪同校领导拜访科委" },
    ],
    talkingPoints: [
      "北京市重点实验室年度考核结果出色，可当面汇报",
      "新一年科技计划中AI+生物交叉方向是否有专项支持",
      "邀请参观学院新落成的智能计算中心",
    ],
    detail: "北京市科委高新处主管高新技术企业认定和科技计划项目管理，陈处长对高校科技成果转化有浓厚兴趣。是获取北京市科技资源和项目支持的关键联系人。",
  },
  {
    id: "c5",
    name: "赵德明",
    org: "中国科学院自动化研究所",
    title: "所长",
    strength: 54,
    lastContact: "2025-08-20",
    lastContactDays: 177,
    status: "dormant",
    statusLabel: "需激活",
    suggestion: "赵所长即将当选IEEE Fellow，务必第一时间发送祝贺信",
    tags: ["科研院所", "人才引进", "待激活"],
    history: [
      { date: "2025-08-20", event: "学术研讨会上简短交流" },
      { date: "2025-03-12", event: "邀请做院级学术报告" },
    ],
    talkingPoints: [
      "热烈祝贺即将当选IEEE Fellow，提议共同举办庆祝学术活动",
      "自动化所在具身智能方向的突破可与我院形成互补",
      "探讨双聘教授或联合博导的合作模式",
    ],
    detail: "中科院自动化所在模式识别和智能系统领域国内领先。赵所长是该领域权威学者，与我院在人才培养和学术交流上有合作基础，但近半年联系中断。",
  },
  {
    id: "c6",
    name: "刘芳华",
    org: "浙江大学信息学院",
    title: "副院长",
    strength: 48,
    lastContact: "2025-07-05",
    lastContactDays: 223,
    status: "dormant",
    statusLabel: "需激活",
    suggestion: "刘副院长刚获国家杰青，应即刻发送祝贺并邀请来院做学术报告",
    tags: ["高校", "学术交流", "待激活"],
    history: [
      { date: "2025-07-05", event: "全国计算机教育大会上交流" },
    ],
    talkingPoints: [
      "祝贺获得国家杰青资助，邀请来院做学术报告或短期讲学",
      "浙大在隐私计算领域的研究成果可与我院联合攻关",
      "探讨两院教师互访和学生交换的常态化机制",
    ],
    detail: "浙江大学信息学院在隐私计算和数据安全领域有国际影响力。刘副院长年轻有为，新获国家杰青资助，是未来重要的学术合作伙伴。当前关系较弱，需主动激活。",
  },
]

function StrengthBar({ strength }: { strength: number }) {
  const color =
    strength >= 80
      ? "bg-green-500"
      : strength >= 60
        ? "bg-blue-500"
        : strength >= 40
          ? "bg-amber-500"
          : "bg-red-500"
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", color)}
          style={{ width: `${strength}%` }}
        />
      </div>
      <span
        className={cn(
          "text-xs font-semibold font-tabular",
          strength >= 80
            ? "text-green-600"
            : strength >= 60
              ? "text-blue-600"
              : strength >= 40
                ? "text-amber-600"
                : "text-red-600"
        )}
      >
        {strength}%
      </span>
    </div>
  )
}

export default function RelationshipMgmt() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  const coreCount = mockContacts.filter((c) => c.strength >= 60).length
  const pendingCount = mockContacts.filter((c) => c.status === "cooling").length
  const dormantCount = mockContacts.filter((c) => c.status === "dormant").length

  return (
    <>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">核心联系人</p>
              <p className="text-xl font-bold font-tabular">
                <MotionNumber value={86} suffix="人" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">待维护</p>
              <p className="text-xl font-bold font-tabular text-amber-600">
                <MotionNumber value={12} suffix="人" />
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
              <p className="text-[11px] text-muted-foreground">关系强度</p>
              <p className="text-xl font-bold font-tabular text-green-600">
                <span className="text-muted-foreground text-sm mr-0.5">↑</span>
                <MotionNumber value={3} suffix="%" />
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500">
              <UserX className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">半年未联系</p>
              <p className="text-xl font-bold font-tabular text-red-600">
                <MotionNumber value={5} suffix="人" />
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
                <CardTitle className="text-sm font-semibold">核心联系人管理</CardTitle>
                <Badge variant="secondary" className="text-[10px]">按维护优先级排序</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-hidden">
                <div className="grid grid-cols-[120px_1fr_110px_90px_1fr_40px] gap-2 px-3 py-2 text-[11px] font-medium text-muted-foreground border-b">
                  <span>姓名</span>
                  <span>机构/职务</span>
                  <span>关系强度</span>
                  <span>上次联系</span>
                  <span>维护建议</span>
                  <span></span>
                </div>
                <StaggerContainer>
                  {mockContacts.map((contact) => (
                    <StaggerItem key={contact.id}>
                      <button
                        type="button"
                        className="w-full grid grid-cols-[120px_1fr_110px_90px_1fr_40px] gap-2 px-3 py-3 items-center text-left border-b last:border-0 hover:bg-muted/30 transition-colors group cursor-pointer"
                        onClick={() => setSelectedContact(contact)}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={cn(
                              "h-2 w-2 rounded-full shrink-0",
                              contact.status === "active"
                                ? "bg-green-500"
                                : contact.status === "cooling"
                                  ? "bg-amber-500"
                                  : "bg-red-500 animate-pulse-subtle"
                            )}
                          />
                          <span className="text-sm font-medium truncate group-hover:text-blue-600 transition-colors">
                            {contact.name}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground truncate">
                          {contact.org} · {contact.title}
                        </span>
                        <StrengthBar strength={contact.strength} />
                        <span className="text-xs text-muted-foreground font-tabular">
                          {contact.lastContactDays}天前
                        </span>
                        <span className="text-xs text-muted-foreground truncate">
                          {contact.suggestion}
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
                <Sparkles className="h-4 w-4 text-green-400" />
                <span className="text-sm font-semibold">AI 关系维护策略</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                当前{coreCount}位核心联系人关系稳定，{pendingCount}位需要维护，{dormantCount}位关系已降温需尽快激活。本周建议重点关注以下事项：
              </p>
              <div className="space-y-2.5 mb-4">
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    <span className="text-white font-medium">本周必联系：</span>王建国（华为）关系降温中，借昇腾芯片发布重启合作
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    <span className="text-white font-medium">生日提醒：</span>张明远副司长2月18日生日，建议提前准备祝贺
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    <span className="text-white font-medium">晋升祝贺：</span>刘芳华获国家杰青，是激活关系的最佳时机
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    <span className="text-white font-medium">学术荣誉：</span>赵德明即将当选IEEE Fellow，建议第一时间发贺信
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs"
                  onClick={() => toast.success("正在生成本周关系维护计划...")}
                >
                  <CalendarCheck className="h-3.5 w-3.5 mr-1.5" />
                  维护计划
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 text-xs"
                  onClick={() => toast.success("正在生成关系网络分析报告...")}
                >
                  <Star className="h-3.5 w-3.5 mr-1.5" />
                  网络分析
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Sheet open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          {selectedContact && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg">{selectedContact.name}</SheetTitle>
                <SheetDescription className="flex items-center gap-2 flex-wrap">
                  <span>{selectedContact.org}</span>
                  <span>·</span>
                  <span>{selectedContact.title}</span>
                  <span>·</span>
                  <Badge
                    variant="outline"
                    className={cn("text-[10px]", {
                      "border-green-200 bg-green-50 text-green-700": selectedContact.status === "active",
                      "border-amber-200 bg-amber-50 text-amber-700": selectedContact.status === "cooling",
                      "border-red-200 bg-red-50 text-red-700": selectedContact.status === "dormant",
                    })}
                  >
                    {selectedContact.statusLabel}
                  </Badge>
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-5">
                <div>
                  <h4 className="text-sm font-semibold mb-2">人物概况</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedContact.detail}</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground">关系强度:</span>
                    <StrengthBar strength={selectedContact.strength} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground">上次联系:</span>
                    <span className="font-tabular">{selectedContact.lastContact}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedContact.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                  ))}
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">交往记录</h4>
                  <div className="space-y-2">
                    {selectedContact.history.map((h, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm">
                        <span className="text-muted-foreground font-tabular shrink-0 text-xs pt-0.5">{h.date}</span>
                        <span className="text-foreground">{h.event}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg bg-green-50 border border-green-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-semibold text-green-700">AI 建议话题</span>
                  </div>
                  <ul className="space-y-1.5">
                    {selectedContact.talkingPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-green-700/80">
                        <span className="text-green-500 mt-1 shrink-0">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      toast.success(`已创建与${selectedContact.name}的联系提醒`)
                      setSelectedContact(null)
                    }}
                  >
                    <Phone className="h-3.5 w-3.5 mr-1.5" />
                    安排联系
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.success("已生成沟通话术参考")}
                  >
                    <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                    话术生成
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.success("已添加至礼品清单")}
                  >
                    <Gift className="h-3.5 w-3.5 mr-1.5" />
                    送礼提醒
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
