import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Plus } from 'lucide-react';

import { recentTasks } from "@/mock/recent-tasks";
import { DataTable } from "@/components/ui/data-tabel";
import { columns } from "./recent_tasks_column"

const RecentTasks: React.FC = () => {
    return (
        <Card className="mb-8">
            <CardHeader className="flex md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <CardTitle>最近任务</CardTitle>
                <div className="flex items-center space-x-4">
                    <Button><Plus size={20} />发布任务</Button>
                    <Button variant="secondary">查看详情</Button>
                </div>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={recentTasks} />
            </CardContent>
        </Card>
    );
};

export default RecentTasks;