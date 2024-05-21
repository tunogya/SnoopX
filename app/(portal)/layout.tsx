'use client';
import {ReactNode} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";

const Layout = ({children}: { children: ReactNode }) => {
  const pathname = usePathname()

  const data = [
    {
      label: "X.com",
      pathname: "/x",
    },
    {
      label: "bea.gov",
      pathname: "/bea",
    },
    {
      label: "bls.gov",
      pathname: "/bls",
    },
    {
      label: "federalreserve.gov",
      pathname: "/federalreserve",
    },
  ]

  return (
    <div className={'h-full overflow-scroll flex flex-col'}>
      <div className={"h-12 flex flex-row items-center px-4 text-white space-x-8 border-b-2 border-[#2f2f2f]"}>
        <div className={"text-white italic font-bold text-2xl"}>SnoopX</div>
        <div className={"flex flex-row items-center space-x-4"}>
          {
            data.map((item) => (
              <Link
                key={item.pathname}
                className={`${pathname.startsWith(item.pathname) ? "text-green-500 italic font-bold" : "font-semibold text-white"}`}
                href={item.pathname}>
                {item.label}
              </Link>
            ))
          }
        </div>
      </div>
      <div className={"flex-1 overflow-scroll"}>
        {children}
      </div>
    </div>
  )
}

export default Layout;