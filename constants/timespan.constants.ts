interface Timespan {
    name: string
    alias: string
    span: number
}

export const timespan: Timespan[] = [
    { name: "within_today", alias: "今日", span: 1 },
    { name: "within_three_days", alias: "三天内", span: 3 },
    { name: "within_week", alias: "过去一周", span: 7 },
    { name: "within_month", alias: "本月", span: 30 },
    { name: "within_quarter", alias: "本季度", span: 90 },
    { name: "within_semi_year", alias: "半年", span: 180 },
    { name: "within_year", alias: "今年", span: 365 },
];