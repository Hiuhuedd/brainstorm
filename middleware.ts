// middleware.ts
import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  // Array of public routes that don't require authentication
  publicRoutes: ["/", "/sign-in", "/sign-up"],
  
  // Array of routes to be ignored by the authentication middleware
  ignoredRoutes: ["/api/public"]
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
