import SideNavApp from '@/components/SideNav/sidenavbar';

export default function Home() {
  return (
    <>
      <SideNavApp currentRoute="/" />
      {/* Your Home page content goes here */}
      <div className="flex p-8">
        <h1>Welcome to the Home Page!</h1>
      </div>
    </>
  );
}
