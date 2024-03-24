"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { addObjects } from "./choose-add-object";
// types
import type { Objects } from "./choose-add-object";

import AddSchoolForm from "./add-school-form";
import AddTeacherForm from "./add-teacher-form";
import AddStudentForm from "./add-student-form";

// stores
import useSelectedSchool from "@/stores/databse/selectedSchool";
import useSelectedTeacher from "@/stores/databse/selectedTeacher";

interface AddObjectSheetProps {
  object: Objects | undefined;
  isSheetOpen: boolean;
  setIsSheetOpen: (open: boolean) => void;
}

const AddObjectSheet: React.FC<AddObjectSheetProps> = ({ object, isSheetOpen, setIsSheetOpen }) => {
  const { selectedSchool } = useSelectedSchool();
  const { selectedTeacher } = useSelectedTeacher();

  const objectAlias = addObjects.find((o) => o.object === object)?.alias;
  const fatherObject = 
    object === 'teacher' && `向 ${selectedSchool?.school_name} ` || 
    object === 'student' && `向 ${selectedTeacher?.teacher_name}老师 `;

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent className="w-full md:min-w-[480px] flex flex-col">
        <SheetHeader className="items-start">
          <SheetTitle>
            {fatherObject}添加{objectAlias}
          </SheetTitle>
          <SheetDescription>
            为了更好地区分不同的班主任和学生，系统不允许添加同名对象。请在出现名字重复错误时，手动添加一些后缀来区分
          </SheetDescription>
        </SheetHeader>
        <section className="h-full overflow-y-scroll">
          {object === "school" && <AddSchoolForm setSheetOpen={setIsSheetOpen} />}
          {object === "teacher" && <AddTeacherForm setSheetOpen={setIsSheetOpen} />}
          {object === "student" && <AddStudentForm setSheetOpen={setIsSheetOpen} />}
        </section>
      </SheetContent>
    </Sheet>
  );
};

export default AddObjectSheet;