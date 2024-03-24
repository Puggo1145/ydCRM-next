"use client"

// shadcn components
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormField,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
// components
import FormItemInput from "@/components/forms/form-item-input"
import FormItemSelect from "@/components/forms/form-item-select"
import FormItemTextarea from "@/components/forms/form-item-textarea"
// stores
import useSelectedSchool from "@/stores/databse/selectedSchool";
// hooks
import { useState } from "react"
// utils
import Loader from "@/components/loader"
import { toast } from "sonner"
import PubSub from "pubsub-js"


const formSchema = z.object({
    teacher_name: z.string().min(1, { message: "班主任姓名不能为空" }),
    teacher_phone: z.string({ required_error: "班主任电话不能为空" }).regex(/^1\d{10}$/, "请输入正确的手机号"),
    teacher_wechat: z.string().optional(),
    teacher_class: z.string().optional(),
    teacher_type: z.enum(
        ["未知", "合作意向强", "了解观望", "无合作意向"],
        { required_error: "请选择班主任类型" }
    ),
    teacher_status: z.enum(
        ["未对接", "对接中", "对接成功", "对接失败"],
        { required_error: "请选择班主任状态" }
    ),
    teacher_remark: z.string().optional()
})


const AddTeacherForm: React.FC<{ setSheetOpen: (open: boolean) => void }> = ({ setSheetOpen }) => {
    const { selectedSchool } = useSelectedSchool();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            teacher_name: "",
            teacher_phone: "",
            teacher_wechat: "",
            teacher_class: "",
            teacher_remark: "",
        }
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setLoading(true);

        const payload = {
            ...data,
            school_id: selectedSchool?._id
        };

        const res = await fetch("/api/data/teacher", {
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
                PubSub.publish("refresh-teacher-list", selectedSchool?._id);
                setSheetOpen(false);
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
                className="relative h-full"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="space-y-4">
                    {/*  teacher_name */}
                    <FormField
                        control={form.control}
                        name="teacher_name"
                        render={({ field }) => (
                            <FormItemInput<typeof field> label={"班主任姓名"} field={field} />
                        )}
                    />
                    {/* teacher_phone */}
                    <FormField
                        control={form.control}
                        name="teacher_phone"
                        render={({ field }) => (
                            <FormItemInput<typeof field> label={"班主任电话"} field={field} />
                        )}
                    />
                    {/* teacher_wechat */}
                    <FormField
                        control={form.control}
                        name="teacher_wechat"
                        render={({ field }) => (
                            <FormItemInput<typeof field> label={"班主任微信（可选）"} field={field} />
                        )}
                    />
                    {/* teacher_class */}
                    <FormField
                        control={form.control}
                        name="teacher_class"
                        render={({ field }) => (
                            <FormItemInput<typeof field> label={"毕业班班级（可选）"} field={field} />
                        )}
                    />
                    {/* teacher_type */}
                    <FormField
                        control={form.control}
                        name="teacher_type"
                        render={({ field }) => (
                            <FormItemSelect
                                field={field}
                                placeholder="请选择班主任类型"
                                label={"班主任类型"}
                                values={[
                                    { alias: "未知", value: "未知" },
                                    { alias: "合作意向强", value: "合作意向强" },
                                    { alias: "了解观望", value: "了解观望" },
                                    { alias: "无合作意向", value: "无合作意向" },
                                ]}
                            />
                        )}
                    />
                    {/* teacher_status */}
                    <FormField
                        control={form.control}
                        name="teacher_status"
                        render={({ field }) => (
                            <FormItemSelect
                                field={field}
                                placeholder="请选择班主任状态"
                                label={"班主任状态"}
                                values={[
                                    { alias: "未对接", value: "未对接" },
                                    { alias: "对接中", value: "对接中" },
                                    { alias: "对接成功", value: "对接成功" },
                                    { alias: "对接失败", value: "对接失败" },
                                ]}
                            />
                        )}
                    />
                    {/* teacher_remark */}
                    <FormField
                        control={form.control}
                        name="teacher_remark"
                        render={({ field }) => (
                            <FormItemTextarea<typeof field>
                                label={"备注（可选）"}
                                field={field}
                            />
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

export default AddTeacherForm;