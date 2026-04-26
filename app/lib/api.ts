import type { SongCard } from "../types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

interface TrackListItem {
    track_id: number;
    track_name: string | null;
    artist_name: string | null;
    total_streams: number | null;
    daily_streams_change: number | null;
    weekly_growth_percent: number | null;
    rank: number;
}

export interface TrackStats {
    trackCount: number;
    totalStreams: number;
    topGrowthPercent: number | null;
}

function mapToSongCard(item: TrackListItem): SongCard {
    return {
        song: {
            id: item.track_id,
            name: item.track_name ?? "Unknown",
            artist: item.artist_name ?? "Unknown",
            albumName: null,
            imageUrl: null,
            releaseDate: null,
        },
        rank: item.rank,
        weeklyGrowthPercent: item.weekly_growth_percent ?? 0,
        dailyListens: item.daily_streams_change ?? 0,
        totalListens: item.total_streams ?? 0,
    };
}

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

