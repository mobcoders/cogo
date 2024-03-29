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
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="airbnb-url"
          id="airbnb-url"
          placeholder="Paste an Airbnb URL..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="md:w-[640px] md:mx-auto"
        />
        <div className="flex justify-end gap-3 md:w-[640px] md:mx-auto">
          {errorMessage && (
            <p className="text-sm text-pink-500">{errorMessage}</p>
          )}
          <Button type="submit" className="bg-primary-500 text-white mb-5">
            Add
          </Button>
        </div>
      </form>
    </>
  );
}
