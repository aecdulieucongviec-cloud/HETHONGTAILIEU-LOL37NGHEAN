import React, { useState } from 'react';
import {
  X,
  History,
  RotateCcw,
  CheckCircle,
  FileText,
  Calendar,
  User,
  GitCompare,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DocumentVersion } from '../types';

export const VersionHistoryModal: React.FC = () => {
  const {
    selectedDocument,
    isVersionHistoryOpen,
    setIsVersionHistoryOpen,
    updateDocument,
    currentUser,
    showToast,
  } = useApp();

  const [compareVersions, setCompareVersions] = useState<{
    v1: DocumentVersion | null;
    v2: DocumentVersion | null;
  }>({ v1: null, v2: null });

  if (!isVersionHistoryOpen || !selectedDocument) return null;

  const history = selectedDocument.versionHistory || [];
  const canRollback = currentUser.role === 'ADMIN' || currentUser.role === 'DOCUMENT_CONTROLLER';

  const handleRollback = (ver: DocumentVersion) => {
    if (
      window.confirm(
        `Bạn có chắc chắn muốn khôi phục tài liệu ${selectedDocument.code} về phiên bản ${ver.version} không?`
      )
    ) {
      updateDocument(selectedDocument.id, {
        version: ver.version,
        effectiveDate: ver.effectiveDate,
      });
      showToast({
        type: 'success',
        title: 'Khôi phục phiên bản thành công',
        message: `Tài liệu đã được đưa về phiên bản ${ver.version}.`,
      });
      setIsVersionHistoryOpen(false);
    }
  };

  const handleSelectCompare = (ver: DocumentVersion) => {
    if (!compareVersions.v1) {
      setCompareVersions({ v1: ver, v2: null });
    } else if (!compareVersions.v2 && compareVersions.v1.version !== ver.version) {
      setCompareVersions((prev) => ({ ...prev, v2: ver }));
    } else {
      setCompareVersions({ v1: ver, v2: null });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#EAF7FF] text-[#0066CC] flex items-center justify-center shrink-0">
              <History className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#003B82] bg-blue-50 px-2 py-0.5 rounded">
                  {selectedDocument.code}
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  Lịch sử phiên bản ({history.length} bản ghi)
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-800 line-clamp-1 mt-0.5">
                {selectedDocument.title}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIsVersionHistoryOpen(false)}
            className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Compare notice bar if two versions are selected */}
        {compareVersions.v1 && compareVersions.v2 && (
          <div className="bg-[#EAF7FF] p-3 rounded-xl border border-blue-200 my-3 text-xs">
            <div className="flex items-center justify-between font-bold text-[#003B82]">
              <span className="flex items-center gap-1.5">
                <GitCompare className="w-4 h-4 text-[#0066CC]" />
                So sánh phiên bản {compareVersions.v1.version} và {compareVersions.v2.version}
              </span>
              <button
                onClick={() => setCompareVersions({ v1: null, v2: null })}
                className="text-[11px] text-[#0066CC] hover:underline cursor-pointer"
              >
                Hủy so sánh
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-2 text-slate-700">
              <div className="bg-white p-2.5 rounded border border-blue-100">
                <div className="font-bold text-[#0066CC]">{compareVersions.v1.version}</div>
                <div className="text-[11px] text-slate-500">{compareVersions.v1.effectiveDate}</div>
                <p className="mt-1 text-[11px]">{compareVersions.v1.summaryOfChanges}</p>
              </div>
              <div className="bg-white p-2.5 rounded border border-blue-100">
                <div className="font-bold text-[#0066CC]">{compareVersions.v2.version}</div>
                <div className="text-[11px] text-slate-500">{compareVersions.v2.effectiveDate}</div>
                <p className="mt-1 text-[11px]">{compareVersions.v2.summaryOfChanges}</p>
              </div>
            </div>
          </div>
        )}

        {/* Timeline list */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4">
          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-100">
            {history.map((ver, idx) => {
              const isCurrent = ver.version === selectedDocument.version;
              const isComparing =
                compareVersions.v1?.version === ver.version ||
                compareVersions.v2?.version === ver.version;

              return (
                <div key={idx} className="relative group">
                  {/* Timeline dot */}
                  <div
                    className={`absolute -left-6 top-1.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      isCurrent
                        ? 'bg-[#0066CC] border-white ring-2 ring-[#0066CC]'
                        : 'bg-white border-slate-300'
                    }`}
                  >
                    {isCurrent && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>

                  {/* Version card */}
                  <div
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-[#F4F9FD] border-[#008FE5]/40 shadow-xs'
                        : isComparing
                        ? 'bg-blue-50/50 border-blue-300'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-black text-[#003B82]">
                          {ver.version}
                        </span>
                        {isCurrent && (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Bản hiện hành
                          </span>
                        )}
                        <span className="text-xs text-slate-400">
                          {ver.fileName} ({ver.fileSize})
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleSelectCompare(ver)}
                          className={`text-[11px] font-semibold px-2 py-1 rounded transition cursor-pointer ${
                            isComparing
                              ? 'bg-[#0066CC] text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {isComparing ? 'Đang chọn' : 'So sánh'}
                        </button>

                        {!isCurrent && canRollback && (
                          <button
                            onClick={() => handleRollback(ver)}
                            className="flex items-center gap-1 text-[11px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-2 py-1 rounded transition cursor-pointer"
                            title="Khôi phục về phiên bản này"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Khôi phục</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Ngày hiệu lực: <strong>{ver.effectiveDate}</strong></span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>Người cập nhật: <strong>{ver.updatedBy}</strong></span>
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-slate-700 bg-white/70 p-2.5 rounded border border-slate-100 leading-relaxed">
                      <strong>Nội dung thay đổi:</strong> {ver.summaryOfChanges}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-xs text-slate-500">
          <span>Chọn hai phiên bản để so sánh nội dung tóm tắt.</span>
          <button
            onClick={() => setIsVersionHistoryOpen(false)}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-lg cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
