import type { PolicyFeedItem } from "@/lib/types/policy-intel";
import type {
  PersonnelEnrichedFeedResponse,
  PersonnelEnrichedStatsResponse,
} from "@/lib/types/personnel-intel";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// ── Policy ────────────────────────────────────────────────

/** Response shape from GET /api/v1/intel/policy/feed */
export interface PolicyFeedResponse {
  generated_at: string | null;
  item_count: number;
  items: PolicyFeedItem[];
}

/**
 * Fetch the full policy intelligence feed from the backend API.
 * Returns null if the request fails (caller handles fallback).
 */
export async function fetchPolicyFeed(): Promise<PolicyFeedResponse | null> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/intel/policy/feed?limit=200`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as PolicyFeedResponse;
  } catch {
    return null;
  }
}

// ── Personnel ─────────────────────────────────────────────

export async function fetchPersonnelEnrichedFeed(): Promise<PersonnelEnrichedFeedResponse | null> {
  try {
    const res = await fetch(
      `${API_BASE}/api/v1/intel/personnel/enriched-feed?limit=200`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    return (await res.json()) as PersonnelEnrichedFeedResponse;
  } catch {
    return null;
  }
}

export async function fetchPersonnelEnrichedStats(): Promise<PersonnelEnrichedStatsResponse | null> {
  try {
    const res = await fetch(
      `${API_BASE}/api/v1/intel/personnel/enriched-stats`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    return (await res.json()) as PersonnelEnrichedStatsResponse;
  } catch {
    return null;
  }
}
