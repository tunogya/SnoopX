import {NextRequest} from "next/server";
import {connectToDatabase} from "@/utils/mongodb";
import {redirect} from "next/navigation";

const clientId = process.env.NEXT_PUBLIC_X_CLIENT_ID || "";
const clientSecret = process.env.X_CLIENT_SECRET || "";
const callbackUrl = process.env.NEXT_PUBLIC_X_CALLBACK_URL || ""

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
  const credentials = `${clientId}:${clientSecret}`;

  const requestToken = await fetch(`https://api.twitter.com/2/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${Buffer.from(credentials).toString('base64')}`
    },
    body: new URLSearchParams({
      code: code,
      grant_type: 'authorization_code',
      client_id: clientId,
      redirect_uri: callbackUrl,
      code_verifier: 'challenge'
    })
  }).then((res) => res.json());

  const { data } = await fetch(`https://api.twitter.com/2/users/me?user.fields=id,name,profile_image_url,username`, {
    headers: {
      "Authorization": `Bearer ${requestToken.access_token}`,
    }
  }).then((res) => res.json());

  const { db } = await connectToDatabase();

  await db.collection("users").updateOne(
    { id: data.id },
    {
      $set: {
        name: data?.name || null,
        username: data?.username || null,
        profile_image_url: data?.profile_image_url || null,
        token_type: requestToken?.token_type || null,
        access_token: requestToken?.access_token || null,
        scope: requestToken?.scope || null,
        refresh_token: requestToken?.refresh_token || null,
      }
    },
    { upsert: true }
  );

  return redirect("https://snoopx.abandon.ai/x")
}

export {GET}