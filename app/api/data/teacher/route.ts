import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/utils/connectDB";
import TeacherModel from "@/models/teachers";
import type { Teacher } from "@/types/modelType/teacher";

export const GET = async(req: NextRequest) => {
    const school_id = req.nextUrl.searchParams.get("id");

    await connectToDB();

    try {
        const teachers = await TeacherModel.find({ school_id: school_id });

        return NextResponse.json(teachers ?? []);
    } catch (err) {
        return NextResponse.json({ message: "服务器错误" }, { status: 400 });
    }
};

export const POST = async(req: NextRequest) => {
    const body = await req.json() as Teacher;

    await connectToDB();

    try {
        const isTeacherExist = await TeacherModel.exists({ teacher_name: body.teacher_name });
        if (isTeacherExist) {
            return NextResponse.json({ message: "教师已存在" }, { status: 400 });
        }

        await TeacherModel.create(body);
        
        return NextResponse.json({ status: 201 });
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({ message: err.message }, { status: 400 });
        } else {
            return NextResponse.json({ message: "未知错误" }, { status: 400 });
        }
    }
};