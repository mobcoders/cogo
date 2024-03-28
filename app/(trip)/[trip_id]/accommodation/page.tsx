import PotentialAccomodation from '@/app/ui/potential-dest-and-accom/potential-accomodation';
import { PotentialAccomSkeleton } from '@/app/ui/skeletons';
import { auth, getUser } from '@/auth';
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

  return (
    <Suspense fallback={<PotentialAccomSkeleton />}>
      <h3 className="font-extrabold md:w-[640px] md:mx-auto">
        Accommodation Options
      </h3>
      <PotentialAccomodation tripId={tripId} user={user!} />
    </Suspense>
  );
}
