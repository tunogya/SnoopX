'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.setHeaderColor('#FFFFFF')
    }
  }, []);

  return (
    <div className="overflow-scroll no-scrollbar">
      <div className={"py-10 space-y-2 px-6"}>
        <div className="h-20"></div>
        <div className={"text-[40px] font-medium text-center"}>
          818 SNO
        </div>
        <div className={"flex flex-row justify-around"}>
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
      <div className={"text-2xl font-medium px-6"}>
        Daily Tasks
      </div>
      <div className={"flex flex-col px-6 py-4 space-y-3"}>
        <TaskItem title={"Daily Check-in Rewards"} reward={"+500 SNO"} buttonText={"Claim"} />
        <TaskItem title={"Daily Check-in Rewards"} reward={"+500 SNO"} buttonText={"Claim"} />
      </div>
      <div className={"text-2xl font-medium px-6"}>
        Tasks
      </div>
      <div className={"flex flex-col px-6 py-4 space-y-3"}>
        <TaskItem title={"Daily Check-in Rewards"} reward={"+500 SNO"} buttonText={"Claim"} />
        <TaskItem title={"Daily Check-in Rewards"} reward={"+500 SNO"} buttonText={"Claim"} />
      </div>
      <div className="h-20"></div>
    </div>
  )
}

const TaskItem = ({ title, reward, buttonText }: {
  title: string;
  reward: string;
  buttonText: string;
}) => {
  return (
    <div className={"p-3 flex flex-row items-center w-full overflow-hidden border rounded-lg border-[#E4E3E8]"}>
      <div className={"flex flex-col flex-1 min-w-0 mr-2 space-y-1"}>
        <div className={"truncate"}>
          {title}
        </div>
        <div className={""}>
          {reward}
        </div>
      </div>
      <div className={"text-white bg-black border px-4 h-8 rounded-full flex items-center flex-shrink-0"}>
        {buttonText}
      </div>
    </div>
  )
}

export default Page