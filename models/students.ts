import { Schema, model, models } from "mongoose";
import type { Student } from "@/types/modelType/student";

const studentSchema = new Schema<Student>({
    teacher_id: {
        type: Schema.ObjectId,
        ref: "Teacher",
        required: true,
    },
    school_id: {
        type: Schema.ObjectId,
        ref: "School",
        required: true,
    },

    student_name: {
        type: String,
        required: true,
    },
    student_sex: {
        type: String,
        required: true,
    },
    student_age: {
        type: Number,
        required: false,
    },

    student_phone: {
        type: String,
        required: false,
    },
    student_wechat: {
        type: String,
        required: false,
    },
    student_mother_phone: {
        type: String,
        required: false,
    },
    student_father_phone: {
        type: String,
        required: false,
    },
    student_relative_phone: {
        type: String,
        required: false,
    },

    student_type: {
        type: String,
        enum: ["未知", "意向强", "考虑中", "无意向"],
        required: true,
    },
    student_target_school_type: {
        type: String,
        enum: ["未知", "公办中职", "普高", "民办中职", "职高", "特教", "其他(备注)"],
        required: true,
    },
    student_status: {
        type: String,
        enum: ["未对接", "对接中", "已联系", "未报名", "预报名", "全费报名", "已入学"],
        required: true,
    },
    student_remark: {
        type: String,
        required: false,
    },
}, { timestamps: true });

const TeacherModel = models.Student || model<Student>("Student", studentSchema);

export default TeacherModel;