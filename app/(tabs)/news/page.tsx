'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import UserFeed from "./UserFeed";

const Page = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/req", {
          method: "POST",
          body: JSON.stringify({
            kinds: [1],
          })
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.setHeaderColor('#FF403A')
    }
  }, []);

  return (
    <div className="">
      <div className={"bg-[#FF403A] flex flex-row space-x-3 px-4 pt-[4px] h-[50px] absolute top-0 w-full z-10"}>
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
        <Link href={"/edit"} prefetch className="h-10 flex flex-col items-center justify-center">
          <div className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-[10px] text-white font-medium">
            POST
          </div>
        </Link>
      </div>
      <div className="h-[85px]"></div>
      <div className="flex flex-row space-x-1 px-4 py-1 h-[35px] w-full border-b space-x-3 font-medium overflow-x-scroll no-scrollbar absolute top-[50px] bg-white">
        <div>Follow</div>
        <div className="text-[#FF403A] h-[30px] border-b-2 border-[#FF403A]">Explore</div>
        <div>Nearby</div>
        <div>BTC</div>
        <div>ETH</div>
        <div>SOL</div>
        <div>DOGE</div>
      </div>
      {/* <div className="py-1.5 border-b">
        <PinnedFeed title={"The last 2 times this signal flashed, #Bitcoin pumped. Will history repeat?"} author={"GuncelKriptoCom"} commentCount={11} readed={true} />
        <PinnedFeed title={"UPDATE: #Bitcoin is having its best September on record....on TG = t.me/first1bitcoin/1378"} author={"GuncelKriptoCom"} commentCount={11} />
        <PinnedFeed title={`As per CryptoQuant BTC$BTC ATH is here 🚀
#Bitcoin at the $66.3K level, the last cohort of STH holding coins for 3-6 months remains.
After that, the path to testing the ATH will be open.`} author={"GuncelKriptoCom"} commentCount={11} readed={false} />
        <PinnedFeed title={"The last 2 times this signal flashed, #Bitcoin pumped. Will history repeat?"} author={"GuncelKriptoCom"} commentCount={11} readed={true} />
        <PinnedFeed title={"UPDATE: #Bitcoin is having its best September on record....on TG = t.me/first1bitcoin/1378"} author={"GuncelKriptoCom"} commentCount={11} readed={false} />
      </div> */}
      <div>
        {
          data?.data?.map((event: any) => (
            <UserFeed event={event} key={event.id} />
          ))
        }
      </div>
    </div>
  )
}

export default Page