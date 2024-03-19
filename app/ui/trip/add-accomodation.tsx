'use client';
import { useState } from 'react';
import { Input } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { createPotentialDestination } from '@/lib/action';
import type { PotentialAccom } from '@prisma/client';

export default function AddAccomodation({
  tripId,
  accom,
}: {
  tripId: string;
  accom: PotentialAccom;
}) {
  const [openForm, setOpenForm] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');

  async function handleAdd(formData: FormData) {
    await createPotentialDestination(tripId, formData);
    setOpenForm(false);
  }

  return <></>;
}
