import PotentialDestinationCard from '@/app/ui/potential-dest-card/potential-dest-card';
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
      <Button className="bg-pink-500 text-white">Add a destination</Button>
      <div className="flex flex-col gap-5">
        {destinations.map((destination) => (
          <PotentialDestinationCard
            key={destination.id}
            destination={destination}
          />
        ))}
      </div>
    </>
  );
}
