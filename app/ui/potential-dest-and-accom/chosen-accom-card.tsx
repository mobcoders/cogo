import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { PotentialAccom } from '@prisma/client';

export default function ChosenAccomCard({
  accom,
}: {
  accom: PotentialAccom | null;
}) {
  return (
    <Card className="drop-shadow-cogo h-fit mb-5 cursor-pointer">
      <CardBody>
        <a href={accom?.airBnbUrl} target="_blank" rel="noopener noreferrer">
          <div className="flex gap-3 h-full">
            <Image
              alt={'photo url'}
              className="object-cover h-24"
              src={accom?.photoUrl}
              height={100}
              width={100}
            />

            <div className="flex flex-1">
              <h1 className="font-semibold text-lg">{accom?.description}</h1>
            </div>
          </div>
        </a>
      </CardBody>
    </Card>
  );
}
