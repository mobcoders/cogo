import PotentialAccomCard from '@/app/ui/potential-dest-and-accom/potential-accom-card';
import AddAccomodation from '@/app/ui/potential-dest-and-accom/add-accomodation';

import { fetchPotentialAccoms } from '@/lib/data';
import { User } from '@prisma/client';

export default async function PotentialAccomodation({
  tripId,
  user,
}: {
  tripId: string;
  user: User;
}) {
  const accomodations = await fetchPotentialAccoms(tripId);
  const sortedAccom = accomodations.sort(
    (accomA, accomB) => accomB.likedBy.length - accomA.likedBy.length
  );

  return (
    <>
      <p className="mb-5 md:max-w-[640px] md:m-auto">
        Add potential Airbnb options, vote for where you want to stay and when
        ready lock-in the final choice.
      </p>
      <AddAccomodation tripId={tripId} />
      <div className="flex flex-col gap-5">
        {sortedAccom.map((accom) => (
          <PotentialAccomCard
            key={accom.id}
            accom={accom}
            user={user}
            tripId={tripId}
          />
        ))}
      </div>
    </>
  );
}
