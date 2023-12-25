import Link from 'next/link';
import React from 'react';
import { ReactNode } from 'react';

interface SideBarItemProps {
  icon: ReactNode;
  text: string;
  link: string;
  active: boolean;
}

const SideBarItem: React.FC<SideBarItemProps> = ({
  icon,
  text,
  link,
  active,
}) => {
  return (
    <Link href={link}>
      <div
        className={`flex item-center rounded-2xl py-4 px-8 ${active ? `bg-gray-300` : ''}`}
      >
        {icon}
        <div
          className={`font-bold ${
            active ? 'text-custom-red' : 'text-gray-600'
          } ml-8 mt-1`}
        >
          {text}
        </div>
      </div>
    </Link>
  );
};

export default SideBarItem;
