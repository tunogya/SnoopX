import {NextRequest} from "next/server";
import {connectToDatabase} from "@/utils/mongodb";

const GET = async (req: NextRequest) => {
  const { db } = await connectToDatabase();
  const tweets = await db.collection('tweets').find({
    analysis: null,
  }, {
    sort: {
      created_at: -1,
    },
    limit: 2,
  }).toArray();

  const analysis = async (id: string, text: string) => {
    const request = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        "model": "gpt-4o",
        "messages": [
          {
            "role": "system",
            "content": `You are a crypto financial analyst, your task is to analyze the following tweet/text and determine if it has a positive, negative, or neutral impact on the token price in 1 word. Then, provide the 1 sentence summary of the tweet/text.

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

Use json to return your answer, such as: { data: "positive" } or { data: "negative" } or { data: "neutral" }.
`
          },
          {
            "role": "user",
            "content": text,
          }
        ],
        "temperature": 0.5,
        "n": 1,
        "stream": false,
        "max_tokens": 2048,
        "response_format": {
          "type": "json_object"
        },
      })
    }).then((res) => res.json());
    const {data} = JSON.parse(request.choices[0].message.content);
    await db.collection('tweets').updateOne({
      id
    }, {
      $set: {
        analysis: data
      }
    });
  }

  for (const tweet of tweets) {
    await analysis(tweet.id, tweet.text)
  }

  return Response.json({
    data: "ok",
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