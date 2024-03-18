import CogoLogo from '@/app/ui/cogo-logo';
import Navbar from '@/app/ui/navbar';
import TripName from '@/app/ui/trip/trip-name';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="flex-grow flex flex-col">
        {/* trip name form component */}
        {/* <h1 className="text-3xl">MOBCODERS TRIP</h1> */}
        {/* conditionally render date if set */}
        <p>April 2024</p>
        {children}
      </div>
      <Navbar />
    </div>
  );
}
