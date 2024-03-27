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
    <div className="pb-16">
      {chosenAccom && (
        <div className="mb-5">
          <h3 className="text-pink-500 mb-3 md:w-[640px] md:mx-auto">
            Airbnb:
          </h3>
          <ChosenAccomCard accom={chosenAccom} />
        </div>
      )}

      <h3 className="text-pink-500 mb-3 md:w-[640px] md:mx-auto">Members:</h3>
      <div className="flex flex-row flex-wrap justify-center gap-5">
        <Card className="drop-shadow-cogo h-fit w-full mb-5 md:w-[640px] md:mx-auto">
          <CardBody>
            <div className="flex justify-center gap-5 flex-wrap">
              {members.map((member) => (
                <div key={member?.id} className="flex flex-col items-center">
                  <Avatar
                    showFallback
                    src={member?.image as string}
                    className="w-20 h-20 bg-purple-600 text-white text-2xl"
                  />
                  {member?.name && <p>{member?.name.split(' ')[0]}</p>}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {chosenDest && chosenDest.activities.length > 0 && (
        <div className="h-fit">
          <h3 className="text-pink-500 mb-3 md:w-[640px] md:mx-auto">
            Activities:
          </h3>
          <Card className="drop-shadow-cogo h-fit w-full mb-5 md:w-[640px] md:mx-auto">
            <CardBody>
              <ul className="text-base font-medium pl-3 marker:text-pink-500">
                {chosenDest!.activities.map((activity, index) => (
                  <li key={index} className="list-disc">
                    {activity}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
