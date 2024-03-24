"use client"

// shadcn components
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
// utils
import Loader from "@/components/loader";
import { toast } from 'sonner';
import Pubsub from "pubsub-js";
// hooks
import { useState } from "react";


const formSchema = z.object({
  school_name: z.string().min(1, { message: "学校名称不能为空" }).max(20, { message: "学校名称不能超过20个字符" }),
  school_remark: z.string().optional()
})


const AddSchoolForm: React.FC<{ setSheetOpen: (open: boolean) => void }> = ({ setSheetOpen }) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      school_name: "",
      school_remark: "",
    }
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);

    const payload = {
      ...data,
    }

    const res = await fetch("/api/data/school", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success("创建成功");
      form.reset();
      setTimeout(() => {
        Pubsub.publish("refresh-school-list");
        setSheetOpen(false)
        setLoading(false);
      }, 1000);
    } else {
      const { message } = await res.json();
      toast.error("创建失败：" + message);
      setLoading(false);
    }

  }

  return (
    <Form {...form}>
      <form
        className="relative h-full flex flex-col justify-between gap-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="school_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">学校名称：</FormLabel>
                <FormControl>
                  <Input placeholder="请输入学校名称" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="school_remark"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">备注：</FormLabel>
                <FormControl>
                  <Textarea placeholder="备注（可选）" className="max-h-[300px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="mt-8 w-full" type="submit" disabled={loading}>
          {loading && <Loader size="default" className="text-white" />}
          提交
        </Button>
      </form>
    </Form>
  );
};

export default AddSchoolForm;