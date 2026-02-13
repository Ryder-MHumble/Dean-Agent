"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
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
} from "lucide-react";
import {
  MotionNumber,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { Contact } from "@/lib/types/network";
import { mockContacts, relationshipSummary } from "@/lib/mock-data/network";

function StrengthBar({ strength }: { strength: number }) {
  const color =
    strength >= 80
      ? "bg-green-500"
      : strength >= 60
        ? "bg-blue-500"
        : strength >= 40
          ? "bg-amber-500"
          : "bg-red-500";
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
                : "text-red-600",
        )}
      >
        {strength}%
      </span>
    </div>
  );
}

export default function RelationshipMgmt() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contactActions, setContactActions] = useState<
    Map<string, "scheduled" | "talked" | "gifted">
  >(new Map());

  const coreCount = mockContacts.filter((c) => c.strength >= 60).length;
  const pendingCount = mockContacts.filter(
    (c) => c.status === "cooling",
  ).length;
  const dormantCount = mockContacts.filter(
    (c) => c.status === "dormant",
  ).length;

  const handleContactAction = (
    contactId: string,
    contactName: string,
    action: "scheduled" | "talked" | "gifted",
  ) => {
    setContactActions((prev) => new Map(prev).set(contactId, action));
    setSelectedContact(null);
    const messages = {
      scheduled: `已创建与${contactName}的联系提醒，已同步至日程`,
      talked: `已为${contactName}生成沟通话术，已保存至备忘`,
      gifted: `已将${contactName}添加至礼品清单`,
    };
    toast.success(messages[action]);
  };

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
                <MotionNumber
                  value={relationshipSummary.coreContacts}
                  suffix="人"
                />
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
                <MotionNumber
                  value={relationshipSummary.pendingFollowUp}
                  suffix="人"
                />
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
                <MotionNumber
                  value={relationshipSummary.growthRate}
                  suffix="%"
                />
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
                <MotionNumber
                  value={relationshipSummary.halfYearUncontacted}
                  suffix="人"
                />
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
                <CardTitle className="text-sm font-semibold">
                  核心联系人管理
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">
                  按维护优先级排序
                </Badge>
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
                  {mockContacts.map((contact) => {
                    const action = contactActions.get(contact.id);
                    return (
                      <StaggerItem key={contact.id}>
                        <button
                          type="button"
                          className={cn(
                            "w-full grid grid-cols-[120px_1fr_110px_90px_1fr_40px] gap-2 px-3 py-3 items-center text-left border-b last:border-0 transition-colors group cursor-pointer",
                            action ? "bg-blue-50/30" : "hover:bg-muted/30",
                          )}
                          onClick={() => setSelectedContact(contact)}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {action ? (
                              <CalendarCheck className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                            ) : (
                              <span
                                className={cn(
                                  "h-2 w-2 rounded-full shrink-0",
                                  contact.status === "active"
                                    ? "bg-green-500"
                                    : contact.status === "cooling"
                                      ? "bg-amber-500"
                                      : "bg-red-500 animate-pulse-subtle",
                                )}
                              />
                            )}
                            <span className="text-sm font-medium truncate group-hover:text-blue-600 transition-colors">
                              {contact.name}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground truncate">
                            {contact.org} · {contact.title}
                          </span>
                          <StrengthBar strength={contact.strength} />
                          <span className="text-xs text-muted-foreground font-tabular">
                            {action ? (
                              <Badge
                                variant="outline"
                                className="text-[10px] border-blue-200 bg-blue-50 text-blue-600"
                              >
                                {action === "scheduled"
                                  ? "已安排"
                                  : action === "talked"
                                    ? "已生成"
                                    : "已添加"}
                              </Badge>
                            ) : (
                              `${contact.lastContactDays}天前`
                            )}
                          </span>
                          <span className="text-xs text-muted-foreground truncate">
                            {contact.suggestion}
                          </span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                        </button>
                      </StaggerItem>
                    );
                  })}
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
                当前{coreCount}位核心联系人关系稳定，{pendingCount}位需要维护，
                {dormantCount}位关系已降温需尽快激活。本周建议重点关注以下事项：
              </p>
              <div className="space-y-2.5 mb-4">
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    <span className="text-white font-medium">本周必联系：</span>
                    王建国（华为）关系降温中，借昇腾芯片发布重启合作
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    <span className="text-white font-medium">生日提醒：</span>
                    张明远副司长2月18日生日，建议提前准备祝贺
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    <span className="text-white font-medium">晋升祝贺：</span>
                    刘芳华获国家杰青，是激活关系的最佳时机
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <span className="text-slate-300">
                    <span className="text-white font-medium">学术荣誉：</span>
                    赵德明即将当选IEEE Fellow，建议第一时间发贺信
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

      <Sheet
        open={!!selectedContact}
        onOpenChange={() => setSelectedContact(null)}
      >
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          {selectedContact && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg">
                  {selectedContact.name}
                </SheetTitle>
                <SheetDescription className="flex items-center gap-2 flex-wrap">
                  <span>{selectedContact.org}</span>
                  <span>·</span>
                  <span>{selectedContact.title}</span>
                  <span>·</span>
                  <Badge
                    variant="outline"
                    className={cn("text-[10px]", {
                      "border-green-200 bg-green-50 text-green-700":
                        selectedContact.status === "active",
                      "border-amber-200 bg-amber-50 text-amber-700":
                        selectedContact.status === "cooling",
                      "border-red-200 bg-red-50 text-red-700":
                        selectedContact.status === "dormant",
                    })}
                  >
                    {selectedContact.statusLabel}
                  </Badge>
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-5">
                <div>
                  <h4 className="text-sm font-semibold mb-2">人物概况</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedContact.detail}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground">关系强度:</span>
                    <StrengthBar strength={selectedContact.strength} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground">上次联系:</span>
                    <span className="font-tabular">
                      {selectedContact.lastContact}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedContact.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-[10px]"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">交往记录</h4>
                  <div className="space-y-2">
                    {selectedContact.history.map((h, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm">
                        <span className="text-muted-foreground font-tabular shrink-0 text-xs pt-0.5">
                          {h.date}
                        </span>
                        <span className="text-foreground">{h.event}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg bg-green-50 border border-green-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-semibold text-green-700">
                      AI 建议话题
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {selectedContact.talkingPoints.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-green-700/80"
                      >
                        <span className="text-green-500 mt-1 shrink-0">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    className="flex-1"
                    onClick={() =>
                      handleContactAction(
                        selectedContact.id,
                        selectedContact.name,
                        "scheduled",
                      )
                    }
                  >
                    <Phone className="h-3.5 w-3.5 mr-1.5" />
                    安排联系
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleContactAction(
                        selectedContact.id,
                        selectedContact.name,
                        "talked",
                      )
                    }
                  >
                    <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                    话术生成
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleContactAction(
                        selectedContact.id,
                        selectedContact.name,
                        "gifted",
                      )
                    }
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
  );
}
