'use client';
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import useSWR from "swr";
import Skeleton from "react-loading-skeleton";
import UserFeedFullText from "./UserFeedFullText";

const Page = () => {
    const router = useRouter();
    const { id } = useParams();

    const { data: event, isLoading: isEventLoading } = useSWR(`/api/events?id=${id}`, (url) => fetch(url).then(r => r.json()).then(r => r.data?.[0]));
    const {data: similarEvent } = useSWR(event ? `/api/events?search=${event.content}&kind=1` : null, (url) => fetch(url).then(r => r.json()).then(r => r.data));

    useEffect(() => {
        if (window.Telegram.WebApp) {
            window.Telegram.WebApp.setHeaderColor('#FFFFFF');
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
            {
                isEventLoading && (
                    <div className="px-4 pt-2"> 
                        <Skeleton  count={5}/>
                    </div>
                )
            }
            {
                event && (
                    <UserFeedFullText event={event} />
                )
            }
            {
                similarEvent && similarEvent.map((item: any) => (
                    <UserFeedFullText event={item} key={item.id}/>
                ))
            }
        </div>
    )
}

export default Page;