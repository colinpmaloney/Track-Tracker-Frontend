// TrackCard: each individual songs data lives inside one of these cards on the UI
// is contained inside the TrackList 

import type { SongCard } from "../types";

// formatListens helper function: make large integers suitable for shorthand stling (e.g "Daily Listens: 10.3M" compared to 10300000)
function formatListens(n: number): string {
    if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
    return n.toString()
}

export default function TrackCard({ songCard }: { songCard:SongCard }) {
    return(
        <div>
            <p>{ songCard.song.name }</p>
            <p>{ songCard.song.artist }</p>
            <p>{ songCard.rank }</p>
            <p>{ songCard.weeklyGrowthPercent }%</p>
            <p>{ formatListens(songCard.dailyListens) }</p>
            <p>{ formatListens(songCard.totalListens) }</p>
            {songCard.song.albumName ? <p>{songCard.song.albumName}</p> : null}
            {songCard.song.releaseDate ? <p>{songCard.song.releaseDate}</p> : null}
            {songCard.song.imageUrl ? <img src={songCard.song.imageUrl} alt={songCard.song.name} /> : <div>placeholder</div>}
        </div>
    )
}