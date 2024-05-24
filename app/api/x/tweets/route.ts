import {NextRequest} from "next/server";
import {connectToDatabase} from "@/utils/mongodb";

const GET = async (req: NextRequest) => {
  let limit: number = Number(req.nextUrl.searchParams.get("max_results") || 100);
  const { db } = await connectToDatabase();
  const tweets = await db.collection('tweets').find({}, {
    limit: limit,
  }).toArray();

  return Response.json({
    data: tweets,
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