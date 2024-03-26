'use client';
import {
  createBeneficiary,
  createCard,
  createEndUser,
  createLedger,
  listAllEndusers,
} from '@/lib/railsr';
import { Button } from '@nextui-org/react';

export default function RailsrButtons() {
  return (
    <>
      <Button
        onClick={async () => {
          await createBeneficiary();
        }}
      >
        Create Beneficiary
      </Button>

      <Button
        onClick={async () => {
          await createEndUser();
        }}
      >
        Create Enduser
      </Button>

      <Button
        onClick={async () => {
          await listAllEndusers();
        }}
      >
        List all endusers
      </Button>

      <Button
        onClick={async () => {
          await createLedger();
        }}
      >
        Create Ledger
      </Button>
      <Button
        onClick={async () => {
          await createCard();
        }}
      >
        Create Card
      </Button>
    </>
  );
}
