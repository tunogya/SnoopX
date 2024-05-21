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
  })
}

export {
  GET
}