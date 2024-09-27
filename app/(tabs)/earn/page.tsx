'use client';

const Page = () => {
  return (
    <div>
      <div className={"text-2xl font-medium px-4 pt-2 text-center"}>
        Earn SnoopX on Telegram
      </div>
      <div className={"flex flex-col p-2 bg-gray-100 mx-4 my-4 p-4 rounded-lg justify-between"}>
        <div className={"flex flex-row items-center space-x-3"}>
          <div className={"w-12 h-12 rounded-full bg-gray-200"}></div>
          <div>
            <div className={"text-sm font-medium"}>@tunogya</div>
            <div className={"text-lg font-medium text-[#FF403A]"}>0 SNO</div>
          </div>
        </div>
        <div>

        </div>
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875Z" />
          <path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 0 0 1.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 0 0 1.897 1.384C6.809 12.164 9.315 12.75 12 12.75Z" />
          <path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 15.914 9.315 16.5 12 16.5Z" />
          <path d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 19.664 9.315 20.25 12 20.25Z" />
        </svg>
      </div>
      <div className={"flex flex-col flex-1 min-w-0 mr-2"}>
        <div className={"text-[15px] truncate"}>
          {title}
        </div>
        <div className={"text-[11px] text-[#FF403A]"}>
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