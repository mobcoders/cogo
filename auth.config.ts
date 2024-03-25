import { createOAuthUser, getUser } from '@/auth';
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/auth',
  },
  callbacks: {
    //deal with oAuth signins
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        //check the user on your database and return true if is allowed to signIn
        let googleUser = await getUser(user.email as string);
        if (!googleUser) {
          googleUser = await createOAuthUser(user.email!, user.name!);
        }
        return googleUser ? true : false;
      }
      return true;
    },

    jwt: async ({ token, user, account }) => {
      // user is defined when the user is first authenticated
      if (user) {
        if (account?.provider === 'google') {
          //check the user on your database and return true if is allowed to signIn
          let googleUser = await getUser(user.email as string);
          token.id = googleUser?.id;
          token.image = googleUser?.image;
        } else {
          token.id = user.id; // Add the user ID to the JWT
          token.image = user.image;
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.id as string;
      session.user.image = token.image as string;
      return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isInApp = nextUrl.pathname !== '/';
      const isOnAuthPage = nextUrl.pathname.startsWith('/auth');
      if (isOnAuthPage) {
        if (isLoggedIn) {
          if (nextUrl.searchParams.get('callbackUrl')) {
            return Response.redirect(
              new URL(nextUrl.searchParams.get('callbackUrl')!, nextUrl.origin)
            );
          }
          return Response.redirect(new URL('/profile', nextUrl));
        }
      } else if (isInApp) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
