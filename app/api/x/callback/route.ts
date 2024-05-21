import {NextRequest} from "next/server";

const GET = async (req: NextRequest) => {
  // https://snoopx.abandon.ai/api/x/callback?state=state&code=bFFEQTR2ZUw0RWp1bHU1MGd4Vmxob0hvNWY2NDhnbEIwMXZyZnRJVnVBZEdEOjE3MTYyNzQ1MTc2NjI6MTowOmFjOjE
  const code = req.nextUrl.searchParams.get('code');
  console.log("code", code);
  return Response.json({
    ok: true,
  })
}

export {GET}