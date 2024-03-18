'use client';
// import { useState } from 'react';
// import { PencilIcon } from '@heroicons/react/24/outline';
// import { Button } from '@nextui-org/react';
// import { Trip } from '@prisma/client/wasm';

// export default function TripName({trip}: {trip: Trip}) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [tripNameVal, setTripNameVal] = useState('');

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleCancelClick = () => {
//     setIsEditing(false);
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsEditing(false);
//   };

//   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTripNameVal(e.target.value);
//   };

//   return (
//     <div>
//       {isEditing ? (
//         <form onSubmit={handleSubmit}>
//           {/* Add your form fields here */}
//           <input
//             type="text"
//             placeholder="Enter your trip name"
//             value={tripNameVal}
//             onChange={handleNameChange}
//             className="text-3xl"
//           />
//           <button type="submit">Save</button>
//           <button type="button" onClick={handleCancelClick}>
//             Cancel
//           </button>
//         </form>
//       ) : (
//     <div className="flex flex-row justify-end">
//       <h1 className="flex-grow text-3xl">{tripNameVal}</h1>

//       <Button onClick={handleEditClick}>
//         <PencilIcon />
//       </Button>
//     </div>
//   )}
// </div>
//   );
// }

import { useState } from 'react';
import { Input, Spacer } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Trip } from '@prisma/client/wasm';

export default function TripName({ trip }: { trip: Trip }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tripNameVal, setTripNameVal] = useState(trip.name);

  //   const handleEditClick = () => {
  //     setIsEditing(true);
  //   };

  function handleFocus() {
    setIsEditing(true);
  }
  return (
    <>
      <Input
        className={isEditing ? 'w-full' : 'w-14 ml-auto'}
        value={isEditing ? trip.name : ''}
        endContent={
          <PencilIcon className="text-default-400 h-5 w-5 flex-shrink-0" />
        }
        onFocus={handleFocus}
      />
      <Spacer x={10} />
      <Input
        className={isEditing ? 'w-full' : 'w-14 ml-auto'}
        value={isEditing ? trip.dates : ''}
        endContent={
          <PencilIcon className="text-default-400 h-5 w-5 flex-shrink-0" />
        }
        onFocus={handleFocus}
      />
    </>
  );
}

// <div>
//   {isEditing ? (
//     <div className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
//       <Input
//         size="md"
//         type="tripName"
//         label="Trip Name"
//         labelPlacement="outside"
//         placeholder="MobCoders2024"
//         endContent={<PencilIcon className="w-4" />}
//       />
//       {/* <Input
//         type="email"
//         label="Email"
//         placeholder="you@example.com"
//         labelPlacement="outside"
//         endContent={<PencilIcon />}
//       /> */}
//     </div>
//   ) : (
//     <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
//       <Input
//         width={'120px'}
//         type="tripName"
//         label="Trip Name"
//         labelPlacement="outside"
//         placeholder="MobCoders2024"
//         endContent={<PencilIcon className="w-4" />}
//       />
//     </div>
//   )}
// </div>

// <div>
//   <Input
//     width="120px"
//     type="tripName"
//     label="Trip Name"
//     labelPlacement="outside"
//     placeholder="MobCoders2024"
//     // endContent={<PencilIcon className="w-4" />}
//   />
// </div>
