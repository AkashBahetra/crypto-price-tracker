import { IconType } from 'react-icons/lib';
import { LuHome, LuBellDot, LuUser2 } from 'react-icons/lu';
import { PiCurrencyCircleDollar } from 'react-icons/pi';
import { IoGlobeOutline } from 'react-icons/io5';
import Link from 'next/link';
import React from 'react';

interface SidebarItem {
  label: string;
  icon: IconType;
  route: string;
}

const topMenuItems: SidebarItem[] = [
  {
    label: 'Home',
    icon: LuHome,
    route: '/',
  },
  {
    label: 'Org',
    icon: IoGlobeOutline,
    route: '/org',
  },

  {
    label: 'Crypto',
    icon: PiCurrencyCircleDollar,
    route: '/crypto',
  },
];

const bottomMenuItems: SidebarItem[] = [
  {
    label: 'Notifications',
    icon: LuBellDot,
    route: '/notifications',
  },

  {
    label: 'Profile',
    icon: LuUser2,
    route: '/profile',
  },
];

interface SideNavAppProps {
  currentRoute: string;
  item: SidebarItem;
}

const renderButtons: React.FC<SideNavAppProps> = ({ currentRoute, item }) => (
  <Link href={item.route} key={item.label}>
    <div
      className={`flex group cursor-pointer gap-6 py-4 px-6 items-center hover:text-primary-500 ${
        currentRoute === item.route ? 'bg-red-950' : 'hover:bg-red-950'
      }`}
    >
      <item.icon
        className={`w-8 h-8  ${
          currentRoute === item.route
            ? 'text-white'
            : 'text-white group-hover:text-secondary-500'
        }`}
        strokeWidth={1.5}
      />
    </div>
  </Link>
);

const SideNavApp: React.FC<{ currentRoute: string }> = ({ currentRoute }) => {
  return (
    <div className="md:flex sticky top-0 h-screen bg-custom-red w-max">
      <div className="flex flex-col py-6 justify-between items-center">
        <div className="flex flex-col">
          {topMenuItems.map((item) => (
            <React.Fragment key={item.label}>
              {renderButtons({ currentRoute, item })}
            </React.Fragment>
          ))}
        </div>
        <div className="flex flex-col">
          {bottomMenuItems.map((item) => (
            <React.Fragment key={item.label}>
              {renderButtons({ currentRoute, item })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideNavApp;
