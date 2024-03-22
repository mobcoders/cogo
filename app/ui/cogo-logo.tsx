import Image from 'next/image';
import Link from 'next/link';

export default function CogoLogo() {
  return (
    <Link href={'/'}>
      <Image
        src="/cogo-logo.svg"
        height={80}
        width={250}
        className="w-40 mb-10"
        alt="Cogo Logo"
        priority
      />
    </Link>
  );
}
