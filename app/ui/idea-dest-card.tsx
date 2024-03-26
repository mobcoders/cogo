import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { pexelsSearch } from '@/lib/pexels';

export default async function IdeaDestinationCard({
  city,
  country,
}: {
  city: string;
  country: string;
}) {
  // const photoUrl = await pexelsSearch(city);

  return (
    <Card className="drop-shadow-cogo h-fit mb-5">
      <CardBody>
        <div className="flex gap-3 h-full">
          <Image
            alt={`${city} photo`}
            className="object-cover h-24"
            // src={photoUrl!}
            src="https://www.shutterstock.com/image-photo/untouched-tropical-beach-sri-lanka-600nw-109674992.jpg"
            height={100}
            width={100}
          />

          <div className="flex flex-col flex-1">
            <h1 className="font-semibold text-lg capitalize">{city}</h1>
            <p className="text-small text-foreground/80 capitalize">
              {country}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
