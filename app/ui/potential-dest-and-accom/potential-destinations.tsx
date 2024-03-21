import PotentialDestinationCard from '@/app/ui/potential-dest-and-accom/potential-dest-card';
import AddDestination from '@/app/ui/potential-dest-and-accom/add-destination';
import { fetchPotentialDests } from '@/lib/data';
import { User } from '@prisma/client';

export default async function PotentialDestinations({
  tripId,
  user,
}: {
  tripId: string;
  user: User;
}) {
  const destinations = await fetchPotentialDests(tripId);
  const sortedDestinations = destinations.sort(
    (tripA, tripB) => tripB.likedBy.length - tripA.likedBy.length
  );

  return (
    <>
      <p>
        Add potential destinations, vote for where you want to go and when ready
        lock-in the final choice.
      </p>
      <AddDestination tripId={tripId} />
      <div className="flex flex-col gap-5">
        {sortedDestinations.map((destination) => (
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
