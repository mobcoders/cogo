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

export default function SettingsModal({
  params,
  trip,
}: {
  params: { trip_id: string };
  trip: Trip;
}) {
  const tripId = params.trip_id;
  const [selected, setSelected] = useState(trip.votingStage);

  useEffect(() => {
    async function fetch() {
      navigateVotingStage(tripId, selected);
    }
    fetch();
  }, [selected, tripId]);

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
                  selectedKey={selected}
                  onSelectionChange={(key) => {
                    setSelected(key as string);
                    onClose();
                  }}
                >
                  <Tab key="dest" title="Destination"></Tab>
                  <Tab key="accom" title="Accommodation"></Tab>
                  <Tab key="itinerary" title="Itinerary"></Tab>
                </Tabs>
              </div>
            </div>
          </ModalBody>
        </>
      )}
    </ModalContent>
  );
}
