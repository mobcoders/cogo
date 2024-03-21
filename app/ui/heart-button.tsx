import type { SingleAccom } from '@/app/ui/edit-trip-name/potential-accom-card';
import type { SingleDest } from '@/app/ui/potential-dest-card/potential-dest-card';
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
  votingTopic: SingleDest | SingleAccom;
  user: User;
  tripId: string;
  parentCard: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [optimisticLikes, setOptimisticLikes] = useState(votingTopic.likedBy);

  const isLiked: boolean = optimisticLikes.some(
    (obj) => obj.email === user.email
  );

  async function handleLike() {
    const updatedLikes = isLiked
      ? optimisticLikes.filter((obj) => obj.email !== user.email)
      : [...optimisticLikes, user];

    setOptimisticLikes(updatedLikes);

    startTransition(async () => {
      try {
        await toggleLike(votingTopic.id, user.email!, parentCard);
      } catch (error) {
        setOptimisticLikes(votingTopic.likedBy);
      }
    });
  }

  return (
    <>
      <Button
        isIconOnly
        radius="full"
        variant="light"
        onPress={handleLike}
        disabled={isPending}
        size="sm"
        className="bg-transparent absolute bottom-1 right-2 h-12 px-6"
        disableRipple
      >
        <Badge content={optimisticLikes.length} color="primary">
          <HeartIcon
            className={isLiked ? '[&>path]:stroke-transparent' : ''}
            fill={isLiked ? '#ED5453' : '#878787'}
            strokeWidth={0}
          />
        </Badge>
      </Button>
    </>
  );
}
