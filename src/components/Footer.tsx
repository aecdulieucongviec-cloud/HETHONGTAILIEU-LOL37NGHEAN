import React from 'react';
import { Calendar, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#002855] text-white border-t border-[#003B82] mt-auto relative overflow-hidden select-none">
      {/* Stylized City & Industrial Silhouette Graphic across the bottom */}
      <div className="absolute inset-0 opacity-15 pointer-events-none flex justify-between items-end">
        {/* Left City Skyline Silhouette */}
        <svg viewBox="0 0 450 70" className="h-16 w-auto object-contain">
          <rect x="10" y="30" width="18" height="40" fill="white" />
          <rect x="32" y="15" width="24" height="55" fill="white" />
          <polygon points="44,2 32,15 56,15" fill="white" />
          <rect x="60" y="35" width="16" height="35" fill="white" />
          <rect x="80" y="20" width="30" height="50" fill="white" />
          <rect x="115" y="10" width="22" height="60" fill="white" />
          <line x1="126" y1="10" x2="126" y2="0" stroke="white" strokeWidth="2" />
          <circle cx="126" cy="0" r="2" fill="#00BFEF" />
          <rect x="142" y="28" width="28" height="42" fill="white" />
          <rect x="175" y="40" width="35" height="30" fill="white" />
          <rect x="215" y="22" width="25" height="48" fill="white" />
          <rect x="245" y="15" width="20" height="55" fill="white" />
        </svg>

        {/* Right Industrial Factory Silhouette */}
        <svg viewBox="0 0 450 70" className="h-16 w-auto object-contain">
          <rect x="200" y="25" width="15" height="45" fill="white" />
          <line x1="207" y1="25" x2="207" y2="8" stroke="white" strokeWidth="1.5" />
          <rect x="230" y="18" width="18" height="52" fill="white" />
          <line x1="239" y1="18" x2="239" y2="2" stroke="white" strokeWidth="1.5" />
          <rect x="260" y="35" width="35" height="35" fill="white" />
          <path d="M295 70 C295 55 315 50 335 50 C355 50 375 55 375 70 Z" fill="white" />
          <rect x="385" y="20" width="22" height="50" fill="white" />
          <line x1="396" y1="20" x2="396" y2="5" stroke="white" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10 flex flex-col items-center justify-center gap-3">
        {/* Center Day/Week Badge - Matching screenshot: "📅 Ngày thứ 271 & tuần thứ 40 năm 2026" */}
        <div className="inline-flex items-center gap-2 bg-[#003B82]/80 hover:bg-[#003B82] border border-[#00BFEF]/40 px-4 py-1.5 rounded-full shadow-sm text-xs sm:text-[13px] font-bold tracking-wide text-[#EAF7FF]">
          <Calendar className="w-4 h-4 text-[#00BFEF]" />
          <span>Ngày thứ 271 &amp; tuần thứ 40 năm 2026</span>
        </div>

        {/* Information & Copyright */}
        <div className="text-center space-y-1">
          <div className="text-xs sm:text-sm font-extrabold text-white tracking-wider uppercase flex items-center justify-center gap-2 flex-wrap">
            <span className="text-[#00E5FF]">LOL37 NGHỆ AN</span>
            <span className="text-slate-400">|</span>
            <span>HỆ THỐNG TÀI LIỆU NỘI BỘ</span>
            <span className="text-slate-400">|</span>
            <span className="text-amber-400 font-semibold text-xs flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> ISO 9001 • ISO 14001 • ISO 45001
            </span>
          </div>

          <p className="text-[11px] sm:text-xs text-[#A5E3FF] font-medium italic">
            "Chia sẻ tri thức – Đồng hành phát triển – Vững bước tương lai"
          </p>

          <p className="text-[10px] text-slate-400 pt-1">
            © 2026 LOL37 Nghệ An. Bản quyền nội bộ thuộc Công ty TNHH LOL37 Nghệ An. Mọi hành vi sao chép không được phép đều bị nghiêm cấm.
          </p>
        </div>
      </div>
    </footer>
  );
};
