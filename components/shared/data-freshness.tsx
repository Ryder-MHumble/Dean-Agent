"use client";

import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return "刚刚更新";
  if (diffMin < 60) return `${diffMin}分钟前`;
  if (diffHr < 24) return `${diffHr}小时前`;
  if (diffDay < 7) return `${diffDay}天前`;
  if (diffDay < 30) return `${Math.floor(diffDay / 7)}周前`;
  return `${Math.floor(diffDay / 30)}月前`;
}

function getFreshnessColor(date: Date): string {
  const diffMs = new Date().getTime() - date.getTime();
  const diffHr = diffMs / 3600000;

  if (diffHr < 1) return "text-green-500";
  if (diffHr < 24) return "text-blue-500";
  if (diffHr < 72) return "text-muted-foreground";
  return "text-amber-500";
}

interface DataFreshnessProps {
  updatedAt: Date;
  className?: string;
  showIcon?: boolean;
}

export default function DataFreshness({
  updatedAt,
  className,
  showIcon = true,
}: DataFreshnessProps) {
  const label = formatRelativeTime(updatedAt);
  const color = getFreshnessColor(updatedAt);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[10px]",
        color,
        className,
      )}
    >
      {showIcon && <Clock className="h-3 w-3" />}
      {label}
    </span>
  );
}
