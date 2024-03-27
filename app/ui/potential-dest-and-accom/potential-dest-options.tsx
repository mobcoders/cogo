import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/dropdown';
import { Button } from '@nextui-org/button';
import {
  EllipsisHorizontalCircleIcon as OptionsIcon,
  LockClosedIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { lockInDestination } from '@/lib/action';
import { useParams } from 'next/navigation';
import { deletePotentialDestination } from '@/lib/action';

export default function PotentialDestOptions({
  destinationId,
}: {
  destinationId: string;
}) {
  const params = useParams<{ trip_id: string }>();
  const tripId = params.trip_id;

  function handleClick(dropdownItemKey: string) {
    if (dropdownItemKey === 'lock-in') {
      lockInDestination(tripId, destinationId);
    }
  }

  function handleDelete() {
    deletePotentialDestination(destinationId, tripId);
  }

  return (
    <>
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
          aria-label="Trip Actions"
          onAction={(key) => handleClick(key as string)}
          className="w-fit"
        >
          <DropdownItem key="lock-in" textValue="Lock In" className="w-fit">
            <Button
              className="bg-primary-500 text-white w-24"
              startContent={
                <LockClosedIcon height={15} className="fill-white" />
              }
            >
              Lock In
            </Button>
          </DropdownItem>
          <DropdownItem key="edit" textValue="Edit" className="w-fit">
            <Button
              onPress={handleDelete}
              className="bg-primary-500 text-white w-24"
              startContent={<TrashIcon height={15} className="fill-white" />}
            >
              Delete
            </Button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
