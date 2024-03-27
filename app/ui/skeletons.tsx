// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function DestAccomSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <div className={`${shimmer} h-7 w-full bg-gray-100 rounded-lg`}></div>
      <div className={`${shimmer} h-20 w-full bg-gray-100 rounded-lg`}></div>
      <div
        className={`${shimmer} h-12 w-full bg-gray-100 rounded-lg mb-5`}
      ></div>
    </div>
  );
}

export function TripSummarySkeleton() {
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className={`${shimmer} h-7 w-full bg-gray-100 rounded-lg`}></div>
        <div className={`${shimmer} h-7 w-full bg-gray-100 rounded-lg`}></div>
        <div className={`${shimmer} h-24 w-full bg-gray-100 rounded-lg`}></div>
        <div className={`${shimmer} h-7 w-full bg-gray-100 rounded-lg`}></div>
        <div className={`${shimmer} h-24 w-full bg-gray-100 rounded-lg`}></div>
        <div className={`${shimmer} h-7 w-full bg-gray-100 rounded-lg`}></div>
        <div className={`${shimmer} h-24 w-full bg-gray-100 rounded-lg`}></div>
      </div>
    </>
  );
}
