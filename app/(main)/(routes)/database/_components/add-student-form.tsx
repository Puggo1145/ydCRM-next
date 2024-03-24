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
// utils
import Loader from "@/components/loader"
import { toast } from "sonner"
import PubSub from "pubsub-js"
// hooks
import { useState } from "react"
// stores
import useSelectedTeacher from "@/stores/databse/selectedTeacher"
import useSelectedSchool from "@/stores/databse/selectedSchool"

const formSchema = z.object({
  student_name: z.string().min(1, { message: "学生姓名不能为空" }),
  student_sex: z.enum(["男", "女"], { required_error: "请选择学生性别" }),
  student_phone: z.string({ required_error: "学生电话不能为空" }).regex(/^1\d{10}$/, "请输入正确的手机号"),
  student_wechat: z.string().optional(),
  student_mother_phone: z.string().optional(),
  student_father_phone: z.string().optional(),
  student_relative_phone: z.string().optional(),
  student_id_number: z.string().optional(),
  student_type: z.enum(["未知", "意向强", "考虑中", "无意向"], { required_error: "请选择学生类型" }),
  student_target_school_type: z.enum(["未知", "公办中职", "普高", "民办中职", "其他(备注)"], { required_error: "请选择学生目标学校类型" }),
  student_status: z.enum(["未对接", "对接中", "已联系", "未报名", "预报名", "全费报名", "已入学", "退学退费"], { required_error: "请选择学生状态" }),
  student_remark: z.string().optional()
})

const AddStudentForm: React.FC<{ setSheetOpen: (open: boolean) => void }> = ({ setSheetOpen }) => {
  const { selectedSchool } = useSelectedSchool();
  const { selectedTeacher } = useSelectedTeacher();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_name: "",
      student_phone: "",
      student_wechat: "",
      student_mother_phone: "",
      student_father_phone: "",
      student_relative_phone: "",
      student_id_number: "",
      student_remark: "",
    }
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    // setLoading(true);

    const payload = {
      ...data,
      school_id: selectedSchool!._id,
      teacher_id: selectedTeacher!._id,
    };

    const res = await fetch("/api/data/student", {
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
        PubSub.publish("refresh-student-list", { school_id: selectedSchool!._id, teacher_id: selectedTeacher!._id });
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
          {/*  student_name */}
          <FormField
            control={form.control}
            name="student_name"
            render={({ field }) => (
              <FormItemInput<typeof field> label={"学生姓名"} field={field} />
            )}
          />
          {/* student_sex */}
          <FormField 
            control={form.control}
            name="student_sex"
            render={({ field }) => (
              <FormItemSelect
                field={field}
                placeholder="请选择学生性别"
                label={"学生性别"}
                values={[
                  { alias: "男", value: "男" },
                  { alias: "女", value: "女" },
                ]}
              />
            )}
          />
          {/* student_phone */}
          <FormField
            control={form.control}
            name="student_phone"
            render={({ field }) => (
              <FormItemInput<typeof field> label={"学生电话"} field={field} />
            )}
          />
          {/* student_wechat */}
          <FormField
            control={form.control}
            name="student_wechat"
            render={({ field }) => (
              <FormItemInput<typeof field> label={"学生微信（可选）"} field={field} />
            )}
          />
          {/* student_mother_phone */}
          <FormField
            control={form.control}
            name="student_mother_phone"
            render={({ field }) => (
              <FormItemInput<typeof field> label={"母亲电话（可选）"} field={field} />
            )}
          />
          {/* student_father_phone */}
          <FormField
            control={form.control}
            name="student_father_phone"
            render={({ field }) => (
              <FormItemInput<typeof field> label={"父亲电话（可选）"} field={field} />
            )}
          />
          {/* student_relative_phone */}
          <FormField
            control={form.control}
            name="student_relative_phone"
            render={({ field }) => (
              <FormItemInput<typeof field> label={"其他联系人电话（可选）"} field={field} />
            )}
          />
          {/* student_id_number */}
          <FormField
            control={form.control}
            name="student_id_number"
            render={({ field }) => (
              <FormItemInput<typeof field> label={"学生身份证号（可选）"} field={field} />
            )}
          />
          {/* student_type */}
          <FormField
            control={form.control}
            name="student_type"
            render={({ field }) => (
              <FormItemSelect
                field={field}
                placeholder="请选择学生类型"
                label={"学生类型"}
                values={[
                  { alias: "未知", value: "未知" },
                  { alias: "意向强", value: "意向强" },
                  { alias: "考虑中", value: "考虑中" },
                  { alias: "无意向", value: "无意向" },
                ]}
              />
            )}
          />
          {/* student_target_school_type */}
          <FormField
            control={form.control}
            name="student_target_school_type"
            render={({ field }) => (
              <FormItemSelect
                field={field}
                placeholder="请选择学生目标学校类型"
                label={"学生目标学校类型"}
                values={[
                  { alias: "未知", value: "未知" },
                  { alias: "公办中职", value: "公办中职" },
                  { alias: "普高", value: "普高" },
                  { alias: "民办中职", value: "民办中职" },
                  { alias: "其他(备注)", value: "其他(备注)" },
                ]}
              />
            )}
          />
          {/* student_status */}
          <FormField
            control={form.control}
            name="student_status"
            render={({ field }) => (
              <FormItemSelect
                field={field}
                placeholder="请选择学生状态"
                label={"学生状态"}
                values={[
                  { alias: "未对接", value: "未对接" },
                  { alias: "对接中", value: "对接中" },
                  { alias: "已联系", value: "已联系" },
                  { alias: "未报名", value: "未报名" },
                  { alias: "预报名", value: "预报名" },
                  { alias: "全费报名", value: "全费报名" },
                  { alias: "已入学", value: "已入学" },
                  { alias: "退学退费", value: "退学退费" },
                ]}
              />
            )}
          />
          {/* student_remark */}
          <FormField
            control={form.control}
            name="student_remark"
            render={({ field }) => (
              <FormItemTextarea<typeof field>
                label={"备注"}
                field={field}
                placeholder="请输入备注"
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

export default AddStudentForm;