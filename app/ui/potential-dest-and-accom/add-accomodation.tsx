'use client';

import { Input } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { createPotentialAccom } from '@/lib/action';
import { useState } from 'react';

export default function AddAccomodation({ tripId }: { tripId: string }) {
  const [inputValue, setInputValue] = useState('');

  async function handleAdd(formData: FormData) {
    await createPotentialAccom(tripId, formData);
    setInputValue('');
  }

  return (
    <>
      <form action={handleAdd} className="flex flex-col gap-5">
        <Input
          name="airbnb-url"
          id="airbnb-url"
          placeholder="Paste an Airbnb URL..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <div className="flex justify-end gap-5">
          <Button type="submit">Add</Button>
        </div>
      </form>
    </>
  );
}
