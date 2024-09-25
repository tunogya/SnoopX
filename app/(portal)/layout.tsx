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
      <div className={"h-20 border-t flex items-center justify-around"}>
        <Link className={""} href={"/news"} prefetch>
          News
        </Link>
        <Link className={""} href={"/earn"} prefetch>
          Earn
        </Link>
        <Link className={""} href={"/wallet"} prefetch>
          Wallet
        </Link>
      </div>
    </div>
  )
}

export default Layout;