// TrackList component: contains list of SongCards

import { SongCard } from "../types/song"
import TrackCard from "./TrackCard"

export default function TrackList({ songs }: { songs:SongCard[] }) {
    return (
        <div>
            {songs.map((song) => (
                <TrackCard key={song.song.id} songCard={song} />
            ))}
        </div>
    )
}