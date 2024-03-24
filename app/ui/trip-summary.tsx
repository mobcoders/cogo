import ChosenAccomCard from '@/app/ui/potential-dest-and-accom/chosen-accom-card';
import { fetchTrip } from '@/lib/data';
import { fetchMembers, fetchOrganiser } from '@/lib/action';
import { Avatar } from '@nextui-org/avatar';

export default async function TripSummary({ tripId }: { tripId: string }) {
  const trip = await fetchTrip(tripId);
  const chosenAccom = trip!.chosenAccomodation;
  const members = [
    ...(await fetchMembers(tripId)),
    await fetchOrganiser(tripId),
  ];

  return (
    <>
      {chosenAccom && (
        <>
          <h3 className="text-pink-500">Airbnb:</h3>
          <ChosenAccomCard accom={chosenAccom} />
        </>
      )}

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

      <h3 className="text-pink-500 mb-5">Activities:</h3>
      {/* {destination.activities.length && (
        <ul className="text-sm font-medium mt-2 pl-3 marker:text-pink-500">
          {destination.activities.map((activity, index) => (
            <li key={index} className="list-disc">
              {activity}
            </li>
          ))}
        </ul>
      )} */}
    </>
  );
}
