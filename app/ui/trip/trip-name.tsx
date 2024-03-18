'use client';
import { useState } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';

export default function TripName() {
  const [isEditing, setIsEditing] = useState(false);
  const [tripNameVal, setTripNameVal] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTripNameVal(e.target.value);
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          {/* Add your form fields here */}
          <input
            type="text"
            placeholder="Enter your trip name"
            value={tripNameVal}
            onChange={handleNameChange}
            className="text-3xl"
          />
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancelClick}>
            Cancel
          </button>
        </form>
      ) : (
        <div className="flex flex-row justify-end">
          <h1 className="flex-grow text-3xl">{tripNameVal}</h1>

          <Button onClick={handleEditClick}>
            <PencilIcon />
          </Button>
        </div>
      )}
    </div>
  );
}
