'use server';
import { signIn } from '@/auth';
import { fetchImgUrl_Description } from '@/lib/cheerio';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';

export async function toggleLike(
  tripId: string,
  destId: string,
  userEmail: string,
  parentCard: string
) {
  console.log(parentCard);
  const destination = await prisma.potentialDestination.findFirst({
    where: {
      id: destId,
      likedBy: {
        some: {
          email: userEmail,
        },
      },
    },
  });

  if (destination) {
    await prisma.potentialDestination.update({
      where: {
        id: destId,
      },
      data: {
        likedBy: {
          disconnect: {
            email: userEmail,
          },
        },
      },
    });
  } else {
    await prisma.potentialDestination.update({
      where: {
        id: destId,
      },
      data: {
        likedBy: {
          connect: {
            email: userEmail,
          },
        },
      },
    });
  }
}

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
  await prisma.potentialDestination.create({
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
    const exists = await prisma.user.findUnique({
      where: { email: user.email as string },
    });
    if (exists) return 'Email already in use';
    const hashedPassword = await bcrypt.hash(user.password as string, 10);
    user.password = hashedPassword;
    await prisma.user.create({ data: user });
  } catch (error) {
    return 'Something went wrong, please try again';
  }
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

export async function createPotentialAccom(tripId: string, formData: FormData) {
  const imgUrl_VenueDescription = await fetchImgUrl_Description(
    formData.get('airbnb-url') as string
  );

  const rawFormData = {
    tripId: tripId,
    airBnbUrl: formData.get('airbnb-url') as string,
    photoUrl: imgUrl_VenueDescription?.mainPhotoUrl as string,
    description: imgUrl_VenueDescription?.titleText as string,
  };

  await prisma.potentialAccom.create({
    data: rawFormData,
  });

  revalidatePath(`/${tripId}`);
}

export async function updateVotingStage(
  tripId: string,
  city: string,
  country: string
) {
  const trip = await prisma.trip.findFirst({
    where: { id: tripId },
  });

  if (!trip) {
    throw new Error('Trip not found');
  }

  let newVotingStage;

  if (trip.votingStage === 'dest') {
    newVotingStage = 'accom';
  } else if (trip.votingStage === 'accom') {
    newVotingStage = 'itinerary';
  }

  await prisma.trip.update({
    where: { id: tripId },
    data: {
      city: city,
      country: country,
      votingStage: newVotingStage,
    },
  });

  revalidatePath(`/${tripId}`);
}

export async function addMemberToTrip(tripId: string, userId: string) {
  try {
    // Find the trip by ID
    const trip = await prisma.trip.findUnique({
      where: {
        id: tripId,
      },
      include: {
        members: true, // Include existing members
      },
    });

    if (!trip) {
      throw new Error(`Trip with ID ${tripId} not found`);
    }

    // Check if the user is already a member of the trip
    const isMember = trip.members.some((member) => member.id === userId);
    if (isMember) {
      throw new Error(
        `User with ID ${userId} is already a member of this trip`
      );
    }

    // Add the user to the trip's list of members
    const updatedTrip = await prisma.trip.update({
      where: {
        id: tripId,
      },
      data: {
        members: {
          connect: {
            id: userId,
          },
        },
      },
    });

    console.log(`User with ID ${userId} added to trip ${updatedTrip.name}`);
  } catch (error) {
    console.error('Error adding member to trip:', error);
  }
}

export async function updatePotentialDestination(
  formData: FormData,
  id: string,
  tripId: string
) {
  const rawFormData = {
    city: formData.get('city') as string,
    country: formData.get('country') as string,
  };

  let photoUrlCheck = formData.get('url');

  switch (photoUrlCheck) {
    case '':
      break;
    default:
      rawFormData.photoUrl = photoUrlCheck;
      break;
  }

  await prisma.potentialDestination.update({
    where: {
      id: id,
    },
    data: rawFormData,
  });
  revalidatePath(`/${tripId}`);
}

export async function deletePotentialDestination(id: string, tripId: string) {
  await prisma.potentialDestination.delete({
    where: {
      id: id,
    },
  });
  revalidatePath(`/${tripId}`);
}
