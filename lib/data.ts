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

export async function fetchPotentialAccoms(tripId: string) {
  const accoms = await prisma.potentialAccom.findMany({
    where: {
      tripId: tripId,
    },
    include: {
      likedBy: true,
    },
  });
  return accoms;
}

export async function fetchUser(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
    include: {
      organisedTrips: true,
      memberOfTrips: true,
    },
  });

  if (!user) {
    throw new Error(`User with id ${email} not found.`);
  }

  return user;
}

export async function fetchVotingStage(tripId: string) {
  return await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
    select: {
      votingStage: true,
    },
  });
}
