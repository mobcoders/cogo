import { Button } from '@nextui-org/button';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/dropdown';
import {
  EllipsisHorizontalCircleIcon as OptionsIcon,
  TrashIcon,
  LockClosedIcon,
} from '@heroicons/react/24/solid';
import { lockInAccommodation } from '@/lib/action';
import { useParams } from 'next/navigation';
import { deletePotentialAccom } from '@/lib/action';

export default async function PotentialAccomOptions({
  airbnbId,
}: {
  airbnbId: string;
}) {
  const params = useParams<{ trip_id: string }>();
  const tripId = params.trip_id;

  function handleClick(dropdownItemKey: string) {
    if (dropdownItemKey === 'lock-in') {
      lockInAccommodation(tripId, airbnbId);
    } else if (dropdownItemKey === 'delete') {
      deletePotentialAccom(airbnbId, tripId);
    }
  }

  return (
    <Dropdown className="w-fit p-0">
      <DropdownTrigger className="w-fit">
        <Button
          isIconOnly
          size="sm"
          className="bg-transparent"
          variant="solid"
          disableRipple
        >
          <OptionsIcon
            height={22}
            className="fill-light-grey -translate-x-[-7px]"
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Accommodation Actions"
        onAction={(key) => handleClick(key as string)}
        className="w-fit"
      >
        <DropdownItem key="lock-in" textValue="Lock In" className="w-fit">
          <Button
            className="bg-pink-500 text-white w-24"
            startContent={<LockClosedIcon height={15} className="fill-white" />}
          >
            Lock In
          </Button>
        </DropdownItem>
        <DropdownItem key="delete" textValue="Delete" className="w-fit">
          <Button
            className="bg-pink-500 text-white w-24"
            startContent={<TrashIcon height={15} className="fill-white" />}
          >
            Delete
          </Button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
