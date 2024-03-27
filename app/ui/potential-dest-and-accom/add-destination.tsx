'use client';

import React, { startTransition, useOptimistic, useState } from 'react';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { airbnbLocations } from '@/lib/airbnb-data';
import { createPotentialDestination } from '@/lib/action';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { SingleDest } from '@/app/ui/potential-dest-and-accom/potential-dest-card';
import { pexelsSearch } from '@/lib/pexels';

export interface OptimisticDest {}

export default function AddDestination({
  tripId,
  addOptimisticDestination,
}: {
  tripId: string;
  addOptimisticDestination: (destination: SingleDest) => void;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [activities, setActivities] = useState<Array<string>>([]);
  const [activityInput, setActivityInput] = useState('');

  function handleAddActivity() {
    setActivities((prevActivities: Array<string>) => [
      ...prevActivities,
      activityInput,
    ]);
    setActivityInput('');
  }

  const handleRemoveActivity = (activityToRemove: string) => {
    setActivities(
      activities.filter((activity) => activity !== activityToRemove)
    );
    if (activities.length === 1) {
      setActivities([]);
    }
  };

  async function handleClick() {
    if (city !== '') {
      onClose();
      // setActivities([]);
      // const photoUrl =
      // const photoUrl = '';
      const photoUrl = await pexelsSearch(`${country} ${city} view`);
      const newDestination = {
        tripId,
        country,
        city,
        activities,
        photoUrl,
      };
      startTransition(() => {
        addOptimisticDestination(newDestination);
      });

      await createPotentialDestination(
        tripId,
        city,
        country,
        photoUrl,
        activities
      );
    }
  }

  return (
    <>
      <Button onPress={onOpen} className="bg-pink-500 text-white">
        Add a Potential Destination
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className="p-3"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="p-5">
                <Autocomplete
                  isRequired
                  label="Country"
                  defaultItems={airbnbLocations}
                  placeholder="Search for a country"
                  className="w-full"
                  onSelectionChange={(activeCountry) =>
                    setCountry(activeCountry as string)
                  }
                  onClear={() => setCountry('')}
                >
                  {(item) => (
                    <AutocompleteItem key={item.value}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>

                <Autocomplete
                  isDisabled={country && country !== null ? false : true}
                  isRequired
                  label="City"
                  defaultItems={
                    country && country.length > 0
                      ? airbnbLocations.find((obj) => obj.value === country)
                          ?.cities
                      : airbnbLocations
                  }
                  placeholder="Search for a city"
                  className="w-full"
                  onSelectionChange={(activeCity) =>
                    setCity(activeCity as string)
                  }
                  onClear={() => setCity('')}
                >
                  {(item) => (
                    <AutocompleteItem key={item.value}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <div className="flex justify-between items-center gap-3">
                  <Input
                    type="activities"
                    label="Activities"
                    placeholder="Add an activity"
                    className="w-full"
                    value={activityInput}
                    onValueChange={setActivityInput}
                  />
                  <Button
                    onClick={handleAddActivity}
                    className="bg-transparent"
                    isIconOnly
                    disableRipple
                  >
                    <PlusCircleIcon className="fill-light-grey" />
                  </Button>
                </div>

                <div className="flex flex-col gap-2">
                  {activities.map((activity, index) => (
                    <Chip
                      key={index}
                      onClose={() => handleRemoveActivity(activity)}
                      variant="flat"
                    >
                      {activity}
                    </Chip>
                  ))}
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  onPress={handleClick}
                  className="bg-pink-500 text-white"
                >
                  Add Destination
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
