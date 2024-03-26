'use client';

import { createTrip } from '@/lib/action';
import { Button, Spinner } from '@nextui-org/react';
import { useState } from 'react';

export default function CreateTripButton({
  tripName,
  id,
}: {
  tripName: string;
  id: string;
}) {
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
    createTrip(tripName, id);
  }

  return (
    <Button
      onClick={handleClick}
      className="w-full h-[50px] bg-pink-500 text-white"
    >
      {!loading ? <>Create a group trip</> : <Spinner />}
    </Button>
  );
}
