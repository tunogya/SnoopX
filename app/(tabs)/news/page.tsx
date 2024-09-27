'use client';
import Link from "next/link";
import { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.setHeaderColor('#FF403A')
    }
  }, []);

  return (
    <div className="overflow-scroll">
      <div className={"bg-[#FF403A] flex flex-row space-x-3 px-4 h-[46px] absolute top-0 w-full"}>
        <Link href={"/search"} prefetch className={"flex-1"}>
          <div className={"relative w-full rounded-full bg-white overflow-hidden"}>
            <div
              className={"w-full h-10 pl-10 items-center flex text-sm bg-[#F4F5F7] text-[#999999]"}
            >
              Search something...
            </div>
            <div className={"absolute top-0 left-0 h-10 flex items-center px-3 text-[#333333]"}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" className="size-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
          </div>
        </Link>
        <div className="h-10 flex flex-col items-center justify-center">
          <div className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
            </svg>
          </div>
          <div className="text-[10px] text-white font-medium">
            POST
          </div>
        </div>
      </div>
      <div className="h-[46px]"></div>
      <div className="">
        <FeedItem title={"THIS HISTORIC #BITCOIN BUY SIGNAL IS FLASHING NOW!!!"} author={"GuncelKriptoCom"} commentCount={11} />
        <FeedItem title={"THIS HISTORIC #BITCOIN BUY SIGNAL IS FLASHING NOW!!!"} author={"GuncelKriptoCom"} commentCount={11} />
        <FeedItem title={"THIS HISTORIC #BITCOIN BUY SIGNAL IS FLASHING NOW!!!"} author={"GuncelKriptoCom"} commentCount={11} />
        <FeedItem title={"THIS HISTORIC #BITCOIN BUY SIGNAL IS FLASHING NOW!!!"} author={"GuncelKriptoCom"} commentCount={11} />
        <FeedItem title={"THIS HISTORIC #BITCOIN BUY SIGNAL IS FLASHING NOW!!!"} author={"GuncelKriptoCom"} commentCount={11} />
        <FeedItem title={"THIS HISTORIC #BITCOIN BUY SIGNAL IS FLASHING NOW!!!"} author={"GuncelKriptoCom"} commentCount={11} />
        <FeedItem title={"THIS HISTORIC #BITCOIN BUY SIGNAL IS FLASHING NOW!!!"} author={"GuncelKriptoCom"} commentCount={11} />
        <FeedItem title={"THIS HISTORIC #BITCOIN BUY SIGNAL IS FLASHING NOW!!!"} author={"GuncelKriptoCom"} commentCount={11} />
        <FeedItem title={"THIS HISTORIC #BITCOIN BUY SIGNAL IS FLASHING NOW!!!"} author={"GuncelKriptoCom"} commentCount={11} />
      </div>
      <div className="h-20"></div>
    </div>
  )
}

const FeedItem = ({ title, author, commentCount }: { title: string; author: string; commentCount: number }) => {
  return (
    <div className={"px-4 py-2"}>
      <div className={"text-[17.64px] leading-[24px] break-words"}>
        {title}
      </div>
      <div className={"flex flex-row space-x-1.5"}>
        <div className={"text-[11px] text-[#999999] font-light"}>
          @{author}
        </div>
        <div className={"text-[11px] text-[#999999] font-light"}>
          {commentCount} comments
        </div>
      </div>
    </div>
  )
}

export default Page