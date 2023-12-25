import React, { ReactNode } from 'react';
import { TbTriangleFilled, TbTriangleInvertedFilled } from 'react-icons/tb';
import SideBarItem from './SideBaritem';

interface SideBarSectionProps {
  title: string;
  items: { icon: ReactNode; text: string; link: string; active: boolean }[];
  isOpen: boolean;
  onToggle: () => void;
}

const SideBarSection: React.FC<SideBarSectionProps> = ({
  title,
  items,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="border-0 border-b-2 border-slate-400">
      <div className="flex flex-row item-center justify-between p-5">
        <div className="font-bold text-gray-600">{title}</div>
        <button onClick={onToggle}>
          {!isOpen ? (
            <TbTriangleInvertedFilled style={{ color: 'gray' }} />
          ) : (
            <TbTriangleFilled style={{ color: 'gray' }} />
          )}
        </button>
      </div>
      {isOpen && (
        <>
          {items.map((item, index) => (
            <SideBarItem key={index} {...item} />
          ))}
        </>
      )}
    </div>
  );
};

export default SideBarSection;
