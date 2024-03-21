import prisma from '@/lib/prisma';

export async function fetchPotentialDests(tripId: string) {
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

export async function fetchTrip(tripId: string) {
  const trip = await prisma.trip.findUnique({
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
  const user = await prisma.user.findUnique({
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
