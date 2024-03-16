import { VisAxis, VisTooltip, VisStackedBar, VisXYContainer } from '@unovis/react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import TimespanPicker from './timespan-picker';

// mock
import { data, statisticsDataTotalData } from '@/mock/statistics';
import { StackedBar } from '@unovis/ts';
type Data = typeof data[number]

const Statistics: React.FC = () => {
    // TODO: finish toolip on charts
    const toolipTrigger = {

    }

    return (
        <Card className='w-full'>
            <CardHeader className='flex flex-row items-center justify-between'>
                <CardTitle>数据总览</CardTitle>
                <TimespanPicker />
            </CardHeader>
            <CardContent>
                <ul className='w-full flex gap-x-6 items-center'>
                    {
                        Object.entries(statisticsDataTotalData).map(([key, value]) => (
                            <li key={key}>
                                <p className='text-muted-foreground text-sm'>
                                    {value.alias}
                                </p>
                                <p className='text-3xl'>
                                    {key === "successRate" ? `${value.quantity*100}%` : value.quantity}
                                </p>
                            </li>
                        ))
                    }
                </ul>
            </CardContent>
            <CardContent className='pl-1'>
                <VisXYContainer height="350px" margin={{ left: 20, right: 20 }} data={data}>
                    <VisStackedBar
                        x={(_, i: number) => i}
                        y={(d: Data) => d.total}
                        color="#2563eb"
                        roundedCorners={4}
                        barPadding={0.15}
                    />
                    <VisAxis
                        type="x"
                        numTicks={data.length}
                        tickFormat={(_, i: number) => data[i]?.name}
                        gridLine={false}
                        tickLine={false}
                        color={"#888888"}
                    />
                    <VisAxis
                        type="y"
                        numTicks={data.length}
                        tickFormat={(i: number) => data[i]?.name}
                        gridLine={false}
                        tickLine={false}
                        color={"#888888"}
                    />
                </VisXYContainer>
            </CardContent>
        </Card>
    );
};

export default Statistics;