// Defines shape of analytics interfaces.
// Computation handled on backend, these shapes store final results of analysis

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
    weeklyGrowthPercent: number;
    avgDailyGrowthPercent: number; 
    listensPerHour: number;
    estimatedMonthlyListens: number;
    thirtyDayTrend: TrendDataPoint[]; 
    twentyFourHourDistribution: HourlyDataPoint[];
}