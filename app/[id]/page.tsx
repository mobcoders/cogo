import DestinationCard from '@/app/ui/destination-card/destination-card';
import PlusButton from '@/app/ui/plus-button';

export default async function Page() {
  return (
    <>
      <h1 className="text-3xl mb-10">MOBCODERS TRIP</h1>
      <div className="flex flex-col gap-5">
        <DestinationCard />
        <div className="self-center">
          <PlusButton />
        </div>
      </div>
    </>
  );
}
