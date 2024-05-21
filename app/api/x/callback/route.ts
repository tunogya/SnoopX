import {NextRequest} from "next/server";
import {connectToDatabase} from "@/utils/mongodb";
import {ObjectId} from "mongodb";
import {redirect} from "next/navigation";

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

  const { token_type, access_token, refresh_token } = await fetch(`https://api.twitter.com/2/oauth2/token`, {
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

  const { id, name, username, profile_image_url } = await fetch(`https://api.twitter.com/2/me`, {
    headers: {
      "Authorization": `Bearer ${access_token}`,
    }
  }).then((res) => res.json())
    .then((res) => res.data);

  const { db } = await connectToDatabase();

  await db.collection("users").updateOne(
    { _id: new ObjectId(id as string) },
    {
      $set: {
        name: name,
        username: username,
        profile_image_url: profile_image_url,
        token_type: token_type,
        access_token: access_token,
        refresh_token: refresh_token
      }
    },
    { upsert: true }
  );

  return redirect("https://snoopx.abandon.ai/x")
}

export {GET}