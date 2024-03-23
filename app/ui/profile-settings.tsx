'use client';

import { Button } from '@nextui-org/button';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/dropdown';
import {
  Cog8ToothIcon as SettingsIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { deleteGroupTrip, deleteUser } from '@/lib/action';

export default function ProfileSettings({
  userId,
  userEmail,
}: {
  userId: string;
  userEmail: string;
}) {
  function handleClick() {
    deleteGroupTrip(tripId);
  }

  return (
    <div>
      <Dropdown>
        <DropdownTrigger className="w-fit">
          <Button
            isIconOnly
            size="sm"
            className="bg-transparent"
            variant="solid"
            disableRipple
          >
            <SettingsIcon height={22} className="fill-light-grey" />
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
              className="bg-pink-500 text-white"
              startContent={<TrashIcon height={15} className="fill-white" />}
              onClick={async () => {
                await deleteUser(userEmail);
              }}
            >
              Delete Account
            </Button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
