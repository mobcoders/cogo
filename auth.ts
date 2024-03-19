import { authConfig } from '@/auth.config';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import google from 'next-auth/providers/google';
import prisma from '@/lib/prisma';
// import bcrypt from 'bcrypt';
// const bcrypt = require('bcrypt');

async function getUser(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
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
      // name: 'Sign in',
      // credentials: {
      //   email: {
      //     label: 'Email',
      //     type: 'email',
      //     placeholder: 'hello@example.com',
      //   },
      //   password: { label: 'Password', type: 'password' },
      // },
      async authorize(credentials) {
        //hardcoded user for development purposes (exists on db too):
        // const email = 'anna@anna.com';
        const { email, password } = credentials;
        const user = await getUser(email as string);
        if (!user) return null;
        return user;
        // const passwordsMatch = await bcrypt.compare(password, user.password!);
        //   if (passwordsMatch) return user;
        //   return null;
      },
    }),
    GitHub,
    google,
  ],
});
