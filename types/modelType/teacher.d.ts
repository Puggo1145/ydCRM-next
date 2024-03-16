type TeacherStatus = "未对接" | "对接中" | "对接成功" | "对接失败"
type TeacherType = "合作意向强" | "了解观望" | "无合作意向" 

export interface Teacher {
    _id: string & Schema.ObjectId
    school_id: string & Schema.ObjectId

    teacher_name: string
    teacher_sex: string
    teacher_age?: number

    teacher_phone: string
    teacher_wechat?: string
    teacher_class?: string //毕业班年份
    teacher_type?: TeacherType

    teacher_status: TeacherStatus
    teacher_remark: string

    createdAt: string
    updatedAt: string
}