'use client';

import { createTrip } from '@/lib/action';
import { Button, Spinner } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function CreateTripButton() {
  let session = useSession();
  if (session.status !== 'authenticated') {
  }
  console.log(session);
  // let session = await auth();
  // let name = session!.user!.name!;
  // let id = session?.user?.id!;
  // let tripName = name.split(' ')[0] + "'s new group trip";
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
    // createTrip(tripName, id);
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
