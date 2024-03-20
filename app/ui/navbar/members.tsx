import { useState, useEffect } from 'react';
import { fetchMembers } from '@/lib/action';
import {
  Button,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react';
import { Avatar } from '@nextui-org/avatar';
import { RWebShare } from 'react-web-share';
export default function MembersModal({
  params,
}: {
  params: { trip_id: string };
}) {
  const [members, setMembers] = useState([]);
  const tripId = params.trip_id;

  useEffect(() => {
    async function fetch() {
      //Write a set organiser bit to show who the organiser is
      setMembers(await fetchMembers(tripId));
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
              <RWebShare
                data={{
                  text: `Join the trip on Cogo: `,
                  url: `http://localhost:3000/${tripId}/jointrip`,
                  title: 'Share the link to add members',
                }}
                onClick={() => console.log('shared successfully!')}
              >
                <Button>Share 🔗</Button>
              </RWebShare>
              {members.map((member) => (
                <div key={member.id} className="flex flex-col items-center">
                  <Avatar
                    showFallback
                    name={member.name}
                    src={member.image}
                    className="w-20 h-20 bg-purple-600 text-white text-2xl"
                  />
                  <p>{member.name}</p>
                </div>
              ))}
            </div>
          </ModalBody>
        </>
      )}
    </ModalContent>
  );
}
