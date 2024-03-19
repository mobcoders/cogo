import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

export default async function createTrip() {
  let session = await auth();
  let email = session?.user?.email;
  let name = session!.user!.name!;
  let id = session?.user?.id!;
  let image = session?.user?.image;

  let tripName = name.split(' ')[0] + "'s new group trip";
  const newTrip = await prisma.trip.create({
    data: {
      name: tripName,
      organiserId: id,
    },
  });
  redirect(`/${newTrip.id}`);
}
