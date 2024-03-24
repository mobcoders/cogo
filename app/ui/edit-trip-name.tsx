'use client';

import { PotentialDestination, Trip } from '@prisma/client/wasm';
import { useState } from 'react';
import { updateTripNameDate } from '@/lib/action';
import { Input } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { PencilIcon } from '@heroicons/react/24/solid';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function EditTripName({
  trip,
  chosenDestination,
}: {
  trip: Trip;
  chosenDestination: PotentialDestination | null;
}) {
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
          <div className="w-[80%]">
            <Input
              name="tripName"
              className="mb-2"
              value={tripNameVal}
              defaultValue={tripNameVal}
              onChange={handleChange}
              placeholder="Add trip name"
            />
          </div>
        ) : (
          <div>
            <h1>{tripNameVal}</h1>
            {chosenDestination && (
              <>
                <h1 className="text-pink-500 capitalize">
                  {chosenDestination.city}
                </h1>
                <h3 className="capitalize">{chosenDestination.country}</h3>
              </>
            )}
          </div>
        )}

        <div className="">
          <Button isIconOnly type="submit" className="bg-transparent">
            {isEditing ? (
              <CheckCircleIcon className="h-10 w-10 fill-pink-500" />
            ) : (
              <PencilIcon className="h-5 w-5 fill-light-grey" />
            )}
          </Button>
        </div>
      </div>

      {isEditing ? (
        <Input
          name="tripDate"
          className="w-[80%]"
          value={tripDateVal as string}
          defaultValue={tripDateVal as string}
          onChange={handleDateChange}
          placeholder="Add trip dates"
        />
      ) : (
        <h3 className="text-light-grey">{tripDateVal}</h3>
      )}
    </form>
  );
}
