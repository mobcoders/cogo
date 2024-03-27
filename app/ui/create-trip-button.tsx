'use client';

import { createTrip, navigateProfile } from '@/lib/action';
import { Button, Spinner } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function CreateTripButton() {
  const [loading, setLoading] = useState(false);
  const session = useSession();
  let tripName = '';
  let id = '';

  function handleClick() {
    setLoading(true);
    if (session.status === 'authenticated') {
      let name = session!.data!.user?.name!;
      id = session.data.user?.id!;
      tripName = name.split(' ')[0] + "'s new group trip";
      createTrip(tripName, id);
    } else {
      navigateProfile();
    }
  }

  return (
    <Button
      onClick={handleClick}
      className="w-full h-[50px] bg-primary-500 text-white"
    >
      {!loading ? <>Create a group trip</> : <Spinner color="default" />}
    </Button>
  );
}
