import Link from 'next/link';
import { Button } from '@nextui-org/react';
import IdeaDestinationCard from '@/app/ui/idea-dest-card';
import { auth } from '@/auth';
import CreateTripButton from '@/app/ui/create-trip-button';
import { redirect } from 'next/navigation';
import { airbnbLocations } from '@/lib/airbnb-data';

export default async function Page() {
  let session = await auth();
  let name = session!.user!.name!;
  let id = session?.user?.id!;
  let tripName = name.split(' ')[0] + "'s new group trip";

  async function createTrip() {
    'use server';
    let newTrip = await prisma.trip.create({
      data: {
        name: tripName,
        organiserId: id,
        votingStage: 'dest',
      },
    });
    redirect(`/${newTrip.id}`);
  }

  return (
    <div className="flex flex-col md:grid grid-cols-12 gap-6">
      <div className="mb-5 md:col-start-1 col-span-6">
        <h1>Hassle-free group travel.</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="mb-5 md:col-start-7 col-span-6">
        <h1>Ready to go?</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <CreateTripButton createTrip={createTrip} />
      </div>
      <div className="md:col-span-12">
        <h1 className="mb-3">Need some inspiration?</h1>
        {/*
        MATH.RANDOM!!!
        {airbnbLocations.map((location, index) => (
          <IdeaDestinationCard
            key={index}
            city={location.cities[0].label}
            country={location.label}
          />
        ))}
        */}
      </div>
      <footer className="text-center text-xs mt-5 text-light-grey md:col-span-12">
        <p>A MOBCODERS Creation.</p>
        <p>© 2024 cogo. All rights reserved.</p>
      </footer>
    </div>
  );
}
