import Image from 'next/image';

export default function CogoLogo() {
  return (
    <Image
      src="/cogo-logo.svg"
      height={80}
      width={250}
      className="w-40 mb-10"
      alt="Cogo Logo"
      priority
    />
  );
}
