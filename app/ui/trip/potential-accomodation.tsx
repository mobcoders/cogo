import PotentialDestinationCard from '@/app/ui/potential-dest-card/potential-dest-card';
import AddAccomodation from '@/app/ui/trip/add-accomodation';
import PotentialAccomCard from '@/app/ui/trip/potential-accom-card';
import { fetchPotentialAccoms } from '@/lib/data';

export default async function PotentialAccomodation({
  tripId,
}: {
  tripId: string;
}) {
  //for now the trip MobCoders2024 is hardcoded for development in the data.ts, else this works
  const accomodations = await fetchPotentialAccoms(tripId);
  return (
    <>
      <p>Add potential accomodations and vote on them here</p>

      <AddAccomodation tripId={tripId} />
      <div className="flex flex-col gap-5">
        {accomodations.map((accom) => (
          <PotentialAccomCard key={accom.id} accom={accom} />
          // There is possibly an issue with each accom not taking an empty likedBy array.
        ))}
      </div>
    </>
  );
}
