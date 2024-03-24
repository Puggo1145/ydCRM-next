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
import type { Student } from "@/types/modelType/student";
// stores
import useSelectedSchool from "@/stores/databse/selectedSchool";
import useSelectedTeacher from "@/stores/databse/selectedTeacher";

const StudentList: React.FC = () => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const { selectedSchool } = useSelectedSchool();
  const { selectedTeacher } = useSelectedTeacher();

  // 订阅刷新教师列表事件
  useEffect(() => {
    const token = PubSub.subscribe("refresh-student-list", (_, msg) => getStudents(msg.school_id, msg.teacher_id));

    return () => {
      PubSub.unsubscribe(token);
    }
  }, []);


  // 根据 teacher 对象变动存在 3 种情况：1. 初始化 2. 选中了新的老师 => 清除并重新获取 3. 取消选中老师 => 清除
  useEffect(() => {
    setAllStudents([]);

    if (!selectedTeacher) return
    getStudents(selectedSchool!._id, selectedTeacher._id);
  }, [selectedTeacher]);


  const getStudents = async (school_id: string, teacher_id: string) => {
    if (!selectedSchool) return;

    setIsFetching(true);
    const res = await fetch(`/api/data/student?school_id=${school_id}&teacher_id=${teacher_id}`);

    if (res.ok) {
      const data = await res.json();
      setAllStudents(data);
    } else {
      const data = await res.json();
      toast.error(data.message);
    }

    setIsFetching(false);
  };

  if (allStudents.length === 0) return (
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
        {allStudents.map((student) => (
          <li
            key={student._id}
            className={
              cn(
                "w-full h-10 px-4 rounded-md",
                "line-clamp-1 whitespace-nowrap text-sm",
                "flex items-center",
                "hover:bg-primary-foreground cursor-pointer",
              )
            }
          >
            {student.student_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;