'use client';
import PotentialDestinationCard from '@/app/ui/potential-dest-and-accom/potential-dest-card';
import AddDestination from '@/app/ui/potential-dest-and-accom/add-destination';
import { User } from '@prisma/client';
import { pexelsSearch } from '@/lib/pexels';
import type { PotentialDestination } from '@prisma/client';
import { useOptimistic } from 'react';

// import { useOptimistic } from 'react';

export default function PotentialDestinations({
  tripId,
  user,
  destinations,
}: {
  tripId: string;
  user: User;
  destinations: PotentialDestination[];
}) {
  const [optimisticDestinations, addOptimisticDestination] = useOptimistic<
    PotentialDestination[],
    PotentialDestination
  >(destinations, (state, newDestination) => [...state, newDestination]);

  const sortedDestinations = destinations!.sort(
    (tripA, tripB) => tripB.likedBy.length - tripA.likedBy.length
  );

  return (
    <div className="pb-16">
      <p className="mb-5 md:w-[640px] md:mx-auto">
        Add potential destinations, vote for where you want to go and when ready
        lock-in the final choice.
      </p>

      <div className="flex flex-col gap-5">
        <AddDestination
          tripId={tripId}
          addOptimisticDestination={addOptimisticDestination}
        />

        {sortedDestinations.map((destination) => (
          <PotentialDestinationCard
            key={destination.id}
            destination={destination}
            user={user}
            tripId={tripId}
          />
        ))}
      </div>
    </div>
  );
}

//  async function callPexelsSearch(query: string) {
//    'use server';
//    return await pexelsSearch(query);
//  }
