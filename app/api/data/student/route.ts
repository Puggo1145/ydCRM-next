import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/utils/connectDB";
import StudentModel from "@/models/students";
import type { Student } from "@/types/modelType/student";

export const GET = async (req: NextRequest) => {
    const school_id = req.nextUrl.searchParams.get("school_id");
    const teacher_id = req.nextUrl.searchParams.get("teacher_id");

    await connectToDB();

    try {
        const students = await StudentModel.find({ school_id: school_id, teacher_id: teacher_id });
        return NextResponse.json(students, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "服务器错误" }, { status: 400 });
    }
}

export const POST = async (req: NextRequest) => {
    const body = await req.json() as Student;

    await connectToDB();

    try {
        // 理论上不应该允许重名学生存在，如果存在，应该手动添加一些特殊标识来区分
        const isStudentExist = await StudentModel.exists({ student_name: body.student_name });
        if (isStudentExist) {
            return NextResponse.json({ message: "学生已存在" }, { status: 400 });
        }

        await StudentModel.create(body);

        return NextResponse.json({ status: 201 });
    }
    catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({ message: err.message }, { status: 400 });
        } else {
            return NextResponse.json({ message: "未知错误" }, { status: 400 });
        }
    }
};