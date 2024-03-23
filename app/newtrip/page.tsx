import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { load } from 'cheerio';

export default async function createTrip() {
  let session = await auth();
  let name = session!.user!.name!;
  let id = session?.user?.id!;
  let loading = true;
  let error = false;
  let tripName = name.split(' ')[0] + "'s new group trip";

  const newTrip = await prisma.trip.create({
    data: {
      name: tripName,
      organiserId: id,
      votingStage: 'dest',
    },
  });
  if (!newTrip) error = true;
  newTrip && redirect(`/${newTrip.id}`);
  loading = false;

  return (
    <div>
      {loading && <p>Loading</p>}
      {error && <p>Error, please try again</p>}
    </div>
  );
}
