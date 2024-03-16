import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1 className="text-5xl">Go to Destination Moodboard</h1>
      <Link href={'/destination-moodboard'}>
        <button className="bg-white text-black">Go</button>
      </Link>
    </>
  );
}
