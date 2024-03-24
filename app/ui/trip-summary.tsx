import ChosenAccomCard from '@/app/ui/potential-dest-and-accom/chosen-accom-card';
import { fetchTrip } from '@/lib/data';
import { fetchMembers, fetchOrganiser } from '@/lib/action';
import { Avatar } from '@nextui-org/avatar';
import { Card, CardBody } from '@nextui-org/card';

export default async function TripSummary({ tripId }: { tripId: string }) {
  const trip = await fetchTrip(tripId);
  const chosenAccom = trip!.chosenAccomodation;
  const chosenDest = trip!.chosenDestination;
  const members = [
    ...(await fetchMembers(tripId)),
    await fetchOrganiser(tripId),
  ];

  return (
    <>
      {chosenAccom && (
        <>
          <h3 className="text-pink-500 mb-1">Airbnb:</h3>
          <ChosenAccomCard accom={chosenAccom} />
        </>
      )}

      <h3 className="text-pink-500 mb-5">Members:</h3>
      <div className="flex flex-row flex-wrap justify-center gap-5">
        {members.map((member) => (
          <Card className="drop-shadow-cogo h-fit w-full mb-5" key={member?.id}>
            <CardBody>
              <div className="flex flex-col items-center">
                <Avatar
                  showFallback
                  src={member?.image as string}
                  className="w-20 h-20 bg-purple-600 text-white text-2xl"
                />
                {member?.name && <p>{member?.name.split(' ')[0]}</p>}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {chosenDest?.activities && (
        <>
          <h3 className="text-pink-500 mb-1">Activities:</h3>
          <Card className="drop-shadow-cogo h-fit w-full mb-5">
            <CardBody>
              <ul className="text-base font-medium pl-3 marker:text-pink-500">
                {chosenDest.activities.map((activity, index) => (
                  <li key={index} className="list-disc">
                    {activity}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </>
      )}
    </>
  );
}
