import { authConfig } from '@/auth.config';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import google from 'next-auth/providers/google';

import prisma from '@/lib/prisma';

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
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        //hardcoded user for development purposes (exists on db too):
        const devUser = 'anna@anna.com';
        const user = await getUser(devUser);
        // const user = getUser(credentials.email as string);
        if (!user) return null;

        return user;

        // if (parsedCredentials.success) {
        //   const { email, password } = parsedCredentials.data;
        //   const user = await getUser(email);
        //   if (!user) return null;
        //   const passwordsMatch = await bcrypt.compare(password, user.password);

        //   if (passwordsMatch) return user;
        // }
        // console.log('Invalid credentials');
        // return null;
      },
    }),
    GitHub,
    google,
  ],
});
