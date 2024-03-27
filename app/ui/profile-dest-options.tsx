'use client';

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
} from '@heroicons/react/24/solid';
import { deleteGroupTrip } from '@/lib/action';

export default function ProfileDestOptions({ tripId }: { tripId: string }) {
  function handleClick() {
    deleteGroupTrip(tripId);
  }

  return (
    <div className="absolute top-1 right-3">
      <Dropdown>
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
          aria-label="Group Trip Actions"
          // onAction={(key) => handleClick(key as string)}
          onAction={() => handleClick()}
          className="w-fit"
        >
          <DropdownItem key="delete" textValue="Delete" className="w-fit">
            <Button
              className="bg-primary-500 text-white w-24"
              startContent={<TrashIcon height={15} className="fill-white" />}
            >
              Delete
            </Button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
