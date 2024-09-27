'use client';
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.setHeaderColor('#FF403A')
    }
  }, []);

  return (
    <div className="overflow-scroll no-scrollbar">
      <div className={"bg-[#FF403A] flex flex-row space-x-3 px-4 pt-[4px] h-[50px] absolute top-0 w-full"}>
        <Link href={"/search"} prefetch className={"flex-1"}>
          <div className={"relative w-full rounded-full bg-white overflow-hidden"}>
            <div
              className={"w-full h-10 pl-9 items-center flex text-[16px] bg-white text-black"}
            >
              Search
            </div>
            <div className={"absolute top-0 left-0 h-10 flex items-center px-3 text-black"}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" className="size-4">
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
      <div className="h-[50px]"></div>
      <div className="flex flex-row space-x-1 px-4 py-1 border-b space-x-3 font-medium overflow-x-scroll no-scrollbar">
        <div className="text-[#FF403A] border-b-2 border-[#FF403A]">BTC</div>
        <div>ETH</div>
        <div>SOL</div>
        <div>XRP</div>
        <div>DOGE</div>
        <div>LTC</div>
        <div>BCH</div>
        <div>BNB</div>
        <div>XRP</div>
        <div>DOGE</div>
        <div>LTC</div>
        <div>BCH</div>
        <div>BNB</div>
      </div>
      <div className="py-1.5 border-b">
        <PinnedFeed title={"The last 2 times this signal flashed, #Bitcoin pumped. Will history repeat?"} author={"GuncelKriptoCom"} commentCount={11} />
        <PinnedFeed title={"UPDATE: #Bitcoin is having its best September on record....on TG = t.me/first1bitcoin/1378"} author={"GuncelKriptoCom"} commentCount={11} />
        <PinnedFeed title={`As per CryptoQuant BTC$BTC ATH is here 🚀
#Bitcoin at the $66.3K level, the last cohort of STH holding coins for 3-6 months remains.
After that, the path to testing the ATH will be open.`} author={"GuncelKriptoCom"} commentCount={11} />
        <PinnedFeed title={"The last 2 times this signal flashed, #Bitcoin pumped. Will history repeat?"} author={"GuncelKriptoCom"} commentCount={11} />
        <PinnedFeed title={"UPDATE: #Bitcoin is having its best September on record....on TG = t.me/first1bitcoin/1378"} author={"GuncelKriptoCom"} commentCount={11} />
      </div>
      <div>
        <UserFeed title={`Bitcoin is having its best September so far.
BTC$BTC is up 11% in the past 27 days and is just 10% away from breaking ATH levels.
This is setting up for an explosive Uptober.
Bears are in disbelief.`} author={"Lark Davis"} avatar={"https://s3.coinmarketcap.com/static-gravity/image/0822c59e47954c93aab62bca4b546108.jpeg"} timestamp={"2 hours ago"} />
        <UserFeed title={"The last 2 times this signal flashed, #Bitcoin pumped. Will history repeat?"} author={"GuncelKriptoCom"} avatar={"https://s3.coinmarketcap.com/static-gravity/image/6d4f50487204477c8467ecd4431011aa.jpg"} timestamp={"2 hours ago"} />
        <UserFeed title={`Bitcoin is having its best September so far.
BTC$BTC is up 11% in the past 27 days and is just 10% away from breaking ATH levels.
This is setting up for an explosive Uptober.
Bears are in disbelief.`} author={"Lark Davis"} avatar={"https://s3.coinmarketcap.com/static-gravity/image/49b7af058e6f4718baf08e6b5b27ea60.png"} timestamp={"2 hours ago"} />
        <UserFeed title={"The last 2 times this signal flashed, #Bitcoin pumped. Will history repeat?"} author={"GuncelKriptoCom"} avatar={"https://s3.coinmarketcap.com/static-gravity/image/aea2bd11413c48a68740557456fe432d.jpg"} timestamp={"2 hours ago"} />
      </div>
      <div className="h-20"></div>
    </div>
  )
}

const PinnedFeed = ({ title, author, commentCount }: { title: string; author: string; commentCount: number }) => {
  return (
    <div className={"px-4 py-0.5"}>
      <div className={"text-[17.64px] leading-[24px] break-words line-clamp-1"}>
        {title}
      </div>
      <div className={"flex flex-row space-x-1.5"}>
        <div className={"text-[9px] text-[#999999]"}>
          @{author}
        </div>
        <div className={"text-[9px] text-[#999999]"}>
          {commentCount} comments
        </div>
      </div>
    </div>
  )
}

const UserFeed = ({ title, author, avatar, timestamp }: { title: string; author: string; avatar: string; timestamp: string }) => {
  return (
    <div className="px-4 py-3 border-b">
      <div className="flex items-center mb-2 space-x-2">
        <div className="w-8 h-8 rounded-full bg-gray-200">
          <Image src={avatar} alt={author} width={32} height={32} className="rounded-full mr-3 bg-gray-200" />
        </div>
        <div>
          <div className="font-medium text-sm">{author}</div>
          <div className="text-[12px] text-[#A1A3A6]">{timestamp}</div>
        </div>
      </div>
      <div className="text-[17.64px] leading-[24px] line-clamp-3">
        {title}
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
          <button className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <div className="text-[12px]">
              30
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page