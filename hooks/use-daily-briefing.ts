"use client";

import { useState, useEffect } from "react";
import type { DailySummaryData } from "@/components/home/ai-daily-summary";
import type { MetricCardData } from "@/components/home/aggregated-metric-cards";
import { fetchDailyBriefing } from "@/lib/api";
import {
  mockDailySummary,
  mockMetricCards,
} from "@/lib/mock-data/home-briefing";

interface UseDailyBriefingResult {
  dailySummary: DailySummaryData;
  metricCards: MetricCardData[];
  isLoading: boolean;
  isUsingMock: boolean;
}

export function useDailyBriefing(): UseDailyBriefingResult {
  const [dailySummary, setDailySummary] =
    useState<DailySummaryData>(mockDailySummary);
  const [metricCards, setMetricCards] =
    useState<MetricCardData[]>(mockMetricCards);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingMock, setIsUsingMock] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);

      const data = await fetchDailyBriefing();

      if (cancelled) return;

      if (data && data.paragraphs.length > 0) {
        setDailySummary({
          paragraphs: data.paragraphs,
          generatedAt: new Date(data.generated_at),
        });
        if (data.metric_cards.length > 0) {
          setMetricCards(data.metric_cards);
        }
        setIsUsingMock(false);
      } else {
        setIsUsingMock(true);
      }

      setIsLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { dailySummary, metricCards, isLoading, isUsingMock };
}
