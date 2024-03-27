import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import '@/app/ui/globals.css';
import { Providers } from '@/app/providers';
import CogoLogo from './ui/cogo-logo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoggedIn from '@/app/ui/logged-in';
import { ThemeSwitcher } from '@/app/ui/theme-switcher';

const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'cogo',
  description: 'Hassle-free group travel.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased px-10 py-12`}>
        <Providers>
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-row justify-between items-start">
              <CogoLogo />
              <div className="flex justify-start items-center gap-3">
                <ThemeSwitcher />
                <LoggedIn />
              </div>
            </div>

            {children}
            <ToastContainer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
