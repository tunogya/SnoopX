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

  const requestToken = await fetch(`https://api.twitter.com/2/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code: code,
      grant_type: 'authorization_code',
      client_id: 'eWp3dG1tVjRpM1lBWDJVSXlhR3c6MTpjaQ',
      // redirect_uri: 'https://snoopx.abandon.ai/api/x/callback',
      redirect_uri: "http://localhost:3000/api/x/callback",
      code_verifier: 'challenge'
    })
  }).then((res) => res.json());

  console.log(requestToken);

  const requestMe = await fetch(`https://api.twitter.com/2/me`, {
    headers: {
      "Authorization": `Bearer ${requestToken.access_token}`,
    }
  }).then((res) => res.json())
    .then((res) => res.data);

  console.log(requestMe);

  const { db } = await connectToDatabase();

  await db.collection("users").updateOne(
    { _id: new ObjectId(requestMe.id as string) },
    {
      $set: {
        name: requestMe.name,
        username: requestMe.username,
        profile_image_url: requestMe.profile_image_url,
        token_type: requestToken.token_type,
        access_token: requestToken.access_token,
        refresh_token: requestToken.refresh_token
      }
    },
    { upsert: true }
  );

  return redirect("https://snoopx.abandon.ai/x")
}

export {GET}