import {NextRequest} from "next/server";
import redis from "@/utils/redis";

const POST = async (req: NextRequest) => {
  const random = Math.random();
  let cmc_key = process.env.CMC_PRO_API_KEY || "";
  if (random > 0.5) {
    if (process.env.CMC_PRO_API_KEY2) {
      cmc_key = process.env.CMC_PRO_API_KEY2
    }
  }
  const now = new Date();
  if (now.getHours() < 9 || now.getHours() > 21) {
    return Response.json({
      data: "ok",
    })
  }

  const request = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=100&sort=date_added&sort_dir=desc`, {
    headers: {
      "X-CMC_PRO_API_KEY": cmc_key,
    },
  }).then((res) => res.json());
  const current_date_added = await redis.get("latest_date_added") || "2024-06-24T00:00:00.000Z";
  const data = request.data.filter((item: any) => {
    // @ts-ignore
    if (new Date(item.date_added) > new Date(current_date_added)) {
      return true;
    }
  });
  if (data.length === 0) {
    return Response.json({
      data: "ok",
    })
  }
  try {
    const bot_token = process.env.TELEGRAM_BOT_TOKEN || "";
    const inline_keyboard_items = data.map((item: any) => ({
      text: `${item.name} - ${item.symbol}`,
      url: `https://coinmarketcap.com/currencies/${item.slug}/`
    }));
    // 将 inline_keyboard 每2个为一组
    const inline_keyboard = [];
    for (let i = 0; i < inline_keyboard_items.length; i += 2) {
      inline_keyboard.push(inline_keyboard_items.slice(i, i + 2));
    }
    await fetch(`https://api.telegram.org/bot${bot_token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: "@super_snoopx",
        text: `There are ${data.length} new crypto currencies added!`,
        reply_markup: {
          inline_keyboard: inline_keyboard,
        },
      })
    });
    const latest_date_added = data[0].date_added;
    await redis.set("latest_date_added", latest_date_added);
  } catch (e) {
    console.log(e)
  }
  return Response.json({
    data: "ok",
  });
}

export {
  POST
}