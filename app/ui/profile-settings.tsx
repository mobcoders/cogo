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
  CameraIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { deleteGroupTrip, deleteUser } from '@/lib/action';
import EditUserPhoto from '@/app/ui/edit-user-photo';
import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';

export default function ProfileSettings({
  userId,
  userEmail,
}: {
  userId: string;
  userEmail: string;
}) {
  const [showCloud, setShowCloud] = useState(false);
  return (
    <div>
      {showCloud ? (
        <CldUploadWidget
          uploadPreset="cogo_cloudinary"
          options={{ sources: ['local', 'url'] }}
          onSuccess={(result, { widget }) => {
            if (typeof result.info === 'object') {
              handleSuccess(result!.info!.secure_url);
            }
          }}
        >
          {({ open }) => {
            function handleOnClick() {
              open();
            }
            return (
              <Button
                className="bg-pink-500 text-white w-40"
                startContent={<CameraIcon height={15} className="fill-white" />}
                onClick={handleOnClick}
              >
                Update Photo
              </Button>
            );
          }}
        </CldUploadWidget>
      ) : (
        <></>
      )}
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
          className="w-fit"
        >
          <DropdownItem
            key="update-photo"
            textValue="Update photo"
            className="w-fit"
          >
            <Button onClick={() => setShowCloud(true)}>Update Photo</Button>
          </DropdownItem>
          <DropdownItem key="delete" textValue="Delete" className="w-fit">
            <Button
              className="bg-pink-500 text-white w-40"
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
