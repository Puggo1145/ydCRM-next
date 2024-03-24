import {
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface Props<T> {
    field: T;
    label: string;
    palceholder?: string;
}

function FormItemInput<T>({ label, palceholder, field }: Props<T>) {
  return (
    <FormItem>
        <FormLabel className="font-bold">{label}</FormLabel>
        <FormControl>
            <Input placeholder={palceholder || `请输入${label}`} {...field} />
        </FormControl>
        <FormMessage />
    </FormItem>
  );
}

export default FormItemInput;