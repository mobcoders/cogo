'use client';
import { useState } from 'react';
import { Input } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { createPotentialDestination } from '@/lib/action';

export default function AddDestination({ tripId }: { tripId: string }) {
  const [openForm, setOpenForm] = useState(false);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  async function handleAdd(formData: FormData) {
    await createPotentialDestination(tripId, formData);
    setOpenForm(false);
  }

  return (
    <>
      {!openForm && (
        <Button
          type="button"
          onClick={() => setOpenForm(!openForm)}
          className="bg-pink-500 text-white mb-5"
        >
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
