// TrackList component: contains list of SongCards

import { SongCard } from "../types/song"
import TrackCard from "./TrackCard"

export default function TrackList({ songs }: { songs:SongCard[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {songs.map((song) => (
                <TrackCard key={song.song.id} songCard={song} />
            ))}
        </div>
    )
}