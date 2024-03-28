import { fetchTrip } from '@/lib/data';
import { notFound, redirect } from 'next/navigation';
import PotentialDestinations from '@/app/ui/potential-dest-and-accom/potential-destinations';
import { auth, getUser } from '@/auth';
import PotentialAccomodation from '@/app/ui/potential-dest-and-accom/potential-accomodation';
import TripSummary from '@/app/ui/trip-summary';
import { PotentialDestination } from '@prisma/client';

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

  let session = await auth();
  let email = session?.user?.email;
  let user = await getUser(email!);

  if (trip!.votingStage === 'dest') {
    redirect(`/${tripId}/destinations`);
  } else if (trip!.votingStage === 'accom') {
    redirect(`/${tripId}/accommodation`);
  } else {
    redirect(`/${tripId}/trip-summary`);
  }

  return <></>;
}
