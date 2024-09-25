'use client';

const Page = () => {
  return (
    <div className={"p-4"}>
      <div className={"flex flex-col items-center justify-center py-8 border-b"}>
        <div className={"text-2xl font-bold"}>
          999999.99
        </div>
        <div className={"text-sm text-gray-500"}>
          $SNOP
        </div>
      </div>
      <div className={"flex flex-col border-b"}>
        <div className={"py-4 flex flex-row justify-between items-center"}>
          <div>
            <div className={"text-sm"}>
              Daily Check-in Rewards
            </div>
            <div className={"text-xs text-gray-500"}>
              +500 $SNOP
            </div>
          </div>
          <div className={"text-xs text-white bg-black px-4 py-2 rounded-full"}>
            Claim
          </div>
        </div>
        <div className={"py-4 flex flex-row justify-between items-center"}>
          <div>
            <div className={"text-sm"}>
              Follow SnoopX on X
            </div>
            <div className={"text-xs text-gray-500"}>
              +500 $SNOP
            </div>
          </div>
          <div className={"text-xs text-white bg-black px-4 py-2 rounded-full"}>
            Claim
          </div>
        </div>
      </div>
      <div>
        <div className={"py-4 flex flex-row justify-between items-center"}>
          <div>
            <div className={"text-sm"}>
              Invitee friends to Earn $SNOP
            </div>
            <div className={"text-xs text-gray-500"}>
              View roles
            </div>
          </div>
          <div className={"text-xs text-white bg-black px-4 py-2 rounded-full"}>
            Invite
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page