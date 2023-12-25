'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { BiSolidShieldPlus } from 'react-icons/bi';
import { IoAnalytics, IoSettingsOutline, IoStar } from 'react-icons/io5';
import {
  MdOutlineDashboard,
  MdOutlineIntegrationInstructions,
  MdOutlinePeopleAlt,
  MdOutlineSettingsSuggest,
  MdOutlineToken,
} from 'react-icons/md';
import logo from '../../../public/logo.png';
import usFlag from '../../../public/us.png';
import styles from './BigSideBar.module.css';
import SideBarSection from './SideBarSection';

interface BigSideBarProps {
  currentRoute: string;
}

const BigSideBar: React.FC<BigSideBarProps> = ({ currentRoute }) => {
  const [isProductionOpen, setIsProductionOpen] = useState(
    currentRoute.startsWith('/crypto/production'),
  );
  const [isEnvironmentOpen, setIsEnvironmentOpen] = useState(
    currentRoute.startsWith('/crypto/environment'),
  );
  const [isChainOpen, setIsChainOpen] = useState(
    currentRoute.startsWith('/crypto/chain'),
  );

  const productionItems = [
    {
      icon: <MdOutlineDashboard size={30} style={{ color: 'gray' }} />,
      text: 'Dashboard',
      link: '/crypto/production/dashboard',
      active: currentRoute === '/crypto/production/dashboard',
    },
    {
      icon: <IoSettingsOutline size={30} style={{ color: 'gray' }} />,
      text: 'Settings',
      link: '/crypto/production/settings',
      active: currentRoute === '/crypto/production/settings',
    },
    {
      icon: (
        <MdOutlineIntegrationInstructions size={30} style={{ color: 'gray' }} />
      ),
      text: 'API Integration',
      link: '/crypto/production/apiIntegration',
      active: currentRoute === '/crypto/production/apiIntegration',
    },
    {
      icon: <MdOutlineToken size={30} style={{ color: 'gray' }} />,
      text: 'Tokens',
      link: '/crypto/production/tokens',
      active: currentRoute === '/crypto/production/tokens',
    },
    {
      icon: <IoAnalytics size={30} style={{ color: 'gray' }} />,
      text: 'Markets',
      link: '/crypto/production/markets',
      active: currentRoute === '/crypto/production/markets',
    },
    {
      icon: <IoStar size={30} style={{ color: 'gray' }} />,
      text: 'Issue',
      link: '/crypto/production/issues',
      active: currentRoute === '/crypto/production/issues',
    },
  ];

  productionItems.forEach((item) => {
    item.icon = React.cloneElement(item.icon, {
      style: { color: item.active ? '#8d001c' : 'gray' },
    });
  });

  const environmentItems = [
    {
      icon: <MdOutlineDashboard size={30} style={{ color: 'gray' }} />,
      text: 'Dashboard',
      link: '/crypto/environment/dashboard',
      active: currentRoute === '/environment/dashboard',
    },
  ];

  environmentItems.forEach((item) => {
    item.icon = React.cloneElement(item.icon, {
      style: { color: item.active ? '#8d001c' : 'gray' },
    });
  });

  const chainItems = [
    {
      icon: <MdOutlineDashboard size={30} style={{ color: 'gray' }} />,
      text: 'Dashboard',
      link: '/crypto/chain/dashboard',
      active: currentRoute === '/chain/dashboard',
    },
  ];

  chainItems.forEach((item) => {
    item.icon = React.cloneElement(item.icon, {
      style: { color: item.active ? '#8d001c' : 'gray' },
    });
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image src={logo} className={`w-10 h-10`} alt="logo" />
        <div className="font-bold ml-2 text-custom-red ">Oslo Services</div>
      </div>
      <div className="flex flex-col p-5 border-0 border-b-2 border-slate-400">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="font-bold text-gray-600">Organization</span>
            <span className="font-bold text-custom-red">ECM</span>
          </div>
          <Image src={usFlag} alt="usFlag" width={70} height={30} />
        </div>
      </div>
      <SideBarSection
        title="Chain"
        items={chainItems}
        isOpen={isChainOpen}
        onToggle={() => setIsChainOpen(!isChainOpen)}
      />
      <SideBarSection
        title="Environment"
        items={environmentItems}
        isOpen={isEnvironmentOpen}
        onToggle={() => setIsEnvironmentOpen(!isEnvironmentOpen)}
      />
      <SideBarSection
        title="Production"
        items={productionItems}
        isOpen={isProductionOpen}
        onToggle={() => setIsProductionOpen(!isProductionOpen)}
      />
      <div>
        <div className="flex item-center py-4 px-6 pt-8">
          <MdOutlinePeopleAlt size={30} style={{ color: 'gray' }} />
          <div className="font-bold text-gray-600 ml-8 mt-1">Teams</div>
        </div>
        <div className="flex item-center py-4 px-6">
          <MdOutlineSettingsSuggest size={30} style={{ color: 'gray' }} />
          <div className="font-bold text-gray-600 ml-8 mt-1">Configure</div>
        </div>
        <div className="flex item-center py-4 px-6">
          <BiSolidShieldPlus size={30} style={{ color: 'gray' }} />
          <div className="font-bold text-gray-600 ml-8 mt-1">Health</div>
        </div>
      </div>
    </div>
  );
};

export default BigSideBar;
