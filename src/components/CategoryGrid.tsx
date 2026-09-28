import React from 'react';
import { useApp } from '../context/AppContext';
import { CategoryId } from '../types';

interface CategoryGridItem {
  id: CategoryId;
  titleLine1: string;
  titleLine2?: string;
  renderIcon: () => React.ReactNode;
}

export const CategoryGrid: React.FC = () => {
  const { categories, setSelectedCategoryFilter, setActiveTab } = useApp();

  const handleCategoryClick = (catId: CategoryId) => {
    setSelectedCategoryFilter(catId);
    setActiveTab('documents');
  };

  // Dedicated SVG icons crafted to match the exact visual style in the reference image
  const categoryItems: CategoryGridItem[] = [
    {
      id: 'so-tay',
      titleLine1: 'SỔ TAY',
      titleLine2: 'HỆ THỐNG',
      renderIcon: () => (
        /* Open Book */
        <svg viewBox="0 0 64 64" className="w-14 h-14 sm:w-16 sm:h-16" fill="none" stroke="#0066CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M32 50 C26 46 16 46 8 49 L8 19 C16 16 26 16 32 20 C38 16 48 16 56 19 L56 49 C48 46 38 46 32 50 Z" />
          <path d="M32 20 L32 50" />
          <path d="M16 26 C22 23 27 24 30 25" strokeWidth="2.5" />
          <path d="M16 33 C22 30 27 31 30 32" strokeWidth="2.5" />
          <path d="M48 26 C42 23 37 24 34 25" strokeWidth="2.5" />
          <path d="M48 33 C42 30 37 31 34 32" strokeWidth="2.5" />
        </svg>
      ),
    },
    {
      id: 'chinh-sach-quy-trinh',
      titleLine1: 'CHÍNH SÁCH',
      titleLine2: '& QUY TRÌNH',
      renderIcon: () => (
        /* Document with Cog/Gear */
        <svg viewBox="0 0 64 64" className="w-14 h-14 sm:w-16 sm:h-16" fill="none" stroke="#0066CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M36 8 L14 8 C11.8 8 10 9.8 10 12 L10 52 C10 54.2 11.8 56 14 56 L30 56" />
          <path d="M36 8 L48 20 L48 28" />
          <path d="M34 8 L34 20 L48 20" />
          <line x1="18" y1="22" x2="28" y2="22" strokeWidth="2.5" />
          <line x1="18" y1="30" x2="30" y2="30" strokeWidth="2.5" />
          <line x1="18" y1="38" x2="26" y2="38" strokeWidth="2.5" />
          {/* Gear icon on lower-right */}
          <circle cx="44" cy="44" r="5" fill="#EAF7FF" stroke="#0066CC" strokeWidth="2.5" />
          <path d="M44 35 L44 38 M44 50 L44 53 M35 44 L38 44 M50 44 L53 44 M37.6 37.6 L39.8 39.8 M48.2 48.2 L50.4 50.4 M37.6 50.4 L39.8 48.2 M48.2 39.8 L50.4 37.6" strokeWidth="2.5" />
        </svg>
      ),
    },
    {
      id: 'muc-tieu',
      titleLine1: 'MỤC TIÊU',
      titleLine2: '',
      renderIcon: () => (
        /* Archery Target Bullseye with Arrow */
        <svg viewBox="0 0 64 64" className="w-14 h-14 sm:w-16 sm:h-16" fill="none" stroke="#0066CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="30" cy="34" r="22" />
          <circle cx="30" cy="34" r="14" />
          <circle cx="30" cy="34" r="6" fill="#0066CC" />
          {/* Dart / Arrow hitting center from top right */}
          <line x1="48" y1="16" x2="31" y2="33" stroke="#00BFEF" strokeWidth="3.5" />
          <path d="M44 14 L52 14 L52 22" stroke="#00BFEF" strokeWidth="3" />
          <path d="M46 12 L54 20" stroke="#00BFEF" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: 'van-hanh',
      titleLine1: 'VẬN HÀNH',
      titleLine2: '',
      renderIcon: () => (
        /* Big Industrial Gear / Cog */
        <svg viewBox="0 0 64 64" className="w-14 h-14 sm:w-16 sm:h-16" fill="none" stroke="#0066CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="32" cy="32" r="10" />
          <path d="M29 6 L35 6 L36 12 C38 12.8 40 14 41.6 15.4 L47 12.4 L51 16.4 L48 21.8 C49.4 23.4 50.6 25.4 51.4 27.4 L57.4 28.4 L57.4 34.4 L51.4 35.4 C50.6 37.6 49.4 39.6 48 41.2 L51 46.6 L47 50.6 L41.6 47.6 C40 49 38 50.2 36 51 L35 57 L29 57 L28 51 C26 50.2 24 49 22.4 47.6 L17 50.6 L13 46.6 L16 41.2 C14.6 39.6 13.4 37.6 12.6 35.4 L6.6 34.4 L6.6 28.4 L12.6 27.4 C13.4 25.4 14.6 23.4 16 21.8 L13 16.4 L17 12.4 L22.4 15.4 C24 14 26 12.8 28 12 Z" />
        </svg>
      ),
    },
    {
      id: 'tai-lieu-hse',
      titleLine1: 'TÀI LIỆU HSE',
      titleLine2: '',
      renderIcon: () => (
        /* Hard Hat with Shield */
        <svg viewBox="0 0 64 64" className="w-14 h-14 sm:w-16 sm:h-16" fill="none" stroke="#0066CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Hard Hat */}
          <path d="M12 36 C12 22 21 16 32 16 C43 16 52 22 52 36" />
          <path d="M8 36 L56 36 C57.5 36 58 37 57 38 L54 41 L10 41 L7 38 C6 37 6.5 36 8 36 Z" />
          <path d="M28 16 L28 26 M36 16 L36 26" strokeWidth="2.5" />
          {/* Shield in bottom right */}
          <path d="M42 41 L53 41 C53 49 47.5 54 42 56 C36.5 54 31 49 31 41 L42 41 Z" fill="#EAF7FF" stroke="#0066CC" strokeWidth="2.5" />
          <path d="M38 48 L41 51 L47 45" stroke="#0066CC" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: 'tai-lieu-cd',
      titleLine1: 'TÀI LIỆU CĐ',
      titleLine2: '',
      renderIcon: () => (
        /* Clipboard / Checklist Document */
        <svg viewBox="0 0 64 64" className="w-14 h-14 sm:w-16 sm:h-16" fill="none" stroke="#0066CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="14" y="14" width="36" height="42" rx="4" />
          {/* Clipboard Top Clip */}
          <path d="M24 14 L24 11 C24 9.5 25.5 8 27 8 L37 8 C38.5 8 40 9.5 40 11 L40 14" />
          <circle cx="32" cy="11" r="1.5" fill="#0066CC" />
          {/* Document Content Lines */}
          <line x1="22" y1="24" x2="42" y2="24" strokeWidth="2.5" />
          <line x1="22" y1="32" x2="42" y2="32" strokeWidth="2.5" />
          <line x1="22" y1="40" x2="36" y2="40" strokeWidth="2.5" />
          <line x1="22" y1="48" x2="30" y2="48" strokeWidth="2.5" />
        </svg>
      ),
    },
    {
      id: 'huong-dan-cong-viec',
      titleLine1: 'HƯỚNG DẪN',
      titleLine2: 'CÔNG VIỆC',
      renderIcon: () => (
        /* Document with Person/User Avatar */
        <svg viewBox="0 0 64 64" className="w-14 h-14 sm:w-16 sm:h-16" fill="none" stroke="#0066CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 10 C12 8.5 13.5 7 15 7 L36 7 L48 19 L48 53 C48 55 46.5 57 44 57 L15 57 C13.5 57 12 55.5 12 53 Z" />
          <path d="M35 7 L35 19 L48 19" />
          {/* Person silhouette */}
          <circle cx="28" cy="30" r="6" />
          <path d="M18 48 C18 42 22 40 28 40 C34 40 38 42 38 48" />
          <line x1="20" y1="52" x2="36" y2="52" strokeWidth="2.5" />
        </svg>
      ),
    },
    {
      id: 'bao-tri',
      titleLine1: 'BẢO TRÌ',
      titleLine2: '',
      renderIcon: () => (
        /* Crossed Wrench & Screwdriver/Pliers */
        <svg viewBox="0 0 64 64" className="w-14 h-14 sm:w-16 sm:h-16" fill="none" stroke="#0066CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Wrench */}
          <path d="M46 14 C44 12 40 12 38 14 L30 22 L37 29 L45 21 C47 19 47 15 46 14 Z M38 14 C36 16 35 19 37 21" />
          <path d="M30 22 L14 42 C12 44.5 12 48 14 50 C16 52 19.5 52 22 50 L37 29" />
          {/* Screwdriver */}
          <line x1="16" y1="16" x2="48" y2="48" strokeWidth="3" />
          <path d="M48 48 L52 52" strokeWidth="3.5" />
          <path d="M14 14 L18 18" strokeWidth="4" />
        </svg>
      ),
    },
    {
      id: 'bao-cao-ky-thuat',
      titleLine1: 'BÁO CÁO',
      titleLine2: 'KỸ THUẬT',
      renderIcon: () => (
        /* Bar Chart with Magnifying Glass */
        <svg viewBox="0 0 64 64" className="w-14 h-14 sm:w-16 sm:h-16" fill="none" stroke="#0066CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="36" width="8" height="18" rx="1.5" />
          <rect x="22" y="26" width="8" height="28" rx="1.5" />
          <rect x="34" y="16" width="8" height="38" rx="1.5" />
          <line x1="6" y1="56" x2="56" y2="56" />
          {/* Magnifier */}
          <circle cx="44" cy="24" r="9" fill="#EAF7FF" stroke="#0066CC" strokeWidth="2.5" />
          <line x1="51" y1="31" x2="57" y2="37" strokeWidth="3.5" />
        </svg>
      ),
    },
    {
      id: 'tieu-chuan-sqm',
      titleLine1: 'TIÊU CHUẨN/SQM',
      titleLine2: '',
      renderIcon: () => (
        /* Certificate Sheet with Ribbon / Seal */
        <svg viewBox="0 0 64 64" className="w-14 h-14 sm:w-16 sm:h-16" fill="none" stroke="#0066CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="12" y="10" width="40" height="42" rx="3" />
          <line x1="18" y1="18" x2="38" y2="18" strokeWidth="2.5" />
          <line x1="18" y1="24" x2="44" y2="24" strokeWidth="2.5" />
          <line x1="18" y1="30" x2="32" y2="30" strokeWidth="2.5" />
          {/* Ribbon Seal badge at bottom center */}
          <circle cx="32" cy="40" r="7" fill="#EAF7FF" stroke="#0066CC" strokeWidth="2.5" />
          <path d="M28 46 L26 56 L32 53 L38 56 L36 46" strokeWidth="2" fill="#EAF7FF" />
        </svg>
      ),
    },
    {
      id: 'tai-lieu-dao-tao',
      titleLine1: 'TÀI LIỆU ĐÀO TẠO',
      titleLine2: '',
      renderIcon: () => (
        /* Trainer Instructor Standing at Presentation Whiteboard */
        <svg viewBox="0 0 64 64" className="w-14 h-14 sm:w-16 sm:h-16" fill="none" stroke="#0066CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Presentation Board */}
          <rect x="24" y="12" width="34" height="26" rx="2" />
          <line x1="30" y1="20" x2="46" y2="20" strokeWidth="2" />
          <line x1="30" y1="26" x2="52" y2="26" strokeWidth="2" />
          <line x1="30" y1="32" x2="42" y2="32" strokeWidth="2" />
          <line x1="41" y1="38" x2="41" y2="52" />
          <line x1="32" y1="52" x2="50" y2="52" />
          {/* Instructor on the left */}
          <circle cx="15" cy="20" r="5" />
          <path d="M8 48 L8 35 C8 32 11 30 15 30 C19 30 22 32 22 35 L22 48" />
          {/* Pointer stick */}
          <line x1="18" y1="34" x2="32" y2="24" strokeWidth="2.5" stroke="#00BFEF" />
        </svg>
      ),
    },
    {
      id: 'sach-dien-tu',
      titleLine1: 'SÁCH ĐIỆN TỬ',
      titleLine2: '',
      renderIcon: () => (
        /* Stack of 3 Books in Perspective */
        <svg viewBox="0 0 64 64" className="w-14 h-14 sm:w-16 sm:h-16" fill="none" stroke="#0066CC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Book 1 (Top) */}
          <path d="M12 24 L32 30 L52 24 L32 18 Z" />
          <path d="M12 24 L12 28 L32 34 L52 28 L52 24" />
          {/* Book 2 (Middle) */}
          <path d="M12 35 L32 41 L52 35" />
          <path d="M12 39 L32 45 L52 39" />
          {/* Book 3 (Bottom) */}
          <path d="M12 46 L32 52 L52 46" />
          <path d="M12 50 L32 56 L52 50" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full">
      {/* 4 columns on desktop, 3 on tablet, 2 on mobile - matching reference image */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-4.5">
        {categoryItems.map((item) => {
          const categoryData = categories.find((c) => c.id === item.id);
          const docCount = categoryData ? categoryData.docCount : 0;

          return (
            <button
              key={item.id}
              onClick={() => handleCategoryClick(item.id)}
              className="group relative bg-white hover:bg-[#F8FCFF] border border-[#008FE5]/25 hover:border-[#008FE5] rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-between text-center shadow-xs hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 cursor-pointer select-none min-h-[160px] sm:min-h-[175px] md:min-h-[185px]"
            >
              {/* Top Vector Icon */}
              <div className="flex-1 flex items-center justify-center pt-1 group-hover:scale-105 transition-transform duration-200">
                {item.renderIcon()}
              </div>

              {/* Title & Accent Underline */}
              <div className="w-full flex flex-col items-center mt-2.5 sm:mt-3">
                <h3 className="text-xs sm:text-[13px] md:text-[14px] font-black tracking-wide text-[#003B82] group-hover:text-[#0066CC] uppercase leading-tight transition-colors">
                  <div>{item.titleLine1}</div>
                  {item.titleLine2 && <div>{item.titleLine2}</div>}
                </h3>

                {/* Bright Cyan Underline Accent - just like reference image */}
                <div className="h-[3px] w-9 bg-[#00BFEF] group-hover:w-14 rounded-full mt-2 transition-all duration-300" />

                {/* Subtext: document counter */}
                <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-1">
                  {docCount} tài liệu
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
