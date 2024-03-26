import Navbar from '@/app/ui/navbar/navbar';
import EditTripName from '@/app/ui/edit-trip-name';
import { fetchTrip } from '@/lib/data';
import { notFound } from 'next/navigation';
import PotentialDestinations from '@/app/ui/potential-dest-and-accom/potential-destinations';
import { auth, getUser } from '@/auth';
import PotentialAccomodation from '@/app/ui/potential-dest-and-accom/potential-accomodation';
import { pexelsSearch } from '@/lib/pexels';
import TripSummary from '@/app/ui/trip-summary';
import { PotentialDestination } from '@prisma/client';
import { Suspense } from 'react';
import { Spinner } from '@nextui-org/react';

export default async function Page({
  params,
}: {
  params: { trip_id: string };
}) {
  const tripId = params.trip_id;
  const trip = await fetchTrip(tripId);

  if (!trip) {
    notFound();
  }
  const chosenDestination: PotentialDestination | null =
    trip!.chosenDestination;

  const chosenDestination: PotentialDestination | null =
    trip!.chosenDestination;

  let session = await auth();
  let email = session?.user?.email;
  let user = await getUser(email!);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex-grow flex flex-col gap-5">
          <div>
            <EditTripName trip={trip} chosenDestination={chosenDestination} />
          </div>
          <div className="flex flex-col">
            {(() => {
              switch (trip!.votingStage) {
                case 'dest':
                  return (
                    <>
                      <h3 className="font-extrabold">Destination Options</h3>

                      <PotentialDestinations tripId={tripId} user={user!} />
                    </>
                  );
                case 'accom':
                  return (
                    <>
                      <h3 className="font-extrabold">Accommodation Options</h3>
                      <PotentialAccomodation tripId={tripId} user={user!} />
                    </>
                  );
                default:
                  return (
                    <>
                      <h3 className="font-extrabold mb-5">Trip Summary</h3>
                      <TripSummary tripId={tripId}></TripSummary>
                    </>
                  );
              }
            })()}
          </div>
        </div>
        <Navbar trip={trip} />
      </div>
    </>
  );
}
