import PotentialAccomCard from '@/app/ui/potential-dest-and-accom/potential-accom-card';
import AddAccomodation from '@/app/ui/potential-dest-and-accom/add-accomodation';

import { fetchPotentialAccoms } from '@/lib/data';
import { User } from 'next-auth';

export default async function PotentialAccomodation({
  tripId,
  user,
}: {
  tripId: string;
  user: User;
}) {
  //for now the trip MobCoders2024 is hardcoded for development in the data.ts, else this works
  const accomodations = await fetchPotentialAccoms(tripId);
  return (
    <>
      <p>Add potential accomodations and vote on them here</p>

      <AddAccomodation tripId={tripId} />
      <div className="flex flex-col gap-5">
        {accomodations.map((accom) => (
          <PotentialAccomCard
            key={accom.id}
            accom={accom}
            user={user}
            tripId={tripId}
          />
          // There is possibly an issue with each accom not taking an empty likedBy array.
        ))}
      </div>
    </>
  );
}
