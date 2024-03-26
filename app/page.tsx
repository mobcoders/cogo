import { auth } from '@/auth';
import CreateTripButton from '@/app/ui/create-trip-button';
import GeneratedDestCards from '@/app/ui/generated-dest-cards';

export default async function Page() {
  let session = await auth();
  let name = session!.user!.name!;
  let id = session?.user?.id!;
  let tripName = name.split(' ')[0] + "'s new group trip";

  return (
    <div className="flex flex-col md:grid grid-cols-12 gap-5">
      <div className="md:col-start-1 col-span-6">
        <h1>Hassle-free group travel.</h1>
        <p>
          Planning group trips is now a breeze and making large group payments
          is no longer awkward thanks to Cogo.
        </p>
      </div>
      <div className="md:col-start-7 col-span-6">
        <h1>Ready to go?</h1>
        <p className="mb-3">
          Create a group trip and invite your friends. Trip members can then
          propose and vote on potential destinations and accommodation.
        </p>
        <CreateTripButton tripName={tripName} id={id} />
      </div>
      <div className="md:col-span-12">
        <h1 className="mb-3">Need some inspiration?</h1>
        <GeneratedDestCards />
      </div>
      <footer className="text-center text-xs mt-5 text-light-grey md:col-span-12">
        <p>A MOBCODERS Creation.</p>
        <p>© 2024 cogo. All rights reserved.</p>
      </footer>
    </div>
  );
}
