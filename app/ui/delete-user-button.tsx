'use client';
import { deleteUser } from '@/lib/action';
import { Button } from '@nextui-org/react';

export default function DeleteButton({ email }: { email: string }) {
  return (
    <Button
      onClick={async () => {
        await deleteUser(email);
      }}
      data-cy="delete account button"
    >
      Delete account
    </Button>
  );
}
