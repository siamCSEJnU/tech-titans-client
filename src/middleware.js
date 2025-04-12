import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
  const cookieStore = await cookies();
  const token = cookieStore?.get("auth-token");
  if (token) {
    return NextResponse.next();
  } else {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  // return NextResponse.next();
};

export const config = {
  matcher: [
    "/checkout",
    "/checkout/:path*",
    "/success",
    "/user-dashboard/:path*",
    "/admin-dashboard/:path*",
    "/seller-dashboard/:path*",
  ],
};
