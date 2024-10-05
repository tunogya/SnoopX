"use client"
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { generateSecretKey, getPublicKey, finalizeEvent } from 'nostr-tools/pure';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils';

declare global {
    interface Window {
        Telegram?: any;
    }
}

function HomeContent() {
    const searchParams = useSearchParams()
    const params = searchParams.toString()
    const [state, setState] = useState({
        loginStatus: 0,
        errmsg: "",
        tglogin: {} as any,
        userProfile: {} as any,
        query: params,
        lang: "",
        axiosError: {} as any,
        initData: [] as string[]
    })

    const router = useRouter();

    useEffect(() => {
        setState(state => {
            return {
                ...state,
                lang: navigator.language,
            }
        })
    }, [])

    useEffect(() => {
        if (window.Telegram.WebApp.initData) {
            const initDataRaw = decodeURIComponent(window.Telegram.WebApp.initData).split("&")
            setState(state => { return { ...state, initData: initDataRaw } })
            let initData: any = {}
            for (let i in initDataRaw) {
                // initData[initDataRaw[i].split("=")[0]] = initDataRaw[i].split("=")[1]
                switch (initDataRaw[i].split("=")[0]) {
                    case 'query_id':
                        initData.query_id = initDataRaw[i].split("=")[1]
                        break
                    case 'user':
                        initData.user = initDataRaw[i].split("=")[1]
                        break
                    case 'auth_date':
                        initData.auth_date = parseInt(initDataRaw[i].split("=")[1])
                        break
                    case 'hash':
                        initData.hash = initDataRaw[i].split("=")[1]
                        break
                }
            }
            setState(state => ({
                ...state,
                tglogin: initData,
                userProfile: JSON.parse(initData.user),
                loginStatus: 1
            }))
        } else {
            setState(state => ({
                ...state,
                loginStatus: -1
            }))
        }
    }, [])

    useEffect(() => {
        if (state.loginStatus === 1) {
            const skHex = window.Telegram.WebApp.CloudStorage.getItem('skHex');
            if (!skHex) {
                const { secretKey } = generateNostrKeys();
                const _skHex = bytesToHex(secretKey);
                window.Telegram.WebApp.CloudStorage.setItem('skHex', _skHex);
            }
            const sk = hexToBytes(skHex);
            const event = finalizeEvent({
                kind: 0,
                created_at: Math.floor(Date.now() / 1000),
                content: JSON.stringify({
                    name: state.userProfile.username,
                    picture: state.userProfile.photo_url,
                    bot: state.userProfile.is_bot,
                }),
                tags: [
                    ["id", state.userProfile.id],
                    ["allows_write_to_pm", state.userProfile.allows_write_to_pm],
                    ["language_code", state.userProfile.language_code],
                    ["is_premium", state.userProfile.is_premium],
                ],
            }, sk);
            fetch("/api/event", {
                method: "POST",
                body: JSON.stringify(event),
            }).then(() => {
                router.push('/news');
            }).catch((e) => {
                console.log(e);
            });
        }
    }, [state, router]);

    useEffect(() => {
        if (window.Telegram.WebApp) {
            window.Telegram.WebApp.expand()
        }
    }, [])

    const generateNostrKeys = () => {
        const secretKey = generateSecretKey();
        const publicKey = getPublicKey(secretKey);
        return { secretKey, publicKey };
    };

    const Greetings = () => state.userProfile.first_name ? <div className="text-sm text-telegram-text">
        {`Welcome, ${state.userProfile.username}`}
    </div> : null

    return (
        <div className="flex flex-col gap-2 p-4 text-center items-center pt-20">
            <div className="text-5xl font-bold pb-4">
                SnoopX
            </div>
            {state.loginStatus === -1 && <div>
                <p className="text-sm text-telegram-text">Error, please open the page within Telegram</p>
            </div>}
            {state.loginStatus === 1 && <div>
                <Greetings />
            </div>}
        </div>
    )
}

export default function Home() {
    return (
        <div className="bg-telegram-bg h-full">
            <Suspense>
                <HomeContent />
            </Suspense>
        </div>
    )
}