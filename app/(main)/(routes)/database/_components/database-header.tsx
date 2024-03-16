import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search,
} from 'lucide-react';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import ChooseAddObject from "./choose-add-object";

const DatabaseHeader: React.FC = () => {
    return (
        <section className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <Breadcrumb>
                <BreadcrumbList className="text-lg md:text-xl">
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">XX学校</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">XX老师</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-bold">XX学生</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center justify-between gap-x-8">
                {/* 考虑搜索对象同名的问题，如果位于不同对象类型，则询问，如果位于相同对象类型，全部展示 */}
                <div className="flex gap-x-2">
                    <Input placeholder="输入姓名以搜索..." />
                    <Button variant="secondary"><Search /></Button>
                </div>
                <ChooseAddObject />
            </div>
        </section>
    );
};

export default DatabaseHeader;