import CogoLogo from '@/app/ui/cogo-logo';
import Navbar from '@/app/ui/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col w-full">
      <div className="flex flex-col w-full pl-5 pt-5">
        <CogoLogo />
      </div>
      <div className="flex-grow p-6">{children}</div>
      <Navbar />
    </div>
  );
}
