import { Schema, model, models } from "mongoose";
import type { Teacher } from "@/types/modelType/teacher";

const teacherSchema = new Schema<Teacher>({
    school_id: {
        type: Schema.ObjectId,
        ref: "School",
        required: true,
    },

    teacher_name: { // super-admin, admin, employee
        type: String,
        required: true,
    },

    teacher_phone: { // super-admin, admin, employee
        type: String,
        required: true,
    },
    teacher_wechat: { // super-admin, admin, employee
        type: String,
        required: false,
        default: ""
    },
    teacher_class: { // super-admin, admin, employee
        type: String,
        required: false,
        default: ""
    },
    teacher_type: { // super-admin, employee
        type: String,
        required: false,
        enum: ["未知", "合作意向强", "了解观望", "无合作意向"],
    },

    teacher_status: { // super-admin, employee
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