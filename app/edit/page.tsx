"use client";
import { useRouter } from "next/navigation";
const Page = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-row justify-between border-b border-[#F4F5F7] h-[50px] pt-1">
                <div
                    className="h-full px-4 py-2"
                    onClick={() => router.back()}
                >Cancel</div>
                <div
                    className="text-[#A2A3A7] font-medium px-4 py-2"
                    onClick={() => console.log("post")}
                >Post</div>
            </div>
            <textarea
                placeholder="Talk something..."
                autoFocus
                className="w-full p-4 h-full focus:outline-none placeholder:text-[#A2A3A7]" />
        </div>
    )
}

export default Page