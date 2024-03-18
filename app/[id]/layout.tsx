import CogoLogo from '@/app/ui/cogo-logo';
import Navbar from '@/app/ui/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="flex-grow flex flex-col">
        {children}
      </div>
      <Navbar />
    </div>
  );
}
