export type TaskStatus = '待确认' | '进行中' | '待审核' | '已完成' | '已逾期' | '需修改' ;
export type TaskStatusColor = {
    [prop in TaskStatus]: string
}
type TaskTarget = '学生' | '班主任' | '学生回访';

import type { Schema } from "mongoose";

export interface Task {
    _id: string & Schema.ObjectId
    task_name: string
    employee: string & Schema.ObjectId // 负责员工
    task_target: TaskTarget
    task_amount: number
    status: TaskStatus
    task_remark: string
    createdAt: string
    deadline: string
}