import ChosenAccomCard from '@/app/ui/potential-dest-and-accom/chosen-accom-card';
import { fetchChosenAccom, fetchTrip } from '@/lib/data';
import { fetchMembers, fetchOrganiser } from '@/lib/action';
import { Avatar } from '@nextui-org/avatar';

export default async function TripSummary({ tripId }: { tripId: string }) {
  const trip = await fetchTrip(tripId);
  const airbnbId = trip!.airbnb;
  const chosenAccom = await fetchChosenAccom(airbnbId!);
  const members = [
    ...(await fetchMembers(tripId)),
    await fetchOrganiser(tripId),
  ];

  return (
    <>
      <h3 className="text-pink-500">Airbnb:</h3>
      <ChosenAccomCard accom={chosenAccom} />
      <h3 className="text-pink-500 mb-5">Members:</h3>
      <div className="flex flex-row flex-wrap justify-center gap-5">
        {members.map((member) => (
          <div key={member?.id} className="flex flex-col items-center mb-5">
            <Avatar
              showFallback
              src={member?.image as string}
              className="w-20 h-20 bg-purple-600 text-white text-2xl"
            />
            {member?.name && <p>{member?.name.split(' ')[0]}</p>}
          </div>
        ))}
      </div>
    </>
  );
}
