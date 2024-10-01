// /api/event/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyEvent } from 'nostr-tools';
import snsClient from "../../../utils/snsClient";
import { PublishCommand } from "@aws-sdk/client-sns";

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
        if (!isValid) {
            return NextResponse.json(["OK", id, false, `invalid: Invalid event`]);
        }
        // 事件是否已经处理过？
        // use redis to check if the event has been processed
        // if (redisClient.get(id)) {
        //     return NextResponse.json(["OK", id, false, `duplicate: Event has been processed.`]);
        // }

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
            return NextResponse.json(["OK", id, true, `Event received successfully.`]);
        } else {
            return NextResponse.json(["OK", id, false, `error: SNS send error.`]);
        }
    } catch (e) {
        return NextResponse.json(["OK", "", false, `error: ${e}`]);
    }
}