'use client';
import { WeavrUserCreationFlow } from '@/lib/weavr-create-user';
import { Button, Spinner } from '@nextui-org/react';
import { useState } from 'react';

export default function KYC({ tripId }: { tripId: string }) {
  const [loading, setLoading] = useState(false);

  function handleCreate() {
    setLoading(true);
    WeavrUserCreationFlow(tripId);
  }

  return (
    <div className="max-w-[400px]">
      {loading ? (
        <Spinner className="w-full" />
      ) : (
        <Button onClick={handleCreate} className="w-full bg-primary-500">
          Please click to generate banking account and KYC
        </Button>
      )}
    </div>
  );
}
