'use client';

import { PencilIcon } from '@heroicons/react/24/solid';
import { updateUserPhoto } from '@/lib/action';

export default function EditUserPhoto() {
  function handleClick() {
    updateUserPhoto('clty968kp0000107unfnhi2sf');
  }

  return (
    <PencilIcon
      className="h-5 w-5 fill-light-grey mb-5"
      onClick={handleClick}
    />
  );
}
