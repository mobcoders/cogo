'use client';
import { useState } from 'react';
import { Input, Spacer } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { PencilIcon } from '@heroicons/react/24/solid';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Trip } from '@prisma/client/wasm';
import { createPotentialDestination, updateTripNameDate } from '@/lib/action';

export default function AddDestination({ tripId }: { tripId: string }) {
  const [openForm, setOpenForm] = useState(false);
  function handleAdd(formData: FormData) {
    createPotentialDestination(tripId, formData);
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
          <Input name="city" id="city" placeholder="City" />
          <Input name="country" id="country" placeholder="Country" />
          <Input name="photoUrl" id="photoUrl" placeholder="Image URL" />
          <div className="flex justify-end gap-5">
            <Button onClick={() => setOpenForm(!openForm)}>Cancel</Button>
            <Button type="submit">Add</Button>
          </div>
        </form>
      )}
    </>
  );
}
