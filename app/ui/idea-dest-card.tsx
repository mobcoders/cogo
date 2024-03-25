import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { pexelsSearch } from '@/lib/pexels';

export default async function IdeaDestinationCard({
  city,
  country,
}: {
  city: string;
  country: string;
}) {
  const photoUrl = await pexelsSearch(city);
  return (
    <Card className="bg-white drop-shadow-cogo">
      <CardBody>
        <div>
          <div>
            <Image
              alt="Album cover"
              className="object-cover mb-5"
              height={200}
              shadow="md"
              // src={
              //   'https://www.portugal.net/en/wp-content/uploads/sites/107/algar-de-benagil.jpg'
              // }
              src={photoUrl!}
              width="100%"
            />
          </div>

          <div className="flex justify-between items-start pb-2">
            <div className="flex flex-col">
              <h1 className="font-semibold text-lg">{city}</h1>
              <p className="text-small text-light-grey">{country}</p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
