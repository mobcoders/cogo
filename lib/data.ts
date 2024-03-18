import prisma from '@/lib/prisma';

export async function fetchPotentialDests(
  tripId: string = 'cltuhc5xd0000843ykw32zdxe'
) {
  const destinations = await prisma.potentialDestination.findMany({
    where: {
      tripId: tripId,
    },
  });
  return destinations;
}

export async function fetchTrip(tripId: string = 'cltuhc5xd0000843ykw32zdxe') {
  const trip = await prisma.trip.findFirst({
    where: {
      id: tripId,
    },
  });
  return trip;
}
