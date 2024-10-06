'use client';
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import useSWR from "swr";
import moment from "moment";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

const Page = () => {
    const router = useRouter();
    const { id } = useParams();

    const { data: event, isLoading: isEventLoading } = useSWR(`/api/events?id=${id}`, (url) => fetch(url).then(r => r.json()).then(r => r.data?.[0]));
    const { data: author, isLoading: isAuthorLoading } = useSWR(`/api/events?kind=0&pubkey=${event?.pubkey}`, (url) => fetch(url).then(r => r.json()).then(r => r.data?.[0]).then(r => JSON.parse(r.content)).catch(e => null));

    useEffect(() => {
        if (window.Telegram.WebApp) {
            window.Telegram.WebApp.setHeaderColor('#FFFFFF')
        }
    }, []);

    return (
        <div className="overflow-scroll no-scrollbar relative h-full">
            <div className={"px-4 pt-[4px] flex flex-row space-x-3 h-[50px]"}>
                <div
                    className={"flex-1 h-10 flex items-center justify-center"}
                    onClick={() => router.back()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div className={"relative w-full rounded-full bg-white overflow-hidden h-10"}>
                    <div
                        className={"w-full h-10 pl-9 items-center flex text-[16px] bg-[#F4F5F7] text-black focus:outline-none"}
                    >
                    </div>
                    <div className={"absolute top-0 left-0 h-10 w-10 flex items-center justify-center text-[#333333]"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                            stroke="currentColor" className="size-4">
                            <path stroke-linecap="round" strokeLinejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="flex items-center mb-2 space-x-2 px-4">
                <div className="w-8 h-8 rounded-full bg-gray-200">
                    {
                        author?.picture ? <Image src={author.picture} alt={""} width={32} height={32} className="rounded-full mr-3 bg-gray-200" /> : <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                    }
                </div>
                <div className="flex flex-col space-y-[-2px]">
                    {
                        isAuthorLoading ? <Skeleton /> : <div className="font-medium text-sm">{author?.name || "Anonymous"}</div>
                    }
                    {
                        isEventLoading ? <Skeleton /> : <div className="text-[12px] text-[#A1A3A6]">{moment(event?.created_at * 1000).fromNow()}</div>
                    }
                </div>
            </div>
            <div className="px-4">
                {
                    isEventLoading ? <Skeleton count={5} /> : <div className="text-[17.64px] leading-[24px] line-clamp-3">
                        {event?.content}
                    </div>
                }
            </div>
            <div className="px-4 mt-8">
                <div className="text-[18px] text-black font-medium">
                    Comments 7
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full bg-white px-4">
                <input className="w-full h-[38px] rounded-lg px-4 bg-[#F4F5F7] placeholder:text-[#6F7073] focus:outline-none text-[14px]" placeholder="Add a comment...">
                </input>
                <div className="flex text-black h-10 space-x-10">
                    <div className="flex flex-row justify-around items-center w-full">
                        <button className="flex items-center justify-center space-x-2 w-20 h-8">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m9 9 6-6m0 0 6 6m-6-6v12a6 6 0 0 1-12 0v-3" />
                            </svg>
                            <div className="text-[12px]">
                                Share
                            </div>
                        </button>
                        <button className="flex items-center justify-center space-x-2 w-20 h-8">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                            </svg>
                            <div className="text-[12px]">
                                10
                            </div>
                        </button>
                        <button className="flex items-center justify-center space-x-2 w-20 h-8">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
                            </svg>
                            <div className="text-[12px]">
                                3
                            </div>
                        </button>
                        <button className="flex items-center justify-center space-x-2 w-20 h-8">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                            </svg>
                            <div className="text-[12px]">
                                20
                            </div>
                        </button>
                    </div>
                </div>
                <div className="h-4"></div>
            </div>
        </div>
    )
}

export default Page;