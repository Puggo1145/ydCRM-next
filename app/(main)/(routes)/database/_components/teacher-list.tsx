"use client"

// utils
import { cn } from "@/lib/utils";
import Loader from "@/components/loader";
import { toast } from "sonner";
import PubSub from "pubsub-js";
// components
import NoData from "@/components/no-data";
// hooks
import { useState, useEffect } from "react";
// types
import type { Teacher } from "@/types/modelType/teacher";
// stores
import useSelectedSchool from "@/stores/databse/selectedSchool";
import useSelectedTeacher from "@/stores/databse/selectedTeacher";

const TeacherList: React.FC = () => {
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);
    const { selectedSchool } = useSelectedSchool();
    const { selectedTeacher, setSelectedTeacher } = useSelectedTeacher();

    // 订阅列表刷新事件
    useEffect(() => {
        const token = PubSub.subscribe("refresh-teacher-list", (_, school_id) => getTeachers(school_id));

        return () => {
            PubSub.unsubscribe(token);
        }
    }, []);

    // 根据 school 对象变动存在3种情况：1. 初始化 2. 选中了新的学校 => 清除并重新获取 3. 取消选中学校 => 清除
    useEffect(() => {
        setSelectedTeacher(null);
        setAllTeachers([]);

        if (!selectedSchool) return
        getTeachers(selectedSchool._id);
    }, [selectedSchool]);


    const getTeachers = async (school_id: string) => {
        setIsFetching(true);
        const res = await fetch(`/api/data/teacher?id=${school_id}`);

        if (res.ok) {
            const data = await res.json();
            setAllTeachers(data);
        } else {
            const data = await res.json();
            toast.error(data.message);
        }

        setIsFetching(false);
    };


    function selectTeacher(teacher: Teacher) {
        if (selectedTeacher?._id === teacher._id) {
            setSelectedTeacher(null);
        } else {
            setSelectedTeacher(teacher);
        }
    }

    if (allTeachers.length === 0) return (
        <div className="w-full h-full flex items-center justify-center">
            <NoData />
        </div>
    )

    if (isFetching) return (
        <div className="mt-2 ml-2">
            <Loader size="lg" />
        </div>
    )


    return (
        <div className="p-2 space-y-2">
            <h1 className="text-lg font-bold p-4 border-b">班主任</h1>
            <ul className="w-full flex flex-col">
                {allTeachers.map((teacher) => (
                    <li
                        key={teacher._id}
                        className={
                            cn(
                                "w-full h-10 px-4 rounded-md",
                                "line-clamp-1 whitespace-nowrap text-sm",
                                "flex items-center",
                                "hover:bg-primary-foreground cursor-pointer",
                                selectedTeacher?._id === teacher._id && "bg-primary text-white hover:bg-primary"
                            )
                        }
                        onClick={() => selectTeacher(teacher)}
                    >
                        {teacher.teacher_name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeacherList;