'use client';
import { useEffect } from "react";

const Page = () => {
    useEffect(() => {
        if (window.Telegram.WebApp) {
            window.Telegram.WebApp.setHeaderColor('#FFFFFF')
        }
    }, []);

    return (
        <div className="">
            <div className={"text-3xl font-medium px-6 py-4 text-center"}>
                Invite frens
                <br />
                and get more SNO
            </div>
            <div className={"h-80"}></div>
            <div className={"flex flex-col items-center space-y-1 px-6"}>
                <div className="text-[#7F7F7F] text-center text-sm">Tap on the button to invite your friends</div>
                <div className="text-white bg-[#FF403A] px-4 h-10 rounded-lg flex items-center flex-shrink-0 justify-center w-full">
                    Invite frens
                </div>
            </div>
        </div>
    )
}

export default Page