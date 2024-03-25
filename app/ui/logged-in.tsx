'use client';
import { auth, signOut } from '@/auth';
import { Avatar, Button } from '@nextui-org/react';
import { headers } from 'next/headers';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { logOut } from '@/lib/action';

function SignOut() {
  return (
    <Button
      onClick={async () => {
        await logOut();
      }}
    >
      Sign out
    </Button>
  );
}

export default function LoggedIn() {
  const { data: session, status } = useSession();

  const path = usePathname();

  if (status === 'authenticated') {
    if (path === '/profile') {
      return <SignOut />;
    } else {
      return (
        <Link href="/profile">
          <Avatar
            showFallback
            src={session.user!.image!}
            className="w-[60px] h-[60px] bg-purple-600 text-white text-[48px] mb-5"
          />
        </Link>
      );
    }
    // return <p>Signed in as {session!.user!.email}</p>;
  } else {
    return (
      <Link href="/profile">
        <Button data-cy="login-button">Sign in</Button>
      </Link>
    );
  }

  // const requestUrl = headers().get('x-url');
  // const onProfile = requestUrl?.includes('/profile');
  // console.log(onProfile);

  // let session = await auth();
  // let user = session?.user;
  return (
    <>
      {/* {session ? (
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
      )} */}
    </>
  );
}
