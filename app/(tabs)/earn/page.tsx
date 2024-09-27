'use client';
import { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.setHeaderColor('#FFFFFF')
    }
  }, []);

  return (
    <div>
      <div className={"text-lg font-medium px-4 py-4 text-center bg-black text-white"}>
        Earn $SNO on Telegram
      </div>
      <div className={"flex flex-col p-2 bg-gray-100 mx-4 my-4 p-4 rounded-lg justify-between"}>
        <div className={"flex flex-row items-center space-x-3"}>
          <div className={"w-12 h-12 rounded-full bg-gray-200"}></div>
          <div>
            <div className={"text-sm font-medium"}>@tunogya</div>
            <div className={"text-lg font-medium text-[#FF403A]"}>120.00 SNO</div>
          </div>
        </div>
        <div>
        </div>
      </div>
      <div className={"text-lg font-medium px-4"}>
        Tasks
      </div>
      <div className={"flex flex-col p-2"}>
        <TaskItem title={"Daily Check-in Rewards"} reward={"+500 SNO"} buttonText={"Claim"} />
        <TaskItem title={"Daily Check-in Rewards"} reward={"+500 SNO"} buttonText={"Claim"} />
      </div>
    </div>
  )
}

const TaskItem = ({ title, reward, buttonText }: {
  title: string;
  reward: string;
  buttonText: string;
}) => {
  return (
    <div className={"px-4 py-2 flex flex-row items-center w-full overflow-hidden"}>
      <div className={"flex items-center justify-center w-8 h-8 rounded-full bg-[#FF403A] bg-opacity-10 text-[#FF403A] mr-3"}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="size-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>
      </div>
      <div className={"flex flex-col flex-1 min-w-0 mr-2"}>
        <div className={"text-sm font-medium truncate"}>
          {title}
        </div>
        <div className={"text-[12px] font-medium text-[#FF403A]"}>
          {reward}
        </div>
      </div>
      <div className={"text-[13px] text-[#FF403A] font-medium border border-[#FF403A] px-4 h-7 rounded-full flex items-center flex-shrink-0"}>
        {buttonText}
      </div>
    </div>
  )
}

export default Page