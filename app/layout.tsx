import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import '@/app/ui/globals.css';
import { Providers } from '@/app/providers';
import CogoLogo from './ui/cogo-logo';
import { auth, signOut } from '@/auth';
import { Avatar, Button } from '@nextui-org/react';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { headers } from 'next/headers';

const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'cogo',
  description: 'Hassle-free group travel.',
};

function SignOut({ children }: { children?: React.ReactNode }) {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <Button type="submit">Sign out</Button>
    </form>
  );
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestUrl = headers().get('x-url');
  const onProfile = requestUrl?.includes('/profile');
  console.log(onProfile);
  let session = await auth();
  let user = session?.user;

  return (
    <html lang="en">
      <body
        className={`${manrope.className} antialiased min-h-screen px-10 py-12`}
      >
        <Providers>
          <div className="flex flex-row justify-between">
            <CogoLogo />
            {session ? (
              onProfile ? (
                <SignOut />
              ) : (
                <Avatar
                  showFallback
                  src={user!.image!}
                  className="w-[60px] h-[60px] bg-purple-600 text-white text-[48px] mb-5"
                />
              )
            ) : (
              <Link href="/profile">
                <Button data-cy="login-button">Sign in</Button>
              </Link>
            )}
          </div>

          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
