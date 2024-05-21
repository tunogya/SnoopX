import {NextRequest} from "next/server";

const POST = async (req: NextRequest) => {
  const data = await req.json();
  console.log(data);
  return Response.json({
    ok: true,
  })
}

export {POST}