'use client';

import * as Sentry from '@sentry/nextjs';
import NextError from 'next/error';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { statusCode?: number };
}

export default function GlobalError({ error }: ErrorProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <NextError statusCode={error.statusCode || 500} />
      </body>
    </html>
  );
}
