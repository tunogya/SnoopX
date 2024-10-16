'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
    const [search, setSearch] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        if (window.Telegram.WebApp) {
            window.Telegram.WebApp.setHeaderColor('#FFFFFF')
        }
    }, []);

    return (
        <div className="overflow-scroll no-scrollbar">
            <div className={"px-4 pt-[4px] flex flex-row space-x-3 h-[50px]"}>
                <div
                    className={"flex-1 h-10 flex items-center justify-center"}
                    onClick={() => router.back()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div className={"relative w-full rounded-full bg-white overflow-hidden h-10"}>
                    <input
                        value={search}
                        autoFocus
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={"Search..."}
                        className={"w-full h-10 pl-9 items-center flex text-[16px] bg-[#F4F5F7] text-black focus:outline-none"}
                    >
                    </input>
                    <div className={"absolute top-0 left-0 h-10 w-10 flex items-center justify-center text-[#333333]"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" className="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                </div>
                <div className={"text-sm text-[#FF403A] font-medium h-10 flex items-center"}>Search</div>
            </div>
        </div>
    )
}

export default Page;