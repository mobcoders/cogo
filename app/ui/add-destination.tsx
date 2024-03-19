'use client';
import { useState } from 'react';
import { Input, Spacer } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { PencilIcon } from '@heroicons/react/24/solid';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Trip } from '@prisma/client/wasm';
import { createPotentialDestination, updateTripNameDate } from '@/lib/action';

export default function AddDestination({
  tripId,
  trip,
}: {
  tripId: string;
  trip: Trip;
}) {
  const [openForm, setOpenForm] = useState(false);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  async function handleAdd(formData: FormData) {
    await createPotentialDestination(tripId, formData, trip);
    setOpenForm(false);
  }

  return (
    <>
      {!openForm && (
        <Button type="button" onClick={() => setOpenForm(!openForm)}>
          Add a destination
        </Button>
      )}
      {openForm && (
        <form action={handleAdd} className="flex flex-col gap-5">
          <Input
            name="city"
            id="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Input
            name="country"
            id="country"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <Input
            name="photoUrl"
            id="photoUrl"
            placeholder="Image URL"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
          <div className="flex justify-end gap-5">
            <Button onClick={() => setOpenForm(false)}>Cancel</Button>
            <Button type="submit">Add</Button>
          </div>
        </form>
      )}
    </>
  );
}
