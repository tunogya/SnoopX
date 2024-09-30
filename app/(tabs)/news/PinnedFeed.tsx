"use client";

const PinnedFeed = ({ title, author, commentCount, readed = false }: { title: string; author: string; commentCount: number, readed?: boolean }) => {
    return (
        <div className={"px-4 py-0.5"}>
            <div className={`text-[17.64px] leading-[24px] break-words line-clamp-1 ${readed ? "text-[#A1A3A6]" : "text-black"}`}>
                {title}
            </div>
            <div className={"flex flex-row space-x-1.5"}>
                <div className={"text-[9px] text-[#A1A3A6]"}>
                    @{author}
                </div>
                <div className={"text-[9px] text-[#A1A3A6]"}>
                    {commentCount} comments
                </div>
            </div>
        </div>
    )
}

export default PinnedFeed