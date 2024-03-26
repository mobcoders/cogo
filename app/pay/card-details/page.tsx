import { Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { LockClosedIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { FaRegSnowflake } from 'react-icons/fa';
import Image from 'next/image';

export default function Page() {
  return (
    <>
      <h1>Trip Account</h1>
      <Card className="h-[200px] my-5 bg-purple-700">
        <CardBody className="p-5">
          {/* <h3>4556202687314205</h3> */}
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

      <div className="flex gap-5 justify-between">
        <Button className="w-full h-[70px] bg-pink-500">
          <div className="flex flex-col items-center">
            <LockClosedIcon height={17} className="fill-white" />
            <p className="text-white">Reveal pin</p>
          </div>
        </Button>
        <Button className="w-full h-[70px] bg-pink-500">
          <div className="flex flex-col items-center">
            <FaRegSnowflake size={17} className="fill-white" />
            <p className="text-white">Freeze card</p>
          </div>
        </Button>
      </div>

      <Card className="max-w-[400px] my-5">
        <CardHeader className="pb-0">
          <div className="flex justify-between w-full font-bold">
            <p>Card Details</p>
            <p>Reveal</p>
          </div>
        </CardHeader>
        <CardBody className="pt-2">
          <div className="flex w-full justify-between my-3">
            <p>Name on card</p>
            <p>Theodore Cooper-Brown</p>
          </div>
          <Divider />

          <div className="flex w-full justify-between my-3">
            <p>Card Number</p>
            <p>**** **** **** 4205</p>
          </div>
          <Divider />

          <div className="flex w-full justify-between my-3">
            <p>Expiry</p>
            <p>04/29</p>
          </div>
          <Divider />

          <div className="flex w-full justify-between my-3">
            <p>CVC</p>
            <p>***</p>
          </div>
          <Divider />

          <div className="flex w-full justify-between my-3">
            <p>Billing Address</p>
            <ChevronRightIcon height={17} className="my-auto" />
          </div>
        </CardBody>
      </Card>
    </>
  );
}
