// custom.d.ts or in your types file
import session from "express-session";

declare module "express-session" {
  interface SessionData {
    user: { id: any };
  }
}
