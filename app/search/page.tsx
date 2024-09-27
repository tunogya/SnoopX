'use client';
import Link from "next/link";
import { useState, useEffect } from "react";

const Page = () => {
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        if (window.Telegram.WebApp) {
          window.Telegram.WebApp.setHeaderColor('#FFFFFF')
        }
      }, []);

    return (
        <div className="overflow-scroll">
            <div className={"px-2 flex flex-row space-x-1 h-[46px]"}>
                <Link href={"/news"}>
                <div className={"cursor-pointer h-10 w-10 flex items-center justify-center"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </div>
                </Link>
                <div className={"relative w-full rounded-full bg-white overflow-hidden h-10"}>
                    <input
                        value={search}
                        autoFocus
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={"Search something..."}
                        className={"w-full h-10 pl-8 items-center flex text-sm bg-[#F4F5F7] text-[#333333] focus:outline-none"}
                    >
                    </input>
                    <div className={"absolute top-0 left-0 h-10 flex items-center px-2 text-[#333333]"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" className="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                </div>
                <div className={"px-2 text-sm text-[#FF403A] font-medium h-10 flex items-center"}>Search</div>
            </div>
        </div>
    )
}

export default Page;