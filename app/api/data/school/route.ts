import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/utils/connectDB";
import SchoolModel from "@/models/schools";

import type { School } from "@/types/modelType/school";

export const GET = async() => {

    await connectToDB();

    try {
        const schools = await SchoolModel.find();
        return NextResponse.json(schools, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "服务器错误" }, { status: 400 });
    }
};

export const POST = async(req: NextRequest) => {
    const body = await req.json() as School;

    await connectToDB();
    
    try {
        const isSchoolExist = await SchoolModel.exists({ school_name: body.school_name });
        if (isSchoolExist) {
            return NextResponse.json({ message: "学校已存在" }, { status: 400 });
        }

        await SchoolModel.create(body);
        
        return NextResponse.json({ status: 201 });
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({ message: err.message }, { status: 400 });
        } else {
            return NextResponse.json({ message: "未知错误" }, { status: 400 });
        }
    }
};