import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

export default async function createTrip() {
  let session = await auth();
  let name = session!.user!.name!;
  let id = session?.user?.id!;
  let error = false;
  let tripName = name.split(' ')[0] + "'s new group trip";

  const newTrip = await prisma.trip.create({
    data: {
      name: tripName,
      organiserId: id,
      votingStage: 'dest',
    },
  });

  // const newTrip = false;
  if (!newTrip) error = true;
  newTrip && redirect(`/${newTrip.id}`);

  return <div>{error && <p>Error, please try again</p>}</div>;
}
