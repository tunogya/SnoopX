// /api/req/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../utils/db';

export async function POST(req: NextRequest) {
    try {
        const filter = await req.json();
        const { db } = await connectToDatabase();

        const { ids, authors, kinds, limit, search, since, until } = filter;
        const query: Record<string, any> = {};
        if (ids && ids.length > 0) {
            query.id = { $in: ids };
        }
        if (authors && authors.length > 0) {
            query.pubkey = { $in: authors };
        }
        if (kinds && kinds.length > 0) {
            query.kind = { $in: kinds };
        }
        if (since) {
            query.created_at = { $gte: since };
        }
        if (until) {
            query.created_at = {
                ...query.created_at,
                $lte: until,
            };
        }
        // 查询数据库，并返回;
        const data = db
            .collection("events")
            .find(query)
            .limit(limit || 20)
            .toArray();

        return NextResponse.json(["OK", true, data]);
    } catch (e) {
        return NextResponse.json(["OK", false, `error: ${e}`]);
    }
}