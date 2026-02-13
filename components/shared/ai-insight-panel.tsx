"use client";

import type { LucideIcon } from "lucide-react";
import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AIInsight {
  text: string;
  color:
    | "red"
    | "amber"
    | "green"
    | "blue"
    | "purple"
    | "orange"
    | "teal"
    | "rose"
    | "cyan"
    | "indigo";
}

interface AIAction {
  label: string;
  icon?: LucideIcon;
  variant?: "primary" | "outline";
  onClick: () => void;
}

const accentColors: Record<
  AIInsight["color"],
  { sparkle: string; button: string; dot: string }
> = {
  red: {
    sparkle: "text-red-400",
    button: "bg-red-500 hover:bg-red-600",
    dot: "bg-red-400",
  },
  amber: {
    sparkle: "text-amber-400",
    button: "bg-amber-500 hover:bg-amber-600",
    dot: "bg-amber-400",
  },
  green: {
    sparkle: "text-green-400",
    button: "bg-green-500 hover:bg-green-600",
    dot: "bg-green-400",
  },
  blue: {
    sparkle: "text-blue-400",
    button: "bg-blue-500 hover:bg-blue-600",
    dot: "bg-blue-400",
  },
  purple: {
    sparkle: "text-purple-400",
    button: "bg-purple-500 hover:bg-purple-600",
    dot: "bg-purple-400",
  },
  orange: {
    sparkle: "text-orange-400",
    button: "bg-orange-500 hover:bg-orange-600",
    dot: "bg-orange-400",
  },
  teal: {
    sparkle: "text-teal-400",
    button: "bg-teal-500 hover:bg-teal-600",
    dot: "bg-teal-400",
  },
  rose: {
    sparkle: "text-rose-400",
    button: "bg-rose-500 hover:bg-rose-600",
    dot: "bg-rose-400",
  },
  cyan: {
    sparkle: "text-cyan-400",
    button: "bg-cyan-500 hover:bg-cyan-600",
    dot: "bg-cyan-400",
  },
  indigo: {
    sparkle: "text-indigo-400",
    button: "bg-indigo-500 hover:bg-indigo-600",
    dot: "bg-indigo-400",
  },
};

interface AIInsightPanelProps {
  title: string;
  accentColor: AIInsight["color"];
  description: string;
  insights: AIInsight[];
  actions?: AIAction[];
  className?: string;
}

export default function AIInsightPanel({
  title,
  accentColor,
  description,
  insights,
  actions,
  className,
}: AIInsightPanelProps) {
  const colors = accentColors[accentColor];

  return (
    <Card
      className={cn(
        "shadow-card bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0",
        className,
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className={cn("h-4 w-4", colors.sparkle)} />
          <span className="text-sm font-semibold">{title}</span>
        </div>

        <p className="text-[13px] text-slate-300 leading-relaxed mb-4">
          {description}
        </p>

        {insights.length > 0 && (
          <div className="space-y-2 mb-4">
            {insights.map((insight, i) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <div
                  className={cn(
                    "h-1.5 w-1.5 rounded-full mt-1.5 shrink-0",
                    accentColors[insight.color].dot,
                  )}
                />
                <span className="text-slate-300">{insight.text}</span>
              </div>
            ))}
          </div>
        )}

        {actions && actions.length > 0 && (
          <div className="flex gap-2">
            {actions.map((action, i) => {
              const ActionIcon = action.icon;
              const isOutline = action.variant === "outline";
              return (
                <Button
                  key={i}
                  size="sm"
                  variant={isOutline ? "outline" : "default"}
                  className={cn(
                    "flex-1 text-xs",
                    isOutline
                      ? "border-slate-600 text-slate-300 hover:bg-slate-700"
                      : cn(colors.button, "text-white"),
                  )}
                  onClick={action.onClick}
                >
                  {ActionIcon && <ActionIcon className="h-3.5 w-3.5 mr-1.5" />}
                  {action.label}
                </Button>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
