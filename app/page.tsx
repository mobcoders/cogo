import CreateTripButton from '@/app/ui/create-trip-button';
import HomeGeneratedDestCards from '@/app/ui/home-generated-dest-cards';

export default async function Page() {
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
        <CreateTripButton />
      </div>
      <div className="md:col-span-12">
        <h1 className="mb-3">Need some inspiration?</h1>
        <HomeGeneratedDestCards />
      </div>
      <footer className="text-center text-xs mt-5 text-light-grey md:col-span-12 md:absolute md:bottom-12 md:left-0 md:right-0">
        <p>A MOBCODERS Creation.</p>
        <p>© 2024 cogo. All rights reserved.</p>
      </footer>
    </div>
  );
}
