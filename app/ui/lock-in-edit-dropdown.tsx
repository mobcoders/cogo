'use client';

import { updateVotingStage } from '@/lib/action';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/dropdown';
import { Button } from '@nextui-org/button';
import {
  EllipsisHorizontalCircleIcon as OptionsIcon,
  PencilIcon,
  LockClosedIcon,
} from '@heroicons/react/24/solid';
import { useParams } from 'next/navigation';

export default function LockInEditDropdown({
  city,
  country,
}: {
  city: string;
  country: string;
}) {
  const params = useParams<{ trip_id: string }>();
  const tripId = params.trip_id;

  function handleClick(dropdownItemKey: string) {
    if (dropdownItemKey === 'lock-in') {
      updateVotingStage(tripId, city, country);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <Dropdown
        placement="bottom-end"
        backdrop="blur"
        className="min-w-0 w-fit"
      >
        <DropdownTrigger>
          <Button isIconOnly size="sm" className="bg-transparent" disableRipple>
            <OptionsIcon
              height={22}
              className="fill-light-grey -translate-x-[-7px]"
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Trip Actions"
          variant="flat"
          className="w-fit"
          onAction={(key) => handleClick(key as string)}
        >
          <DropdownItem
            key="edit"
            startContent={
              <PencilIcon height={15} className="fill-light-grey" />
            }
          >
            Edit
          </DropdownItem>
          <DropdownItem
            key="lock-in"
            startContent={
              <LockClosedIcon height={15} className="fill-light-grey" />
            }
          >
            Lock In
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
