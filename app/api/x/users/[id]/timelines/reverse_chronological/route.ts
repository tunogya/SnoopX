import {NextRequest} from "next/server";
import {connectToDatabase} from "@/utils/mongodb";

const clientId = process.env.NEXT_PUBLIC_X_CLIENT_ID || "";
const clientSecret = process.env.X_CLIENT_SECRET || "";

const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { db } = await connectToDatabase();
  const user = await db.collection("users").findOne({
    id: params.id,
  })
  if (!user) {
    return Response.json({
      error: "User not found",
    }, {
      status: 404,
    })
  }

  const {access_token, refresh_token} = user;

  const credentials = `${clientId}:${clientSecret}`;

  let timelines = [];
  try {
    timelines = await fetch(`https://api.twitter.com/2/users/${params.id}/timelines/reverse_chronological?max_results=100`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Authorization": `Bearer ${access_token}`
      },
    }).then((res) => res.json())
      .then((res) => res.data);
  } catch (e) {
    // use refresh_token to get new access_token
    const requestToken = await fetch(`https://api.twitter.com/2/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Authorization": `Basic ${Buffer.from(credentials).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      }),
    }).then((res) => res.json());
    const new_access_token = requestToken.requestToken

    // update access_token
    await db.collection("users").updateOne({
      id: params.id
    }, {
      $set: {
        access_token: new_access_token
      }
    })

    // use access_token to get timelines
    timelines = await fetch(`https://api.twitter.com/2/users/${params.id}/timelines/reverse_chronological?max_results=100&tweet.fields=id,text,created_at`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Authorization": `Bearer ${new_access_token}`
      },
    })
      .then((res) => res.json())
      .then((res) => res.data);
  }

  await db.collection("tweets").bulkWrite(
    timelines.map((item: any) => ({
      updateOne: {
        filter: { id: item.id },
        update: { $set: { text: item.text, created_at: item.created_at } },
        upsert: true,
      },
    })),
    {
      ordered: false,
    }
  );

  return Response.json({
    success: true,
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Surrogate-Control': 'no-store'
    }
  })
}

export {
  GET
}