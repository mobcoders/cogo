import Navbar from '@/app/ui/navbar/navbar';
import EditTripName from '@/app/ui/edit-trip-name/edit-trip-name';
import { fetchTrip, fetchVotingStage } from '@/lib/data';
import { notFound } from 'next/navigation';
import PotentialDestinations from '@/app/ui/potential-destinations';
import { auth } from '@/auth';
import PotentialAccomodation from '@/app/ui/edit-trip-name/potential-accomodation';

export default async function Page({
  params,
}: {
  params: { trip_id: string };
}) {
  const tripId = params.trip_id;
  //for now the trip MobCoders2024 is hardcoded for development in the data.ts, else this works
  const trip = await fetchTrip(tripId);
  const votingStage = await fetchVotingStage(tripId);
  // Voting stage holds string "none" by default. We will modify these to "dest" and "accom" to shift user journey.

  if (!trip) {
    notFound();
  }
  let session = await auth();
  let username = session?.user?.name;
  let email = session?.user?.email;

  return (
    <>
      <div className="flex flex-col">
        <p>Hi {username}!</p>
        <div className="flex-grow flex flex-col gap-5">
          <div>
            <EditTripName trip={trip} />
          </div>
          <div className="flex flex-col gap-5">
            {(() => {
              switch (votingStage!.votingStage) {
                case 'none':
                  return <PotentialDestinations tripId={tripId} />;
                case 'dest':
                  return <PotentialDestinations tripId={tripId} />;
                case 'accom':
                  return <PotentialAccomodation tripId={tripId} />;
                default:
                  return <></>;
              }
            })()}
          </div>
        </div>
        <Navbar />
      </div>
    </>
  );
}
