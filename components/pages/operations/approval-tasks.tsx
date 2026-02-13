"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { approvalTasks } from "@/lib/mock-data/operations";

export default function ApprovalTasks() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            待办审批与督导
          </CardTitle>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600"
            onClick={() =>
              toast("新建任务", { description: "正在打开任务创建表单..." })
            }
          >
            <Plus className="h-3.5 w-3.5" />
            新建任务
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {approvalTasks.map((task) => (
            <div
              key={task.title}
              className={`flex items-start gap-3 rounded-lg border p-3 ${
                task.done
                  ? "border-green-200 bg-green-50/30 opacity-60"
                  : "border-border"
              }`}
            >
              <div className="pt-0.5">
                {task.done ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <Checkbox
                    className="h-5 w-5"
                    onCheckedChange={() => toast.success("任务状态已更新")}
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium ${
                    task.done
                      ? "text-muted-foreground line-through"
                      : "text-foreground"
                  }`}
                >
                  {task.title}
                </p>
                <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span>{task.dept}</span>
                  <span>.</span>
                  <span>
                    {task.done
                      ? `完成于 ${task.deadline}`
                      : `截止: ${task.deadline}`}
                  </span>
                </div>
              </div>
              <Badge
                variant="secondary"
                className={`text-[10px] shrink-0 ${
                  task.status === "urgent"
                    ? "bg-red-100 text-red-700"
                    : task.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                }`}
              >
                {task.statusLabel}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
