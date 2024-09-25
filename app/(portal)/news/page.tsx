'use client';

const Page = () => {
  return (
    <div className={"p-4"}>
      <div className={"relative bg-red-500"}>
        <input
          placeholder={"Search something..."}
          className={"border w-full h-10 px-2"}
        />
        <div className={"absolute top-0 right-0 h-10 flex items-center px-2"}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
          </svg>
        </div>
      </div>
      <div>
        <div className={"border-b py-4 space-y-1"}>
          <div className={"text-sm break-all"}>
            {`🔹 BlackRock's Bitcoin ETF now requires BTC withdrawals within 12 hours, ensuring real-time blockchain
            verification.`} <span className={"underline"}>$BTC</span>
          </div>
          <div className={"flex flex-row justify-between items-center"}>
            <div className={"flex flex-row space-x-3"}>
              <div className={"text-gray-500 text-xs"}>
                Immutable
              </div>
              <div className={"text-gray-500 text-xs"}>
                {new Date().toLocaleDateString()}
              </div>
            </div>
            <div className={"text-green-500"}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" className="size-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page