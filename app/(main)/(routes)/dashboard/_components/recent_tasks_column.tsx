import { ColumnDef } from "@tanstack/react-table"
import type { Task, TaskStatus } from "@/types/modelType/task"

import TaskStatusBadge from "@/components/task-status-badge"

export const columns: ColumnDef<Task>[] = [
    {
        accessorKey: "employee",
        header: "对接员工"
    },
    {
        accessorKey: "task_target",
        header: "任务目标"
    },
    {
        accessorKey: "task_amount",
        header: "目标数量"
    },
    {
        accessorKey: "status",
        header: "状态",
        cell: ({ row }) => {
            const status = row.getValue("status") as TaskStatus;

            return (
                <TaskStatusBadge>{status}</TaskStatusBadge>
            )
        }
    },
]