'use client';

const client_id = process.env.NEXT_PUBLIC_X_CLIENT_ID;
const redirect_uri = process.env.NEXT_PUBLIC_X_CALLBACK_URL;
const scope = "tweet.read%20users.read%20offline.access";

const Page = () => {

  return (
    <div className={"p-4"}>
      <a
        target={"_blank"}
        href={`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=state&code_challenge=challenge&code_challenge_method=plain`}
        className={"bg-gray-200 px-3 py-1.5 text-sm font-semibold"}
      >
        Sign in with X
      </a>
    </div>
  )
}

export default Page