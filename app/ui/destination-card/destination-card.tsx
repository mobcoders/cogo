'use client';

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EllipsisHorizontalCircleIcon as OptionIcon,
} from '@heroicons/react/24/outline';
import { Card, CardBody } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';
import { HeartIcon } from '@/app/ui/destination-card/heart-icon';
import { useState } from 'react';
import type { PotentialDestination } from '@prisma/client';
export default function DestinationCard({
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
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Album cover"
              className="object-cover"
              height={200}
              shadow="md"
              src={destination.photoUrl || '/portugal-beach.jpg'}
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex">
                <div className="flex flex-col gap-0">
                  <h1 className="font-semibold text-lg">{destination.city}</h1>
                  <p className="text-small text-foreground/80">
                    {destination.country}
                  </p>
                </div>
                {open ? (
                  <ChevronDownIcon width={30} onClick={handleClick} />
                ) : (
                  <ChevronRightIcon width={30} onClick={handleClick} />
                )}
              </div>
              <div className="flex flex-col h-full gap-5 justify-center">
                <Button
                  isIconOnly
                  className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                  radius="full"
                  variant="light"
                  onPress={() => setLiked((v) => !v)}
                >
                  <p>{destination.likedBy.length}</p>
                  <HeartIcon
                    className={liked ? '[&>path]:stroke-transparent' : ''}
                    fill={liked ? 'currentColor' : 'none'}
                  />
                </Button>
              </div>
            </div>
            {destination.activities.length && open && (
              <ul className="text-sm font-medium mt-2">
                {destination.activities.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
