export interface StatisticsData {
    name: string
    total: number
}

export type StatisticsDataTotalDataItem = {
    alias: string
    quantity: number
}
export interface StatisticsDataTotalData {
    success: StatisticsDataTotalDataItem
    total: StatisticsDataTotalDataItem
    successRate: StatisticsDataTotalDataItem
}
