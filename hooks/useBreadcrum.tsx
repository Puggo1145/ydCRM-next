import {
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// stores
import useSelectedSchool from "@/stores/databse/selectedSchool";
import useSelectedTeacher from "@/stores/databse/selectedTeacher";

function useBreadcrum() {
    const { selectedSchool } = useSelectedSchool();
    const { selectedTeacher } = useSelectedTeacher();

    // 1. 未选择学校
    if (!selectedSchool) {
        return "请选择学校"
    }
    // 2. 选择了学校，未选择老师
    else if (selectedSchool && !selectedTeacher) {
        return (
            <BreadcrumbItem>
                <BreadcrumbPage className="font-bold">
                    {selectedSchool.school_name}
                </BreadcrumbPage>
            </BreadcrumbItem>
        )
    }
    // 3. 选择了学校，选择了老师
    else if (selectedSchool && selectedTeacher) {
        return (
            <>
            <BreadcrumbItem>
                <BreadcrumbLink>
                    {selectedSchool.school_name}
                </BreadcrumbLink>
            </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className="font-bold">
                        {selectedTeacher.teacher_name}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </>
        )
    }
}

export default useBreadcrum;