'use client';

import { Button, Spinner } from '@nextui-org/react';
import { useState } from 'react';

export default function CreateTripButton() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {!loading ? (
        <Button onClick={() => setLoading(true)}>Create a group trip</Button>
      ) : (
        <Button>
          <Spinner />
        </Button>
      )}
    </>
  );
}
