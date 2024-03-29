import { auth } from '@/auth';
import { fetchUser } from '@/lib/data';
import { Avatar } from '@nextui-org/avatar';
import ProfileDestinationCard from '@/app/ui/profile-dest-card';
import ProfileSettings from '@/app/ui/profile-settings';
import CreateTripButton from '@/app/ui/create-trip-button';

export default async function Page() {
  const session = await auth();
  const user = await fetchUser(session!.user!.email!);
  const trips = [...user.memberOfTrips, ...user.organisedTrips];

  return (
    <div className="flex flex-col items-center max-w-[500px] mx-auto">
      <Avatar
        showFallback
        src={user.image!}
        className="w-[130px] h-[130px] bg-purple-600 text-white text-[48px] mb-5"
      />
      <ProfileSettings userId={user.id} userEmail={user.email!} />

      <h1 className="text-secondary-500 mb-5">{`${user.name}`}</h1>
      <h1 className="w-full text-start mb-5">My trips:</h1>
      <CreateTripButton />

      <div className="w-full mt-5">
        {trips.map((trip) => (
          <ProfileDestinationCard
            key={trip.id}
            trip={trip}
            chosenDestination={trip.chosenDestination}
          />
        ))}
      </div>
    </div>
  );
}
