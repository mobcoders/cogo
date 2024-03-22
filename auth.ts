import { authConfig } from '@/auth.config';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import google from 'next-auth/providers/google';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function getUser(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
}

export async function createOAuthUser(email: string, name: string) {
  const user = await prisma.user.create({
    data: {
      email: email,
      name: name,
    },
  });
  return user;
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      id: 'credentials',
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await getUser(email as string);
        if (!user) return null;
        const passwordsMatch = await bcrypt.compare(
          password as string,
          user!.password!
        );
        if (passwordsMatch) return user;
        return null;
      },
    }),
    google,
  ],
});
