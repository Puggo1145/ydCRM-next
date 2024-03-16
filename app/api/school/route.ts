import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/utils/connectDB";
import SchoolModel from "@/models/schools";
import type { School } from "@/types/modelType/school";

export const POST = async(req: NextRequest) => {
    const body = await req.json() as School;

    await connectToDB();
    
    try {
        const isSchoolExist = await SchoolModel.findOne({ name: body.school_name });
        if (isSchoolExist) {
            return NextResponse.json({ error: "学校已存在" }, { status: 400 });
        }

        const school = await SchoolModel.create(body);
        return NextResponse.json(school, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: "创建失败" }, { status: 400 });
    }
};