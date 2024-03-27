'use client';
import PotentialDestinationCard, {
  SingleDest,
} from '@/app/ui/potential-dest-and-accom/potential-dest-card';
import AddDestination, {
  OptimisticDest,
} from '@/app/ui/potential-dest-and-accom/add-destination';
import { fetchPotentialDests } from '@/lib/data';
import { User } from '@prisma/client';
import { pexelsSearch } from '@/lib/pexels';
import { useEffect, useOptimistic, useState } from 'react';

// export interface Destination {
//   id?: string;
//   country: string;
//   city: string;
//   activities: Array<string>;
//   photoUrl?: string | null;
//   likedBy?: Array<User>;
//   tripId?: string;
//   description?: string;
// }

export default function PotentialDestinations({
  tripId,
  user,
  initialDestinations,
}: {
  tripId: string;
  user: User;
  initialDestinations: SingleDest[];
}) {
  const [destinations, setDestinations] =
    useState<SingleDest[]>(initialDestinations);

  const [optimisticDestinations, addOptimisticDestination] = useOptimistic<
    SingleDest[],
    SingleDest
  >(destinations, (state, newDestination) => [
    ...state,
    { ...newDestination, id: 'optimistic-id', likedBy: [] },
  ]);

  let sortedDestinations = optimisticDestinations!.sort(
    (tripA, tripB) => tripB.likedBy!.length - tripA.likedBy!.length
  );

  // useEffect(() => {
  //   const updateDestinations = async () => {
  //     const updatedDestinations = await fetchPotentialDests(tripId);
  //     setDestinations(updatedDestinations || []);
  //   };

  //   updateDestinations();
  // }, [tripId]);

  return (
    <>
      <p className="mb-5">
        Add potential destinations, vote for where you want to go and when ready
        lock-in the final choice.
      </p>

      <div className="flex flex-col gap-5">
        <AddDestination
          tripId={tripId}
          addOptimisticDestination={addOptimisticDestination}
        />

        {sortedDestinations.map((destination, index) => (
          <PotentialDestinationCard
            key={index}
            destination={destination}
            user={user}
            tripId={tripId}
          />
        ))}
      </div>
    </>
  );
}
