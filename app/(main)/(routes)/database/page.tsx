"use client"

// shadcn components
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
  Card,
} from "@/components/ui/card";
// components
import DatabaseHeader from "./_components/database-header";
import SchoolList from "./_components/school-list";
import TeacherList from "./_components/teacher-list";
import StudentList from "./_components/student-list";
// hooks
import { useEffect, useRef } from "react";
// stores
import useSelectedSchool from "@/stores/databse/selectedSchool";
import useSelectedTeacher from "@/stores/databse/selectedTeacher";
// types
import type { ImperativePanelHandle } from "react-resizable-panels";


const DatabasePage: React.FC = () => {
  const { selectedSchool } = useSelectedSchool();
  const { selectedTeacher } = useSelectedTeacher();

  const schoolListRef = useRef<ImperativePanelHandle>(null);
  const teacherListRef = useRef<ImperativePanelHandle>(null);
  const studentListRef = useRef<ImperativePanelHandle>(null);


  // 监听学校的选中对象，处理 resizeble 的宽度
  useEffect(() => {
    const schoolList = schoolListRef.current;
    const teacherList = teacherListRef.current;

    if (selectedSchool && !selectedTeacher) {
      schoolList?.resize(50);
      teacherList?.resize(50);
    } else if (selectedSchool && selectedTeacher) {
      schoolList?.resize(33);
      teacherList?.resize(33);
    } else {
      schoolList?.resize(100);
      teacherList?.resize(0);
    }
  }, [selectedSchool, selectedTeacher]);

  return (
    <div className="h-full flex flex-col">
      <section className="px-2 pb-4">
        <DatabaseHeader />
      </section>
      <Card className="h-full">
        <ResizablePanelGroup direction="horizontal">
          {/* school list panel */}
          <ResizablePanel
            minSize={10}
            className="h-full transition-all duration-500"
            ref={schoolListRef}
          >
            <SchoolList />
          </ResizablePanel>

          <ResizableHandle className="w-1 md:w-4" />

          {/* teacher list panel */}
          <ResizablePanel
            className="transition-all duration-500"
            ref={teacherListRef}
          >
            {selectedSchool && <TeacherList />}
          </ResizablePanel>

          <ResizableHandle className="w-1 md:w-4" />

          {/* student list panel */}
          <ResizablePanel
            className="transition-all duration-500"
            ref={studentListRef}
          >
            {selectedTeacher && <StudentList />}
          </ResizablePanel>

        </ResizablePanelGroup>
      </Card>
    </div>
  );
};

export default DatabasePage;