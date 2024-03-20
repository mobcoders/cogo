'use client';
import type { PotentialAccom } from '@prisma/client';
import { useState } from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import HeartButton from '@/app/ui/heart-button';
import { User } from 'next-auth';

export interface SingleAccom extends PotentialAccom {
  likedBy: Array<string>;
}

export default function PotentialAccomCard({
  accom,
  user,
  tripId,
}: {
  accom: SingleAccom;
  user: User;
  tripId: string;
}) {
  const [liked, setLiked] = useState(false);

  const votingTopic = accom;
  // console.log(votingTopic);

  return (
    <Card className="drop-shadow-cogo h-32">
      <a href={accom.airBnbUrl} target="_blank" rel="noopener noreferrer">
        <CardBody className="h-full">
          <div className="flex gap-5">
            <Image
              alt={'photo url'}
              className="object-cover mb-5"
              src={accom.photoUrl!}
              height={100}
              width={100}
            />

            <div className="flex flex-col flex-1">
              <div className="flex flex-col">
                <h1 className="font-semibold text-lg">{accom.description}</h1>
              </div>
            </div>
          </div>
        </CardBody>
      </a>
      <HeartButton accom={votingTopic} user={user} tripId={tripId} />
    </Card>
  );
}
