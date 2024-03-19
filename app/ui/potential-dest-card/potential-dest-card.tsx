'use client';

import { useState } from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import { Badge } from '@nextui-org/badge';
import { HeartIcon } from '@/app/ui/potential-dest-card/heart-icon';
import type { PotentialDestination } from '@prisma/client';

export default function PotentialDestinationCard({
  destination,
}: {
  destination: PotentialDestination;
}) {
  const [liked, setLiked] = useState(false);
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <Card className="drop-shadow-cogo h-32">
      <CardBody className="h-full">
        <div className="flex gap-5">
          <Image
            alt={`${destination.city} photo`}
            className="object-cover mb-5"
            src={destination.photoUrl}
            height={100}
            width={100}
          />

          <div className="flex flex-col flex-1">
            <div className="flex flex-col">
              <h1 className="font-semibold text-lg">{destination.city}</h1>
              <p className="text-small text-foreground/80">
                {destination.country}
              </p>
            </div>

            <div className="flex justify-between">
              {open ? (
                <ChevronDownIcon
                  width={30}
                  onClick={handleClick}
                  className="stroke-light-grey"
                />
              ) : (
                <ChevronRightIcon
                  width={30}
                  onClick={handleClick}
                  className="stroke-light-grey"
                />
              )}
              <Button
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => setLiked((v) => !v)}
              >
                <Badge content={destination.likedBy.length} color="primary">
                  <HeartIcon
                    className={liked ? '[&>path]:stroke-transparent' : ''}
                    fill={liked ? 'currentColor' : 'none'}
                  />
                </Badge>
              </Button>
            </div>
          </div>
        </div>

        {destination.activities.length && open && (
          <ul className="text-sm font-medium mt-2">
            {destination.activities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
