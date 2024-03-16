import { timespan } from "@/constants/timespan.constants";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const TimespanPicker: React.FC = () => {
    return (
        <Select defaultValue={timespan[0].span.toString()}>
            <SelectTrigger className="max-w-28 w-full h-9 !mt-0">
                <SelectValue placeholder="请选择" />
            </SelectTrigger>
            <SelectContent align="end">
                <SelectGroup>
                    <SelectLabel>筛选时间范围</SelectLabel>
                    {
                        timespan.map((item) => (
                            <SelectItem 
                                className="cursor-pointer" 
                                key={item.name} 
                                value={item.span.toString()}
                            >
                                {item.alias}
                            </SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default TimespanPicker;