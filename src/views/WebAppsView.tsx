import React, { useState } from 'react';
import {
  Smartphone,
  ExternalLink,
  LayoutDashboard,
  FolderKanban,
  ClipboardCheck,
  Users2,
  PackageCheck,
  Factory,
  Wrench,
  TrendingUp,
  HardHat,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InternalWebApp } from '../types';

export const WebAppsView: React.FC = () => {
  const { webApps, showToast } = useApp();
  const [selectedApp, setSelectedApp] = useState<InternalWebApp | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'LayoutDashboard':
        return <LayoutDashboard className="w-8 h-8 text-[#0066CC]" />;
      case 'FolderKanban':
        return <FolderKanban className="w-8 h-8 text-[#008FE5]" />;
      case 'ClipboardCheck':
        return <ClipboardCheck className="w-8 h-8 text-emerald-600" />;
      case 'Users2':
        return <Users2 className="w-8 h-8 text-indigo-600" />;
      case 'PackageCheck':
        return <PackageCheck className="w-8 h-8 text-amber-600" />;
      case 'Factory':
        return <Factory className="w-8 h-8 text-[#003B82]" />;
      case 'Wrench':
        return <Wrench className="w-8 h-8 text-sky-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-8 h-8 text-rose-600" />;
      case 'HardHat':
        return <HardHat className="w-8 h-8 text-emerald-700" />;
      default:
        return <Smartphone className="w-8 h-8 text-[#0066CC]" />;
    }
  };

  const handleLaunchApp = (app: InternalWebApp) => {
    showToast({
      type: 'info',
      title: `Chuyển tiếp đến ${app.shortName}`,
      message: `Đang kết nối cổng xác thực SSO cho hệ thống ${app.name}...`,
    });
    setSelectedApp(app);
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-blue-100 shadow-xs mb-5">
        <div className="flex items-center gap-2 text-xs text-[#0066CC] font-bold uppercase tracking-wider">
          <span>HỆ SINH THÁI SỐ</span>
          <span>/</span>
          <span className="text-slate-500">DIGITAL WORKPLACE PORTAL</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-[#003B82] uppercase mt-1">
          ỨNG DỤNG WEB NỘI BỘ
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Cổng kết nối tập trung các hệ sinh thái phần mềm nghiệp vụ, quản trị sản xuất và điều hành tác nghiệp tại LOL37 Nghệ An.
        </p>
      </div>

      {/* Grid of Web App Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {webApps.map((app) => (
          <div
            key={app.id}
            className="bg-white rounded-2xl border border-blue-100 hover:border-[#008FE5] p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200 group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-14 h-14 rounded-2xl bg-[#F4F9FD] border border-blue-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getIcon(app.iconName)}
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Hoạt động
                  </span>
                  {app.badge && (
                    <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                      {app.badge}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-xs font-bold text-[#008FE5] uppercase tracking-wide">
                {app.category}
              </div>
              <h3 className="text-base font-bold text-[#003B82] mt-0.5 group-hover:text-[#0066CC] leading-snug">
                {app.name}
              </h3>

              <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                {app.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-slate-400">
                Phiên bản: {app.version}
              </span>

              <button
                onClick={() => handleLaunchApp(app)}
                className="bg-gradient-to-r from-[#008FE5] to-[#0066CC] hover:from-[#007AC9] hover:to-[#0055B8] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs flex items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <span>TRUY CẬP</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* App Access Simulation Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 mx-auto flex items-center justify-center mb-3">
              {getIcon(selectedApp.iconName)}
            </div>
            <h3 className="text-lg font-bold text-[#003B82]">{selectedApp.name}</h3>
            <p className="text-xs text-slate-500 mt-1">
              Hệ thống {selectedApp.shortName} đang sẵn sàng kết nối.
            </p>

            <div className="my-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 text-left space-y-1">
              <div><strong>Trạng thái máy chủ:</strong> 🟢 Trực tuyến 99.98%</div>
              <div><strong>Giao thức bảo mật:</strong> SSL/TLS 256-bit + Single Sign-On (SSO)</div>
              <div><strong>Phân quyền truy cập:</strong> Đã đồng bộ theo chức vụ của bạn</div>
            </div>

            <div className="flex justify-center gap-2">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Quay lại
              </button>
              <button
                onClick={() => {
                  setSelectedApp(null);
                  showToast({
                    type: 'success',
                    title: 'Đăng nhập thành công',
                    message: `Bạn đang phiên làm việc an toàn trên ${selectedApp.shortName}.`,
                  });
                }}
                className="px-5 py-2 rounded-lg bg-[#0066CC] hover:bg-[#0055B8] text-white text-xs font-bold shadow-sm cursor-pointer"
              >
                Mở trong Tab mới
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
