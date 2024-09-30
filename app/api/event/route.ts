// /api/event/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const event = await req.json();
    console.log(event);
    // 检查事件是否合格，如果合格，则传入AWS SNS
    // 否则报错返回

    return NextResponse.json({ event });
}