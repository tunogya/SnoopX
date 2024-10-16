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
    const [error, setError] = useState("");

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
            const getSkHexAndProceed = async () => {
                try {
                    const skHex = await new Promise<string>((resolve, reject) => {
                        window.Telegram.WebApp.CloudStorage.getItem('skHex', (error: any, value: string) => {
                            if (error) reject(error);
                            else resolve(value);
                        });
                    });

                    let sk;
                    if (!skHex) {
                        const { secretKey } = generateNostrKeys();
                        sk = secretKey;
                        const newSkHex = bytesToHex(secretKey);
                        await new Promise<void>((resolve, reject) => {
                            window.Telegram.WebApp.CloudStorage.setItem('skHex', newSkHex, (error: any) => {
                                if (error) reject(error);
                                else resolve();
                            });
                        });
                    } else {
                        sk = hexToBytes(skHex);
                    }

                    const event = finalizeEvent({
                        kind: 0,
                        created_at: Math.floor(Date.now() / 1000),
                        content: JSON.stringify({
                            name: state.userProfile.username,
                            picture: state.userProfile.photo_url,
                            bot: state.userProfile.is_bot,
                        }),
                        tags: [
                            ["id", state.userProfile.id.toString()],
                            ["allows_write_to_pm", state.userProfile.allows_write_to_pm ? "true" : "false"],
                            ["language_code", state.userProfile.language_code],
                            ["is_premium", state.userProfile.is_premium ? "true" : "false"],
                        ],
                    }, sk);

                    await fetch("/api/events", {
                        method: "POST",
                        body: JSON.stringify(event),
                    });

                    router.push('/news');
                } catch (e) {
                    console.error("Error in getSkHexAndProceed:", e);
                    setError(e instanceof Error ? e.message : String(e));
                }
            };

            getSkHexAndProceed();
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
                <p className="text-sm text-telegram-text">{error}</p>
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