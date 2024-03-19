'use server';
import { signIn } from '@/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function fetchMembers(
  tripId: string = 'cltuhc5xd0000843ykw32zdxe'
) {
  const trip = await prisma.trip.findFirst({
    where: {
      id: tripId,
    },
    include: {
      members: true, // Include the members of the trip
    },
  });

  if (!trip) {
    throw new Error(`Trip with id ${tripId} not found.`);
  }

  return trip.members;
}

export async function updateTripNameDate(tripId: string, formData: FormData) {
  const rawFormData = {
    name: formData.get('tripName') as string,
    dates: formData.get('tripDate') as string,
  };
  const updateTrip = await prisma.trip.update({
    where: {
      id: tripId,
    },
    data: rawFormData,
  });
}

export async function createPotentialDestination(
  tripId: string,
  formData: FormData
) {
  const rawFormData = {
    city: formData.get('city') as string,
    country: formData.get('country') as string,
    photoUrl: formData.get('photoUrl') as string,
    tripId: tripId,
    description: 'no description yet',
  };
  const updatePotentialDestination = await prisma.potentialDestination.create({
    data: rawFormData,
  });
  revalidatePath(`/${tripId}`);
}
//not currently in use
export async function credAuth(formData: FormData) {
  await signIn('Credentials', formData);
}

export async function updateUserPhoto(userId: string, photoUrl: string) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      image: photoUrl,
    },
  });
  revalidatePath('/profile');
}
