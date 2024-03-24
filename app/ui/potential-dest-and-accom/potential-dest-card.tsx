'use client';
import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import type { PotentialDestination, User } from '@prisma/client';
import HeartButton from '@/app/ui/potential-dest-and-accom/heart-button';
import { useState } from 'react';
import PotentialDestOptions from '@/app/ui/potential-dest-and-accom/potential-dest-options';

export interface SingleDest extends PotentialDestination {
  likedBy: Array<User>;
}

export default function PotentialDestinationCard({
  destination,
  user,
  tripId,
}: {
  destination: SingleDest;
  user: User;
  tripId: string;
}) {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <Card className="drop-shadow-cogo h-fit">
      <CardBody>
        <div className="flex gap-3 h-full">
          <Image
            alt={`${destination.city} photo`}
            className="object-cover h-24"
            src={destination.photoUrl!}
            height={100}
            width={100}
          />

          <div className="flex flex-col flex-1 justify-between">
            <div className="flex justify-between items-start">
              <div className="flex flex-col flex-1">
                <h1 className="font-semibold text-lg capitalize">
                  {destination.city}
                </h1>
                <p className="text-small text-foreground/80 capitalize">
                  {destination.country}
                </p>
              </div>

              <PotentialDestOptions
                city={destination.city}
                country={destination.country}
                destinationId={destination.id}
              />
            </div>

            <div className="flex justify-between items-end">
              {open ? (
                <ChevronDownIcon
                  width={30}
                  onClick={handleClick}
                  className="stroke-light-grey -translate-y-[-5px] -translate-x-[5px]"
                />
              ) : (
                <ChevronRightIcon
                  width={30}
                  onClick={handleClick}
                  className="stroke-light-grey -translate-y-[-5px] -translate-x-[10px]"
                />
              )}
              <HeartButton
                votingTopic={destination}
                user={user}
                tripId={tripId}
                parentCard="dest"
              />
            </div>
          </div>
        </div>

        {destination.activities.length && open ? (
          <ul className="text-sm font-medium mt-2 pl-3 marker:text-pink-500">
            {destination.activities.map((activity, index) => (
              <li key={index} className="list-disc">
                {activity}
              </li>
            ))}
          </ul>
        ) : null}
      </CardBody>
    </Card>
  );
}
