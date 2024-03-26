'use client';
import { Button, Spinner } from '@nextui-org/react';
import { useState } from 'react';

export default function KYC() {
  const [loading, setLoading] = useState(false);

  function handleCreate() {
    setLoading(true);
    //createUser();
  }
  return (
    <div className="max-w-[400px]">
      {loading ? (
        <Spinner className="w-full" />
      ) : (
        <Button onClick={handleCreate} className="w-full">
          Simulate KYC
        </Button>
      )}
    </div>
  );
}
