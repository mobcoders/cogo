import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import '@/app/ui/globals.css';
import { Providers } from '@/app/providers';
import CogoLogo from './ui/cogo-logo';

const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'cogo',
  description: 'Hassle-free group travel.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} antialiased min-h-screen px-10 pt-20 pb-12`}
      >
        <CogoLogo />

        <Providers>{children}</Providers>

        <footer className="text-center text-xs mt-10 text-light-grey">
          <p>A MOBCODERS Creation.</p>
          <p>© 2024 cogo. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
