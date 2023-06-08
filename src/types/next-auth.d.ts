import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    accessToken: string;
    user: {
      id: number;
      role: string;
    } & DefaultSession["user"];
  }

  // eslint-disable-next-line no-unused-vars
  interface User extends DefaultUser {
    id: number;
    role: string;
  }
}

declare module "next-auth/jwt" {
  // eslint-disable-next-line no-unused-vars
  interface JWT extends DefaultJWT {
    userId: number;
    role: string;
  }
}
