'use client';

import { Button, Spinner } from '@nextui-org/react';
import { useState } from 'react';

export default function CreateTripButton({ createTrip }: { createTrip: any }) {
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
    createTrip();
  }

  return (
    <Button
      onClick={handleClick}
      className="w-full h-[50px] bg-pink-500 text-white mt-5"
    >
      {!loading ? <>Create a group trip</> : <Spinner />}
    </Button>
  );
}
