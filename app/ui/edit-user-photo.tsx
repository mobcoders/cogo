'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { PencilIcon } from '@heroicons/react/24/solid';
import { updateUserPhoto } from '@/lib/action';
import { auth } from '@/auth';

export default function EditUserPhoto({ userId }: { userId: string }) {
  function handleSuccess(url: string) {
    updateUserPhoto(userId, url);
  }

  return (
    <CldUploadWidget
      uploadPreset="cogo_cloudinary"
      options={{ sources: ['local', 'url'] }}
      onSuccess={(result, { widget }) => {
        handleSuccess(result?.info?.secure_url);
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          open();
        }
        return (
          <PencilIcon
            onClick={handleOnClick}
            className="h-5 w-5 fill-light-grey mb-5"
          />
        );
      }}
    </CldUploadWidget>
  );
}
