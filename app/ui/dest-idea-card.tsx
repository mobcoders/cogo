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

export default function DestinationIdeaCard() {
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
              src={
                'https://www.portugal.net/en/wp-content/uploads/sites/107/algar-de-benagil.jpg'
              }
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex">
                <div className="flex flex-col gap-0">
                  <h1 className="font-semibold text-lg">The Algarve</h1>
                  <p className="text-small text-foreground/80">Portugal</p>
                </div>
                {open ? (
                  <ChevronDownIcon width={30} onClick={handleClick} />
                ) : (
                  <ChevronRightIcon width={30} onClick={handleClick} />
                )}
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
