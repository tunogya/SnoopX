import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongodb";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, "6 h"),
  analytics: false,
  prefix: "@create_tweet/ratelimit",
});

const analyzeTweet = async (id: string, author_id: string, text: string, db: any) => {
  try {
    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `As a crypto financial analyst, your task is to analyze the following tweet/text and determine if it has a positive, negative, or neutral impact on the token price in 1 word. When giving a Positive, be stricter: if the content is not obviously positive, do not give a Positive. Then, provide a 1-sentence abstract of the tweet/text. 
Please output in the following format:
First line: Positive/Negative/Neutral
Second line: 1-sentence abstract of the tweet/text.

There are some basic rules you already knows:
1. If the tweet is related to the project's fundraising, it is a positive for the project's token price.
2. If the tweet is about the project collaborating with popular projects, it is a positive for the project's token price.
3. If the tweet is about the project being attacked by hackers, it is a clear negative for the project's token price.

Popular Projects Include:
a. Solana chain;
b. BTC Layer2 and BTC ecosystem projects;
c. TON chain and TON ecosystem projects;
`,
          },
          {
            role: "user",
            content: text,
          },
        ],
        temperature: 0,
        top_p: 1,
        n: 1,
        stream: false,
        max_tokens: 2048,
      }),
    });

    const requestData = await response.json();

    const tweet = requestData.choices[0].message.content;

    const user = await db.collection("symbols").findOne({
      id: author_id,
    })

    await db.collection("tweets").updateOne(
      { id },
      {
        $set: {
          symbol: user?.symbol || "NULL",
          analysis: tweet,
        },
      }
    );

    if (user?.symbol) {
      const { success } = await ratelimit.limit(user.symbol);
      if (success) {
        const tweet_user = await db.collection("users").findOne({
          id: "1497386846589906946",
        })
        const access_token = tweet_user?.access_token;
        if (access_token) {
          try {
            await fetch("https://api.twitter.com/2/tweets", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`,
              },
              body: JSON.stringify({
                text: tweet,
              })
            })
          } catch (e) {
            console.log(e)
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error analyzing tweet ${id}:`, error);
  }
};

const POST = async (req: NextRequest) => {
  let limit: number = Number(req.nextUrl.searchParams.get("max_results") || 10);

  try {
    const { db } = await connectToDatabase();
    const tweets = await db
      .collection("tweets")
      .find(
        { analysis: null },
        {
          sort: { created_at: -1 },
          limit: limit,
        }
      )
      .toArray();

    if (tweets.length === 0) {
      return NextResponse.json({
        data: "ok",
      })
    }

    await Promise.all(tweets.map((tweet) => analyzeTweet(tweet.id, tweet.author_id, tweet.text, db)));

    return NextResponse.json(
      { data: "ok" },
    );
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
};

export { POST };