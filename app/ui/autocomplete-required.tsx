'use client';
import React, { Key, useState } from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { airbnbLocations } from '@/lib/airbnb-data';

export default function AutocompleteRequired() {
  const [country, setCountry] = useState('');

  function handleSelect() {
    console.log('hello');
    console.log(country);
  }

  return (
    <div>
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
      >
        {(item) => (
          <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
        )}
      </Autocomplete>

      <Autocomplete
        isRequired
        label="City"
        defaultItems={
          country !== ''
            ? airbnbLocations.find((obj) => obj.value === country)?.cities
            : airbnbLocations
        }
        placeholder="Search for a city"
        className="max-w-xs"
      >
        {(item) => (
          <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
}

// defaultItems={
//           country !== ''
//             ? airbnbLocations.find((obj) => obj.value === country)
//             : airbnbLocations
//         }
