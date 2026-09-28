import React, { useState } from 'react';
import { Search, UserCheck, ShieldAlert, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const Header: React.FC = () => {
  const { searchQuery, setSearchQuery, triggerSearch, currentUser, switchRole, users } = useApp();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      triggerSearch(localQuery.trim());
    } else {
      triggerSearch('');
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'ADMIN':
        return 'TỔNG BIÊN TẬP (ADMIN)';
      case 'DOCUMENT_CONTROLLER':
        return 'Doc Controller (Quản trị tài liệu)';
      case 'DEPARTMENT_MANAGER':
        return 'Trưởng Phòng Vận Hành';
      case 'EMPLOYEE':
        return 'Kỹ sư An Toàn HSE';
      case 'GUEST':
        return 'Khách Vãng Lai (Xem công khai)';
      default:
        return role;
    }
  };

  return (
    <header className="relative w-full bg-gradient-to-r from-[#003B82] via-[#0055B8] to-[#007AC9] text-white shadow-lg overflow-hidden border-b border-[#0096E6]/30">
      {/* Industrial Plant / Refinery Silhouette Backdrop Graphic on the right */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none select-none overflow-hidden hidden md:block">
        <svg
          viewBox="0 0 600 160"
          className="w-full h-full object-cover"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Refinery columns, distillation towers, pipelines & storage tanks */}
          <rect x="420" y="30" width="22" height="130" fill="white" opacity="0.6" rx="2" />
          <line x1="431" y1="30" x2="431" y2="10" stroke="white" strokeWidth="2" />
          <circle cx="431" cy="9" r="2.5" fill="#00BFEF" />
          <rect x="460" y="15" width="28" height="145" fill="white" opacity="0.8" rx="2" />
          <line x1="474" y1="15" x2="474" y2="5" stroke="white" strokeWidth="2" />
          <circle cx="474" cy="4" r="3" fill="#E91E63" />
          <rect x="360" y="50" width="35" height="110" fill="white" opacity="0.5" rx="3" />
          <path d="M350 160 L350 90 L395 70 L395 160 Z" fill="white" opacity="0.3" />
          <path d="M500 160 L500 80 L540 60 L540 160 Z" fill="white" opacity="0.4" />
          <circle cx="300" cy="110" r="35" fill="white" opacity="0.4" />
          <path d="M250 160 C250 130 280 120 310 120 C340 120 370 130 370 160 Z" fill="white" opacity="0.3" />
          <line x1="400" y1="90" x2="460" y2="90" stroke="white" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="400" y1="110" x2="460" y2="110" stroke="white" strokeWidth="2" />
          <line x1="488" y1="60" x2="520" y2="60" stroke="white" strokeWidth="2" />
          <rect x="550" y="40" width="16" height="120" fill="white" opacity="0.7" />
          <line x1="558" y1="40" x2="558" y2="18" stroke="white" strokeWidth="2" />
        </svg>
      </div>

      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        {/* Left: Brand Logo & Title & Slogan */}
        <div className="flex items-center gap-3.5 sm:gap-5 w-full md:w-auto">
          {/* Lotus Flower Logo */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center">
            <div className="relative w-14 h-12 sm:w-16 sm:h-14 flex items-center justify-center">
              {/* Stylized Red/Pink Lotus Flower */}
              <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-md">
                {/* Outer Petals */}
                <path
                  d="M50 70 C30 65 5 45 10 25 C15 5 40 20 50 45 C60 20 85 5 90 25 C95 45 70 65 50 70 Z"
                  fill="none"
                  stroke="#FF4081"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M50 70 C35 55 18 35 25 18 C30 5 45 22 50 50 C55 22 70 5 75 18 C82 35 65 55 50 70 Z"
                  fill="#E91E63"
                  opacity="0.85"
                />
                {/* Center Petal */}
                <path
                  d="M50 68 C42 45 40 20 50 5 C60 20 58 45 50 68 Z"
                  fill="#FF80AB"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                {/* Lotus Core */}
                <ellipse cx="50" cy="54" rx="12" ry="5" fill="#FFE082" />
              </svg>
            </div>
            <div className="text-center -mt-0.5">
              <span className="block text-[13px] sm:text-[14px] font-black tracking-wider leading-none text-white drop-shadow">
                LOL37
              </span>
              <span className="block text-[9px] sm:text-[10px] font-extrabold text-[#00E5FF] tracking-widest uppercase leading-tight">
                NGHỆ AN
              </span>
            </div>
          </div>

          {/* Vertical Separator */}
          <div className="hidden sm:block h-12 w-[1.5px] bg-white/25 rounded-full" />

          {/* Titles */}
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-[27px] font-black tracking-wide text-white uppercase leading-tight drop-shadow-sm flex items-center gap-2">
              <span>HỆ THỐNG TÀI LIỆU LOL37 NGHỆ AN</span>
            </h1>
            <p className="text-xs sm:text-[13px] text-[#A5E3FF] font-medium tracking-wider uppercase mt-0.5 sm:mt-1 flex items-center gap-1.5 flex-wrap">
              <span>CHIA SẺ TRI THỨC</span>
              <span className="text-[#00E5FF] font-bold">-</span>
              <span>ĐỒNG HÀNH PHÁT TRIỂN</span>
              <span className="text-[#00E5FF] font-bold">-</span>
              <span className="text-white font-semibold">VỮNG BƯỚC TƯƠNG LAI</span>
            </p>
          </div>
        </div>

        {/* Right: Search Box + Role Profile Switcher */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {/* Big Search Input */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center w-full md:w-[380px] lg:w-[440px] shadow-md rounded-full bg-white p-1 pl-3.5 border border-white/60 focus-within:ring-2 focus-within:ring-[#00BFEF] transition-all"
          >
            <Search className="w-5 h-5 text-[#0066CC] mr-2 flex-shrink-0" />
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Tìm kiếm tài liệu, quy trình, biểu mẫu..."
              className="w-full text-xs sm:text-sm text-[#12345B] placeholder:text-slate-400 focus:outline-none bg-transparent font-medium"
            />
            {localQuery && (
              <button
                type="button"
                onClick={() => {
                  setLocalQuery('');
                  triggerSearch('');
                }}
                className="text-xs text-slate-400 hover:text-slate-600 px-1 mr-1"
                title="Xóa tìm kiếm"
              >
                ✕
              </button>
            )}
            <button
              type="submit"
              className="flex-shrink-0 bg-gradient-to-r from-[#008FE5] to-[#0066CC] hover:from-[#007AC9] hover:to-[#0055B8] active:scale-95 text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 rounded-full transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>Tìm kiếm</span>
            </button>
          </form>

          {/* Role Simulator Pill */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 bg-[#002D69]/60 hover:bg-[#002D69] text-white px-2.5 sm:px-3 py-1.5 rounded-full border border-white/20 text-xs transition cursor-pointer shadow-sm"
              title="Đổi vai trò người dùng thử nghiệm"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#00BFEF]" />
              <span className="hidden sm:inline font-semibold">{currentUser.fullName}</span>
              <span className="bg-[#00BFEF] text-[#003B82] text-[10px] font-extrabold px-1.5 py-0.5 rounded-full uppercase">
                {currentUser.role}
              </span>
            </button>

            {/* Role Switcher Dropdown */}
            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3.5 py-2 border-b border-slate-100 bg-slate-50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#003B82] uppercase tracking-wide">
                      Mô phỏng Phân quyền (RBAC)
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Chọn vai trò để kiểm thử quyền xem, tải, duyệt hoặc chỉnh sửa tài liệu.
                  </p>
                </div>
                <div className="py-1">
                  {users.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => {
                        switchRole(u.role);
                        setShowRoleMenu(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 flex items-start gap-2.5 hover:bg-[#EAF7FF] transition cursor-pointer ${
                        currentUser.role === u.role ? 'bg-blue-50 font-bold border-l-4 border-[#0066CC]' : ''
                      }`}
                    >
                      <div className="mt-0.5">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            u.role === 'ADMIN'
                              ? 'bg-rose-500'
                              : u.role === 'DOCUMENT_CONTROLLER'
                              ? 'bg-indigo-500'
                              : u.role === 'DEPARTMENT_MANAGER'
                              ? 'bg-emerald-500'
                              : u.role === 'EMPLOYEE'
                              ? 'bg-sky-500'
                              : 'bg-slate-400'
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-slate-900 font-semibold">{u.fullName}</div>
                        <div className="text-[11px] text-slate-500">{getRoleLabel(u.role)}</div>
                        <div className="text-[10px] text-slate-400 italic">{u.department}</div>
                      </div>
                      {currentUser.role === u.role && (
                        <span className="text-[10px] text-[#0066CC] font-bold">✓ Hiện tại</span>
                      )}
                    </button>
                  ))}
                </div>
                <div className="px-3 py-1.5 border-t border-slate-100 bg-amber-50/70 text-[10px] text-amber-800 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0 text-amber-600" />
                  <span>Quyền tải tài liệu mật chỉ dành cho tài khoản nội bộ.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
