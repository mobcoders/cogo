import DestinationCard from '@/app/ui/destination-card/potential-dest';
import { fetchPotentialDests } from '@/lib/data';
import { Button } from '@nextui-org/react';

export default async function PotentialDestinations({
  tripId,
}: {
  tripId: string;
}) {
  //for now the trip MobCoders2024 is hardcoded for development in the data.ts, else this works
  console.log('PotentialDestinations tripID: ', tripId);
  const destinations = await fetchPotentialDests();
  return (
    <>
      <p>Add potential destinations and vote for where you want to go...</p>
      <Button>Add a destination</Button>
      <div className="flex flex-col gap-5">
        {destinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </>
  );
}
