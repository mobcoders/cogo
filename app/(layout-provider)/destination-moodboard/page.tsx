import DestinationCard from '@/app/ui/destination-card/destination-card';
import Navbar from '@/app/ui/navbar';
import PlusButton from '@/app/ui/plus-button';

export default async function Page() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl">MOBCODERS TRIP</h1>
      </div>

      <DestinationCard />
      <div className="self-center">
        <PlusButton />
      </div>
    </div>
  );
}
