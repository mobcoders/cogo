import PotentialDestinationCard from '@/app/ui/potential-dest-and-accom/potential-dest-card';
import AddDestination from '@/app/ui/potential-dest-and-accom/add-destination';
import { fetchPotentialDests } from '@/lib/data';
import { User } from '@prisma/client';
import { pexelsSearch } from '@/lib/pexels';
import { Input } from '@nextui-org/react';

export default async function PotentialDestinations({
  tripId,
  user,
}: {
  tripId: string;
  user: User;
}) {
  const destinations = await fetchPotentialDests(tripId);
  const sortedDestinations = destinations!.sort(
    (tripA, tripB) => tripB.likedBy.length - tripA.likedBy.length
  );

  async function callPexelsSearch(query: string) {
    'use server';
    return await pexelsSearch(query);
  }

  return (
    <>
      <p className="mb-5">
        Add potential destinations, vote for where you want to go and when ready
        lock-in the final choice.
      </p>
      {/* <AddDestination tripId={tripId} /> */}

      <div className="flex flex-col gap-5">
        <AddDestination callPexelsSearch={callPexelsSearch} tripId={tripId} />

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
