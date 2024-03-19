import { useState, useEffect, use } from 'react';
import { fetchUser } from '@/lib/action';
import { Avatar } from '@nextui-org/avatar';
import EditUserPhoto from '@/app/ui/edit-user-photo';

export default async function Page() {
  const user = await fetchUser('clty968kp0000107unfnhi2sf');
  const trips = [...user.memberOfTrips, ...user.organisedTrips];

  return (
    <div className="flex flex-col items-center">
      <Avatar
        showFallback
        src={user.image}
        className="w-[130px] h-[130px] bg-purple-600 text-white text-[48px] mb-5"
      />
      <EditUserPhoto />
      <h1 className="text-pink-500 mb-5">{`${user.firstName} ${user.lastName}`}</h1>
      <h1 className="w-full text-start">My trips:</h1>
      {trips.map((trip) => (
        <p key={trip.finalised}>{trip.name}</p>
      ))}
    </div>
  );
}
