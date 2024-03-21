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

export default function PotentialAccomOptions({ id }: { id: string }) {
  const params = useParams<{ trip_id: string }>();
  const tripId = params.trip_id;

  function handleClick(dropdownItemKey: string) {
    if (dropdownItemKey === 'lock-in') {
      lockInAccommodation(tripId);
    } else if (dropdownItemKey === 'delete') {
      deletePotentialAccom(id, tripId);
    }
  }

  return (
    <Dropdown>
      <DropdownTrigger>
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
      >
        <DropdownItem
          key="lock-in"
          startContent={
            <LockClosedIcon height={15} className="fill-light-grey" />
          }
          textValue="Lock In"
        >
          <Button>Lock In</Button>
        </DropdownItem>
        <DropdownItem
          key="delete"
          startContent={<TrashIcon height={15} className="fill-light-grey" />}
          textValue="Delete"
        >
          <Button>Delete</Button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
