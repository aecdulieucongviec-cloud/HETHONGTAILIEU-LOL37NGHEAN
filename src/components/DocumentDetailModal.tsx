import React from 'react';
import {
  X,
  Eye,
  Download,
  Printer,
  Share2,
  History,
  Edit,
  Trash2,
  Calendar,
  Building2,
  User,
  Shield,
  Tag,
  Clock,
  FileCheck,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DocumentStatus } from '../types';

export const DocumentDetailModal: React.FC = () => {
  const {
    selectedDocument,
    isDetailOpen,
    setIsDetailOpen,
    viewDocument,
    downloadDocument,
    deleteDocument,
    currentUser,
    setIsVersionHistoryOpen,
    showToast,
  } = useApp();

  if (!isDetailOpen || !selectedDocument) return null;

  const handleOpenViewer = () => {
    setIsDetailOpen(false);
    viewDocument(selectedDocument);
  };

  const handleDownload = () => {
    downloadDocument(selectedDocument);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast({
      type: 'success',
      title: 'Đã sao chép liên kết tài liệu',
      message: `Đường dẫn tài liệu ${selectedDocument.code} đã được lưu vào khay nhớ tạm.`,
    });
  };

  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa tài liệu ${selectedDocument.code} không?`)) {
      deleteDocument(selectedDocument.id);
      setIsDetailOpen(false);
    }
  };

  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case 'EFFECTIVE':
        return {
          label: 'Đang có hiệu lực',
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        };
      case 'EXPIRING_SOON':
        return {
          label: 'Sắp hết hạn',
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
        };
      case 'EXPIRED':
        return {
          label: 'Hết hiệu lực',
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
        };
      case 'PENDING_APPROVAL':
        return {
          label: 'Chờ phê duyệt',
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
        };
      case 'DRAFT':
        return {
          label: 'Bản nháp',
          bg: 'bg-slate-100 text-slate-700 border-slate-200',
        };
      case 'OBSOLETE':
        return {
          label: 'Bản cũ thay thế',
          bg: 'bg-slate-100 text-slate-600 border-slate-200',
        };
      default:
        return {
          label: status,
          bg: 'bg-slate-100 text-slate-700 border-slate-200',
        };
    }
  };

  const statusInfo = getStatusBadge(selectedDocument.status);
  const canDelete = currentUser.role === 'ADMIN' || currentUser.role === 'DOCUMENT_CONTROLLER';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#EAF7FF] text-[#0066CC] flex items-center justify-center shrink-0 border border-blue-100">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-black text-[#003B82] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                  {selectedDocument.code}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${statusInfo.bg}`}>
                  {statusInfo.label}
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  Phiên bản: <strong className="text-slate-800">{selectedDocument.version}</strong>
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[#003B82] mt-1.5 leading-snug">
                {selectedDocument.title}
              </h2>
            </div>
          </div>
          <button
            onClick={() => setIsDetailOpen(false)}
            className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs sm:text-sm">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-[#F4F9FD] p-3.5 sm:p-4 rounded-xl border border-blue-100">
            <div className="flex items-center gap-2 text-slate-700">
              <Building2 className="w-4 h-4 text-[#0066CC] shrink-0" />
              <span className="font-semibold text-slate-500">Phòng ban:</span>
              <span className="font-bold text-[#003B82] truncate">{selectedDocument.department}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-700">
              <User className="w-4 h-4 text-[#0066CC] shrink-0" />
              <span className="font-semibold text-slate-500">Người phụ trách:</span>
              <span className="font-bold text-slate-800">{selectedDocument.personInCharge}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-700">
              <Calendar className="w-4 h-4 text-[#0066CC] shrink-0" />
              <span className="font-semibold text-slate-500">Ngày ban hành:</span>
              <span>{selectedDocument.issueDate}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-700">
              <Clock className="w-4 h-4 text-[#0066CC] shrink-0" />
              <span className="font-semibold text-slate-500">Ngày hiệu lực:</span>
              <span className="text-emerald-700 font-bold">{selectedDocument.effectiveDate}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-700">
              <AlertCircle className="w-4 h-4 text-[#0066CC] shrink-0" />
              <span className="font-semibold text-slate-500">Ngày hết hạn:</span>
              <span className={selectedDocument.status === 'EXPIRING_SOON' ? 'text-amber-600 font-bold' : ''}>
                {selectedDocument.expiryDate || 'Không xác định'}
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-700">
              <Shield className="w-4 h-4 text-[#0066CC] shrink-0" />
              <span className="font-semibold text-slate-500">Bảo mật:</span>
              <span className="font-bold text-[#003B82]">{selectedDocument.securityLevel}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
              Mô tả nội dung tài liệu
            </h4>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-700 leading-relaxed">
              {selectedDocument.description || 'Chưa có mô tả chi tiết.'}
            </div>
          </div>

          {/* Keywords / Tags */}
          {selectedDocument.keywords && selectedDocument.keywords.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#0066CC]" />
                <span>Từ khóa tra cứu</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedDocument.keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="bg-blue-50 text-[#0055B8] text-xs font-medium px-2.5 py-0.5 rounded-md border border-blue-100"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Attached file summary */}
          <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center gap-2.5">
              <FileCheck className="w-5 h-5 text-emerald-600" />
              <div>
                <div className="text-xs font-bold text-slate-800">{selectedDocument.fileName}</div>
                <div className="text-[11px] text-slate-400">
                  {selectedDocument.fileSize} • {selectedDocument.viewsCount} lượt xem • {selectedDocument.downloadsCount} lượt tải
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions matching requirements: 👁 XEM TÀI LIỆU, ⬇ TẢI XUỐNG, 🖨 IN, 📤 CHIA SẺ */}
        <div className="border-t border-slate-100 pt-4 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsDetailOpen(false);
                setIsVersionHistoryOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition cursor-pointer"
            >
              <History className="w-3.5 h-3.5 text-[#0066CC]" />
              <span>Lịch sử ({selectedDocument.versionHistory?.length || 1})</span>
            </button>

            {canDelete && (
              <button
                onClick={handleDelete}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition cursor-pointer"
                title="Xóa tài liệu"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Xóa</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              title="Chia sẻ liên kết"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 bg-[#EAF7FF] hover:bg-blue-100 text-[#0066CC] text-xs font-bold px-3.5 py-2 rounded-lg transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải xuống</span>
            </button>

            <button
              onClick={handleOpenViewer}
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#008FE5] to-[#0066CC] hover:from-[#007AC9] hover:to-[#0055B8] text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-sm cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>XEM TÀI LIỆU</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
