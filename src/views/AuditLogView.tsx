import React, { useState } from 'react';
import {
  History,
  Search,
  Filter,
  Eye,
  Download,
  Upload,
  Edit,
  Trash2,
  CheckCircle,
  Wifi,
  Laptop,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuditLogView: React.FC = () => {
  const { auditLogs } = useApp();
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('all');

  const filteredLogs = auditLogs.filter((log) => {
    if (actionFilter !== 'all' && log.action !== actionFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        log.userName.toLowerCase().includes(q) ||
        log.targetCode.toLowerCase().includes(q) ||
        log.targetTitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'VIEW':
        return (
          <span className="inline-flex items-center gap-1 text-[#0066CC] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-bold text-[10px]">
            <Eye className="w-3 h-3" /> XEM
          </span>
        );
      case 'DOWNLOAD':
        return (
          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold text-[10px]">
            <Download className="w-3 h-3" /> TẢI VỀ
          </span>
        );
      case 'UPLOAD':
        return (
          <span className="inline-flex items-center gap-1 text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded font-bold text-[10px]">
            <Upload className="w-3 h-3" /> TẢI LÊN
          </span>
        );
      case 'EDIT':
        return (
          <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-bold text-[10px]">
            <Edit className="w-3 h-3" /> SỬA
          </span>
        );
      case 'DELETE':
        return (
          <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded font-bold text-[10px]">
            <Trash2 className="w-3 h-3" /> XÓA
          </span>
        );
      case 'APPROVE':
        return (
          <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded font-bold text-[10px]">
            <CheckCircle className="w-3 h-3" /> PHÊ DUYỆT
          </span>
        );
      case 'WIFI_REQUEST':
        return (
          <span className="inline-flex items-center gap-1 text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded font-bold text-[10px]">
            <Wifi className="w-3 h-3" /> YÊU CẦU WIFI
          </span>
        );
      default:
        return (
          <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-bold text-[10px]">
            {action}
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-blue-100 shadow-xs mb-5">
        <div className="flex items-center gap-2 text-xs text-[#0066CC] font-bold uppercase tracking-wider">
          <span>NHẬT KÝ KIỂM TOÁN</span>
          <span>/</span>
          <span className="text-slate-500">AUDIT TRAIL &amp; COMPLIANCE LOG</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-[#003B82] uppercase mt-1">
          NHẬT KÝ HỆ THỐNG (AUDIT LOG)
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Theo dõi toàn bộ các tác vụ truy cập, xem, tải và sửa đổi tài liệu theo tiêu chuẩn ISO 27001 phục vụ hậu kiểm.
        </p>
      </div>

      {/* Filter / Search */}
      <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-xs mb-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên nhân sự, mã tài liệu..."
            className="w-full pl-9 pr-3 py-2 bg-[#F4F9FD] border border-blue-100 rounded-xl focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-slate-400">Lọc theo hành vi:</span>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="bg-[#F4F9FD] border border-blue-100 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 focus:outline-none"
          >
            <option value="all">Tất cả hành vi</option>
            <option value="VIEW">XEM (View)</option>
            <option value="DOWNLOAD">TẢI VỀ (Download)</option>
            <option value="UPLOAD">TẢI LÊN (Upload)</option>
            <option value="EDIT">CHỈNH SỬA (Edit)</option>
            <option value="APPROVE">PHÊ DUYỆT (Approve)</option>
            <option value="WIFI_REQUEST">YÊU CẦU WIFI</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-blue-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead>
              <tr className="bg-[#003B82] text-white font-bold uppercase text-[11px]">
                <th className="p-3">Thời gian ghi nhận</th>
                <th className="p-3">Nhân sự thực hiện</th>
                <th className="p-3">Vai trò</th>
                <th className="p-3 text-center">Hành động</th>
                <th className="p-3">Mã đối tượng</th>
                <th className="p-3">Chi tiết đối tượng</th>
                <th className="p-3">Địa chỉ IP</th>
                <th className="p-3">Thiết bị</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="p-3 font-bold text-slate-900">{log.userName}</td>
                  <td className="p-3 font-mono text-[10px] text-slate-500">{log.userRole}</td>
                  <td className="p-3 text-center">{getActionBadge(log.action)}</td>
                  <td className="p-3 font-mono font-bold text-[#0066CC]">{log.targetCode}</td>
                  <td className="p-3 max-w-[280px] truncate" title={log.targetTitle}>
                    {log.targetTitle}
                  </td>
                  <td className="p-3 font-mono text-[11px] text-slate-500">{log.ipAddress}</td>
                  <td className="p-3 text-[11px] text-slate-400 truncate max-w-[150px]">
                    {log.device}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
