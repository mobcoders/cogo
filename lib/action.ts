'use server';
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

export async function fetchUser(userId: string) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      organisedTrips: true,
      memberOfTrips: true,
    },
  });

  if (!user) {
    throw new Error(`User with id ${userId} not found.`);
  }

  return user;
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
  // const rawFormData = {
  //   name: formData.get('tripName') as string,
  //   dates: formData.get('tripDate') as string,
  // };
  // const updateTrip = await prisma.trip.update({
  //   where: {
  //     id: tripId,
  //   },
  //   data: rawFormData,
  // });
}

export async function updateUserPhoto(userId: string) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      image:
        'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
    },
  });
  revalidatePath('/profile');
}
