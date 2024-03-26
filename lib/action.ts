'use server';
import { signIn, signOut } from '@/auth';
import {
  convertMobileAirbnbLink,
  fetchImgUrl_Description,
} from '@/lib/cheerio';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export async function deleteUser(email: string) {
  await prisma.user.delete({
    where: {
      email: email,
    },
  });
  await signOut();
}

export async function logOut() {
  await signOut();
}

export async function toggleLike(
  dest_or_accom_id: string,
  userEmail: string,
  parentCard: string,
  tripId: string
) {
  let potentialModel: any;
  switch (parentCard) {
    case 'dest':
      potentialModel = prisma.potentialDestination;
      break;
    case 'accom':
      potentialModel = prisma.potentialAccom;
      break;
    default:
      return;
  }
  try {
    const record = await potentialModel.findFirst({
      where: {
        id: dest_or_accom_id,
        likedBy: {
          some: {
            email: userEmail,
          },
        },
      },
    });

    if (record) {
      await potentialModel.update({
        where: {
          id: dest_or_accom_id,
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
      await potentialModel.update({
        where: {
          id: dest_or_accom_id,
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
  } catch (error) {
    return 'Something went wrong, please try again';
  }
  revalidatePath(`/${tripId}`);
}

export async function fetchMembers(tripId: string) {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
    include: {
      members: true, // Include the members of the trip
    },
  });

  if (trip) {
    return trip.members;
  } else {
    return [];
  }
}

export async function fetchOrganiser(tripId: string) {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
    include: {
      organiser: true, // Include the members of the trip
    },
  });

  if (!trip) {
    throw new Error(`Trip with id ${tripId} not found.`);
  }

  return trip.organiser ? trip.organiser : undefined;
}

export async function updateTripNameDate(tripId: string, formData: FormData) {
  const rawFormData = {
    name: formData.get('tripName') as string,
    dates: formData.get('tripDate') as string,
  };
  try {
    const updateTrip = await prisma.trip.update({
      where: {
        id: tripId,
      },
      data: rawFormData,
    });
  } catch (error) {
    console.error(error);
    return 'Something went wrong, please try again';
  }
}

export async function credAuth(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
export async function createPotentialDestination(
  tripId: string,
  city: string,
  country: string,
  photoUrl: string | null,
  activities: Array<string>
) {
  interface prismaData {
    tripId: string;
    city: string;
    country: string;
    photoUrl?: string;
    description: string;
    activities?: Array<string>;
  }
  let prismaData: prismaData = {
    tripId: tripId,
    city: city,
    country: country,
    description: 'no description yet',
  };

  photoUrl ? (prismaData.photoUrl = photoUrl) : null;

  activities.length > 0 ? (prismaData.activities = activities) : null;
  await prisma.potentialDestination.create({
    data: prismaData,
  });

  revalidatePath(`/${tripId}`);
}

export async function googleAuth() {
  try {
    await signIn('google');
  } catch (error) {
    if (error instanceof AuthError) {
      return 'Something went wrong.';
    }
    throw error;
  }
}

export async function createUser(
  prevState: string | undefined,
  formData: FormData
) {
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
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image: photoUrl,
      },
    });
  } catch (error) {
    return 'Something went wrong';
  }
  revalidatePath('/profile');
}

export async function createPotentialAccom(tripId: string, formData: FormData) {
  let inputUrl = formData.get('airbnb-url')!.toString();

  if (inputUrl.startsWith('https://abnb.me/')) {
    inputUrl = await convertMobileAirbnbLink(inputUrl);
  } else if (!inputUrl.startsWith('https://www.airbnb.co.uk/rooms/')) {
    return 'Please enter a valid airbnb url';
  }
  inputUrl = inputUrl.match(/https:\/\/www\.airbnb\.co\.uk\/rooms\/\d+/)![0];
  const imgUrl_VenueDescription = await fetchImgUrl_Description(inputUrl);
  const rawFormData = {
    tripId: tripId,
    airBnbUrl: inputUrl,
    photoUrl: imgUrl_VenueDescription?.mainPhotoUrl as string,
    description: imgUrl_VenueDescription?.titleText as string,
  };
  try {
    await prisma.potentialAccom.create({
      data: rawFormData,
    });
  } catch (error) {
    console.error(error);
    return 'Something went wrong, please try again';
  }

  revalidatePath(`/${tripId}`);
}

export async function lockInDestination(tripId: string, destinationId: string) {
  try {
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      throw new Error('Trip not found');
    }
    await prisma.trip.update({
      where: { id: tripId },
      data: {
        chosenDestinationId: destinationId,
        votingStage: 'accom',
      },
    });
  } catch (error) {
    console.error(error);
    return 'Something went wrong, please try again';
  }
  redirect(`/${tripId}/accommodation`);
}

export async function lockInAccommodation(tripId: string, id: string) {
  try {
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      throw new Error('Trip not found');
    }

    await prisma.trip.update({
      where: { id: tripId },
      data: {
        chosenAccomodationId: id,
        votingStage: 'itinery',
      },
    });
  } catch (error) {
    console.error(error);
    return 'Something went wrong, please try again';
  }

  redirect(`/${tripId}/trip-summary`);
}

export async function navigateVotingStage(tripId: string, selectStage: string) {
  try {
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      throw new Error('Trip not found');
    }

    await prisma.trip.update({
      where: { id: tripId },
      data: {
        votingStage: selectStage,
      },
    });
  } catch (error) {
    console.error(error);
    return 'Something went wrong, please try again';
  }

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
      throw new Error(`This member is already a member of this trip`);
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
    return `${error}`;
  }
}

export async function updatePotentialDestination(
  formData: FormData,
  id: string,
  tripId: string
) {
  interface RawFormData {
    city?: string;
    country?: string;
    photoUrl?: string;
  }
  const rawFormData: RawFormData = {
    city: formData.get('city') as string,
    country: formData.get('country') as string,
  };

  let photoUrlCheck = formData.get('url') as string;

  switch (photoUrlCheck) {
    case '':
      break;
    default:
      rawFormData.photoUrl = photoUrlCheck;
      break;
  }
  try {
    await prisma.potentialDestination.update({
      where: {
        id: id,
      },
      data: rawFormData,
    });
  } catch (error) {
    console.error(error);
    return 'Something went wrong, please try again';
  }
  revalidatePath(`/${tripId}`);
}

export async function deletePotentialDestination(id: string, tripId: string) {
  try {
    await prisma.potentialDestination.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error(error);
    return 'Something went wrong, please try again';
  }
  revalidatePath(`/${tripId}`);
}

export async function deletePotentialAccom(id: string, tripId: string) {
  try {
    await prisma.potentialAccom.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error(error);
    return 'Something went wrong, please try again';
  }
  revalidatePath(`/${tripId}`);
}

export async function deleteGroupTrip(tripId: string) {
  try {
    await prisma.trip.delete({
      where: {
        id: tripId,
      },
    });
  } catch (error) {
    console.error(error);
    return 'Something went wrong, please try again';
  }
  revalidatePath(`/profile`);
}

export async function createTrip(tripName: string, id: string) {
  let newTrip = await prisma.trip.create({
    data: {
      name: tripName,
      organiserId: id,
      votingStage: 'dest',
    },
  });
  redirect(`/${newTrip.id}/destinations`);
}
