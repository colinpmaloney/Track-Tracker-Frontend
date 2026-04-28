"use client";

import { useEffect, useState } from "react";
import type { SongCard, SongCardDetails, TrendDataPoint } from "../types";
import { getTrackDetails } from "../lib/api";

function formatNumber(n: number): string {
    if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n.toString();
}

function formatGrowth(val: number | null): string {
    if (val === null) return "—";
    return `${val > 0 ? "+" : ""}${val}%`;
}

function MusicNoteIcon() {
    return (
        <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 4v9.38A3.5 3.5 0 1 0 11 17V9l8-2V4H9zm1 13a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm8-8-6 1.5V6l6-1.5V9z" />
        </svg>
    );
}

function Sparkline({ data }: { data: TrendDataPoint[] }) {
    if (data.length < 2) {
        return <p className="text-gray-400 text-sm text-center py-6">Not enough data</p>;
    }

    const W = 400;
    const H = 90;
    const padL = 52;  // left margin for y-axis labels
    const padR = 8;
    const padT = 8;
    const padB = 24; // bottom margin for x-axis labels
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;

    const values = data.map(d => d.listens);
    const minV = Math.min(...values);
    const maxV = Math.max(...values);
    const range = maxV - minV || 1;

    const toX = (i: number) => padL + (i / (data.length - 1)) * chartW;
    const toY = (v: number) => padT + chartH - ((v - minV) / range) * chartH;

    const points = data.map((d, i) => `${toX(i)},${toY(d.listens)}`).join(" ");

    // Y-axis: min and max labels
    const fmtY = (n: number) => n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n / 1_000).toFixed(0)}K` : String(n);

    // X-axis: first and last date labels (MM/DD)
    const fmtDate = (iso: string) => { const [, m, d] = iso.split("-"); return `${m}/${d}`; };
    const firstDate = fmtDate(data[0].date);
    const lastDate = fmtDate(data[data.length - 1].date);

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
            {/* Gridlines */}
            <line x1={padL} y1={padT} x2={padL} y2={padT + chartH} stroke="#e5e7eb" strokeWidth="1" />
            <line x1={padL} y1={padT + chartH} x2={padL + chartW} y2={padT + chartH} stroke="#e5e7eb" strokeWidth="1" />
            <line x1={padL} y1={padT} x2={padL + chartW} y2={padT} stroke="#f3f4f6" strokeWidth="1" strokeDasharray="3 3" />

            {/* Y-axis labels */}
            <text x={padL - 4} y={padT + 4} textAnchor="end" fontSize="9" fill="#9ca3af">{fmtY(maxV)}</text>
            <text x={padL - 4} y={padT + chartH} textAnchor="end" fontSize="9" fill="#9ca3af">{fmtY(minV)}</text>

            {/* X-axis labels */}
            <text x={padL} y={H - 4} textAnchor="middle" fontSize="9" fill="#9ca3af">{firstDate}</text>
            <text x={padL + chartW} y={H - 4} textAnchor="middle" fontSize="9" fill="#9ca3af">{lastDate}</text>

            {/* Line */}
            <polyline
                points={points}
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
            />

            {/* Endpoint dots */}
            <circle cx={toX(0)} cy={toY(data[0].listens)} r="2.5" fill="#22c55e" />
            <circle cx={toX(data.length - 1)} cy={toY(data[data.length - 1].listens)} r="2.5" fill="#22c55e" />
        </svg>
    );
}

function GrowthTile({ label, value }: { label: string; value: string }) {
    const isPositive = value.startsWith("+");
    const isNegative = value.startsWith("-");
    return (
        <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className={`font-bold text-lg ${isPositive ? "text-green-500" : isNegative ? "text-red-400" : "text-gray-400"}`}>
                {value}
            </p>
            <p className="text-gray-400 text-xs mt-0.5">{label}</p>
        </div>
    );
}

function StatTile({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="font-bold text-lg text-gray-900">{value}</p>
            <p className="text-gray-400 text-xs mt-0.5">{label}</p>
        </div>
    );
}

export default function TrackModal({ songCard, onClose }: { songCard: SongCard; onClose: () => void }) {
    const [details, setDetails] = useState<SongCardDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTrackDetails(songCard)
            .then(setDetails)
            .finally(() => setLoading(false));
    }, [songCard.song.id]);

    const analytics = details?.analytics;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-start gap-4 p-6 pb-4">
                    <div className="relative flex-shrink-0">
                        {songCard.song.imageUrl ? (
                            <img
                                src={songCard.song.imageUrl}
                                alt={songCard.song.name}
                                className="w-24 h-24 rounded-xl object-cover"
                            />
                        ) : (
                            <div className="w-24 h-24 bg-green-500 rounded-xl flex items-center justify-center">
                                <MusicNoteIcon />
                            </div>
                        )}
                        <div className="absolute -top-2 -left-2 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-white text-[10px] font-bold">#{songCard.rank}</span>
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <h2 className="font-bold text-gray-900 text-xl leading-tight">{songCard.song.name}</h2>
                        <p className="text-gray-500 text-sm mt-0.5">{songCard.song.artist}</p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-xl font-bold flex-shrink-0 leading-none"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                <div className="px-6 pb-6 space-y-5">
                    {loading ? (
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-2">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="bg-gray-100 rounded-xl h-16 animate-pulse" />
                                ))}
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="bg-gray-100 rounded-xl h-16 animate-pulse" />
                                ))}
                            </div>
                            <div className="bg-gray-100 rounded-xl h-20 animate-pulse" />
                        </div>
                    ) : (
                        <>
                            {/* Growth metrics */}
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Growth</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <GrowthTile label="Daily" value={formatGrowth(analytics?.avgDailyGrowthPercent ?? null)} />
                                    <GrowthTile label="Weekly" value={formatGrowth(analytics?.weeklyGrowthPercent ?? null)} />
                                    <GrowthTile label="Monthly" value={formatGrowth(analytics?.monthlyGrowthPercent ?? null)} />
                                    <GrowthTile label="All-time" value={formatGrowth(analytics?.allTimeGrowthPercent ?? null)} />
                                </div>
                            </div>

                            {/* Stream stats */}
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Streams</p>
                                <div className="grid grid-cols-3 gap-2">
                                    <StatTile label="Total" value={formatNumber(analytics?.totalListens ?? 0)} />
                                    <StatTile label="Daily change" value={formatNumber(analytics?.dailyListens ?? 0)} />
                                    <StatTile label="Per hour" value={formatNumber(analytics?.listensPerHour ?? 0)} />
                                </div>
                            </div>

                            {/* 30-day sparkline */}
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">30-Day Trend</p>
                                <div className="bg-gray-50 rounded-xl p-3">
                                    <Sparkline data={analytics?.thirtyDayTrend ?? []} />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
