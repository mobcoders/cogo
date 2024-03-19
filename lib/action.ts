'use server';
import { signIn } from '@/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
const bcrypt = require('bcrypt');

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

export async function credAuth(formData: FormData) {
  const creds = Object.fromEntries(formData.entries());
  await signIn('credentials', creds);
}

export async function googleAuth() {
  await signIn('google');
}

export async function createUser(formData: FormData) {
  const user = Object.fromEntries(formData.entries());
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    // user.password = hashedPassword;
    const exists = await prisma.user.findUnique({
      where: { email: user.email as string },
    });
    if (exists) return 'Email already in use';

    await prisma.user.create({ data: user });
  } catch (error) {
    return 'Something went wrong, please try again';
  }
  await signIn('credentials', user);
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
