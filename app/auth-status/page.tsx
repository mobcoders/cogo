import LoginForm from '@/app/ui/login-form';
import { auth, signIn, signOut } from '@/auth';
import { Button } from '@nextui-org/react';

function SignIn() {
  return (
    <>
      <form
        action={async () => {
          'use server';
          await signIn('google');
        }}
      >
        <p>You are not logged in</p>
        <button type="submit">Sign in with Googles</button>
      </form>
      <LoginForm />
    </>
  );
}

function SignOut({ children }: { children: React.ReactNode }) {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <p>{children}</p>
      <Button type="submit">Sign out</Button>
    </form>
  );
}

export default async function Page() {
  let session = await auth();
  let username = session?.user?.name;
  let email = session?.user?.email;
  let userId = session?.user?.id;

  return (
    <section>
      <h1>Home</h1>
      <div>
        {username ? (
          <SignOut>{`Welcome ${username} whos email is ${email} and userID is ${userId}`}</SignOut>
        ) : (
          <SignIn />
        )}
      </div>
    </section>
  );
}
