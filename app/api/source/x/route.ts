import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log(body);
    } catch (e) {
        return NextResponse.json({ ok: false, id: "", message: `Error: ${e}` });
    }
}