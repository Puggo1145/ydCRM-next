import {
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
// types
import { ControllerRenderProps } from "react-hook-form";

interface Value {
    alias: string;
    value: string;
}

interface Props {
    // ControllerRenderProps 内部的类型不确定
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: ControllerRenderProps<any, string>;
    label: string;
    placeholder: string;
    values: Value[];
}

function FormItemSelect({ field, label, placeholder, values }: Props) {
    return (
        <FormItem>
            <FormLabel className="font-bold">{label}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {values.map(({ alias, value }) => (
                        <SelectItem key={value} value={value}>{alias}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <FormMessage />
        </FormItem>
    );
}

export default FormItemSelect;