/**
 * API client for the Track Tracker backend.
 * All fetch calls use Next.js ISR (revalidate: 60s) so pages stay fresh
 * without hitting the backend on every request.
 */

import type { SongCard } from "../types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/** Raw track shape returned by the backend /tracks endpoint. */
interface TrackListItem {
    track_id: number;
    track_name: string | null;
    artist_name: string | null;
    image_url: string | null;
    total_streams: number | null;
    daily_streams_change: number | null;
    weekly_growth_percent: number | null;
    rank: number;
}

/** Aggregated statistics derived from the full track list, used by the dashboard header. */
export interface TrackStats {
    trackCount: number;
    totalStreams: number;
    topGrowthPercent: number | null;
}

/** Transforms a raw backend TrackListItem into the frontend SongCard display shape. */
function mapToSongCard(item: TrackListItem): SongCard {
    return {
        song: {
            id: item.track_id,
            name: item.track_name ?? "Unknown",
            artist: item.artist_name ?? "Unknown",
            albumName: null,
            imageUrl: item.image_url ?? null,
            releaseDate: null,
        },
        rank: item.rank,
        weeklyGrowthPercent: item.weekly_growth_percent ?? 0,
        dailyListens: item.daily_streams_change ?? 0,
        totalListens: item.total_streams ?? 0,
    };
}

/**
 * Fetches the ranked track list, optionally filtered by a search query.
 * @param q - Search string matched against track/artist name.
 * @param limit - Maximum number of results (default 50).
 */
export async function getTracks(q?: string, limit = 50): Promise<SongCard[]> {
    const params = new URLSearchParams({ limit: String(limit) });
    if (q) params.set("q", q);

    const res = await fetch(`${API_BASE}/tracks?${params}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const data = await res.json();
    return (data.tracks as TrackListItem[]).map(mapToSongCard);
}

/**
 * Computes aggregate dashboard stats (total streams, top weekly growth) by
 * fetching up to 100 tracks and reducing client-side.
 */
export async function getStats(): Promise<TrackStats> {
    const res = await fetch(`${API_BASE}/tracks?limit=100`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const data = await res.json();
    const items: TrackListItem[] = data.tracks;

    const totalStreams = items.reduce((sum, t) => sum + (t.total_streams ?? 0), 0);
    const topGrowth = items.reduce<number | null>((max, t) => {
        const g = t.weekly_growth_percent;
        if (g === null) return max;
        return max === null || g > max ? g : max;
    }, null);

    return {
        trackCount: data.count as number,
        totalStreams,
        topGrowthPercent: topGrowth,
    };
}
