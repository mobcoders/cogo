'use client';

import { useState } from 'react';
import { Input, Spacer } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { PencilIcon } from '@heroicons/react/24/solid';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Trip } from '@prisma/client/wasm';

export default function TripName({ trip }: { trip: Trip }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tripNameVal, setTripNameVal] = useState(trip.name);
  const [tripDateVal, setTripDateVal] = useState(trip.dates);

  function handlePress() {
    setIsEditing(!isEditing);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTripNameVal(e.target.value);
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTripDateVal(e.target.value);
  }
  return (
    <>
      <div className="flex justify-between items-center">
        {isEditing ? (
          <div className="">
            <Input
              className={'w-full'}
              value={tripNameVal}
              defaultValue={tripNameVal}
              onChange={handleChange}
            />
          </div>
        ) : (
          <h1>{tripNameVal}</h1>
        )}

        <div className="">
          <Button isIconOnly onPress={handlePress} className="bg-transparent">
            {isEditing ? (
              <CheckCircleIcon className="text-default-400 h-5 w-5 flex-shrink-0" />
            ) : (
              <PencilIcon className="text-default-400 h-5 w-5 flex-shrink-0" />
            )}
          </Button>
        </div>
      </div>
      <Spacer />
      {isEditing ? (
        <Input
          className={'w-fit'}
          value={tripDateVal as string}
          defaultValue={tripDateVal as string}
          onChange={handleDateChange}
        />
      ) : (
        <h1>{tripDateVal}</h1>
      )}
    </>
  );
}
