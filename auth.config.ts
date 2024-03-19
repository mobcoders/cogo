import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  // pages: {
  //   signIn: '/login',
  // },
  callbacks: {
    jwt: async ({ token, user }) => {
      // user is defined when the user is first authenticated
      if (user) {
        console.log(user);
        token.id = user.id; // Add the user ID to the JWT
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.id as string;
      return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isInApp = nextUrl.pathname !== '/';
      if (isInApp) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
