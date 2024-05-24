'use client';
import Image from 'next/image'
import useSWR from "swr";

const client_id = process.env.NEXT_PUBLIC_X_CLIENT_ID;
const redirect_uri = process.env.NEXT_PUBLIC_X_CALLBACK_URL;
const scope = "tweet.read%20users.read%20offline.access";

const Page = () => {
  const { data: users } = useSWR('/api/x/users', (url) => fetch(url).then((res) => res.json()).then((res) => res.data), {
    refreshInterval: 10_000,
  });
  const { data: tweets } = useSWR('/api/x/tweets', (url) => fetch(url).then((res) => res.json()).then((res) => res.data), {
    refreshInterval: 10_000,
  });

  return (
    <div className={"p-4"}>
      <div className={"flex flex-row space-x-4 border-b pb-4 border-[#2f2f2f]"}>
        <div className={"w-20 h-20 flex items-center justify-center"}>
          <a
            target={"_blank"}
            href={`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=state&code_challenge=challenge&code_challenge_method=plain`}
            className={"border-2 border-[#B3B3B3] text-white w-16 h-16 flex items-center justify-center"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
            </svg>
          </a>
        </div>
        {
          users && users.map((item: any) => (
            <div key={item._id} className={"flex flex-col items-center justify-center h-20 w-20"}>
              <Image className={"rounded-full border-2 border-white"} alt={""} src={item.profile_image_url} width={48}
                     height={48}/>
            </div>
          ))
        }
      </div>
      <div>
        {
          tweets && tweets.map((item: any) => (
            <div key={item._id} className={"border-b border-[#2f2f2f] p-4 space-y-3"}>
              <div className={'flex flex-row items-center text-white space-x-3'}>
                <div className={"text-white text-2xl"}>{item?.symbol}</div>
                {
                  item.analysis === "positive" && (
                    <div className={'text-green-500'}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                           stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"/>
                      </svg>
                    </div>
                  )
                }
                {
                  item.analysis === "negative" && (
                    <div className={"text-red-500"}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                           stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"/>
                      </svg>
                    </div>
                  )
                }
                {
                  item.analysis === "neutral" && (
                    <div className={"text-gray-500"}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                           stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                      </svg>
                    </div>
                  )
                }
              </div>
              <div className={"flex flex-col"}>
                <p className={"text-[#B3B3B3] text-sm"}>{item.text}</p>
                <p className={"text-[#B3B3B3] text-xs"}>{new Date(item.created_at).toLocaleString()}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Page