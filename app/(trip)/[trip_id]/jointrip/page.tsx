import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { addMemberToTrip } from '@/lib/action';

export default async function JoinTrip({
  params,
}: {
  params: { trip_id: string };
}) {
  const tripId = params.trip_id;
  let session = await auth();
  let user_id = session?.user?.id!;

  // Usage
  addMemberToTrip(tripId, user_id);
  redirect(`/${tripId}`);
}