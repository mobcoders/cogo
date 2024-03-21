import Navbar from '@/app/ui/navbar/navbar';
import EditTripName from '@/app/ui/edit-trip-name';
import { fetchTrip, fetchVotingStage } from '@/lib/data';
import { notFound } from 'next/navigation';
import PotentialDestinations from '@/app/ui/potential-dest-and-accom/potential-destinations';
import { auth, getUser } from '@/auth';
import PotentialAccomodation from '@/app/ui/potential-dest-and-accom/potential-accomodation';

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
  let session = await auth();
  let username = session?.user?.name;
  let email = session?.user?.email;

  let user = await getUser(email!);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex-grow flex flex-col gap-5">
          <div>
            <EditTripName trip={trip} />
          </div>
          <div className="flex flex-col gap-5">
            {(() => {
              switch (trip!.votingStage) {
                case 'dest':
                  return <PotentialDestinations tripId={tripId} user={user!} />;
                case 'accom':
                  return <PotentialAccomodation tripId={tripId} user={user!} />;
                default:
                  return <></>;
              }
            })()}
          </div>
        </div>
        <Navbar user={user!} />
      </div>
    </>
  );
}
