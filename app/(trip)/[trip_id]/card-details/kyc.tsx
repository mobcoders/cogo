'use client';
import { WeavrUserCreationFlow, weavrKYCFlow } from '@/lib/weavr';
import { Button, Spinner } from '@nextui-org/react';
import { useState } from 'react';

export default function KYC() {
  const [loading, setLoading] = useState(false);

  function handleCreate() {
    setLoading(true);
    WeavrUserCreationFlow();
    setLoading(false);
  }

  function handleKYC() {
    setLoading(true);
    weavrKYCFlow();
  }
  return (
    <div className="max-w-[400px]">
      {loading ? (
        <Spinner className="w-full" />
      ) : (
        <>
          <Button onClick={handleCreate} className="w-full">
            Create consumer, assign password, login
          </Button>
          <Button onClick={handleKYC} className="w-full">
            Simulate KYC
          </Button>
        </>
      )}
    </div>
  );
}
