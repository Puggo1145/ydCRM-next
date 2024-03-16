"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";
import { toast } from 'sonner';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
    name: z.string().min(2, {
        message: "用户名必须至少包含2个字符"
    }),
    password: z.string().min(8, {
        message: "密码必须至少包含8个字符"
    })
})

const Login: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            password: ""
        }
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true);

        const res = await signIn("credentials", {
            redirect: false,
            name: data.name,
            password: data.password,
        });

        if (res?.ok) {
            toast.success("登录成功");
            setTimeout(() => router.push("/"), 1000);
        } else {
            form.setError("password", { message: "用户名或密码错误" });
            form.setError("name", { message: "用户名或密码错误" });
        }

        setLoading(false);
    }


    return (
        <div className="h-full flex items-center justify-center">
            <Card className="max-w-[350px] w-full">
                <CardHeader>
                    <CardTitle>登录</CardTitle>
                    <CardDescription>请登录以继续</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-y-4">
                        <Form {...form}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col w-full space-y-1.5">
                                        <FormLabel className="font-bold">用户名</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="请输入用户名" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col w-full space-y-1.5">
                                        <FormLabel className="font-bold">密码</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="请输入密码" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="text-white w-full gap-x-2" type="submit" disabled={loading} >
                                { loading && <Loader size="default" className="text-white"/> }
                                登录
                            </Button>
                        </Form>
                    </form>
                </CardContent>

            </Card>
        </div>
    );
};

export default Login;