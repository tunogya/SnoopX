'use client';
import { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.setHeaderColor('#FFFFFF')
    }
  }, []);

  return (
    <div className={"p-4 text-center font-bold"}>
      Wallet Connect<br />Comming Soon
    </div>
  )
}

export default Page