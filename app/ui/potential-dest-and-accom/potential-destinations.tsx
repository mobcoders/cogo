import PotentialDestinationCard from '@/app/ui/potential-dest-and-accom/potential-dest-card';
import AddDestination from '@/app/ui/potential-dest-and-accom/add-destination';
import { fetchPotentialDests } from '@/lib/data';
import { User } from '@prisma/client';
import AutocompleteRequired from '@/app/ui/autocomplete-required';

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
      <p>Add potential destinations and vote for where you want to go...</p>
      <AddDestination tripId={tripId} />
      <div className="flex flex-col gap-5">
        <AutocompleteRequired />
        {sortedDestinations.map((destination) => (
          <PotentialDestinationCard
            key={destination.id}
            destination={destination}
            mostPopular={sortedDestinations[0].city}
            user={user}
            tripId={tripId}
          />
        ))}
      </div>
    </>
  );
}
