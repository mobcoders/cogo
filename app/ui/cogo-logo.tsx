'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export default function CogoLogo() {
  const { theme } = useTheme();

  let imageUrl = '/cogo-logo.svg';

  if (theme === 'dark') {
    imageUrl = '/cogo-card-logo.svg';
  }

  return (
    <Link href={'/'}>
      <Image
        src={imageUrl}
        height={80}
        width={250}
        className="w-40 mb-10"
        alt="Cogo Logo"
        priority
      />
    </Link>
  );
}
