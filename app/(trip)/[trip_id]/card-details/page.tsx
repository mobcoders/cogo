import { Card, CardBody } from '@nextui-org/react';

import Image from 'next/image';
import ShowCard from '@/app/(trip)/[trip_id]/card-details/show-card';
import NoCard from '@/app/(trip)/[trip_id]/card-details/no-card';
import { fetchTrip } from '@/lib/data';
import { notFound } from 'next/navigation';
import KYC from '@/app/(trip)/[trip_id]/card-details/kyc';
import { getCardDetails, loginUser } from '@/lib/weavr-user';

export default async function Page({
  params,
}: {
  params: { trip_id: string };
}) {
  const user = await loginUser();
  console.log(user);
  const tripId = params.trip_id;
  const trip = await fetchTrip(tripId);

  if (!trip) {
    notFound();
  }
  if (user) {
    console.log('user exists, get card details now...');
    user.cardDetails = await getCardDetails(user.token, tripId);
  }

  return (
    <>
      <Card className="h-[200px] max-w-[340px] min-w-[300px] bg-purple-700 mx-auto md:my-10 md:w-full">
        <CardBody className="p-5">
          <div className="flex justify-between h-full">
            <div className="flex flex-row items-center h-full ml-5">
              <Image
                alt="Card chip"
                src="/cogo-card-chip.svg"
                width={50}
                height={38}
                className="pb-5"
              />
            </div>
            <div className="flex flex-col justify-between">
              <Image
                alt="Cogo card logo"
                src="/cogo-card-logo.svg"
                width={250}
                height={81}
                className="w-32"
              />
              <Image
                alt="Card chip"
                src="/cogo-card-mastercard-logo.svg"
                width={100}
                height={62}
                className="w-16 ml-auto"
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {user && user.cardDetails ? (
        !user.cardDetails.state.destroyedReason ? (
          <ShowCard user={user} tripId={tripId} />
        ) : (
          <h1 className="text-center max-w-[640px]">Card Destroyed</h1>
        )
      ) : user ? (
        <NoCard token={user.token} tripId={tripId} />
      ) : (
        <KYC tripId={tripId} />
      )}
    </>
  );
}
