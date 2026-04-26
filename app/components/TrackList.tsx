import { SongCard } from "../types/song"
import TrackCard from "./TrackCard"

const colClass: Record<2 | 3, string> = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
}

export default function TrackList({ songs, columns = 2 }: { songs: SongCard[]; columns?: 2 | 3 }) {
    return (
        <div className={`grid ${colClass[columns]} gap-4`}>
            {songs.map((song) => (
                <TrackCard key={song.rank} songCard={song} />
            ))}
        </div>
    )
}
