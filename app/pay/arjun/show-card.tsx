'use client';

import { Button } from '@nextui-org/react';
import Script from 'next/script';

export default function ShowCard({ user }: { user: any }) {
  function initClient() {
    //UI KEY NOT API KEY
    window.OpcUxSecureClient.init(process.env.WEAVR_UI_KEY);
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
      function (e) {
        console.error('associate failed ' + e);
      }
    );
  }

  return (
    <>
      <p>Name on card: {user.cardDetails.nameOnCard}</p>
      <p>
        Card Number:{' '}
        <span id="cardNumber">
          **** **** **** {user.cardDetails.cardNumberLastFour}
        </span>
      </p>
      <p>
        CVV: <span id="cvv" />
      </p>
      <p>
        Expiry: {user.cardDetails.expiryMmyy.slice(0, 2)}/
        {user.cardDetails.expiryMmyy.slice(2, 4)}
      </p>
      <Script
        src="https://sandbox.weavr.io/app/secure/static/client.1.js"
        onLoad={initClient}
      ></Script>
      <Button onClick={handleClick}>Show info</Button>
    </>
  );
}
