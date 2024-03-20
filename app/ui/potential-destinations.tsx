import PotentialDestinationCard from '@/app/ui/potential-dest-card/potential-dest-card';
import AddDestination from '@/app/ui/add-destination';
import { fetchPotentialDests } from '@/lib/data';
import { toggleLike } from '@/lib/action';
import { User } from '@prisma/client';
// import { auth } from '@/auth';

export default async function PotentialDestinations({
  tripId,
  user,
}: {
  tripId: string;
  user: User;
}) {
  //for now the trip MobCoders2024 is hardcoded for development in the data.ts, else this works
  const destinations = await fetchPotentialDests(tripId);

  // let session = await auth();
  // let username = session?.user?.name;
  // let email = session?.user?.email;
  // let userId = session?.user?.console.log(userId);

  // await toggleLike('cltygf9ev000dxgxv5dt5ij70', 'cltyl7gc70000e2qzvyrx01wh');
  // console.log('we did it');
  return (
    <>
      <p>Add potential destinations and vote for where you want to go...</p>
      <AddDestination tripId={tripId} />
      <div className="flex flex-col gap-5">
        {destinations.map((destination) => (
          <PotentialDestinationCard
            key={destination.id}
            destination={destination}
            user={user}
            tripId={tripId}
          />
        ))}
      </div>
    </>
  );
}
