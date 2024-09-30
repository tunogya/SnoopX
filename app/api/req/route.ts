// /api/req/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const event = await req.json();
    console.log(event);
    // 查询数据库，并返回;
    return NextResponse.json({ event });
}