import type { SingleEvent } from '@/app/ui/potential-dest-card/potential-dest-card';
import { toggleLike } from '@/lib/action';
import { HeartIcon } from '@heroicons/react/24/solid';
import { Button } from '@nextui-org/react';
import { User } from '@prisma/client';
import { useState, useTransition } from 'react';

export default function HeartButton({
  destination,
  user,
  tripId,
}: {
  destination: SingleEvent;
  user: User;
  tripId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [optimisticLikes, setOptimisticLikes] = useState(destination.likedBy);

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
        await toggleLike(tripId, destination.id, user.email!, 'dest');
      } catch (error) {
        setOptimisticLikes(destination.likedBy);
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
        className="-translate-y-[-8px] -translate-x-[-2px] bg-transparent"
        disableRipple
      >
        <p className="mr-1">{optimisticLikes.length}</p>
        <HeartIcon
          className={isLiked ? '[&>path]:stroke-transparent' : ''}
          fill={isLiked ? '#ED5453' : '#878787'}
          strokeWidth={0}
        />
      </Button>
    </>
  );
}
