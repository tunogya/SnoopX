import {NextRequest} from "next/server";

const GET = async (req: NextRequest) => {
  const code = req.nextUrl.searchParams.get('code');
  console.log("code", code);
  return Response.json({
    ok: true,
  })
}

export {GET}