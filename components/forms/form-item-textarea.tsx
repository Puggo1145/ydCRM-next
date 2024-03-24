import { Textarea } from "@/components/ui/textarea"
import {
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"

interface Props<T> {
    field: T;
    label: string;
    placeholder?: string;
}

function FormItemTextarea<T>({ label, field, placeholder }: Props<T>) {
    return (
        <FormItem>
            <FormLabel className="font-bold">{label}</FormLabel>
            <FormControl>
                <Textarea placeholder={placeholder ?? `请输入${label}`} {...field} className="max-h-[420px]"/>
            </FormControl>
            <FormMessage />
        </FormItem>
    );
}

export default FormItemTextarea;