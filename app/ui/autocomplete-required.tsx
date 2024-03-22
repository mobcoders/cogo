'use client';
import React, { Key, useState } from 'react';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
} from '@nextui-org/react';
import { airbnbLocations } from '@/lib/airbnb-data';
import { pexelsSearch } from '@/lib/pexels';
import { createPotentialDestinationV2 } from '@/lib/action';

export default function AutocompleteRequired({
  callPexelsSearch,
  tripId,
}: {
  callPexelsSearch: (query: string) => Promise<string | null>;
  tripId: string;
}) {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [activities, setActivities] = useState('');

  function handleSelect() {
    console.log('hello');
    console.log(country);
    console.log(city);
  }

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
    // console.log(pexelsSearch('New York'));
  }

  return (
    <div>
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
    </div>
  );
}
