import { TripSummarySkeleton } from '@/app/ui/skeletons';
import TripSummary from '@/app/ui/trip-summary';
import { Suspense } from 'react';

export default async function Page({
  params,
}: {
  params: { trip_id: string };
}) {
  const tripId = params.trip_id;

  return (
    <Suspense fallback={<TripSummarySkeleton />}>
      <h3 className="font-extrabold md:w-[640px] md:mx-auto">Trip Summary</h3>
      <TripSummary tripId={tripId}></TripSummary>
    </Suspense>
  );
}
