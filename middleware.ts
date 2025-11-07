// export { default } from "next-auth/middleware";

// export const config = { matcher: ["/dashboard"] };

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role;

    // Allow only ADMIN to access dashboard
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // User must be logged in
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"], // Protect /dashboard and subroutes
};
  