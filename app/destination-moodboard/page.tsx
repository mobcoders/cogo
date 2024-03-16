import DestinationCard from "@/app/ui/destination-card/destination-card";
import Navbar from "@/app/ui/navbar";

export default async function Page() {
  return (
    <>
      <div>
        <h1 className="text-3xl">MOBCODERS TRIP</h1>
      </div>
      <div>
        <DestinationCard />
      </div>
    </>
  );
}
