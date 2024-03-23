'use client';

import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { createPotentialAccom } from '@/lib/action';
import { useState } from 'react';
import { useFormState } from 'react-dom';

export default function AddAccomodation({ tripId }: { tripId: string }) {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, dispatch] = useFormState(handleAdd, undefined);

  async function handleAdd(prevState: string | undefined, formData: FormData) {
    let res = await createPotentialAccom(tripId, formData);
    setInputValue('');
    return res;
  }

  return (
    <>
      <form action={dispatch} className="flex flex-col gap-5">
        <Input
          name="airbnb-url"
          id="airbnb-url"
          placeholder="Paste an Airbnb URL..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <div className="flex justify-end gap-5">
          <Button type="submit" className="bg-pink-500 text-white mb-5">
            Add
          </Button>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </form>
    </>
  );
}
