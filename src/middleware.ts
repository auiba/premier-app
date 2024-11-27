// middleware.ts in project root
import { type NextRequest, NextResponse } from "next/server";
import { isTokenValid } from "../utils/authHelpers";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;
  const tokenObj = token && JSON.parse(token);

  try {
    if (!token) throw new Error("No token");

    if (!isTokenValid(tokenObj)) throw new Error("Wrong user or password");

    console.log("Credentials ok");
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/admin-login", req.url));
  }
}

export const config = {
  matcher: "/admin/:path*",
};
