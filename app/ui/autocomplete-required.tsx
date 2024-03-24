'use client';
import React, { useState } from 'react';
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
import { createPotentialDestinationV2 } from '@/lib/action';

export default function AutocompleteRequired({
  callPexelsSearch,
  tripId,
}: {
  callPexelsSearch: (query: string) => Promise<string | null>;
  tripId: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [activities, setActivities] = useState<Array<string>>([]);
  const [activityInput, setActivityInput] = useState('');

  function handleSelect() {
    console.log('hello');
    console.log(country);
    console.log(city);
  }

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
    console.log(country);
    console.log(city);
    const photoUrl = await callPexelsSearch(city);
    console.log(photoUrl);
    await createPotentialDestinationV2(
      tripId,
      city,
      country,
      photoUrl,
      activities
    );
  }

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Add Destination
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <Autocomplete
                  isRequired
                  label="Country"
                  defaultItems={airbnbLocations}
                  placeholder="Search for a country"
                  className="max-w-xs"
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
                  className="max-w-xs"
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
                <div className="flex py-2 px-1 justify-between">
                  <Input
                    type="activities"
                    label="Activities"
                    placeholder="Add an activity..."
                    className="max-w-xs"
                    value={activityInput}
                    onValueChange={setActivityInput}
                  />
                  <Button onClick={handleAddActivity}>Add activity</Button>
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

                {/*  */}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleClick}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

{
  /* <div>
      <Button
        type="button"
        onClick={handleClick}
        className="bg-pink-500 text-white"
      >
        Add a destination
      </Button>

      <Autocomplete
        isRequired
        label="Country"
        defaultItems={airbnbLocations}
        placeholder="Search for a country"
        className="max-w-xs"
        onSelectionChange={(activeCountry) =>
          setCountry(activeCountry as string)
        }
        onClose={handleSelect}
        onClear={() => setCountry('')}
      >
        {(item) => (
          <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
        )}
      </Autocomplete>

      <Autocomplete
        isDisabled={country && country !== null ? false : true}
        isRequired
        label="City"
        defaultItems={
          country && country.length > 0
            ? airbnbLocations.find((obj) => obj.value === country)?.cities
            : airbnbLocations
        }
        placeholder="Search for a city"
        className="max-w-xs"
        onSelectionChange={(activeCity) => setCity(activeCity as string)}
        onClose={handleSelect}
        onClear={() => setCity('')}
      >
        {(item) => (
          <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
        )}
      </Autocomplete>
      <Input
        type="activities"
        label="Activities"
        placeholder="Add some activities (comma separated!)"
        className="max-w-xs"
        value={activities}
        onValueChange={setActivities}
      />
    </div> */
}
