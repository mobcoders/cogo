import { ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import ModalGeneratedDestCards from '@/app/ui/navbar/modal-generated-dest-cards';

export default function IdeasModal() {
  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalBody className="flex flex-col gap-5 pb-10">
            <ModalHeader>Need some inspiration?</ModalHeader>
            <ModalGeneratedDestCards />
          </ModalBody>
        </>
      )}
    </ModalContent>
  );
}
