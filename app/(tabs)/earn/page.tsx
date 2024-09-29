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
      <div className={"py-10 space-y-3"}>
        <div className="h-20"></div>
        <div className={"text-[40px] font-medium px-4 text-center"}>
          818 SNO
        </div>
        <div className={"flex flex-row justify-around px-4"}>
          <div>
            <div className={"text-[13px] text-[#666666] text-center"}>Rewards</div>
            <div className={"font-medium text-black text-center"}>+818</div>
          </div>
          <div>
            <div className={"text-[13px] text-[#666666] text-center"}>Tasks</div>
            <div className={"font-medium text-[#999999] text-center"}>0</div>
          </div>
          <div>
            <div className={"text-[13px] text-[#666666] text-center"}>Invites</div>
            <div className={"font-medium text-[#999999] text-center"}>0</div>
          </div>
        </div>
      </div>
      <div className={"text-2xl font-medium px-4"}>
        Daily Tasks
      </div>
      <div className={"flex flex-col px-4 py-2 space-y-2"}>
        <TaskItem title={"Daily Check-in Rewards"} reward={"+500 SNO"} buttonText={"Claim"} />
        <TaskItem title={"Daily Check-in Rewards"} reward={"+500 SNO"} buttonText={"Claim"} />
      </div>
      <div className={"text-2xl font-medium px-4"}>
        Tasks
      </div>
      <div className={"flex flex-col px-4 py-2 space-y-2"}>
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
    <div className={"p-3 flex flex-row items-center w-full overflow-hidden border rounded-lg"}>
      <div className={"flex flex-col flex-1 min-w-0 mr-2 space-y-1"}>
        <div className={"truncate"}>
          {title}
        </div>
        <div className={""}>
          {reward}
        </div>
      </div>
      <div className={"text-[13px] text-white bg-black font-medium border px-4 py-1.5 rounded-full flex items-center flex-shrink-0"}>
        {buttonText}
      </div>
    </div>
  )
}

export default Page