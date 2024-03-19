import { useState, useEffect, use } from 'react';
import { fetchUser } from '@/lib/data';
import { Avatar } from '@nextui-org/avatar';
import EditUserPhoto from '@/app/ui/edit-user-photo';
import ProfileDestinationCard from '@/app/ui/profile-dest-card';
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();
  const user = await fetchUser(session!.user!.email as string);

  const trips = [...user.memberOfTrips, ...user.organisedTrips];

  return (
    <div className="flex flex-col items-center">
      <Avatar
        showFallback
        src={user.image!}
        className="w-[130px] h-[130px] bg-purple-600 text-white text-[48px] mb-5"
      />
      <EditUserPhoto />
      <h1 className="text-pink-500 mb-5">{`${user.name}`}</h1>
      <h1 className="w-full text-start mb-5">My trips:</h1>
      {trips.map((trip) => (
        <ProfileDestinationCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
}
