import { useState, useEffect } from 'react';
import { fetchMembers, fetchOrganiser } from '@/lib/action';
import {
  Button,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react';
import { Avatar } from '@nextui-org/avatar';
import { RWebShare } from 'react-web-share';
import { User } from '@prisma/client';
export default function MembersModal({
  params,
}: {
  params: { trip_id: string };
}) {
  const [members, setMembers] = useState<User[]>([]);
  const [organiser, setOrganiser] = useState<User | null>(null);
  const tripId = params.trip_id;

  useEffect(() => {
    async function fetch() {
      //Write a set organiser bit to show who the organiser is
      setMembers(await fetchMembers(tripId));
      setOrganiser(await fetchOrganiser(tripId));
    }
    fetch();
  }, [tripId]);

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalBody className="flex flex-col gap-5 pb-10">
            <ModalHeader>Trip Organiser</ModalHeader>
            <div className="flex justify-center items-center gap-5">
              <div className="flex flex-col items-center">
                <Avatar
                  showFallback
                  src={organiser!.image!}
                  className="w-20 h-20 bg-purple-600 text-white text-2xl"
                />
                {organiser!.name && <p>{organiser!.name.split(' ')[0]}</p>}
              </div>
              <RWebShare
                data={{
                  text: `Join the trip on Cogo: `,
                  url: `http://localhost:3000/${tripId}/jointrip`,
                  title: 'Share the link to invite members',
                }}
                sites={['whatsapp', 'facebook', 'mail', 'copy']}
                onClick={() => console.log('shared successfully!')}
              >
                <Button className="bg-pink-500 text-white">
                  Invite Members
                </Button>
              </RWebShare>
            </div>
            <ModalHeader>Trip Members</ModalHeader>
            <div className="flex flex-row flex-wrap justify-center gap-5">
              {members.map((member) => (
                <div key={member.id} className="flex flex-col items-center">
                  <Avatar
                    showFallback
                    src={member.image!}
                    className="w-20 h-20 bg-purple-600 text-white text-2xl"
                  />
                  {member.name && <p>{member.name.split(' ')[0]}</p>}
                </div>
              ))}
            </div>
          </ModalBody>
        </>
      )}
    </ModalContent>
  );
}
