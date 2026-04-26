import Link from "next/link";
import { getTracks, getStats } from "./lib/api";
import type { SongCard } from "./types";

function formatNumber(n: number): string {
    if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n.toString();
}

function TrendingUpIcon({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>
    );
}

function MusicNoteIcon() {
    return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 4v9.38A3.5 3.5 0 1 0 11 17V9l8-2V4H9zm1 13a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm8-8-6 1.5V6l6-1.5V9z" />
        </svg>
    );
}

function ChartBarIcon() {
    return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
    );
}

function FeaturedTrackCard({ track }: { track: SongCard }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">#{track.rank}</span>
                </div>
                <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center text-green-500 flex-shrink-0">
                    <MusicNoteIcon />
                </div>
            </div>
            <div>
                <h3 className="font-bold text-gray-900 text-lg leading-tight">{track.song.name}</h3>
                <p className="text-gray-500 text-sm mt-0.5">{track.song.artist}</p>
            </div>
            <div className="flex items-center gap-1.5 text-green-500">
                <TrendingUpIcon className="w-4 h-4" />
                <span className="font-bold text-2xl">
                    {track.weeklyGrowthPercent > 0 ? `+${track.weeklyGrowthPercent}%` : "—"}
                </span>
            </div>
            <p className="text-xs text-gray-400">{formatNumber(track.totalListens)} total streams</p>
        </div>
    );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-500 mb-4">
                {icon}
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
            <p className="text-gray-500 text-sm">{label}</p>
        </div>
    );
}

export default async function Home() {
    let top3: SongCard[] = [];
    let stats = { trackCount: 0, totalStreams: 0, topGrowthPercent: null as number | null };

    try {
        [top3, stats] = await Promise.all([
            getTracks(undefined, 3),
            getStats(),
        ]);
    } catch {
        // backend unreachable — render empty state
    }

    return (
        <main className="max-w-5xl mx-auto px-6 py-8">

            {/* Hero */}
            <section className="mb-10">
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 text-sm font-bold px-3 py-1.5 rounded-full mb-4">
                    <TrendingUpIcon className="w-4 h-4" />
                    <span>Trending Today</span>
                </div>
                <h1 className="text-foreground mb-4">
                    The tracks everyone<br />
                    <span className="text-green-500">is listening to.</span>
                </h1>
                <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
                    Real-time streaming data surfaced daily. See what&apos;s gaining momentum before it dominates every playlist.
                </p>
            </section>

            {/* Top 3 */}
            <section className="mb-12">
                <h2 className="text-gray-900 mb-1">Today&apos;s top 3</h2>
                <p className="text-gray-500 text-sm mb-6">Ranked by weekly stream growth.</p>
                {top3.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-16">
                        No tracks found. Make sure the backend is running.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {top3.map((track) => (
                            <FeaturedTrackCard key={track.song.id} track={track} />
                        ))}
                    </div>
                )}
            </section>

            {/* Stats */}
            <section className="mb-12">
                <h2 className="text-gray-900 mb-1">By the numbers</h2>
                <p className="text-gray-500 text-sm mb-6">What&apos;s in the database right now.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <StatCard
                        icon={<MusicNoteIcon />}
                        label="Tracks tracked"
                        value={stats.trackCount > 0 ? formatNumber(stats.trackCount) : "—"}
                    />
                    <StatCard
                        icon={<ChartBarIcon />}
                        label="Combined streams"
                        value={stats.totalStreams > 0 ? formatNumber(stats.totalStreams) : "—"}
                    />
                    <StatCard
                        icon={<TrendingUpIcon />}
                        label="Top weekly growth"
                        value={stats.topGrowthPercent !== null ? `+${stats.topGrowthPercent}%` : "—"}
                    />
                </div>
            </section>

            {/* CTA */}
            <section>
                <div className="bg-green-500 rounded-2xl p-8 text-center">
                    <h2 className="text-white mb-2">See the full charts</h2>
                    <p className="text-green-100 mb-6 max-w-md mx-auto">
                        Browse, search, and explore the complete top 100 ranked by weekly growth.
                    </p>
                    <Link
                        href="/charts"
                        className="inline-block bg-white text-green-600 font-bold px-6 py-3 rounded-xl hover:scale-105 transition-all duration-75"
                    >
                        View top 100 →
                    </Link>
                </div>
            </section>

        </main>
    );
}
