import NextAuth, { NextAuthOptions, SessionOptions } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import CredentialsProvider from "next-auth/providers/credentials";
import { verify, sign } from "jsonwebtoken";

import { serverConfig } from "config";
import { signIn } from "services/client/auth.service";

const MAX_AGE = 1 * 24 * 60 * 60; // 1 day

const DEFAULT_SESSION_OPTIONS: Partial<SessionOptions> = {
  strategy: "jwt",
  maxAge: MAX_AGE
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, DEFAULT_NEXT_AUTH_OPTIONS);
}

const DEFAULT_NEXT_AUTH_OPTIONS: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any) {
        const { email, password } = credentials;
        try {
          const { user }: any = await signIn({ email, password });
          const authUser = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          };

          return authUser;
        } catch (e) {
          throw new Error(e.response.data.message);
        }
      },
    }),
  ],

  secret: serverConfig.auth.secret,
  jwt: {
    secret: serverConfig.auth.secret,
    maxAge: MAX_AGE,
    encode: async (data: any) => {
      const { secret, token } = data;
      return sign(token, secret);
    },
    async decode(data: any) {
      const { secret, token } = data;
      const user = verify(token, secret);
      return user;
    },
  },
  session: DEFAULT_SESSION_OPTIONS,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = Number(user.id);
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.role) {
        session.user.id = token.userId;
        session.user.role = token.role;
      }

      return session;
    },

    async redirect({ url }) {
      return url;
    },
  },
  cookies: {
    sessionToken: {
      name: "accessToken",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true
      }
    },
  }
};
