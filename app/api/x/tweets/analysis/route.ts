import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongodb";
import redis from "@/utils/redis";

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
            content: `You are a crypto financial analyst, your task is to analyze the following tweet/text and determine if it has a positive, negative, or neutral impact on the token price in 1 word. Then, provide the 1 sentence summary of the tweet/text.

There are some basic rules you already knows:
1. If the tweet is related to the project's financing, it is a clear positive for the project's token price.
2. If the tweet is about the project collaborating with popular projects, it is a clear positive for the project's token price.
3. If the tweet is about the project launching a product that aligns with trending topics, especially if it's the first time the project is entering that trend, it is a clear positive for the project's token price.
4. If the tweet is about the project being attacked by hackers, it is a clear negative for the project's token price.

Popular Projects Include:
a. Solana chain;
b. BTC Layer2 and BTC ecosystem projects;
c. TON chain and TON ecosystem projects;

Trending Topics Include:
a. AI-related Web3 applications.

Use json to return your answer, such as: { analysis: "positive" } or { analysis: "negative" } or { analysis: "neutral" }.
`,
          },
          {
            role: "user",
            content: text,
          },
        ],
        temperature: 0.5,
        n: 1,
        stream: false,
        max_tokens: 2048,
        response_format: {
          type: "json_object"
        },
      }),
    });

    const requestData = await response.json();

    const { analysis } = JSON.parse(requestData.choices[0].message.content);

    const symbol = await redis.get(`symbol:${author_id}`);

    await db.collection("tweets").updateOne(
      { id },
      {
        $set: {
          symbol: symbol,
          analysis: analysis,
        },
      }
    );
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