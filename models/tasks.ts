import { Schema, model, models } from "mongoose";
import type { Task } from "@/types/modelType/task";

const taskSchema = new Schema<Task>({
    task_name: {
        type: String,
        required: false,
        default: "未命名任务"
    },
    employee: {
        type: Schema.ObjectId,
        ref: "User",
    },
    task_target: {
        type: String,
        enum: ["学生", "班主任"],
        required: true,
    },
    task_amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["待确认", "进行中", "待审核", "已完成", "已逾期", "需修改"],
        required: true,
    },
    task_remark: {
        type: String,
        required: false,
        default: ""
    },
    deadline: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const TaskModel = models.Task || model<Task>("Task", taskSchema);

export default TaskModel;