import type { SongCard } from "../types";

/** Abbreviates large listen counts to human-readable form (e.g. 1500000 → "1.5M"). */
function formatListens(n: number): string {
    if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
    return n.toString()
}

function MusicNoteIcon() {
    return (
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 4v9.38A3.5 3.5 0 1 0 11 17V9l8-2V4H9zm1 13a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm8-8-6 1.5V6l6-1.5V9z" />
        </svg >
    )
}

function TrendingUpIcon() {
    return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>
    )
}

function PlayIcon() {
    return (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
        </svg>
    )
}

function PeopleIcon() {
    return (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
        </svg>
    )
}

/**
 * Displays a single ranked track with its key streaming metrics.
 * Falls back to a green music-note placeholder when no album art URL is available.
 */
export default function TrackCard({ songCard, onClick }: { songCard: SongCard; onClick?: () => void }) {
    return (
        <div
            className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm p-5 cursor-pointer hover:shadow-md transition-shadow"
            onClick={onClick}
        >
            <div className="flex items-start gap-4 mb-5">
                <div className="relative flex-shrink-0">
                    {songCard.song.imageUrl ? (
                        <img
                            src={songCard.song.imageUrl}
                            alt={songCard.song.name}
                            className="w-[72px] h-[72px] rounded-xl object-cover"
                        />
                    ) : (
                        <div className="w-[72px] h-[72px] bg-green-500 rounded-xl flex items-center justify-center">
                            <MusicNoteIcon />
                        </div>
                    )}
                    <div className="absolute -top-2 -left-2 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-white text-[10px] font-bold">#{songCard.rank}</span>
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white text-xl leading-tight">{songCard.song.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{songCard.song.artist}</p>
                    {songCard.song.albumName && (
                        <p className="text-gray-400 dark:text-gray-500 text-sm">{songCard.song.albumName}</p>
                    )}
                </div>

                <div className="text-right flex-shrink-0">
                    {songCard.weeklyGrowthPercent !== null ? (
                        <div className="flex items-center gap-1 text-green-500 justify-end">
                            <TrendingUpIcon />
                            <span className="font-bold text-xl">+{songCard.weeklyGrowthPercent}%</span>
                        </div>
                    ) : (
                        <span className="font-bold text-xl text-gray-400 dark:text-gray-500">—</span>
                    )}
                    <p className="text-gray-400 dark:text-gray-500 text-xs mt-0.5">weekly growth</p>
                </div>
            </div>

            <div className="border-t border-gray-100 dark:border-zinc-800 pt-4">
                <div className="grid grid-cols-3">
                    <div>
                        <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500 text-xs mb-1">
                            <PlayIcon />
                            <span>Daily</span>
                        </div>
                        <p className="font-bold text-gray-900 dark:text-white">{formatListens(songCard.dailyListens)}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500 text-xs mb-1">
                            <PeopleIcon />
                            <span>Total</span>
                        </div>
                        <p className="font-bold text-gray-900 dark:text-white">{formatListens(songCard.totalListens)}</p>
                    </div>

                    <div>
                        <p className="text-gray-400 dark:text-gray-500 text-xs mb-1">Released</p>
                        <p className="font-bold text-gray-900 dark:text-white">{songCard.song.releaseDate ?? '—'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
