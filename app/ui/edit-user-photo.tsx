'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { CameraIcon } from '@heroicons/react/24/solid';
import { updateUserPhoto } from '@/lib/action';
import { Button } from '@nextui-org/button';

export default function EditUserPhoto({ userId }: { userId: string }) {
  function handleSuccess(url: string) {
    updateUserPhoto(userId, url);
  }

  return (
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
  );
}
