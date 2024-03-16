import React from 'react';
import { Button } from '@nextui-org/react';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function PlusButton() {
  return (
    <Button
      isIconOnly
      color="danger"
      aria-label="Add destination"
      className="rounded-full"
    >
      <PlusIcon />
    </Button>
  );
}
