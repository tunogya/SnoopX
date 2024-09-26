'use client';

import Image from 'next/image';


const Page = () => {
  return (
    <div className={""}>
      <div className={"flex flex-row space-x-2 items-center bg-[#FF403A] px-3 py-1.5"}>
        <div className={"relative w-full rounded-full bg-white overflow-hidden"}>
          <input
            placeholder={"Search something..."}
            className={"w-full h-10 pl-10"}
          />
          <div className={"absolute top-0 left-0 h-10 flex items-center px-3"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" className="size-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  )
}

export default Page