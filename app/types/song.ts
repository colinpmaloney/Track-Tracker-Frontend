// Defines Song metadata interface and SongCard interfaces

import { SongAnalytics } from "./analytics";

export interface Song {
    // core metadata
    id: number;   
    name: string; 
    artist: string; // join from artist via track_artist 
    albumName: string | null; // not yet in schema 
    imageUrl: string | null;  // not yet in schema 
    releaseDate: string | null; 
}

export interface SongCard {
    // basic song card view 
    song: Song; 
    rank: SongAnalytics["rank"];
    weeklyGrowthPercent: SongAnalytics["weeklyGrowthPercent"];
    dailyListens: SongAnalytics["dailyListens"];
    totalListens: SongAnalytics["totalListens"];
}

export interface SongCardDetails{
    // expanded song card on click
    songCard: SongCard;
    analytics: SongAnalytics;
}