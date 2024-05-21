const Page = () => {

  return (
    <div className={"p-4"}>
      <a
        target={"_blank"}
        href={`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=eWp3dG1tVjRpM1lBWDJVSXlhR3c6MTpjaQ&redirect_uri=https://snoopx.abandon.ai/api/x/callback&scope=tweet.read%20users.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain`}
        className={"bg-gray-200 px-3 py-1.5 text-sm font-semibold"}
      >
        Sign in with X
      </a>
    </div>
  )
}

export default Page