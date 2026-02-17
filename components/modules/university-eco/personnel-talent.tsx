"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  UserPlus,
  UserMinus,
  ChevronRight,
  Calendar,
} from "lucide-react";
import {
  MotionNumber,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import MasterDetailView from "@/components/shared/master-detail-view";
import DetailArticleBody from "@/components/shared/detail-article-body";
import { useDetailView } from "@/hooks/use-detail-view";
import { cn } from "@/lib/utils";
import { groupByDate } from "@/lib/group-by-date";
import { toast } from "sonner";
import type { PersonnelChange } from "@/lib/types/university-eco";
import { mockPersonnelChanges } from "@/lib/mock-data/university-eco";

function TypeBadge({ type }: { type: PersonnelChange["type"] }) {
  const config = {
    任命: { color: "bg-blue-100 text-blue-700 border-blue-200" },
    离职: { color: "bg-red-100 text-red-700 border-red-200" },
    调动: { color: "bg-amber-100 text-amber-700 border-amber-200" },
  };
  const c = config[type];
  return (
    <Badge variant="outline" className={cn("text-[11px] font-medium", c.color)}>
      {type}
    </Badge>
  );
}

function ImpactBadge({ level }: { level: PersonnelChange["impact"] }) {
  const config = {
    重大: { color: "bg-red-100 text-red-700 border-red-200" },
    较大: { color: "bg-amber-100 text-amber-700 border-amber-200" },
    一般: { color: "bg-green-100 text-green-700 border-green-200" },
  };
  const c = config[level];
  return (
    <Badge variant="outline" className={cn("text-[11px] font-medium", c.color)}>
      {level}影响
    </Badge>
  );
}

export default function PersonnelTalent() {
  const {
    selectedItem: selectedChange,
    open,
    close,
    isOpen,
  } = useDetailView<PersonnelChange>();

  const sortedChanges = [...mockPersonnelChanges].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const groups = groupByDate(sortedChanges);

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

      <MasterDetailView
        isOpen={isOpen}
        onClose={close}
        detailHeader={
          selectedChange
            ? {
                title: (
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    {selectedChange.person}
                    <TypeBadge type={selectedChange.type} />
                  </h2>
                ),
                subtitle: (
                  <div className="flex items-center gap-2 flex-wrap mt-1 text-sm text-muted-foreground">
                    <span>{selectedChange.institution}</span>
                    <span>&middot;</span>
                    <span>{selectedChange.date}</span>
                  </div>
                ),
              }
            : undefined
        }
        detailContent={
          selectedChange && (
            <DetailArticleBody
              aiAnalysis={{
                title: "AI 影响分析",
                content: selectedChange.aiAnalysis,
                colorScheme: "violet",
              }}
              summary={selectedChange.detail}
              extraMeta={
                <div className="space-y-3">
                  <ImpactBadge level={selectedChange.impact} />
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
                    <p className="text-sm text-muted-foreground">
                      {selectedChange.background}
                    </p>
                  </div>
                </div>
              }
            />
          )
        }
        detailFooter={
          selectedChange && (
            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={() => {
                  toast.success("已加入重点关注人物");
                  close();
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
          )
        }
      >
        <div className="space-y-4 max-h-[calc(100vh-320px)] overflow-y-auto">
          {groups.map((group) => (
            <Card key={group.label} className="shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {group.label}
                  </CardTitle>
                  <Badge variant="secondary" className="text-[10px]">
                    {group.items.length}条
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {group.items.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-3">
                    暂无动态
                  </p>
                ) : (
                  <StaggerContainer className="space-y-3">
                    {group.items.map((change) => (
                      <StaggerItem key={change.id}>
                        <button
                          type="button"
                          className={cn(
                            "w-full rounded-lg border p-4 transition-all group cursor-pointer text-left",
                            selectedChange?.id === change.id
                              ? "border-violet-300 bg-violet-50/50 shadow-sm"
                              : "hover:border-violet-200 hover:shadow-sm",
                          )}
                          onClick={() => open(change)}
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
                                  <span className="text-[11px] text-violet-500 font-medium mx-1">
                                    →
                                  </span>
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
                            <span className="text-[11px] text-muted-foreground">
                              {change.institution}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground truncate ml-[52px] mt-1">
                            {change.background}
                          </p>
                        </button>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </MasterDetailView>
    </>
  );
}
