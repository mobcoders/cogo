'use client';

import { Button, useDisclosure } from '@nextui-org/react';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/modal';
import { UserGroupIcon } from '@heroicons/react/24/solid';
import { Avatar } from '@nextui-org/avatar';

export default function Navbar() {
  // const { onOpen, isOpen, onClose } = useDisclosure();
  const membersModal = useDisclosure();
  const profileModal = useDisclosure();

  return (
    <div className="flex gap-10 justify-center items-center h-[70px] w-[calc(100%-80px)] rounded-full mb-5 absolute bottom-0 left-10 bg-purple-600 drop-shadow-cogo">
      <Button
        onPress={membersModal.onOpen}
        isIconOnly
        className="bg-transparent"
      >
        <UserGroupIcon className="h-8 w-8 fill-white" />
      </Button>

      <Button
        onPress={profileModal.onOpen}
        isIconOnly
        className="bg-transparent"
      >
        <Avatar
          showFallback
          name="AE"
          src="https://images.unsplash.com/broken"
          className="bg-white text-base"
        />
      </Button>

      <Modal
        isOpen={membersModal.isOpen}
        placement={'bottom-center'}
        onClose={membersModal.onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Your Group
              </ModalHeader>
              <ModalBody className="flex flex-row flex-wrap justify-center gap-5 p-10">
                <div className="h-20 w-20 rounded-full bg-slate-500"></div>
                <div className="h-20 w-20 rounded-full bg-slate-500"></div>
                <div className="h-20 w-20 rounded-full bg-slate-500"></div>
                <div className="h-20 w-20 rounded-full bg-slate-500"></div>
                <div className="h-20 w-20 rounded-full bg-slate-500"></div>
                <div className="h-20 w-20 rounded-full bg-slate-500"></div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={profileModal.isOpen}
        placement={'bottom-center'}
        onClose={profileModal.onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Profile Modal
              </ModalHeader>
              <ModalBody>
                <p>Profile Modal works!</p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
