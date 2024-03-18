import DestinationCard from '@/app/ui/destination-card/destination-card';
import Navbar from '@/app/ui/navbar';
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
    <div className="flex flex-col">
      <div className="flex-grow flex flex-col gap-10">
        <div>
          <h1 className="text-3xl">{trip.name}</h1>
          <p>{trip.dates}no date(dev)</p>
        </div>
        <div className="flex flex-col gap-5">
          <DestinationCard />
          <div className="self-center">
            <PlusButton />
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
