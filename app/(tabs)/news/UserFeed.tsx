"use client";
import Image from "next/image";
import moment from "moment";
import { useRouter } from "next/navigation";
import useSWR from "swr";
const UserFeed = ({ event }: { event: any }) => {
    const router = useRouter();
    const { data } = useSWR(`/api/events?kind=0&pubkey=${event.pubkey}`, (url) => fetch(url).then(r => r.json()).then(r => r.data?.[0]));

    return (
        <div className="px-4 py-3 border-b" onClick={() => {
            router.push(`/event/${event.id}`);
        }}>
            <div className="flex items-center mb-2 space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-200">
                    {
                        data?.picture ? <Image src={data.picture} alt={""} width={32} height={32} className="rounded-full mr-3 bg-gray-200" /> : <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                    }
                </div>
                <div className="flex flex-col space-y-[-2px]">
                    <div className="font-medium text-sm">{data?.name || "Anonymous"}</div>
                    <div className="text-[12px] text-[#A1A3A6]">{moment(event.created_at * 1000).fromNow()}</div>
                </div>
            </div>
            <div className="text-[17.64px] leading-[24px] line-clamp-3">
                {event.content}
            </div>
            <div className="text-[12px] text-[#A1A3A6] py-2">
                Comments
            </div>
            <div className="flex text-black space-x-10">
                <button className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9 9 6-6m0 0 6 6m-6-6v12a6 6 0 0 1-12 0v-3" />
                    </svg>
                    <div className="text-[12px]">
                        Share
                    </div>
                </button>
                <div className="flex flex-row space-x-8">
                    <button className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                        </svg>
                        <div className="text-[12px]">
                            10
                        </div>
                    </button>
                    <button className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
                        </svg>
                        <div className="text-[12px]">
                            3
                        </div>
                    </button>
                    <button className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                        </svg>
                        <div className="text-[12px]">
                            20
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserFeed