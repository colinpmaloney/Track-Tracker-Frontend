import { Suspense } from "react";
import TrackList from "../components/TrackList";
import SearchBar from "../components/SearchBar";
import { getTracks } from "../lib/api";
import type { SongCard } from "../types";

function ChartBarIcon() {
    return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
    );
}

export default async function Charts({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;

    let songs: SongCard[] = [];
    try {
        songs = await getTracks(q || undefined, 100);
    } catch {
        // backend unreachable — render empty state
    }

    return (
        <main className="max-w-5xl mx-auto px-6 py-8">

            {/* Header */}
            <section className="mb-8">
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 text-sm font-bold px-3 py-1.5 rounded-full mb-4">
                    <ChartBarIcon />
                    <span>Live Rankings</span>
                </div>
                <h1 className="text-foreground mb-2">Top 100 Charts</h1>
                <p className="text-gray-500 text-lg max-w-2xl">
                    The most streamed and fastest-growing tracks right now.
                </p>
            </section>

            <Suspense>
                <SearchBar initialValue={q ?? ""} />
            </Suspense>

            {songs.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-16">
                    {q ? `No results for "${q}"` : "No tracks found. Make sure the backend is running."}
                </p>
            ) : (
                <TrackList songs={songs} />
            )}

        </main>
    );
}
