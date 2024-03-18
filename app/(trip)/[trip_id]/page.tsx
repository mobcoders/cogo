import DestinationCard from '@/app/ui/destination-card/destination-card';
import DestinationMoodboard from '@/app/ui/potential-destinations';
import Navbar from '@/app/ui/navbar/navbar';
import PlusButton from '@/app/ui/plus-button';
import { fetchTrip } from '@/lib/data';
import { notFound } from 'next/navigation';
import PotentialDestinations from '@/app/ui/potential-destinations';

export default async function Page({
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
    <div className="flex flex-col">
      <div className="flex-grow flex flex-col gap-5">
        <div>
          <h1 className="text-3xl">{trip.name}</h1>
          <p>{trip.dates}</p>
        </div>
        <div className="flex flex-col gap-5">
          <PotentialDestinations tripId={tripId} />
        </div>
      </div>
      <Navbar />
    </div>
  );
}
