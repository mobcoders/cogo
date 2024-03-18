import DestinationCard from '@/app/ui/destination-card/destination-card';
import PlusButton from '@/app/ui/plus-button';
import { fetchTrip } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function DestinationMoodboard({
  params,
}: {
  params: { trip_id: string };
}) {
  const tripId = params.trip_id;
  //for now the trip MobCoders2024 is hardcoded for development in the data.ts, else this works
  const trip = await fetchTrip();

  if (!trip) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col gap-5">
        <DestinationCard />
        <div className="self-center">
          <PlusButton />
        </div>
      </div>
    </>
  );
}
