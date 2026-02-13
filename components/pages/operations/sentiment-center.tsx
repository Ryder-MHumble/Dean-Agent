"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function SentimentCenter() {
  const score = 78;
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            舆情监测中心
          </CardTitle>
          <button
            type="button"
            className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-100"
            onClick={() =>
              toast("舆情监测中心", {
                description: "正在加载舆情详细分析报告...",
              })
            }
          >
            查看详情
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Gauge */}
        <div className="flex flex-col items-center py-6">
          <div className="relative h-36 w-52">
            <svg viewBox="0 0 200 120" className="h-full w-full">
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="18"
                strokeLinecap="round"
              />
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="url(#sentimentGauge)"
                strokeWidth="18"
                strokeLinecap="round"
                strokeDasharray={`${(score / 100) * 251} 251`}
              />
              <defs>
                <linearGradient
                  id="sentimentGauge"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="30%" stopColor="#f59e0b" />
                  <stop offset="60%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
              <span className="text-4xl font-bold text-foreground">
                {score}
              </span>
              <span className="text-sm text-muted-foreground">/100</span>
              <span className="mt-1 text-sm font-medium text-orange-500">
                情绪积极
              </span>
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-border p-3 text-center">
            <p className="text-[11px] text-blue-600">正面</p>
            <p className="mt-0.5 text-lg font-bold text-foreground">65%</p>
          </div>
          <div className="rounded-lg border border-border p-3 text-center">
            <p className="text-[11px] text-muted-foreground">中立</p>
            <p className="mt-0.5 text-lg font-bold text-foreground">20%</p>
          </div>
          <div className="rounded-lg border border-border p-3 text-center">
            <p className="text-[11px] text-red-500">负面</p>
            <p className="mt-0.5 text-lg font-bold text-foreground">15%</p>
          </div>
        </div>

        {/* Recent social */}
        <div className="mt-4 rounded-lg bg-slate-50 p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-[10px]">
              微
            </div>
            <span className="text-xs font-medium text-foreground">微博</span>
            <span className="ml-auto text-[10px] text-muted-foreground">
              2小时前
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            {'"学生们正在抱怨新宿舍的WiFi限制。该话题正在本地圈子热议中。"'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
