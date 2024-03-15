import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

import connectToDB from '@/utils/connectDB';

import User from '@/models/users';

type LoginBody = {
    username: string;
    password: string;
}

export const POST = async (req: NextRequest) => {
    const { username, password }: LoginBody = await req.json() as LoginBody;

    await connectToDB();

    const user = await User.findOne({ username });
    if (!user) {
        return NextResponse.json({ error: '用户名或密码错误' }, { status: 401 });
    }

    const isPwdMatch = await bcrypt.compare(password, user.password);
    if (!isPwdMatch) {
        return NextResponse.json({ error: '用户名或密码错误' }, { status: 401 });
    }

    return NextResponse.json(user, { status: 200 });
};