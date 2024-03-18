import { useState, useEffect } from 'react';
import { fetchMembers } from '@/lib/action';
import { ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { Avatar } from '@nextui-org/avatar';

export default function MembersModal({
  params,
}: {
  params: { trip_id: string };
}) {
  const [members, setMembers] = useState([]);
  // const tripId = params.trip_id;

  useEffect(() => {
    async function fetch() {
      setMembers(await fetchMembers());
    }
    fetch();
  }, []);

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">Your Group</ModalHeader>
          <ModalBody>
            <div className="flex flex-row flex-wrap justify-center gap-5 p-10">
              {members.map((member) => (
                <Avatar
                  key={member.id}
                  showFallback
                  name={member.firstName}
                  src={member.image}
                />
              ))}
            </div>
          </ModalBody>
        </>
      )}
    </ModalContent>
  );
}
