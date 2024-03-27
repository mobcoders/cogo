import { useState, useEffect } from 'react';
import { navigateVotingStage } from '@/lib/action';
import {
  ModalBody,
  ModalContent,
  ModalHeader,
  Tab,
  Tabs,
} from '@nextui-org/react';
import { Trip } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SettingsModal({
  params,
}: {
  params: { trip_id: string };
}) {
  const pathname = usePathname();
  const current = pathname.split('/')[2];

  const tripId = params.trip_id;

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalBody className="flex flex-col gap-5 pb-10">
            <ModalHeader>Trip Settings</ModalHeader>
            <div className="flex justify-center items-center gap-5">
              <div className="flex flex-col items-center">
                <p className="px-6 pb-10">
                  Use the buttons below to move between trip planning stages.
                </p>
                <Tabs
                  disabledKeys={[]}
                  aria-label="Disabled Options"
                  selectedKey={current}
                  onSelectionChange={(key) => {
                    onClose();
                  }}
                >
                  <Tab
                    href={`/${tripId}/destinations`}
                    key="destinations"
                    title="Destination"
                  ></Tab>

                  <Tab
                    href={`/${tripId}/accommodation`}
                    key="accommodation"
                    title="Accommodation"
                  ></Tab>

                  <Tab
                    href={`/${tripId}/trip-summary`}
                    key="trip-summary"
                    title="Itinerary"
                  ></Tab>
                </Tabs>
              </div>
            </div>
          </ModalBody>
        </>
      )}
    </ModalContent>
  );
}
