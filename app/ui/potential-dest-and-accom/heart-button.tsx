import type { SingleAccom } from '@/app/ui/potential-dest-and-accom/potential-accom-card';
import type { SingleDest } from '@/app/ui/potential-dest-and-accom/potential-dest-card';
import { Destination } from '@/app/ui/potential-dest-and-accom/potential-destinations';
import { toggleLike } from '@/lib/action';
import { HeartIcon } from '@heroicons/react/24/solid';
import { Badge, Button } from '@nextui-org/react';
import { User } from '@prisma/client';
import { useState, useTransition } from 'react';

export default function HeartButton({
  votingTopic,
  user,
  tripId,
  parentCard,
}: {
  votingTopic: SingleDest | SingleAccom | Destination;
  user: User;
  tripId: string;
  parentCard: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [optimisticLikes, setOptimisticLikes] = useState(votingTopic.likedBy);

  const isLiked: boolean = optimisticLikes!.some(
    (obj) => obj.email === user.email
  );

  async function handleLike() {
    const updatedLikes = isLiked
      ? optimisticLikes!.filter((obj) => obj.email !== user.email)
      : [...optimisticLikes!, user];

    setOptimisticLikes(updatedLikes);

    startTransition(async () => {
      try {
        await toggleLike(votingTopic.id!, user.email!, parentCard, tripId);
      } catch (error) {
        setOptimisticLikes(votingTopic.likedBy);
      }
    });
  }

  return (
    <div className="mr-2 translate-y-[10px]">
      <Badge content={optimisticLikes!.length} color="primary">
        <Button
          isIconOnly
          radius="full"
          variant="light"
          onPress={handleLike}
          disabled={isPending}
          size="sm"
          className="bg-transparent"
          disableRipple
        >
          <HeartIcon
            className={isLiked ? '[&>path]:stroke-transparent' : ''}
            fill={isLiked ? '#ED5453' : '#878787'}
            strokeWidth={0}
            width={25}
          />
        </Button>
      </Badge>
    </div>
  );
}
