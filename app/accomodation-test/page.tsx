import Navbar from '@/app/ui/navbar/navbar';
import { fetchTrip } from '@/lib/data';
import { notFound } from 'next/navigation';
import PotentialAccomodation from '@/app/ui/trip/potential-accomodation';

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
          <h1>Madrid</h1>
        </div>
        <div className="flex flex-col gap-5">
          <PotentialAccomodation tripId={tripId} />
        </div>
      </div>
      <Navbar />
    </div>
  );
}
