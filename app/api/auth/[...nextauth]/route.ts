import NextAuth, { NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/lib/prisma';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

const authOption: NextAuthConfig = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error('No profile');
      }

      await prisma.user.upsert({
        where: {
          email: profile.eamil,
        },
        create: {
          email: profile.email,
          name: profile.email,
        },
        update: {
          name: profile.name,
        },
      });
      return true;
    },
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
