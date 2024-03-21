'use client';
import React, { Key, useState } from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { airbnbLocations } from '@/lib/airbnb-data';

export default function AutocompleteRequired() {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  function handleSelect() {
    console.log('hello');
    console.log(country);
    console.log(city);
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
    </div>
  );
}
