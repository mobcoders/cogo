import { authConfig } from '@/auth.config';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import google from 'next-auth/providers/google';

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
        console.log('handling Credentials auth ');
        const user = { id: '1', name: 'Arjun', email: 'test@testing.com' };
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
