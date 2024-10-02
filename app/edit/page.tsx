"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { finalizeEvent } from "nostr-tools/pure";
import { hexToBytes } from '@noble/hashes/utils';
import { generateSecretKey } from "nostr-tools/pure";

const Page = () => {
    const router = useRouter();
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const save = async () => {
        try {
            setLoading(true);
            let sk;
            if (window?.Telegram?.WebApp?.initData) {
                const secretKey = await window.Telegram.WebApp.CloudStorage.getItem('skHex');
                sk = hexToBytes(secretKey);
            } else {
                console.log("No Telegram WebApp");
                sk = generateSecretKey();
            }
            const event = finalizeEvent({
                kind: 1,
                content: content,
                tags: [],
                created_at: Math.floor(Date.now() / 1000),
            }, sk);
            const res = await fetch("/api/event", {
                method: "POST",
                body: JSON.stringify(event),
            }).then(res => res.json());
            router.back();
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-row justify-between border-b border-[#F4F5F7] h-[50px] pt-1">
                <button
                    className="h-full px-4 py-2"
                    onClick={() => router.back()}
                >Cancel</button>
                <button
                    className={`font-medium px-4 py-2 ${loading || content.length === 0 ? "text-[#A2A3A7] " : ""}`}
                    disabled={loading || content.length === 0}
                    onClick={save}
                >
                    {loading ? "Posting..." : "Post"}
                </button>
            </div>
            <textarea
                placeholder="Talk something..."
                autoFocus
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-4 h-full focus:outline-none placeholder:text-[#A2A3A7]" />
        </div>
    )
}

export default Page