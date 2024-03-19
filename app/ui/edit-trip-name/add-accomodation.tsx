'use client';
import { useState } from 'react';
import { Input } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { createPotentialAccom } from '@/lib/action';

export default function AddAccomodation({ tripId }: { tripId: string }) {
  async function handleAdd(formData: FormData) {
    await createPotentialAccom(tripId, formData);
  }

  return (
    <>
      <form action={handleAdd} className="flex flex-col gap-5">
        <Input
          name="airbnb-url"
          id="airbnb-url"
          placeholder="Paste an airbnb url..."
        />

        <div className="flex justify-end gap-5">
          <Button type="submit">Add</Button>
        </div>
      </form>
    </>
  );
}
