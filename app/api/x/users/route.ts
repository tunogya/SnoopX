import {NextRequest} from "next/server";
import {connectToDatabase} from "@/utils/mongodb";

const GET = async (req: NextRequest) => {
  const { db } = await connectToDatabase();
  const users = await db.collection('users').find({}, {
    projection: {
      name: 1,
      username: 1,
      profile_image_url: 1,
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