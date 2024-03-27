'use client';
import { createCard } from '@/lib/weavr-user';
import { Button, Spinner } from '@nextui-org/react';
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
    createCard(token, tripId);
  }
  return (
    <div className="max-w-[640px] md:m-auto md:w-full">
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
