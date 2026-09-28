import React from 'react';
import { CategoryGrid } from '../components/CategoryGrid';
import { SidebarEventsAndNews } from '../components/SidebarEventsAndNews';

export const HomeView: React.FC = () => {
  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
      {/* 
        Layout matching reference image:
        Left/Center: Category Grid (~68% on desktop)
        Right: Events + Announcements Sidebar (~32% on desktop)
      */}
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-start">
        {/* Left / Center: 12 Category Grid Cards (4 columns) */}
        <div className="w-full lg:w-[68%] xl:w-[70%] order-1">
          <CategoryGrid />
        </div>

        {/* Right Sidebar: Company Events Banner + Announcements List */}
        <div className="w-full lg:w-[32%] xl:w-[30%] order-2">
          <SidebarEventsAndNews />
        </div>
      </div>
    </div>
  );
};
