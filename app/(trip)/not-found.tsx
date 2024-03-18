import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';
import { Button } from '@nextui-org/react';

export const metadata: Metadata = {
  title: 'Trip Not Found',
};

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-5">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the trip</p>

      <Button>
        <Link href="/">Go home</Link>
      </Button>
    </main>
  );
}
