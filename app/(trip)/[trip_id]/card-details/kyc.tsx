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
      <div className="mb-3">
        <h2 className="text-pink-500 dark:text-[#ECEDEE]">
          Welcome to CogoPay.
        </h2>
      </div>
      <p className="mb-3">
        Fed up of splitting payments with your friends? Us too.
      </p>
      <p className="mb-3">
        Create a virtual card with CogoPay for your group trip which can be used
        for all your group payments such as booking flights.
      </p>
      <p className="mb-3">
        To get started, upgrade your account to become compliant for banking.
        You can then easily create cards for any trip.
      </p>
      <p className="mb-5">
        Click the button below to get started with compliance checks and
        generate your CogoPay bank account…
      </p>
      <div className="w-full flex justify-between gap-5">
        <Link href={`/${tripId}`} className="w-full">
          <Button className="border-[1.5px] border-primary-500 bg-transparent w-full dark:text-white">
            Go Back
          </Button>
        </Link>
        {loading ? (
          <Spinner className="w-full" />
        ) : (
          <Button
            onClick={handleCreate}
            className="bg-primary-500 text-white w-full"
          >
            Start Compliance Checks
          </Button>
        )}
      </div>
    </div>
  );
}
