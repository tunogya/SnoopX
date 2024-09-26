'use client';

import Image from 'next/image';


const Page = () => {
  return (
    <div className={""}>
      <div className={"flex flex-row space-x-2 items-center px-4 h-[50px]"}>
        <div className={"h-8 w-8 min-w-8"}>
          <Image src={"/snoopx.png"} alt={"logo"} width={32} height={32} className={"border border-[0.5px] rounded-md"}/>
        </div>
        <div className={"relative w-full rounded-md bg-white overflow-hidden"}>
          <div
            className={"w-full h-8 pl-8 items-center flex text-sm bg-[#F4F5F7] text-[#333333] font-light"}
          >
            Search something...
          </div>
          <div className={"absolute top-0 left-0 h-8 flex items-center px-2 text-[#333333]"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" className="size-4">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
        </div>
        <div className={"flex items-center px-3 h-8 bg-[#FF403A] text-white rounded-md text-sm"}>
          POST
        </div>
      </div>
      <div>
      </div>
    </div>
  )
}

export default Page