import React, { useState } from 'react';
import {
  Calendar,
  Bell,
  ChevronRight,
  ArrowRight,
  FileText,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AnnouncementItem, CompanyEvent } from '../types';

export const SidebarEventsAndNews: React.FC = () => {
  const { announcements, events, setActiveTab, markAnnouncementRead, showToast } = useApp();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementItem | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CompanyEvent | null>(null);

  const handleAnnouncementClick = (ann: AnnouncementItem) => {
    markAnnouncementRead(ann.id);
    setSelectedAnnouncement(ann);
  };

  const handleDownloadAttachment = (ann: AnnouncementItem) => {
    showToast({
      type: 'success',
      title: 'Đang tải tệp đính kèm',
      message: `Đang tải: ${ann.attachmentName || 'ThongBao.pdf'} (${ann.attachmentSize || '1.2 MB'})`,
    });
  };

  return (
    <aside className="w-full flex flex-col gap-4">
      {/* ============================================================== */}
      {/* 1. SỰ KIỆN - CÔNG TY (Event Banner) */}
      {/* ============================================================== */}
      <div className="bg-white rounded-xl shadow-xs border border-[#008FE5]/25 overflow-hidden">
        {/* Header bar */}
        <div className="bg-gradient-to-r from-[#0052A3] via-[#0066CC] to-[#008FE5] px-4 py-2.5 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#00BFEF]" />
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">
              SỰ KIỆN – CÔNG TY
            </h2>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-white bg-[#003B82]/50 px-2 py-0.5 rounded-md">
            <span>📅</span>
            <span>28/09/2026</span>
          </div>
        </div>

        {/* 20 Year Anniversary Banner (Faithfully matches the reference image) */}
        <div
          onClick={() => setSelectedEvent(events[0])}
          className="group relative cursor-pointer overflow-hidden p-4 min-h-[220px] sm:min-h-[240px] flex flex-col justify-between bg-gradient-to-br from-[#004A99] via-[#007AC9] to-[#00B4D8] text-white select-none transition-all duration-300"
        >
          {/* Background Industrial Skyline & Sun Rays */}
          <div className="absolute inset-0 opacity-25 pointer-events-none">
            <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
              {/* Sunburst radial rays */}
              <circle cx="200" cy="120" r="140" fill="url(#sunburst)" opacity="0.6" />
              <defs>
                <radialGradient id="sunburst" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFE082" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0066CC" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* Factory towers on right */}
              <rect x="310" y="40" width="14" height="150" fill="white" opacity="0.7" />
              <line x1="317" y1="40" x2="317" y2="15" stroke="white" strokeWidth="2" />
              <rect x="340" y="20" width="18" height="170" fill="white" opacity="0.8" />
              <line x1="349" y1="20" x2="349" y2="5" stroke="white" strokeWidth="2" />
              <circle cx="349" cy="5" r="3" fill="#E91E63" />
              <rect x="270" y="90" width="30" height="100" fill="white" opacity="0.5" />
            </svg>
          </div>

          {/* Top Banner Row: Logo LOL37 + Text */}
          <div className="relative z-10 flex items-start justify-between">
            {/* Left Lotus Logo */}
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 100 80" className="w-12 h-10 drop-shadow">
                <path
                  d="M50 70 C30 65 5 45 10 25 C15 5 40 20 50 45 C60 20 85 5 90 25 C95 45 70 65 50 70 Z"
                  fill="#E91E63"
                  opacity="0.9"
                />
                <path
                  d="M50 68 C42 45 40 20 50 5 C60 20 58 45 50 68 Z"
                  fill="#FF80AB"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
              </svg>
              <span className="text-[11px] font-black tracking-wide text-white leading-none mt-0.5">
                LOL37
              </span>
              <span className="text-[8px] font-bold text-[#00E5FF] tracking-widest leading-none">
                NGHỆ AN
              </span>
            </div>

            {/* Right Celebration Title */}
            <div className="text-right">
              <span className="block text-xs sm:text-[13px] font-black uppercase text-white drop-shadow-sm tracking-wide">
                KỶ NIỆM
              </span>
              <span className="block text-xs sm:text-[13px] font-black uppercase text-white drop-shadow-sm tracking-wide">
                THÀNH LẬP CÔNG TY
              </span>
              <span className="inline-block bg-[#F4B400] text-[#002D69] text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-full mt-0.5 shadow-sm">
                (2006 - 2026)
              </span>
            </div>
          </div>

          {/* Center Graphic: Giant Gold 3D "20 NĂM" */}
          <div className="relative z-10 my-2 flex items-center justify-center">
            <div className="relative text-center group-hover:scale-105 transition-transform duration-300">
              {/* 3D Gold Number 20 */}
              <div className="text-5xl sm:text-6xl font-black italic tracking-tighter bg-gradient-to-b from-[#FFF9C4] via-[#FDD835] to-[#F57F17] bg-clip-text text-transparent drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] leading-none select-none">
                20
              </div>
              <div className="text-[13px] sm:text-[14px] font-black tracking-widest text-[#00E5FF] uppercase -mt-1 drop-shadow">
                NĂM
              </div>
            </div>
          </div>

          {/* Bottom Slogan Ribbon */}
          <div className="relative z-10 flex items-center justify-between pt-1 border-t border-white/20">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FFE082]" />
              <p className="text-[11px] sm:text-[12px] font-semibold italic text-[#EAF7FF] drop-shadow">
                "Vững bước hôm nay – Kiến tạo tương lai"
              </p>
            </div>
            <span className="text-[10px] bg-white/20 hover:bg-white/30 text-white font-bold px-2 py-0.5 rounded-full transition">
              Chi tiết →
            </span>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. THÔNG BÁO (Announcements List) */}
      {/* ============================================================== */}
      <div className="bg-white rounded-xl shadow-xs border border-[#008FE5]/25 overflow-hidden">
        {/* Header bar */}
        <div className="bg-gradient-to-r from-[#0052A3] via-[#0066CC] to-[#008FE5] px-4 py-2.5 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#00BFEF]" />
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">
              THÔNG BÁO
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('announcements')}
            className="text-[11px] font-bold text-white hover:text-[#00E5FF] flex items-center gap-1 transition cursor-pointer"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* List of Announcements */}
        <div className="divide-y divide-slate-100">
          {announcements.slice(0, 4).map((ann) => (
            <div
              key={ann.id}
              onClick={() => handleAnnouncementClick(ann)}
              className="p-3 sm:p-3.5 hover:bg-[#F4F9FD] transition-colors cursor-pointer flex items-center gap-2.5 sm:gap-3 group"
            >
              {/* Bell Icon Circle */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#EAF7FF] text-[#0066CC] group-hover:bg-[#0066CC] group-hover:text-white flex items-center justify-center transition-colors">
                <Bell className="w-4 h-4" />
              </div>

              {/* Title & Code */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-bold text-[#003B82] group-hover:text-[#0066CC]">
                    {ann.code}
                  </span>
                  {ann.isNew && (
                    <span className="bg-[#E91E63] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                      MỚI
                    </span>
                  )}
                  {ann.isImportant && (
                    <span className="bg-amber-100 text-amber-800 text-[9px] font-semibold px-1.5 py-0.2 rounded">
                      Quan trọng
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-700 font-medium line-clamp-2 mt-0.5 leading-snug group-hover:text-[#003B82]">
                  {ann.title}
                </p>
                {ann.hasAttachment && (
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <FileText className="w-3 h-3 text-red-500" />
                    <span>{ann.attachmentName || 'Tệp đính kèm.pdf'}</span>
                  </span>
                )}
              </div>

              {/* Chevron > */}
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0066CC] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* Announcement Modal Popup */}
      {/* ============================================================== */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-[#0066CC] uppercase bg-blue-50 px-2.5 py-1 rounded-md">
                  {selectedAnnouncement.code}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#003B82] mt-2">
                  {selectedAnnouncement.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedAnnouncement.date}
                  </span>
                  <span>•</span>
                  <span>{selectedAnnouncement.author}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 text-sm text-slate-700 whitespace-pre-line leading-relaxed max-h-[50vh] overflow-y-auto">
              {selectedAnnouncement.content}
            </div>

            {selectedAnnouncement.hasAttachment && (
              <div className="bg-[#F4F9FD] p-3.5 rounded-xl border border-blue-100 flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-red-500" />
                  <div>
                    <div className="text-xs font-bold text-[#003B82]">
                      {selectedAnnouncement.attachmentName}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Định dạng PDF • {selectedAnnouncement.attachmentSize}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDownloadAttachment(selectedAnnouncement)}
                  className="bg-[#0066CC] hover:bg-[#0055B8] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition cursor-pointer"
                >
                  Tải tệp đính kèm
                </button>
              </div>
            )}

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* Event Details Modal Popup */}
      {/* ============================================================== */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-[#00BFEF] bg-[#003B82] text-white px-2.5 py-0.5 rounded-full">
                  {selectedEvent.badge}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#003B82] mt-2">
                  {selectedEvent.title}
                </h3>
                <p className="text-xs text-amber-600 font-semibold mt-0.5">
                  {selectedEvent.subtitle}
                </p>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-4 h-4 text-[#0066CC]" />
                <span className="font-semibold">Thời gian:</span>
                <span>
                  {selectedEvent.date} {selectedEvent.endDate ? `đến ${selectedEvent.endDate}` : ''}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <ExternalLink className="w-4 h-4 text-[#0066CC]" />
                <span className="font-semibold">Địa điểm:</span>
                <span>{selectedEvent.location}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-slate-700 leading-relaxed">
                {selectedEvent.description}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setSelectedEvent(null);
                  setActiveTab('events');
                }}
                className="text-xs font-bold text-[#0066CC] hover:underline"
              >
                Xem tất cả sự kiện →
              </button>
              <button
                onClick={() => setSelectedEvent(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
