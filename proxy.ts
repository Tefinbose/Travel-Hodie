
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the admin login page.
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // IMPORTANT: Allow the login API without an existing token.
  if (pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  // Read authentication cookie.
  const token = request.cookies.get("travelhodie_admin")?.value;
  const jwtSecret = process.env.JWT_SECRET;

  let authenticated = false;

  if (token && jwtSecret) {
    try {
      const secret = new TextEncoder().encode(jwtSecret);
      const { payload } = await jwtVerify(token, secret);

      authenticated =
        typeof payload.sub === "string" &&
        typeof payload.name === "string" &&
        typeof payload.email === "string" &&
        payload.role === "ADMIN";
    } catch (error) {
      console.error("Admin authentication failed:", error);
      authenticated = false;
    }
  }

  // Reject unauthenticated requests.
  if (!authenticated) {
    if (pathname.startsWith("/api/admin/")) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please log in.",
        },
        { status: 401 }
      );
    }

    const loginUrl = new URL("/admin/login", request.url);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
