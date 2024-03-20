import { Card, CardBody } from '@nextui-org/card';
import type { Trip } from '@prisma/client';
import Link from 'next/link';

export default function ProfileDestinationCard({ trip }: { trip: Trip }) {
  return (
    <Link href={`/${trip.id}`} className="w-full">
      <Card className="drop-shadow-cogo mb-5" shadow="none">
        <CardBody>
          <h2>{trip.name}</h2>
          <h3 className="text-light-grey">
            {trip.city && trip.country ? `${trip.city}, ${trip.country}` : ''}
          </h3>
          <p className="text-light-grey">{trip.dates}</p>
        </CardBody>
      </Card>
    </Link>
  );
}
