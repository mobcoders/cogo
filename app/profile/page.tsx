import { auth } from '@/auth';
import { fetchUser } from '@/lib/data';
import { Avatar } from '@nextui-org/avatar';
// import EditUserPhoto from '@/app/ui/edit-user-photo';
import ProfileDestinationCard from '@/app/ui/profile-dest-card';
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import ProfileSettings from '@/app/ui/profile-settings';

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
      <ProfileSettings userId={user.id} userEmail={user.email!} />

      <h1 className="text-purple-600 mb-5">{`${user.name}`}</h1>
      <h1 className="w-full text-start mb-5">My trips:</h1>
      <Link href={'/newtrip'} className="w-full">
        <Button className="w-full h-[50px] bg-pink-500 text-white mb-5">
          Create a Group Trip
        </Button>
      </Link>

      {trips.map((trip) => (
        <ProfileDestinationCard
          key={trip.id}
          trip={trip}
          chosenDestination={trip.chosenDestination}
        />
      ))}
      <footer className="text-center text-xs mt-10 text-light-grey">
        <p>A MOBCODERS Creation.</p>
        <p>© 2024 cogo. All rights reserved.</p>
      </footer>
    </div>
  );
}
