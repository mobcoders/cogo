import PotentialDestinationCard from '@/app/ui/potential-dest-card/potential-dest-card';
import AddDestination from '@/app/ui/add-destination';
import { fetchPotentialDests } from '@/lib/data';
import AddAccomodation from '@/app/ui/trip/add-accomodation';

export default async function PotentialAccomodation({
  tripId,
}: {
  tripId: string;
}) {
  //for now the trip MobCoders2024 is hardcoded for development in the data.ts, else this works
  const destinations = await fetchPotentialDests();
  return (
    <>
      <p>Add potential accomodations and vote on them here</p>
      <AddAccomodation tripId={tripId} />
      <div className="flex flex-col gap-5">
        {accomodations.map((accom) => (
          <PotentialDestinationCard key={accom.id} accom={accom} />
        ))}
      </div>
    </>
  );
}
