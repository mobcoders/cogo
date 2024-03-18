'use client';
import { useState } from 'react';
import { Input, Spacer } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { PencilIcon } from '@heroicons/react/24/solid';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Trip } from '@prisma/client/wasm';
import { createPotentialDestination, updateTripNameDate } from '@/lib/action';

export default function AddDestination({ trip }: { trip: Trip }) {
  async function handleAdd(formData: FormData) {
    createPotentialDestination(trip.id, formData);
  }

  return (
    <form action={handleAdd}>
      <Input name="city" />
      <Button>Add</Button>
    </form>
  );
}
