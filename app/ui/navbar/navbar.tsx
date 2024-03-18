'use client';

import { useDisclosure, Button } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import { UserGroupIcon } from '@heroicons/react/24/solid';
import { Avatar } from '@nextui-org/avatar';
import Link from 'next/link';
import { Modal } from '@nextui-org/modal';
import MembersModalBody from '@/app/ui/navbar/members';

export default function Navbar() {
  const membersModal = useDisclosure();
  const params = useParams() as { trip_id: string };

  return (
    <div className="flex gap-10 justify-center items-center h-[70px] w-[calc(100%-80px)] rounded-full mb-5 fixed bottom-0 left-10 bg-purple-600 drop-shadow-cogo">
      <Button
        onPress={membersModal.onOpen}
        isIconOnly
        className="bg-transparent"
      >
        <UserGroupIcon className="h-8 w-8 fill-white" />
      </Button>

      <Link href={'/profile'}>
        <Avatar
          showFallback
          name="AE"
          src="https://images.unsplash.com/broken"
          className="bg-white text-base"
        />
      </Link>

      <Modal
        isOpen={membersModal.isOpen}
        placement={'bottom-center'}
        onClose={membersModal.onClose}
      >
        <MembersModalBody params={params} />
      </Modal>
    </div>
  );
}
