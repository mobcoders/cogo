'use client';

import { useState } from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function IdeaDestinationCard() {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <Card className="bg-white drop-shadow-cogo">
      <CardBody>
        <div>
          <div>
            <Image
              alt="Album cover"
              className="object-cover mb-5"
              height={200}
              shadow="md"
              src={
                'https://www.portugal.net/en/wp-content/uploads/sites/107/algar-de-benagil.jpg'
              }
              width="100%"
            />
          </div>

          <div className="flex justify-between items-start pb-2">
            <div className="flex flex-col">
              <h1 className="font-semibold text-lg">The Algarve</h1>
              <p className="text-small text-light-grey">Portugal</p>
            </div>
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
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
