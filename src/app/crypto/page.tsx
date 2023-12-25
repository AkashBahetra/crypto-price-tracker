import BigSideBar from '@/components/BigSideBar/bigsidebar';
import SideNavApp from '@/components/SideNav/sidenavbar';
import { MdOutlinePerson } from 'react-icons/md';

export default function Home() {
  return (
    <>
      <div className="flex flex-row w-screen bg-gradient-to-r from-red-50 to-red-200">
        <div className="flex w-max">
          <SideNavApp currentRoute="/crypto" />
          <BigSideBar currentRoute="/crypto" />
        </div>
        <div className="flex h-32 border-0 border-b-2 border-slate-400 w-full justify-end">
          <div className="flex flex-row bg-white h-16 w-64 mr-40 mt-10 item-center justify-center p-3">
            <MdOutlinePerson size={35} style={{ color: 'black' }} />
            <div className="font-bold text-black mt-2 ml-2">
              Tina Li / 0x009075
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
