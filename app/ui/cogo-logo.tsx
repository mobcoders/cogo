import Image from 'next/image';

export default function CogoLogo() {
  return (
    <Image
      src="/cogo-logo.svg"
      height={70.7041}
      width={218.8066}
      className="w-32 mb-10"
      alt="Cogo Logo"
      priority
    />
  );
}
