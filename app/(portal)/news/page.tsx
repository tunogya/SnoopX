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
    </div>
  )
}

export default Page