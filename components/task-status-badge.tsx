import type { TaskStatus, TaskStatusColor } from "@/types/modelType/task";
import { Badge } from "@/components/ui/badge";
import { PropsWithChildren } from "react";

const TaskStatusBadge: React.FC<PropsWithChildren> = ({ children }) => {
    const taskStatusColor: TaskStatusColor = {
        '待确认': '#6c6c6c',
        '进行中': '#FF8A00',
        '待审核': '#3963EB',
        '已完成': '#30CB5B',
        '已逾期': '#DE1F1F',
        '需修改': '#B43AAF'
    };

    return (
        <Badge
            className="dark:opacity-70 whitespace-nowrap"
            style={{ backgroundColor: taskStatusColor[children as TaskStatus] }}
        >
            {children}
        </Badge>
    );
};

export default TaskStatusBadge;