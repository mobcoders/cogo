'use client';

import React, { useOptimistic } from 'react';
import PotentialDestinationCard, {
  SingleDest,
} from '@/app/ui/potential-dest-and-accom/potential-dest-card';
import { User } from '@prisma/client';
import AddDestination from '@/app/ui/potential-dest-and-accom/add-destination';

export default function PotentialDestinations({
  tripId,
  user,
  destinations,
}: {
  tripId: string;
  user: User;
  destinations: any;
}) {
  const [optimisticDestinations, addOptimisticDestination] = useOptimistic<
    SingleDest[],
    SingleDest
  >(destinations, (state, newDestination) => [
    ...state,
    { ...newDestination, id: 'optimistic-id', likedBy: [] },
  ]);

  destinations!.sort(
    (tripA: any, tripB: any) => tripB.likedBy.length - tripA.likedBy.length
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
        {optimisticDestinations.map((destination: any) => (
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
