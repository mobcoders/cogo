import { useState, useEffect } from 'react';
import {
  fetchMembers,
  fetchOrganiser,
  navigateVotingStage,
} from '@/lib/action';
import {
  Button,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tab,
  Tabs,
} from '@nextui-org/react';
import { fetchTrip } from '@/lib/data';
export default function SettingsModal({
  params,
}: {
  params: { trip_id: string };
}) {
  const tripId = params.trip_id;
  const [selected, setSelected] = useState('accom');

  useEffect(() => {
    async function fetch() {
      navigateVotingStage(tripId, selected);
    }
    fetch();
  }, [selected]);

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalBody className="flex flex-col gap-5 pb-10">
            <ModalHeader>Trip Settings</ModalHeader>
            <div className="flex justify-center items-center gap-5">
              <div className="flex flex-col items-center">
                <p className="px-6 pb-10">
                  Navigate between the three trip planning stages with the
                  buttons below. We recommend doing this to go back to a
                  previous stage when needed.
                </p>
                <Tabs
                  disabledKeys={[]}
                  aria-label="Disabled Options"
                  selectedKey={selected}
                  onSelectionChange={(key) => setSelected(key as string)}
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
