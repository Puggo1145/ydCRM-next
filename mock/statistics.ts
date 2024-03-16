import type { 
    StatisticsData, 
    StatisticsDataTotalData 
} from "@/types/dataType/statistics";

export const data: StatisticsData[] = [
    { name: '一月', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: '二月', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: '三月', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: '四月', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: '五月', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: '六月', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: '七月', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: '八月', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: '九月', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: '十月', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: '十一月', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: '十二月', total: Math.floor(Math.random() * 5000) + 1000 },
]

export const statisticsDataTotalData: StatisticsDataTotalData = {
    success: { alias: "对接成功", quantity: 410 },
    total: { alias: "总对接数", quantity: 624 },
    successRate: { alias: "对接成功率", quantity: 0.66 },
}