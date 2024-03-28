import { fetchTrip } from '@/lib/data';
import { notFound } from 'next/navigation';
import { PotentialDestination } from '@prisma/client';
import EditTripName from '@/app/ui/edit-trip-name';
import Navbar from '@/app/ui/navbar/navbar';

export default async function Layout({
  children,
  params,
}: Readonly<{
  params: { trip_id: string };
  children: React.ReactNode;
}>) {
  const tripId = params.trip_id;
  const trip = await fetchTrip(tripId);

  if (!trip) {
    notFound();
  }
  const chosenDestination: PotentialDestination | null =
    trip!.chosenDestination;

  return (
    <>
      <div className="flex flex-col">
        <div className="flex-grow flex flex-col gap-5">
          <div>
            <EditTripName trip={trip} chosenDestination={chosenDestination} />
          </div>
          {children}
        </div>
        <Navbar trip={trip} />
      </div>
    </>
  );
}
