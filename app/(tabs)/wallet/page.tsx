'use client';
import { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.setHeaderColor('#FFFFFF')
    }
  }, []);

  return (
    <div className="overflow-scroll no-scrollbar">
      <div className={"p-4 text-center font-bold"}>
        Wallet Connect<br />Comming Soon
      </div>
      <div className="h-20"></div>
    </div>
  )
}

export default Page