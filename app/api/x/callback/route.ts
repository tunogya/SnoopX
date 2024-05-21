import {NextRequest} from "next/server";

/**
 * Document
 * https://developer.x.com/en/docs/authentication/oauth-2-0/user-access-token
 */
const GET = async (req: NextRequest) => {
  const code = req.nextUrl.searchParams.get('code');
  if (!code) {
    return Response.json({
      error: "No code"
    }, {
      status: 400,
    })
  }

  const result = await fetch(`https://api.twitter.com/2/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code: code,
      grant_type: 'authorization_code',
      client_id: 'rG9n6402A3dbUJKzXTNX4oWHJ',
      redirect_uri: 'https://snoopx.abandon.ai/api/x/callback',
      code_verifier: 'challenge'
    })
  }).then((res) => res.json());

  console.log("result", result);

  return Response.json({
    ok: true,
  })
}

export {GET}