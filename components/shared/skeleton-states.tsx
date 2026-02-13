"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function SkeletonStatCards({ count = 3 }: { count?: number }) {
  return (
    <div className={cn("grid gap-4 mb-4", `grid-cols-${count}`)}>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-6 w-12" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function SkeletonTableRows({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Table header */}
        <div className="flex gap-4 px-3 py-2 border-b">
          {Array.from({ length: cols }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-16" />
          ))}
        </div>
        {/* Table rows */}
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4 items-center px-3 py-3 border-b last:border-0">
            {Array.from({ length: cols }).map((_, j) => (
              <Skeleton
                key={j}
                className={cn(
                  "h-4",
                  j === 0 ? "w-32" : j === cols - 1 ? "w-4" : "w-16"
                )}
              />
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function SkeletonAIPanel() {
  return (
    <Card className="shadow-card bg-gradient-to-br from-slate-800 to-slate-900 border-0">
      <CardContent className="p-4">
        {/* Title */}
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="h-4 w-4 rounded bg-slate-700" />
          <Skeleton className="h-4 w-24 bg-slate-700" />
        </div>
        {/* Description */}
        <div className="space-y-1.5 mb-4">
          <Skeleton className="h-3 w-full bg-slate-700" />
          <Skeleton className="h-3 w-4/5 bg-slate-700" />
          <Skeleton className="h-3 w-3/5 bg-slate-700" />
        </div>
        {/* Bullet points */}
        <div className="space-y-2 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-2">
              <Skeleton className="h-1.5 w-1.5 rounded-full mt-1.5 bg-slate-700 shrink-0" />
              <Skeleton className="h-3 w-full bg-slate-700" />
            </div>
          ))}
        </div>
        {/* Buttons */}
        <div className="flex gap-2">
          <Skeleton className="h-8 flex-1 rounded-md bg-slate-700" />
          <Skeleton className="h-8 flex-1 rounded-md bg-slate-700" />
        </div>
      </CardContent>
    </Card>
  )
}

export function SkeletonSubPage() {
  return (
    <div className="space-y-4">
      <SkeletonStatCards />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <SkeletonTableRows />
        </div>
        <div className="col-span-4">
          <SkeletonAIPanel />
        </div>
      </div>
    </div>
  )
}
