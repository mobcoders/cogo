'use client';
import { WeavrUserCreationFlow } from '@/lib/weavr-create-user';
import { Button, Spinner } from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';

export default function KYC({ tripId }: { tripId: string }) {
  const [loading, setLoading] = useState(false);

  function handleCreate() {
    setLoading(true);
    WeavrUserCreationFlow(tripId);
  }

  return (
    <div className="max-w-[640px] md:m-auto md:w-full">
      <strong>Welcome to CogoPay.</strong>
      <br />
      This feature allows you to create virtual cards for each trip you
      organise, and allow for easy spend management when booking travel and
      paying for things whilst on the trip. <br /> To get started, you must
      upgrade your account to become compliant for banking. Then you will be
      able to create cards easily for any trip.
      <br />
      <strong>
        If you do not wish to use this feature, you can return to your trip
        details.
      </strong>
      <Link href={`/${tripId}`}>
        <Button className="w-full bg-primary-500 text-white my-5">
          Go back to trip
        </Button>
      </Link>
      {loading ? (
        <Spinner className="w-full" />
      ) : (
        <Button
          onClick={handleCreate}
          className="w-full bg-primary-500 text-white"
        >
          Please click to generate banking account and KYC
        </Button>
      )}
    </div>
  );
}
