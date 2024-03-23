import { auth } from '@/auth';
import { fetchUser } from '@/lib/data';
import { Avatar } from '@nextui-org/avatar';
import EditUserPhoto from '@/app/ui/edit-user-photo';
import ProfileDestinationCard from '@/app/ui/profile-dest-card';
import { Button } from '@nextui-org/react';
import { deleteUser } from '@/lib/action';
import { redirect } from 'next/navigation';
import { User } from '@prisma/client';
import DeleteButton from '@/app/ui/delete-user-button';

export default async function Page() {
  const session = await auth();
  const user = await fetchUser(session!.user!.email!);
  const trips = [...user.memberOfTrips, ...user.organisedTrips];

  return (
    <div className="flex flex-col items-center">
      <Avatar
        showFallback
        src={user.image!}
        className="w-[130px] h-[130px] bg-purple-600 text-white text-[48px] mb-5"
      />
      <EditUserPhoto userId={user.id} />
      <h1 className="text-pink-500 mb-5">{`${user.name}`}</h1>

      <DeleteButton email={user.email!} />

      <h1 className="w-full text-start mb-5">My trips:</h1>
      {trips.map((trip) => (
        <ProfileDestinationCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
}
