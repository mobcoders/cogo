import PotentialDestinations from '@/app/ui/potential-dest-and-accom/potential-destinations';
import { PotentialDestSkeleton } from '@/app/ui/skeletons';
import { auth, getUser } from '@/auth';
import { fetchPotentialDests } from '@/lib/data';
import { Suspense } from 'react';

export default async function Page({
  params,
}: {
  params: { trip_id: string };
}) {
  const tripId = params.trip_id;
  let session = await auth();
  let email = session?.user?.email;
  let user = await getUser(email!);
  const destinations = await fetchPotentialDests(tripId);

  return (
    <Suspense fallback={<PotentialDestSkeleton />}>
      <h3 className="font-extrabold md:w-[640px] md:mx-auto">
        Destination Options
      </h3>
      <PotentialDestinations
        tripId={tripId}
        user={user!}
        destinations={destinations!}
      />
    </Suspense>
  );
}
