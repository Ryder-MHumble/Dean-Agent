"use client";

import { useState, type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ChevronUp, ChevronDown } from "lucide-react";
import { ExpandableSection } from "@/components/motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Color schemes for the AI analysis box                              */
/* ------------------------------------------------------------------ */

const colorSchemes = {
  blue: {
    bg: "bg-blue-50/80 border-blue-100",
    icon: "text-blue-500",
    title: "text-blue-700",
    text: "text-blue-900/80",
    textAlt: "text-blue-800/70",
    chevron: "text-blue-400",
    signalDot: "bg-blue-400",
    signalLabel: "text-blue-600",
    signalBorder: "border-blue-100",
  },
  indigo: {
    bg: "bg-indigo-50/80 border-indigo-100",
    icon: "text-indigo-500",
    title: "text-indigo-700",
    text: "text-indigo-900/80",
    textAlt: "text-indigo-700/80",
    chevron: "text-indigo-400",
    signalDot: "bg-indigo-400",
    signalLabel: "text-indigo-600",
    signalBorder: "border-indigo-100",
  },
  purple: {
    bg: "bg-purple-50/80 border-purple-100",
    icon: "text-purple-500",
    title: "text-purple-700",
    text: "text-purple-900/80",
    textAlt: "text-purple-700/80",
    chevron: "text-purple-400",
    signalDot: "bg-purple-400",
    signalLabel: "text-purple-600",
    signalBorder: "border-purple-100",
  },
  violet: {
    bg: "bg-violet-50/80 border-violet-100",
    icon: "text-violet-500",
    title: "text-violet-700",
    text: "text-violet-900/80",
    textAlt: "text-violet-700/80",
    chevron: "text-violet-400",
    signalDot: "bg-violet-400",
    signalLabel: "text-violet-600",
    signalBorder: "border-violet-100",
  },
  green: {
    bg: "bg-green-50/80 border-green-100",
    icon: "text-green-500",
    title: "text-green-700",
    text: "text-green-900/80",
    textAlt: "text-green-700/80",
    chevron: "text-green-400",
    signalDot: "bg-green-400",
    signalLabel: "text-green-600",
    signalBorder: "border-green-100",
  },
} as const;

type ColorScheme = keyof typeof colorSchemes;

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

export interface AiAnalysisConfig {
  /** Section title (default "AI 参考分析") */
  title?: string;
  /** Main AI analysis text */
  content: string;
  /** Additional detail text shown below main content */
  detail?: string;
  /** Key signal items shown as bullet list */
  signals?: string[];
  /** Color scheme (default "blue") */
  colorScheme?: ColorScheme;
  /** Whether the section is collapsible (default true) */
  collapsible?: boolean;
}

export interface DetailArticleBodyProps {
  /** AI analysis section — rendered first */
  aiAnalysis?: AiAnalysisConfig;
  /** Original article content (long text) */
  content?: string;
  /** Short summary — shown if content is absent */
  summary?: string;
  /** Tags rendered as small badges */
  tags?: string[];
  /** Extra meta badges/info rendered above AI analysis */
  extraMeta?: ReactNode;
  /** Additional content rendered between AI analysis and article text */
  children?: ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function DetailArticleBody({
  aiAnalysis,
  content,
  summary,
  tags,
  extraMeta,
  children,
}: DetailArticleBodyProps) {
  const [aiExpanded, setAiExpanded] = useState(true);

  const scheme = aiAnalysis
    ? colorSchemes[aiAnalysis.colorScheme ?? "blue"]
    : null;

  return (
    <div className="space-y-4">
      {/* Extra meta (badges, importance, deadline, etc.) */}
      {extraMeta}

      {/* AI Analysis Section */}
      {aiAnalysis && scheme && (
        <div className={cn("rounded-lg border p-3", scheme.bg)}>
          {aiAnalysis.collapsible !== false ? (
            <button
              type="button"
              onClick={() => setAiExpanded((v) => !v)}
              className="flex items-center gap-2 w-full"
            >
              <Sparkles className={cn("h-3.5 w-3.5", scheme.icon)} />
              <span
                className={cn(
                  "text-xs font-semibold flex-1 text-left",
                  scheme.title,
                )}
              >
                {aiAnalysis.title ?? "AI 参考分析"}
              </span>
              {aiExpanded ? (
                <ChevronUp className={cn("h-3.5 w-3.5", scheme.chevron)} />
              ) : (
                <ChevronDown className={cn("h-3.5 w-3.5", scheme.chevron)} />
              )}
            </button>
          ) : (
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className={cn("h-3.5 w-3.5", scheme.icon)} />
              <span className={cn("text-xs font-semibold", scheme.title)}>
                {aiAnalysis.title ?? "AI 参考分析"}
              </span>
            </div>
          )}

          <ExpandableSection
            isOpen={aiAnalysis.collapsible !== false ? aiExpanded : true}
          >
            <div className="space-y-2.5 pt-2.5">
              <p className={cn("text-sm leading-relaxed", scheme.text)}>
                {aiAnalysis.content}
              </p>
              {aiAnalysis.detail && aiAnalysis.detail !== aiAnalysis.content && (
                <p className={cn("text-xs leading-relaxed", scheme.textAlt)}>
                  {aiAnalysis.detail}
                </p>
              )}
              {aiAnalysis.signals && aiAnalysis.signals.length > 0 && (
                <div
                  className={cn(
                    "space-y-1 pt-1 border-t",
                    scheme.signalBorder,
                  )}
                >
                  <span
                    className={cn(
                      "text-[10px] font-medium uppercase tracking-wider",
                      scheme.signalLabel,
                    )}
                  >
                    关键信号
                  </span>
                  {aiAnalysis.signals.map((signal, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "flex items-start gap-2 text-xs",
                        scheme.textAlt,
                      )}
                    >
                      <div
                        className={cn(
                          "h-1.5 w-1.5 rounded-full mt-1.5 shrink-0",
                          scheme.signalDot,
                        )}
                      />
                      <span>{signal}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ExpandableSection>
        </div>
      )}

      {/* Optional slot between AI analysis and content */}
      {children}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Original content or summary */}
      {content ? (
        <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {content}
        </div>
      ) : summary ? (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {summary}
        </p>
      ) : null}
    </div>
  );
}
