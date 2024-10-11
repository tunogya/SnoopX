// /api/event/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyEvent } from 'nostr-tools';
import snsClient from "../../../utils/snsClient";
import { PublishCommand } from "@aws-sdk/client-sns";
import redisClient from "../../../utils/redisClient";
import {connectToDatabase} from "../../../utils/db";
import {embedding} from '@/utils/embedding';
import redis from "@/utils/redisClient";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    const kind = searchParams.get("kind");
    const pubkey = searchParams.get("pubkey");
    const limit = searchParams.get("limit");
    const since = searchParams.get("since");
    const until = searchParams.get("until");
    const search = searchParams.get("search");

    try {
        const cached = await redis.get(`event:${searchParams.toString()}`)
        if (cached) {
            return NextResponse.json(cached);
        }
    } catch (e) {
        console.log(e)
    }

    const query = {} as any;
    const option = {
        limit: limit ? parseInt(limit) : 20,
        sort: {
            created_at: -1,
        }
    } as any;

    if (id) {
        query.id = id;
    }
    if (kind) {
        query.kind = parseInt(kind);
    }
    if (pubkey) {
        query.pubkey = pubkey;
    }
    if (since) {
        query.created_at = { $gte: parseInt(since) };
    }
    if (until) {
        query.created_at = { $lte: parseInt(until) };
    }
    if (search) {
        option.$vector = await embedding(search);
    }

    const { db } = await connectToDatabase();

    const data = await db
    .collection("events")
    .find(query, option)
    .toArray();

    try {
        await redis.set(`event:${searchParams.toString()}`, {
            ok: true,
            cache: true,
            data
        }, {
            ex: 60
        })
    } catch (e) {
        console.log(e)
    }

    return NextResponse.json({ ok: true, data });
}

export async function POST(req: NextRequest) {
    try {
        const { id, kind, pubkey, created_at, content, tags, sig } = await req.json();
        const isValid = verifyEvent({
            id,
            kind,
            pubkey,
            created_at,
            content,
            tags,
            sig
        });
        // 检查事件是否有效
        if (!isValid) {
            return NextResponse.json({ ok: false, id, message: "Invalid event" });
        }
        // 检查事件是否已经处理过？
        const _event = await redisClient.get(`event:${id}`);
        if (_event) {
            return NextResponse.json({ ok: false, id, message: "Event has been processed" });
        }

        // 将事件传入AWS SNS
        const result = await snsClient.send(
            new PublishCommand({
                TopicArn: process.env.NOSTR_EVENTS_SNS_ARN,
                Message: JSON.stringify({
                    id,
                    kind,
                    pubkey,
                    created_at,
                    content,
                    tags,
                    sig,
                }),
                MessageAttributes: {
                    kind: {
                        DataType: "Number",
                        StringValue: kind.toString(),
                    },
                    role: {
                        DataType: "String",
                        StringValue: "user",
                    },
                },
            }),
        );

        if (result.MessageId) {
            // 将事件写入redis 7天
            await redisClient.set(`event:${id}`, true, { ex: 60 * 60 * 24 * 7 });
            return NextResponse.json({ ok: true, id, message: "Event received successfully" });
        } else {
            return NextResponse.json({ ok: false, id, message: "SNS send error" });
        }
    } catch (e) {
        return NextResponse.json({ ok: false, id: "", message: `Error: ${e}` });
    }
}