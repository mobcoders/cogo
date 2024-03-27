'use client';

import { deleteCard } from '@/lib/weavr-user';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Spinner,
} from '@nextui-org/react';
import Script from 'next/script';
import { useState } from 'react';
import { FaRegSnowflake } from 'react-icons/fa';

declare global {
  interface Window {
    OpcUxSecureClient: any; // Replace 'any' with the appropriate type if available
  }
}

export default function ShowCard({
  user,
  tripId,
}: {
  user: any;
  tripId: string;
}) {
  const [loading, setLoading] = useState(false);
  function initClient() {
    //UI KEY NOT API KEY
    window.OpcUxSecureClient.init('R3n2Q+qlVv0BjnbJwdsARA==');
  }

  function handleClick() {
    window.OpcUxSecureClient.associate(
      `Bearer ${user.token}`,
      function () {
        console.log('associate success');

        // Create an instance of a card number component
        // Replace the {{cardnumber_token}} with the tokenised card number received using
        // the server-side API call
        var cardSpan = window.OpcUxSecureClient.span(
          'cardNumber',
          `${user.cardDetails.cardNumber.value}`
        );

        // Embed the card number component in the HTML element where you want
        // the card number to be shown
        cardSpan.mount(document.getElementById('cardNumber'));

        var cvvSpan = window.OpcUxSecureClient.span(
          'cvv',
          `${user.cardDetails.cvv.value}`
        );

        // Embed the card number component in the HTML element where you want
        // the card number to be shown
        cvvSpan.mount(document.getElementById('cvv'));
      },

      // Handle errors
      function (e: any) {
        console.error('associate failed ' + e);
      }
    );
  }

  function handleDelete() {
    setLoading(true);
    deleteCard(user.token, tripId);
  }

  return (
    <>
      <Script
        src="https://sandbox.weavr.io/app/secure/static/client.1.js"
        onLoad={initClient}
      ></Script>

      <div className="flex gap-5 max-w-[640px] justify-between  md:m-auto md:w-full">
        <Button onClick={handleClick} className="w-full h-[70px] bg-pink-500">
          <div className="flex flex-col items-center">
            <LockClosedIcon height={17} className="fill-white" />
            <p className="text-white">Reveal details</p>
          </div>
        </Button>
        <Button onClick={handleDelete} className="w-full h-[70px] bg-pink-500">
          {loading ? (
            <Spinner />
          ) : (
            <div className="flex flex-col items-center">
              <FaRegSnowflake size={17} className="fill-white" />
              <p className="text-white">Destroy card</p>
            </div>
          )}
        </Button>
      </div>

      <Card className="max-w-[640px] my-5 md:m-auto md:w-full">
        <CardHeader className="pb-0">
          <div className="flex justify-between w-full font-bold">
            <p>Card Details</p>
          </div>
        </CardHeader>
        <CardBody className="pt-2">
          <div className="flex w-full justify-between my-3">
            <p>Name on card</p>
            <p>{user.cardDetails.nameOnCard}</p>
          </div>
          <Divider />

          <div className="flex justify-between w-full my-3">
            <p>Card Number</p>
            <div className="w-[137px] text-right">
              <span id="cardNumber">
                **** **** **** {user.cardDetails.cardNumberLastFour}
              </span>
            </div>
          </div>
          <Divider />

          <div className="flex w-full justify-between my-3">
            <p>Expiry</p>
            <p>
              {user.cardDetails.expiryMmyy.slice(0, 2)}/
              {user.cardDetails.expiryMmyy.slice(2, 4)}
            </p>
          </div>
          <Divider />

          <div className="flex w-full justify-between my-3">
            <p>CVV</p>
            <div className="w-[25px] text-right">
              <span id="cvv">***</span>
            </div>
          </div>
          <Divider />

          <div className="flex w-full justify-between my-3">
            <p>Billing Address</p>
            <ChevronRightIcon height={17} className="my-auto" />
          </div>
        </CardBody>
      </Card>
    </>
  );
}
