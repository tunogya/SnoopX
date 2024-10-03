// /api/event/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyEvent } from 'nostr-tools';
import snsClient from "../../../utils/snsClient";
import { PublishCommand } from "@aws-sdk/client-sns";
import redisClient from "../../../utils/redisClient";

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