import React, { useState } from 'react';
import {
  Home,
  Star,
  Target,
  BarChart2,
  Smartphone,
  Wifi,
  CheckSquare,
  Menu,
  X,
  Bell,
  Calendar,
  Users,
  History,
  PlusCircle,
} from 'lucide-react';
import { useApp, NavTab } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setSelectedCategoryFilter,
    announcements,
    currentUser,
    documents,
    setIsUploadOpen,
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadAnnouncementsCount = announcements.filter(
    (a) => !a.readBy?.includes(currentUser.id)
  ).length;

  const pendingApprovalsCount = documents.filter(
    (d) => d.status === 'PENDING_APPROVAL'
  ).length;

  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'home',
      label: 'TRANG CHỦ',
      icon: <Home className="w-4 h-4" />,
    },
    {
      id: 'documents',
      label: 'TÀI LIỆU CHUNG',
      icon: <Star className="w-4 h-4 fill-current" />,
    },
    {
      id: 'objectives',
      label: 'MỤC TIÊU & CHỨNG NHẬN',
      icon: <Target className="w-4 h-4" />,
    },
    {
      id: 'dashboard',
      label: 'BẢNG ĐIỀU KHIỂN',
      icon: <BarChart2 className="w-4 h-4" />,
    },
    {
      id: 'webapps',
      label: 'ỨNG DỤNG WEB',
      icon: <Smartphone className="w-4 h-4" />,
    },
    {
      id: 'wifi',
      label: 'YÊU CẦU WIFI',
      icon: <Wifi className="w-4 h-4" />,
    },
    {
      id: 'control',
      label: 'KIỂM SOÁT TÀI LIỆU',
      icon: <CheckSquare className="w-4 h-4" />,
      badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined,
    },
  ];

  const handleTabClick = (tabId: NavTab) => {
    if (tabId === 'documents') {
      setSelectedCategoryFilter('all');
    }
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="w-full bg-[#003B82] text-white shadow-md sticky top-0 z-40 border-b border-[#002855]">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[52px]">
          {/* Main Desktop Navigation Items */}
          <div className="hidden lg:flex items-center space-x-1 h-full overflow-x-auto no-scrollbar">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative flex items-center gap-2 h-full px-4 text-xs sm:text-[13px] font-bold tracking-wide transition-all uppercase whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#0052A3] text-white shadow-inner'
                      : 'text-slate-100 hover:bg-[#004B99] hover:text-white'
                  }`}
                >
                  <span className={isActive ? 'text-[#00BFEF]' : 'text-slate-300'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="ml-1 bg-amber-500 text-slate-900 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {/* Cyan Underline Bar for Active State */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3.5px] bg-[#00BFEF] rounded-t-sm" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right quick tools: Upload doc, Announcements, Events, Audit Log */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Upload Document Button (For authorized roles) */}
            {currentUser.role !== 'GUEST' && (
              <button
                onClick={() => setIsUploadOpen(true)}
                className="flex items-center gap-1.5 bg-[#20B26B] hover:bg-[#1ca060] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm cursor-pointer"
                title="Tải lên tài liệu mới"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Thêm Tài Liệu</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('announcements')}
              className={`relative p-2 rounded-lg text-xs transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'announcements'
                  ? 'bg-[#0052A3] text-[#00BFEF]'
                  : 'text-slate-200 hover:bg-[#004B99]'
              }`}
              title="Thông báo"
            >
              <Bell className="w-4 h-4" />
              <span className="hidden xl:inline font-semibold">Thông Báo</span>
              {unreadAnnouncementsCount > 0 && (
                <span className="bg-[#E91E63] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {unreadAnnouncementsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`p-2 rounded-lg text-xs transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'events'
                  ? 'bg-[#0052A3] text-[#00BFEF]'
                  : 'text-slate-200 hover:bg-[#004B99]'
              }`}
              title="Sự kiện công ty"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden xl:inline font-semibold">Sự Kiện</span>
            </button>

            {(currentUser.role === 'ADMIN' || currentUser.role === 'DOCUMENT_CONTROLLER') && (
              <>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`p-2 rounded-lg text-xs transition cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'users'
                      ? 'bg-[#0052A3] text-[#00BFEF]'
                      : 'text-slate-200 hover:bg-[#004B99]'
                  }`}
                  title="Quản trị người dùng & phân quyền"
                >
                  <Users className="w-4 h-4" />
                  <span className="hidden xl:inline font-semibold">Người Dùng</span>
                </button>

                <button
                  onClick={() => setActiveTab('audit')}
                  className={`p-2 rounded-lg text-xs transition cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'audit'
                      ? 'bg-[#0052A3] text-[#00BFEF]'
                      : 'text-slate-200 hover:bg-[#004B99]'
                  }`}
                  title="Nhật ký Audit Log"
                >
                  <History className="w-4 h-4" />
                  <span className="hidden xl:inline font-semibold">Audit Log</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#00BFEF] uppercase">
                {navItems.find((n) => n.id === activeTab)?.label || 'TRANG CHỦ'}
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:bg-[#004B99] rounded-lg transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#002D69] py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                  activeTab === item.id
                    ? 'bg-[#0052A3] text-[#00BFEF]'
                    : 'text-slate-200 hover:bg-[#004B99]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="bg-amber-500 text-slate-900 text-xs px-2 py-0.5 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}

            <div className="pt-2 border-t border-blue-900/60 flex flex-wrap gap-2 px-2">
              <button
                onClick={() => {
                  setActiveTab('announcements');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-900/50 text-xs text-white"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Thông báo ({unreadAnnouncementsCount})</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('events');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-900/50 text-xs text-white"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Sự kiện</span>
              </button>
              {currentUser.role !== 'GUEST' && (
                <button
                  onClick={() => {
                    setIsUploadOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-xs text-white font-bold"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>+ Tải lên tài liệu</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
