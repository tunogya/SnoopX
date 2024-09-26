'use client';

const Page = () => {
  return (
    <div>
      <div className={"border rounded-xl mx-4 my-2 overflow-hidden"}>
        <div className={"text-xs p-2 text-black border-b flex flex-row justify-between"}>
          <div className={"text-xs"}>
            @tunogya
          </div>
          <div className={"text-xs font-light text-[#999999] text-right"}>
            {new Date().getFullYear()}, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
          </div>
        </div>
        <div className={"flex flex-col items-center justify-center py-8"}>
          <div className={"text-sm mb-2"}>
            Earned Total
          </div>
          <div className={"text-3xl font-bold text-[#FF403A]"}>
            999.99
          </div>
          <div className={"text-[11px] text-[#999999] font-light"}>
            $SNO
          </div>
        </div>
      </div>
      <div className={"flex flex-col"}>
        <TaskItem title={"Daily Check-in Rewards"} reward={"+500 $SNO"} buttonText={"Claim"} />
        <TaskItem title={"Daily Check-in Rewards"} reward={"+500 $SNO"} buttonText={"Claim"} />
      </div>
      <TaskItem title={"Invitee Rewards"} reward={"+500 $SNO"} buttonText={"Claim"} />
    </div>
  )
}

const TaskItem = ({ title, reward, buttonText }: {
  title: string;
  reward: string;
  buttonText: string;
}) => {
  return (
    <div className={"px-4 py-2 flex flex-row justify-between items-center"}>
      <div>
        <div className={"text-[17.64px] leading-[24px] break-words"}>
          {title}
        </div>
        <div className={"text-[11px] text-[#FF403A] font-light"}>
          {reward}
        </div>
      </div>
      <div className={"text-[13px] text-white bg-black px-4 h-7 rounded-full flex items-center"}>
        {buttonText}
      </div>
    </div>
  )
}

export default Page