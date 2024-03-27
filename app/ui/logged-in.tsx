'use client';
import { Avatar, Button } from '@nextui-org/react';
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
            className="w-[60px] h-[60px] bg-purple-600 text-white text-[48px]"
          />
        </Link>
      );
    }
  } else if (!path.includes('/auth')) {
    return (
      <Link href="/profile">
        <Button data-cy="login-button">Sign in</Button>
      </Link>
    );
  } else {
    return <></>;
  }
}
