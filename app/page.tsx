import CogoLogo from '@/app/ui/cogo-logo';
import DestinationCard from '@/app/ui/destination-card/destination-card';
import PlusButton from '@/app/ui/plus-button';
import { Button, Divider } from '@nextui-org/react';
import Link from 'next/link';

export default async function Page() {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl">Are you ready?</h1>
      <div className="flex flex-row gap-7 mb-10">
        <Button>
          <Link href={'/login'}>
            <h3>Yes I know where Im going...</h3>
          </Link>
        </Button>
        <PlusButton />
      </div>
      <Divider className="my-5 mb-10" />
      <h1 className="text-2xl">Need some inspiration?</h1>
    </div>
  );
}
