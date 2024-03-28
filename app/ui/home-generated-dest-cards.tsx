import { airbnbLocations } from '@/lib/airbnb-data';
import { pexelsSearch } from '@/lib/pexels';
import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';

export default async function HomeGeneratedDestCards() {
  // Helper function to get random indexes but unique from an array
  function getRandomIndex(usedIndexes: number[], arrayLength: number): number {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * arrayLength);
    } while (usedIndexes.includes(randomIndex));
    return randomIndex;
  }

  // Array of 3 random countries
  const usedIndexes = [];
  const randomCountries = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = getRandomIndex(usedIndexes, airbnbLocations.length);
    randomCountries.push(airbnbLocations[randomIndex]);
    usedIndexes.push(randomIndex);
  }

  // Add Pexels URL to each country
  await Promise.all(
    randomCountries.map(async (country) => {
      const randomIndex = Math.floor(Math.random() * country.cities!.length);
      const photoUrl = await pexelsSearch(
        `${country.label} ${country.cities![randomIndex].label} holiday`
      );
      if (photoUrl) {
        country.photoUrl = photoUrl;
      }
    })
  );

  return (
    <div className="flex flex-col gap-5 md:flex-row">
      {randomCountries.map((location, index) => (
        <Card key={index} className="drop-shadow-cogo h-fit w-full">
          <CardBody>
            <div className="flex gap-3 h-full">
              <Image
                alt={`City photo`}
                className="object-cover h-24 w-24"
                radius="md"
                src={location.photoUrl}
                // src="https://www.shutterstock.com/image-photo/untouched-tropical-beach-sri-lanka-600nw-109674992.jpg"
              />

              <div className="flex flex-col flex-1">
                <h1 className="font-semibold text-lg capitalize">
                  {location.cities![0].label}
                </h1>
                <p className="text-small text-foreground/80 capitalize">
                  {location.label}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
