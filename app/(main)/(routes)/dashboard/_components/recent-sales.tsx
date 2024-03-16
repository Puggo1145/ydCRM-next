import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area";
import { recentSales } from "@/mock/recent-sales";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import TimespanPicker from "./timespan-picker";

const RecentSales: React.FC = () => {
    return (
        <Card className="w-full h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="w-full">
                    <CardTitle className="text-md">业绩排名</CardTitle>
                    <CardDescription>本月累计业绩为：xxx</CardDescription>
                </div>
                <TimespanPicker />
            </CardHeader>
            <CardContent className="h-full">
                <ScrollArea className="h-[420px]">
                    <ul>
                        {
                            recentSales.map((item, index) => {
                                return (
                                    <li key={item.phone} className="flex items-center justify-between my-4">
                                        <div className="flex items-center gap-x-3">
                                            <span className="mr-2 text-muted-foreground">{index + 1}</span>
                                            <Avatar>
                                                <AvatarImage sizes="40" src={item.image} />
                                            </Avatar>
                                            <div>
                                                <h3 className="text-sm font-bold">{item.name}</h3>
                                                <p className="text-xs text-muted-foreground hidden md:block">{item.phone}</p>
                                            </div>
                                        </div>
                                        <span className="text-md font-bold mr-4">{item.quantity} 人</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default RecentSales;