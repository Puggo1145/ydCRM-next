// mock
import { generalInfo } from "@/mock/general-info";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const GeneralInfo: React.FC = () => {
    return (
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {
                generalInfo.map((item) => {
                    return (
                        <Card key={item.name} className="relative">
                            <CardHeader className="space-y-0 pb-2">
                                <CardTitle className="text-md font-bold">
                                    {item.alias}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {item.quantity}
                                </div>
                                {
                                    item.comparison && (
                                        <p className="
                                            text-xs text-muted-foreground absolute right-6 top-1/2 -translate-y-1/2
                                            py-2 px-4 bg-primary/5 rounded-full font-bold opacity-80"
                                            style={{ 
                                                color: item.comparison >= 0 ? "#30cb5b" : "#ff9213", 
                                                backgroundColor: item.comparison >= 0 ? "#c9ffd8" : "#ffdbb1", 
                                            }}
                                        >
                                            {item.comparison >= 0 ? '+' : '-'} {item.comparison * 100}% 
                                        </p>
                                    )
                                }
                            </CardContent>
                        </Card>
                    )
                })
            }
        </section>
    );
};

export default GeneralInfo;