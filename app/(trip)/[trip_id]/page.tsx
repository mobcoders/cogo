import DestinationCard from '@/app/ui/destination-card/destination-card';
import DestinationMoodboard from '@/app/ui/destination-moodboard';
import PlusButton from '@/app/ui/plus-button';
import TripName from '@/app/ui/trip/trip-name';
import { fetchTrip } from '@/lib/data';
import { notFound } from 'next/navigation';

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
    <>
      <TripName />

      {/* if trip destination not set, then show destination moodboard component */}
      <DestinationMoodboard params={params} />
      {/* if destination set, but accom not set, then show accom moodboard component */}

      {/* if dest, accom and 'finalised' set, then show Trip summary component */}
    </>
  );
}
