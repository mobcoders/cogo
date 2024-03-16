import CogoLogo from "@/app/ui/cogo-logo";
import Navbar from "@/app/ui/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col w-full p-6 gap-6">
      <div className="flex-none">
        <CogoLogo />
      </div>
      <div className="flex-grow">{children}</div>
      <Navbar />
    </div>
  );
}
