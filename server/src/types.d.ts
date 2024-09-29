import "express-session";

declare module "express-session" {
  interface SessionData {
    user?: { id: string }; // Adjust this to match your user structure
  }
}
