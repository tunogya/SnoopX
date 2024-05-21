'use client';
import Image from 'next/image'
import useSWR from "swr";

const client_id = process.env.NEXT_PUBLIC_X_CLIENT_ID;
const redirect_uri = process.env.NEXT_PUBLIC_X_CALLBACK_URL;
const scope = "tweet.read%20users.read%20offline.access";

const Page = () => {
  const { data } = useSWR('/api/x/users', (url) => fetch(url).then((res) => res.json()).then((res) => res.data));

  return (
    <div className={"p-4"}>
      <div className={"flex flex-row space-x-4 border-b pb-4 border-[#2f2f2f]"}>
        {
          data && data.map((item: any) => (
            <div key={item._id} className={"flex flex-col items-center justify-center h-20 w-20"}>
              <Image className={"rounded-full border-2 border-white"} alt={""} src={item.profile_image_url} width={48} height={48}/>
            </div>
          ))
        }
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
      </div>
    </div>
  )
}

export default Page