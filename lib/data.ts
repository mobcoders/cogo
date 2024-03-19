import prisma from '@/lib/prisma';

export async function fetchPotentialDests(
  tripId: string = 'cltuhc5xd0000843ykw32zdxe'
) {
  const destinations = await prisma.potentialDestination.findMany({
    where: {
      tripId: tripId,
    },
    include: {
      likedBy: true,
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

export async function fetchPotentialAccoms(
  tripId: string = 'cltuhc5xd0000843ykw32zdxe'
) {
  const accoms = await prisma.potentialAccom.findMany({
    where: {
      tripId: tripId,
    },
    include: {
      likedBy: true,
    },
  });
}
