import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/ask-question(.*)"]);

const publicRoutes = createRouteMatcher([
  "/",
  "/question/:id",
  "/tags",
  "/tags/:id",
  "/profile/:id",
  "/community",
  "/jobs",
]);

const ignoredRoutes = createRouteMatcher(["/api/webhook", "/api/chatgpt"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  if (ignoredRoutes(req)) {
    return; // Bỏ qua middleware cho các ignored routes
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
