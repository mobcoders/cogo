import Link from 'next/link';
import { Button } from '@nextui-org/react';
import IdeaDestinationCard from '@/app/ui/idea-dest-card';

export default async function Page() {
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
        <Link href={'/newtrip'}>
          <Button className="w-full h-[50px] bg-pink-500 text-white mt-5">
            Create a Group Trip
          </Button>
        </Link>
      </div>
      <div className="md:col-span-12">
        <h1 className="mb-3">Need some inspiration?</h1>
        <IdeaDestinationCard />
      </div>
      <footer className="text-center text-xs mt-5 text-light-grey md:col-span-12">
        <p>A MOBCODERS Creation.</p>
        <p>© 2024 cogo. All rights reserved.</p>
      </footer>
    </div>
  );
}
