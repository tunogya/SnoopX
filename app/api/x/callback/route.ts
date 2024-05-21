import {NextRequest} from "next/server";
import {connectToDatabase} from "@/utils/mongodb";
import {ObjectId} from "mongodb";
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
      // redirect_uri: 'https://snoopx.abandon.ai/api/x/callback',
      redirect_uri: callbackUrl,
      code_verifier: 'challenge'
    })
  }).then((res) => res.json());

  const requestMe = await fetch(`https://api.twitter.com/2/users/me?user.fields=id,name,profile_image_url,username`, {
    headers: {
      "Authorization": `Bearer ${requestToken.access_token}`,
    }
  }).then((res) => res.json());

  const { db } = await connectToDatabase();

  await db.collection("users").updateOne(
    { id: requestMe.data.id },
    {
      $set: {
        name: requestMe.data.name,
        username: requestMe.data.username,
        profile_image_url: requestMe.profile_image_url,
        token_type: requestToken.token_type,
        access_token: requestToken.access_token,
        scope: requestToken.scope,
        refresh_token: requestToken.refresh_token,
      }
    },
    { upsert: true }
  );

  return redirect("https://snoopx.abandon.ai/x")
}

export {GET}