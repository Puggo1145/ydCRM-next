import { Schema, model, models } from "mongoose";
import type { Teacher } from "@/types/modelType/teacher";

const teacherSchema = new Schema<Teacher>({
    school_id: {
        type: Schema.ObjectId,
        ref: "School",
        required: true,
    },

    teacher_name: {
        type: String,
        required: true,
    },
    teacher_sex: {
        type: String,
        required: true,
    },
    teacher_age: {
        type: Number,
        required: false,
        default: ""
    },

    teacher_phone: {
        type: String,
        required: true,
    },
    teacher_wechat: {
        type: String,
        required: false,
        default: ""
    },
    teacher_class: {
        type: String,
        required: false,
        default: ""
    },
    teacher_type: {
        type: String,
        required: false,
        enum: ["合作意向强", "了解观望", "无合作意向"],
    },

    teacher_status: {
        type: String,
        required: true,
        enum: ["未对接", "对接中", "对接成功", "对接失败"],
    },
    teacher_remark: {
        type: String,
        required: false,
        default: ""
    }
}, { timestamps: true });

const TeacherModel = models.Teacher || model<Teacher>("Teacher", teacherSchema);

export default TeacherModel;