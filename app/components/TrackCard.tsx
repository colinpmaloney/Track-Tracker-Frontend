// TrackCard: each individual songs data lives inside one of these cards on the UI
// is contained inside the TrackList 

import type { SongCard } from "../types";

export default function TrackCard({ songCard }: { songCard:SongCard }) {
    return(
        <div>
            <p>{ songCard.song.name }</p>
            <p>{ songCard.song.artist }</p>
            <p>{ songCard.rank }</p>
            <p>{ songCard.weeklyGrowthPercent }%</p>
        </div>
    )
}