'use client';
import {ReactNode} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";

const Layout = ({children}: { children: ReactNode }) => {
  const pathname = usePathname()

  return (
    <div className={'h-full overflow-scroll flex flex-col'}>
      <div className={"flex-1 overflow-scroll"}>
        {children}
      </div>
      <div className={"h-16 border-t flex items-center justify-around"}>
        <Link className={"flex flex-col items-center px-4 py-2"} href={"/news"} prefetch>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12.75 19.5v-.75a7.5 7.5 0 0 0-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
          </svg>
          <div className={"text-xs text-gray-500"}>
            News
          </div>
        </Link>
        <Link className={"flex flex-col items-center px-4 py-2"} href={"/earn"} prefetch>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>
          <div className={"text-xs text-gray-500"}>
            Earn
          </div>
        </Link>
        <Link className={"flex flex-col items-center px-4 py-2"} href={"/wallet"} prefetch>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"/>
          </svg>
          <div className={"text-xs text-gray-500"}>
            Wallet
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Layout;