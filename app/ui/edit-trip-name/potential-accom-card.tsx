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

  return (
    <Card className="drop-shadow-cogo h-fit">
      <CardBody className="mb-5">
        <a href={accom.airBnbUrl} target="_blank" rel="noopener noreferrer">
          <div className="flex gap-3 h-full">
            <Image
              alt={'photo url'}
              className="object-cover h-24"
              src={accom.photoUrl!}
              height={100}
              width={100}
            />

            <div className="flex flex-col flex-1">
              <h1 className="font-semibold text-lg">{accom.description}</h1>
            </div>
          </div>
        </a>
      </CardBody>
      <div className="absolute bottom-2 right-2">
        <HeartButton
          votingTopic={accom}
          user={user}
          tripId={tripId}
          parentCard="accom"
        />
      </div>
    </Card>
  );
}
