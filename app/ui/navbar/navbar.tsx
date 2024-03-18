'use client';

import { Button, useDisclosure } from '@nextui-org/react';
import { UserGroupIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="h-[70px] w-[calc(100%-80px)] rounded-full mb-5 absolute bottom-0 left-10 bg-purple-600 drop-shadow-cogo">
      <Button onPress={onOpen}>
        <UserGroupIcon />
      </Button>
    </div>
  );
}
