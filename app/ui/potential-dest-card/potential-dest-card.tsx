'use client';

import { useState } from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import { Badge } from '@nextui-org/badge';
import { HeartIcon } from '@/app/ui/potential-dest-card/heart-icon';
import type { PotentialDestination } from '@prisma/client';

interface SingleEvent extends PotentialDestination {
  likedBy: Array<string>;
}

export default function PotentialDestinationCard({
  destination,
}: {
  destination: SingleEvent;
}) {
  const [liked, setLiked] = useState(false);
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
            <div className="flex flex-col">
              <h1 className="font-semibold text-lg">{destination.city}</h1>
              <p className="text-small text-foreground/80">
                {destination.country}
              </p>
            </div>

            <div className="flex justify-between items-end">
              {open ? (
                <ChevronDownIcon
                  width={30}
                  onClick={handleClick}
                  className="stroke-light-grey -translate-y-[-10px] -translate-x-[5px]"
                />
              ) : (
                <ChevronRightIcon
                  width={30}
                  onClick={handleClick}
                  className="stroke-light-grey -translate-y-[-5px] -translate-x-[10px]"
                />
              )}
              <Button
                isIconOnly
                className="-translate-y-[-10px] -translate-x-[-5px]"
                radius="full"
                variant="light"
                onPress={() => setLiked((v) => !v)}
              >
                <p className="mr-1">{destination.likedBy.length}</p>
                <HeartIcon
                  className={liked ? '[&>path]:stroke-transparent' : ''}
                  fill={liked ? '#ED5453' : '#878787'}
                  strokeWidth={0}
                />
              </Button>
            </div>
          </div>
        </div>

        {destination.activities.length && open ? (
          <ul className="text-sm font-medium mt-2">
            {destination.activities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        ) : null}
      </CardBody>
    </Card>
  );
}
