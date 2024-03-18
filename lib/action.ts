'use server';
import prisma from '@/lib/prisma';

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
  console.log(formData);
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
