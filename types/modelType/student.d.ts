type StudentStatus = '未对接' | '对接中' | '已联系' | '未报名' | '预报名' | '全费报名' | '已入学';
type StudentType = '未知' | '意向强' | '考虑中' | '无意向';
type StudentTargetSchoolType = '未知' | '公办中职' | '普高' | '民办中职' | '其他(备注)';

export interface Student {
    _id: string & Schema.ObjectId;
    teacher_id: string & Schema.ObjectId;
    school_id: string & Schema.ObjectId;

    student_name: string;
    student_sex: '男' | '女';

    student_phone?: string;
    student_wechat?: string;
    student_mother_phone?: string;
    student_father_phone?: string;
    student_relative_phone?: string;
    student_id_number: string;

    student_type: StudentType;
    student_target_school_type: StudentTargetSchoolType;
    student_status: StudentStatus;
    student_remark?: string;

    createdAt: Date;
    updatedAt: Date;
}