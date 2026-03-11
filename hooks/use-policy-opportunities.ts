"use client";

import { useState, useEffect, startTransition } from "react";
import type { PolicyFeedItem } from "@/lib/types/policy-intel";
import { fetchPolicyFeed } from "@/lib/api";
import type { PolicyFeedResponse } from "@/lib/api";

const CACHE_KEY = "policy_feed_cache";
// Data is considered "fresh" for 10 minutes — skip the network call entirely
const CACHE_TTL_MS = 10 * 60 * 1000;
// Hard expiry: discard cache entirely after 24 hours
const CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000;

interface CachedEntry {
  data: PolicyFeedResponse;
  cachedAt: number;
}

function readCache(): CachedEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CachedEntry;
    if (Date.now() - entry.cachedAt > CACHE_MAX_AGE_MS) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return entry;
  } catch {
    return null;
  }
}

function writeCache(data: PolicyFeedResponse) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data, cachedAt: Date.now() } satisfies CachedEntry),
    );
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

interface UsePolicyFeedResult {
  items: PolicyFeedItem[];
  isLoading: boolean;
  isUsingMock: boolean;
  generatedAt: string | null;
  /** true while a background refresh is running (stale cache is being updated) */
  isRefreshing: boolean;
}

export function usePolicyFeed(): UsePolicyFeedResult {
  const [items, setItems] = useState<PolicyFeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingMock, setIsUsingMock] = useState(false);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // ── Step 1: serve from cache if available ──────────────────────────
      const cached = readCache();
      const isFresh =
        cached !== null && Date.now() - cached.cachedAt < CACHE_TTL_MS;

      if (cached && cached.data.items.length > 0) {
        // Render cached data immediately — no skeleton shown to the user
        startTransition(() => {
          setItems(cached.data.items);
          setGeneratedAt(cached.data.generated_at);
          setIsUsingMock(false);
          setIsLoading(false);
        });

        if (isFresh) {
          // Cache is still fresh — skip the network entirely
          return;
        }

        // Stale cache: data is already visible; refresh quietly in background
        setIsRefreshing(true);
      }

      // ── Step 2: fetch from API ─────────────────────────────────────────
      const data = await fetchPolicyFeed();
      if (cancelled) return;

      startTransition(() => {
        if (data && data.items.length > 0) {
          setItems(data.items);
          setGeneratedAt(data.generated_at);
          setIsUsingMock(false);
          writeCache(data); // persist for next visit
        } else if (!cached) {
          // No cache and API failed — fall back to empty state (caller shows mock)
          setItems([]);
          setGeneratedAt(null);
          setIsUsingMock(true);
        }
        // If API failed but we already showed cached data, keep showing it
        setIsLoading(false);
        setIsRefreshing(false);
      });
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { items, isLoading, isUsingMock, generatedAt, isRefreshing };
}
