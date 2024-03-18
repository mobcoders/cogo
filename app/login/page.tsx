import CogoLogo from '@/app/ui/cogo-logo';

export default async function Page() {
  return (
    <div className="flex flex-col min-h-screen px-5 pt-5">
      <div className="mb-3">
        <CogoLogo />
      </div>
      <h1>Welcome to the login page....</h1>
    </div>
  );
}
