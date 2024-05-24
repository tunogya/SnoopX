import {NextRequest} from "next/server";
import {connectToDatabase} from "@/utils/mongodb";

const GET = async (req: NextRequest) => {
  const { db } = await connectToDatabase();
  const users = await db.collection('tweets').find({}, {
    projection: {
      id: 1,
      text: 1,
    }
  }).toArray();

  return Response.json({
    data: users,
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