import CogoLogo from '@/app/ui/cogo-logo';
import Navbar from '@/app/ui/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col pt-5 px-5">
        <div className="mb-3">
          <CogoLogo />
        </div>
        {children}
      </div>
      <Navbar />
    </div>
  );
}
