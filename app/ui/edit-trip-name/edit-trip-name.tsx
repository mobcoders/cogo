'use client';

import { Trip } from '@prisma/client/wasm';
import { useState } from 'react';
import { updateTripNameDate } from '@/lib/action';
import { Input } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { PencilIcon } from '@heroicons/react/24/solid';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function EditTripName({ trip }: { trip: Trip }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tripNameVal, setTripNameVal] = useState(trip.name);
  const [tripDateVal, setTripDateVal] = useState(trip.dates);

  function handlePress(formData: FormData) {
    if (isEditing) {
      updateTripNameDate(trip.id, formData);
    }
    setIsEditing(!isEditing);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTripNameVal(e.target.value);
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTripDateVal(e.target.value);
  }

  return (
    <form action={handlePress}>
      <div className="flex justify-between gap-5">
        {isEditing ? (
          <div className="w-[85%]">
            <Input
              name="tripName"
              className="mb-2"
              value={tripNameVal}
              defaultValue={tripNameVal}
              onChange={handleChange}
            />
          </div>
        ) : (
          <h1>{trip.votingStage === 'dest' ? tripNameVal : trip.city}</h1>
        )}

        <div className="">
          {trip.votingStage === 'dest' && (
            <Button isIconOnly type="submit" className="bg-transparent">
              {isEditing ? (
                <CheckCircleIcon className="h-10 w-10 fill-pink-500" />
              ) : (
                <PencilIcon className="h-5 w-5 fill-light-grey" />
              )}
            </Button>
          )}
        </div>
      </div>

      <h2 className="text-light-grey">{trip.country}</h2>

      {isEditing ? (
        <Input
          name="tripDate"
          className="w-[85%]"
          value={tripDateVal as string}
          defaultValue={tripDateVal as string}
          onChange={handleDateChange}
        />
      ) : (
        <h3 className="text-[16px]">{tripDateVal}</h3>
      )}
    </form>
  );
}
