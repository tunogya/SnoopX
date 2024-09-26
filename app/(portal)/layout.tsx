'use client';
import {ReactNode} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";

const Layout = ({children}: { children: ReactNode }) => {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/news",
      label: "News",
    },
    {
      href: "/earn",
      label: "Earn",
    },
    {
      href: "/wallet",
      label: "Wallet",
    }
  ]

  return (
    <div className={'h-full overflow-scroll flex flex-col'}>
      <div className={"flex-1 overflow-scroll"}>
        {children}
      </div>
      <div className={"h-12 border-t flex items-center justify-around"}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            className={`flex items-center ${pathname === item.href ? 'text-[#FF403A]' : 'text-[#999999]'} h-full w-full items-center justify-center`}
            href={item.href}
            prefetch
          >
            <div className={"text-lg font-medium text-center"}>
              {item.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Layout;