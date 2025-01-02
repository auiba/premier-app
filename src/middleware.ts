import { NextRequest, NextResponse } from "next/server";
import { isTokenValid } from "../utils/authHelpers";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;
  const tokenObj = token && JSON.parse(token);

  // If already on panel or login, proceed normally
  if (
    req.nextUrl.pathname === "/admin/panel" ||
    req.nextUrl.pathname === "/admin-login"
  ) {
    return NextResponse.next();
  }

  try {
    if (!token) throw new Error("No token");
    if (!isTokenValid(tokenObj)) throw new Error("Wrong user or password");

    return NextResponse.redirect(new URL("/admin/panel", req.url), {
      status: 307,
    });
  } catch (error) {
    return NextResponse.redirect(new URL("/admin-login", req.url), {
      status: 307,
    });
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
