import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/ui/globals.css';
import { Providers } from '@/app/providers';
import CogoLogo from './ui/cogo-logo';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cogo',
  description: 'Travel made easy',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-[#FFE8E1] min-h-screen px-10 pt-10 pb-28`}
      >
        <CogoLogo />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
