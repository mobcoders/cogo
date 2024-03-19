import Navbar from '@/app/ui/navbar/navbar';
import EditTripName from '@/app/ui/edit-trip-name/edit-trip-name';
import { fetchTrip } from '@/lib/data';
import { notFound } from 'next/navigation';
import PotentialDestinations from '@/app/ui/potential-destinations';
import { auth } from '@/auth';

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
  let session = await auth();
  let username = session?.user?.name;
  let email = session?.user?.email;

  return (
    <div className="flex flex-col">
      <p>Hi {username}!</p>
      <div className="flex-grow flex flex-col gap-5">
        <div>
          <EditTripName trip={trip} />
        </div>
        <div className="flex flex-col gap-5">
          <PotentialDestinations tripId={tripId} />
        </div>
      </div>
      <Navbar />
    </div>
  );
}
