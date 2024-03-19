'use client';
import type { PotentialAccom } from '@prisma/client';
import { useState } from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Button } from '@nextui-org/button';
import { Badge } from '@nextui-org/badge';
import { HeartIcon } from '@/app/ui/potential-dest-card/heart-icon';

interface SingleAccom extends PotentialAccom {
  likedBy: Array<string>;
}

export default function PotentialAccomCard({ accom }: { accom: SingleAccom }) {
  const [liked, setLiked] = useState(false);

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
      <Button
        isIconOnly
        className="bg-transparent absolute bottom-1 right-2"
        onPress={() => setLiked((v) => !v)}
      >
        <Badge content={accom.likedBy.length} color="primary">
          <HeartIcon
            className={liked ? '[&>path]:stroke-transparent' : ''}
            fill={liked ? 'currentColor' : 'none'}
          />
        </Badge>
      </Button>
    </Card>
  );
}
