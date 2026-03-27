// TrackList component: contains list of SongCards

import { SongCard } from "../types/song"

export default function TrackList({ songs }: { songs:SongCard[] }) {
    return (
        <div>
            {songs.map((song) => (
                <div key={song.song.id}> placeholder </div>
            ))}
        </div>
    )
}