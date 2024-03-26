import { airbnbLocations } from '@/lib/airbnb-data';
import { pexelsSearch } from '@/lib/pexels';
import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';

export default async function GeneratedDestCards() {
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

  // Update countries to have one city only
  randomCountries.forEach((country) => {
    const randomIndex = Math.floor(Math.random() * country.cities.length);
    // const city = country.cities[randomIndex];
    country.cities = [country.cities[randomIndex]];
  });

  console.log(randomCountries[0]);

  async function handleSrc(countryCity: string) {
    'use server';
    await pexelsSearch(countryCity);
  }

  return (
    <>
      {}
      {randomCountries.map((location, index) => (
        <>
          <Card key={index} className="drop-shadow-cogo h-fit mb-5">
            <CardBody>
              <div className="flex gap-3 h-full">
                <Image
                  alt={`City photo`}
                  className="object-cover h-24"
                  // src={async () => {
                  //   return handleSrc(
                  //     `${location.label}; ${location.cities[0].label}`
                  //   );
                  // }}
                  src="https://www.shutterstock.com/image-photo/untouched-tropical-beach-sri-lanka-600nw-109674992.jpg"
                  height={100}
                  width={100}
                />

                <div className="flex flex-col flex-1">
                  <h1 className="font-semibold text-lg capitalize">
                    {location.cities[0].label}
                  </h1>
                  <p className="text-small text-foreground/80 capitalize">
                    {location.label}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </>
      ))}
    </>
  );
}

// {filteredLocations.map((location: any, index: number) => (
//       <Card key={index} className="drop-shadow-cogo h-fit mb-5">
//       <CardBody>
//         <div className="flex gap-3 h-full">
//           <Image
//             alt={`City photo`}
//             className="object-cover h-24"
//             // src={photoUrl!}
//             src="https://www.shutterstock.com/image-photo/untouched-tropical-beach-sri-lanka-600nw-109674992.jpg"
//             height={100}
//             width={100}
//           />

//           <div className="flex flex-col flex-1">
//             <h1 className="font-semibold text-lg capitalize">{location.cities[
//                 Math.floor(Math.random() * location.cities.length)
//               ].label}</h1>
//             <p className="text-small text-foreground/80 capitalize">
//               {location.label}
//             </p>
//           </div>
//         </div>
//       </CardBody>
//     </Card>
//     ))}
