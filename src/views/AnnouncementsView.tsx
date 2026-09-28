import React, { useState } from 'react';
import {
  Bell,
  Search,
  PlusCircle,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Download,
  Filter,
  Eye,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AnnouncementItem } from '../types';

export const AnnouncementsView: React.FC = () => {
  const { announcements, markAnnouncementRead, addAnnouncement, currentUser, showToast } =
    useApp();

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'new' | 'important' | 'attachment'>('all');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementItem | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Create form state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [hasAttachment, setHasAttachment] = useState(true);

  const filteredList = announcements.filter((a) => {
    if (filterType === 'new' && !a.isNew) return false;
    if (filterType === 'important' && !a.isImportant) return false;
    if (filterType === 'attachment' && !a.hasAttachment) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.code.toLowerCase().includes(q) ||
        a.department.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addAnnouncement({
      title: newTitle.trim(),
      content: newContent.trim(),
      isImportant,
      hasAttachment,
      attachmentName: hasAttachment ? `${newTitle.slice(0, 20)}.pdf` : undefined,
    });

    setNewTitle('');
    setNewContent('');
    setIsCreateOpen(false);
  };

  const handleDownload = (ann: AnnouncementItem) => {
    showToast({
      type: 'success',
      title: 'Tải văn bản đính kèm',
      message: `Đang tải: ${ann.attachmentName || 'ThongBao.pdf'} (${ann.attachmentSize || '1.2 MB'})`,
    });
  };

  const isAuthorOrAdmin =
    currentUser.role === 'ADMIN' || currentUser.role === 'DOCUMENT_CONTROLLER';

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-blue-100 shadow-xs mb-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#0066CC] font-bold uppercase tracking-wider">
            <span>TRUYỀN THÔNG NỘI BỘ</span>
            <span>/</span>
            <span className="text-slate-500">CỔNG BẢNG TIN THÔNG BÁO</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#003B82] uppercase mt-1">
            THÔNG BÁO ĐIỀU HÀNH
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Lịch làm việc, kế hoạch đánh giá nội bộ, quyết định bổ nhiệm và chỉ thị công tác từ Ban Giám đốc LOL37.
          </p>
        </div>

        {isAuthorOrAdmin && (
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 bg-[#0066CC] hover:bg-[#0055B8] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition shadow-sm cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Tạo Thông Báo Mới</span>
          </button>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-xs mb-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo mã hoặc tiêu đề..."
            className="w-full pl-9 pr-4 py-2 bg-[#F4F9FD] border border-blue-100 rounded-xl focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              filterType === 'all'
                ? 'bg-[#0066CC] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tất cả ({announcements.length})
          </button>
          <button
            onClick={() => setFilterType('new')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              filterType === 'new'
                ? 'bg-[#0066CC] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Thông báo mới
          </button>
          <button
            onClick={() => setFilterType('important')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              filterType === 'important'
                ? 'bg-[#0066CC] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Quan trọng
          </button>
          <button
            onClick={() => setFilterType('attachment')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              filterType === 'attachment'
                ? 'bg-[#0066CC] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Có tệp đính kèm
          </button>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-3">
        {filteredList.map((ann) => (
          <div
            key={ann.id}
            onClick={() => {
              markAnnouncementRead(ann.id);
              setSelectedAnnouncement(ann);
            }}
            className="bg-white rounded-2xl border border-blue-100 hover:border-[#008FE5] p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs hover:shadow-md transition cursor-pointer group"
          >
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#EAF7FF] text-[#0066CC] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-[#003B82] bg-blue-50 px-2 py-0.5 rounded">
                    {ann.code}
                  </span>
                  {ann.isNew && (
                    <span className="bg-[#E91E63] text-white text-[10px] font-bold px-2 py-0.2 rounded-full">
                      MỚI
                    </span>
                  )}
                  {ann.isImportant && (
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.2 rounded">
                      QUAN TRỌNG
                    </span>
                  )}
                  <span className="text-xs text-slate-400">• {ann.date}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-[#003B82] mt-1 leading-snug">
                  {ann.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">{ann.content}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-center shrink-0">
              {ann.hasAttachment && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                  <FileText className="w-3.5 h-3.5 text-red-500" />
                  <span>{ann.attachmentName || 'Tệp đính kèm.pdf'}</span>
                </div>
              )}
              <button className="bg-slate-100 group-hover:bg-[#0066CC] group-hover:text-white text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>Xem</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: View Announcement Detail */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-[#0066CC] bg-blue-50 px-2 py-0.5 rounded">
                  {selectedAnnouncement.code}
                </span>
                <h3 className="text-base font-bold text-[#003B82] mt-1 leading-snug">
                  {selectedAnnouncement.title}
                </h3>
                <div className="text-xs text-slate-400 mt-1">
                  Đăng ngày: {selectedAnnouncement.date} • {selectedAnnouncement.author}
                </div>
              </div>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line max-h-72 overflow-y-auto">
              {selectedAnnouncement.content}
            </div>

            {selectedAnnouncement.hasAttachment && (
              <div className="bg-[#F4F9FD] p-3.5 rounded-xl border border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-red-500" />
                  <div>
                    <div className="text-xs font-bold text-[#003B82]">
                      {selectedAnnouncement.attachmentName}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Tệp PDF • {selectedAnnouncement.attachmentSize || '1.2 MB'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(selectedAnnouncement)}
                  className="bg-[#0066CC] hover:bg-[#0055B8] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải tệp</span>
                </button>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex justify-end mt-4">
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

      {/* Modal: Create Announcement */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#003B82]">Đăng Thông Báo Mới</h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="space-y-4 py-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tiêu đề thông báo *
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Nhập tiêu đề thông báo..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nội dung chi tiết *
                </label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Nhập nội dung thông báo gửi đến toàn thể nhân viên..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] resize-none"
                  required
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isImportant}
                    onChange={(e) => setIsImportant(e.target.checked)}
                    className="rounded"
                  />
                  <span className="font-semibold text-slate-700">Đánh dấu quan trọng</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasAttachment}
                    onChange={(e) => setHasAttachment(e.target.checked)}
                    className="rounded"
                  />
                  <span className="font-semibold text-slate-700">Đính kèm tệp PDF</span>
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-semibold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-[#0066CC] hover:bg-[#0055B8] text-white px-5 py-2 rounded-lg font-bold shadow-sm cursor-pointer"
                >
                  Đăng thông báo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
