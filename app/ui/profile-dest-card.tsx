import { Card, CardBody } from '@nextui-org/card';
import type { Trip } from '@prisma/client';
import Link from 'next/link';
import ProfileDestOptions from '@/app/ui/profile-dest-options';

export default function ProfileDestinationCard({ trip }: { trip: Trip }) {
  return (
    <div className="relative w-full">
      <Link href={`/${trip.id}`} className="w-full">
        <Card className="drop-shadow-cogo mb-5" shadow="none">
          <CardBody>
            <div>
              <h2>{trip.name}</h2>
              <h3 className="text-light-grey">
                {trip.city && trip.country && (
                  <>
                    <p className="text-black capitalize">{trip.city}</p>
                    <p className="capitalize">{trip.country}</p>
                  </>
                )}
              </h3>
              <p className="text-light-grey">{trip.dates}</p>
            </div>
          </CardBody>
        </Card>
      </Link>
      <ProfileDestOptions tripId={trip.id} />
    </div>
  );
}
