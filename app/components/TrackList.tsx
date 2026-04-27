"use client";

import { useState } from "react";
import type { SongCard } from "../types/song";
import TrackCard from "./TrackCard";
import TrackModal from "./TrackModal";

const colClass: Record<2 | 3, string> = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
}

export default function TrackList({ songs, columns = 2 }: { songs: SongCard[]; columns?: 2 | 3 }) {
    const [selectedSong, setSelectedSong] = useState<SongCard | null>(null);

    return (
        <>
            <div className={`grid ${colClass[columns]} gap-4`}>
                {songs.map((song) => (
                    <TrackCard
                        key={song.rank}
                        songCard={song}
                        onClick={() => setSelectedSong(song)}
                    />
                ))}
            </div>

            {selectedSong && (
                <TrackModal
                    songCard={selectedSong}
                    onClose={() => setSelectedSong(null)}
                />
            )}
        </>
    );
}
