// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function PotentialDestSkeleton() {
  return (
    <div className="flex flex-col gap-5 md:w-[640px] md:mx-auto">
      <div
        className={`${shimmer} h-7 w-full bg-gray-100 rounded-lg dark:bg-primary-500`}
      ></div>
      <div
        className={`${shimmer} h-14 w-full bg-gray-100 rounded-lg md:h-12 dark:bg-primary-500`}
      ></div>
      <div
        className={`${shimmer} h-12 w-full bg-gray-100 rounded-lg mb-5 md:w-72 md:mx-auto dark:bg-primary-500`}
      ></div>
    </div>
  );
}

export function PotentialAccomSkeleton() {
  return (
    <div className="flex flex-col gap-5 md:w-[640px] md:mx-auto">
      <div
        className={`${shimmer} h-7 w-full bg-gray-100 rounded-lg dark:bg-primary-500`}
      ></div>
      <div
        className={`${shimmer} h-14 w-full bg-gray-100 rounded-lg md:h-12 dark:bg-primary-500`}
      ></div>
      <div
        className={`${shimmer} h-12 w-full bg-gray-100 rounded-lg dark:bg-primary-500`}
      ></div>
      <div
        className={`${shimmer} h-12 w-20 ml-auto bg-gray-100 rounded-lg dark:bg-primary-500`}
      ></div>
    </div>
  );
}

export function TripSummarySkeleton() {
  return (
    <div className="flex flex-col gap-5 md:w-[640px] md:mx-auto">
      <div
        className={`${shimmer} h-7 w-full bg-gray-100 rounded-lg dark:bg-primary-500`}
      ></div>
      <div
        className={`${shimmer} h-7 w-full bg-gray-100 rounded-lg dark:bg-primary-500`}
      ></div>
      <div
        className={`${shimmer} h-24 w-full bg-gray-100 rounded-lg dark:bg-primary-500`}
      ></div>
      <div
        className={`${shimmer} h-7 w-full bg-gray-100 rounded-lg dark:bg-primary-500`}
      ></div>
      <div
        className={`${shimmer} h-24 w-full bg-gray-100 rounded-lg dark:bg-primary-500`}
      ></div>
      <div
        className={`${shimmer} h-7 w-full bg-gray-100 rounded-lg dark:bg-primary-500`}
      ></div>
      <div
        className={`${shimmer} h-24 w-full bg-gray-100 rounded-lg dark:bg-primary-500`}
      ></div>
    </div>
  );
}
