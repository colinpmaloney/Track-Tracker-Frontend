/**
 * Analytics type definitions.
 * Computation is handled on the backend; these shapes represent the final results.
 */

export interface TrendDataPoint {
    // shape for 30 Day Listen Trend line graph
    date: string; 
    listens: number;
}

export interface HourlyDataPoint {
    // shape for 24 Hour Listen Distribution bar chart 
    hour: number; // 0-23
    listens: number;
}

export interface SongAnalytics {
    id: number;
    rank: number;
    dailyListens: number;
    totalListens: number;
    weeklyGrowthPercent: number | null;
    avgDailyGrowthPercent: number | null;
    monthlyGrowthPercent: number | null;
    allTimeGrowthPercent: number | null;
    listensPerHour: number;
    estimatedMonthlyListens: number;
    thirtyDayTrend: TrendDataPoint[]; 
    twentyFourHourDistribution: HourlyDataPoint[];
}