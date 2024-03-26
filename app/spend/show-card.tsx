'use client';

import Script from 'next/script';

export default function ShowCard() {
  function show() {
    window.OpcUxSecureClient.init('YPefPhldPkEBjnaKQ84ARA==');
    window.OpcUxSecureClient.associate(
      'Bearer eyJraWQiOiJnZW5lcmF0b3IiLCJhbGciOiJFUzI1NiJ9.eyJTWVNURU0iOiJmYWxzZSIsInN1YiI6IlJPT1QsMTEyMTU3NjU1MTA3MTA4OTMzIiwiVE9LRU5fUFJPVklERVIiOiJFTUFJTF9BTkRfUEFTU1dPUkQiLCJSQU5ET00iOiItNzQ0NjQzNjkzMDA1MDUyNTc1MCIsIklERU5USVRZX0lEIjoiMTEyMTU3NjU1MTA3MTA4OTMzIiwiSURFTlRJVFlfVFlQRSI6ImNvbnN1bWVycyIsIlBFUlBFVFVBTCI6ImZhbHNlIiwiVE9LRU5fVFlQRSI6IkFDQ0VTUyIsIlRFTkFOVF9JRCI6IjIwNTIiLCJJTVBFUlNPTkFUT1JfU0VTU0lPTl9JRCI6IjAiLCJTRVNTSU9OX0lEIjoiMTEyMTYxMjcwMzM0MzU3NTczIiwiUFJPR1JBTU1FX0lEIjoiMTEyMTU3NjQ5NjQxNDcyMDY3IiwiREVWSUNFX0lEIjoiIiwiSU1QRVJTT05BVEVEIjoiZmFsc2UiLCJBVVRIX0dST1VQX0lEIjoiIn0.Sc4nrZ1IEoHSJRyOrl8bOpeEQ_aug-xb4E6-SUawKqMGcrmODOMDtE7HyKGHK0ZMn2LjOqve3PN3M7VOIszgjQ',
      function () {
        console.log('associate success');

        // Create an instance of a card number component
        // Replace the {{cardnumber_token}} with the tokenised card number received using
        // the server-side API call
        var span = window.OpcUxSecureClient.span(
          'cardNumber',
          'x+GRqOKLsvABjnbNZqAAfA=='
        );

        // Embed the card number component in the HTML element where you want
        // the card number to be shown
        span.mount(document.getElementById('cardNumber'));
        console.log(span);
      },

      // Handle errors
      function (e) {
        console.error('associate failed ' + e);
      }
    );
    console.log(window);
  }

  return (
    <>
      <p>
        Card Number: <span id="cardNumber" />
      </p>
      <Script
        src="https://sandbox.weavr.io/app/secure/static/client.1.js"
        onLoad={show}
      ></Script>
    </>
  );
}
