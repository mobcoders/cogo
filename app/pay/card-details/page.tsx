import { Card, CardBody } from '@nextui-org/react';

import Image from 'next/image';
import ShowCard from '@/app/pay/card-details/show-card';
import { getCardDetails, loginUser } from '@/lib/weavr';

export default async function Page() {
  const user = await loginUser();
  user.cardDetails = await getCardDetails(user.token);

  return (
    <>
      <h1>Trip Account</h1>
      <Card className="h-[200px] max-w-[400px] my-5 bg-purple-700">
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

      <ShowCard user={user} />
    </>
  );
}
