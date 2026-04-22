import { Suspense } from "react";
import TrackList from "./components/TrackList";
import SearchBar from "./components/SearchBar";
import { getTracks } from "./lib/api";
import type { SongCard } from "./types";

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;

    let songs: SongCard[] = [];
    try {
        songs = await getTracks(q || undefined);
    } catch {
        // backend unreachable — render empty state
    }

    return (
        <main className="max-w-5xl mx-auto px-6 py-8">
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
