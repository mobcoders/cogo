'use client';
import { createCard, weavrCreateCardFlow } from '@/lib/weavr';
import { Button, Spinner } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function NoCard({
  tripId,
  token,
}: {
  tripId: string;
  token: string;
}) {
  const [loading, setLoading] = useState(false);

  function handleCreate() {
    setLoading(true);
    weavrCreateCardFlow(tripId);
    // createCard(tripId);
  }
  return (
    <div className="max-w-[400px]">
      {loading ? (
        <Spinner className="w-full" />
      ) : (
        <Button onClick={handleCreate} className="w-full">
          Generate virtual card
        </Button>
      )}
    </div>
  );
}
