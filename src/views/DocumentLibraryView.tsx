import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Eye,
  Download,
  FileText,
  SlidersHorizontal,
  ChevronDown,
  LayoutGrid,
  List,
  CheckCircle,
  AlertTriangle,
  Clock,
  Building,
  Calendar,
  User,
  PlusCircle,
  FileCheck,
  Shield,
  ArrowUpDown,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DocumentItem, CategoryId, DocumentStatus } from '../types';

export const DocumentLibraryView: React.FC = () => {
  const {
    documents,
    categories,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    searchQuery,
    setSearchQuery,
    viewDocument,
    downloadDocument,
    setSelectedDocument,
    setIsDetailOpen,
    setIsUploadOpen,
    currentUser,
  } = useApp();

  // Filters
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedSecurity, setSelectedSecurity] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [sortBy, setSortBy] = useState<'date' | 'code' | 'title' | 'views'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  // Extract distinct departments and years
  const departments = useMemo(() => {
    const set = new Set<string>();
    documents.forEach((d) => set.add(d.department));
    return Array.from(set);
  }, [documents]);

  const years = ['2026', '2025', '2024', '2023'];

  // Filtered and sorted documents
  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      // Category filter
      if (selectedCategoryFilter !== 'all' && doc.categoryId !== selectedCategoryFilter) {
        return false;
      }
      // Department filter
      if (selectedDept !== 'all' && doc.department !== selectedDept) {
        return false;
      }
      // Status filter
      if (selectedStatus !== 'all' && doc.status !== selectedStatus) {
        return false;
      }
      // Year filter
      if (selectedYear !== 'all') {
        const docYear = doc.effectiveDate.slice(0, 4);
        if (docYear !== selectedYear) return false;
      }
      // Security filter
      if (selectedSecurity !== 'all' && doc.securityLevel !== selectedSecurity) {
        return false;
      }
      // Search query (code, title, keywords, department, person)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchCode = doc.code.toLowerCase().includes(q);
        const matchTitle = doc.title.toLowerCase().includes(q);
        const matchDept = doc.department.toLowerCase().includes(q);
        const matchPerson = doc.personInCharge.toLowerCase().includes(q);
        const matchKeywords = doc.keywords.some((k) => k.toLowerCase().includes(q));
        const matchDesc = doc.description.toLowerCase().includes(q);
        if (!matchCode && !matchTitle && !matchDept && !matchPerson && !matchKeywords && !matchDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'date') {
        comparison = a.effectiveDate.localeCompare(b.effectiveDate);
      } else if (sortBy === 'code') {
        comparison = a.code.localeCompare(b.code);
      } else if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === 'views') {
        comparison = a.viewsCount - b.viewsCount;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });
  }, [
    documents,
    selectedCategoryFilter,
    selectedDept,
    selectedStatus,
    selectedYear,
    selectedSecurity,
    searchQuery,
    sortBy,
    sortOrder,
  ]);

  const totalPages = Math.ceil(filteredDocs.length / pageSize) || 1;
  const paginatedDocs = filteredDocs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleOpenDetail = (doc: DocumentItem) => {
    setSelectedDocument(doc);
    setIsDetailOpen(true);
  };

  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case 'EFFECTIVE':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Có hiệu lực
          </span>
        );
      case 'EXPIRING_SOON':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[11px] font-bold px-2 py-0.5 rounded border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
            Sắp hết hạn
          </span>
        );
      case 'EXPIRED':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 text-[11px] font-bold px-2 py-0.5 rounded border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Hết hiệu lực
          </span>
        );
      case 'PENDING_APPROVAL':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[11px] font-bold px-2 py-0.5 rounded border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Chờ duyệt
          </span>
        );
      case 'OBSOLETE':
        return (
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-[11px] font-medium px-2 py-0.5 rounded border border-slate-200">
            Bản cũ
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-[11px] px-2 py-0.5 rounded">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
      {/* Top Banner / Breadcrumb & Actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-blue-100 shadow-xs mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#0066CC] font-bold uppercase tracking-wider">
            <span>CỔNG QUẢN LÝ TÀI LIỆU</span>
            <span>/</span>
            <span className="text-slate-500">THƯ VIỆN TÀI LIỆU TOÀN CÔNG TY</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#003B82] uppercase mt-1">
            THƯ VIỆN TÀI LIỆU
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Tìm kiếm, tra cứu và tải tài liệu kỹ thuật, quy trình vận hành và biểu mẫu ISO đã được kiểm soát.
          </p>
        </div>

        {/* Right action button */}
        {currentUser.role !== 'GUEST' && (
          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-2 bg-[#20B26B] hover:bg-[#1ca060] active:scale-95 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition shadow-sm cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Ban Hành Tài Liệu Mới</span>
          </button>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-blue-100 shadow-xs mb-5 space-y-4">
        {/* Search Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Tìm theo mã tài liệu, tên quy trình, phòng ban, từ khóa hoặc người phụ trách..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#F4F9FD] border border-blue-100 focus:border-[#0066CC] rounded-xl text-xs sm:text-sm focus:outline-none text-[#12345B]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* View Mode Toggle + Sort Order */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            {/* Sort Dropdown */}
            <div className="flex items-center bg-[#F4F9FD] border border-blue-100 rounded-xl px-2.5 py-1.5 text-xs text-slate-700">
              <ArrowUpDown className="w-3.5 h-3.5 mr-1.5 text-[#0066CC]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent focus:outline-none font-semibold cursor-pointer"
              >
                <option value="date">Ngày hiệu lực</option>
                <option value="code">Mã tài liệu</option>
                <option value="title">Tên tài liệu</option>
                <option value="views">Lượt xem nhiều</option>
              </select>
              <button
                onClick={() => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
                className="ml-1 text-[#0066CC] font-bold p-1 hover:bg-blue-100 rounded cursor-pointer"
                title={sortOrder === 'asc' ? 'Tăng dần' : 'Giảm dần'}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>

            {/* Toggle Table vs Cards */}
            <div className="flex items-center bg-[#F4F9FD] p-1 rounded-xl border border-blue-100">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-[#0066CC] text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Dạng bảng chi tiết"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-[#0066CC] text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Dạng lưới thẻ"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-2 border-t border-slate-100 text-xs">
          {/* Category Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">
              Nhóm tài liệu
            </label>
            <select
              value={selectedCategoryFilter}
              onChange={(e) => {
                setSelectedCategoryFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="w-full bg-[#F4F9FD] border border-blue-100 rounded-lg p-2 font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0066CC]"
            >
              <option value="all">Tất cả nhóm (12 nhóm)</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">
              Phòng ban
            </label>
            <select
              value={selectedDept}
              onChange={(e) => {
                setSelectedDept(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#F4F9FD] border border-blue-100 rounded-lg p-2 font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0066CC]"
            >
              <option value="all">Tất cả phòng ban</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">
              Trạng thái
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#F4F9FD] border border-blue-100 rounded-lg p-2 font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0066CC]"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="EFFECTIVE">Đang có hiệu lực</option>
              <option value="EXPIRING_SOON">Sắp hết hạn (&lt; 30 ngày)</option>
              <option value="EXPIRED">Hết hiệu lực</option>
              <option value="PENDING_APPROVAL">Chờ phê duyệt</option>
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">
              Năm ban hành
            </label>
            <select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#F4F9FD] border border-blue-100 rounded-lg p-2 font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0066CC]"
            >
              <option value="all">Tất cả các năm</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  Năm {y}
                </option>
              ))}
            </select>
          </div>

          {/* Security Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">
              Mức độ bảo mật
            </label>
            <select
              value={selectedSecurity}
              onChange={(e) => {
                setSelectedSecurity(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#F4F9FD] border border-blue-100 rounded-lg p-2 font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0066CC]"
            >
              <option value="all">Tất cả mức độ</option>
              <option value="PUBLIC">CÔNG KHAI</option>
              <option value="INTERNAL">NỘI BỘ</option>
              <option value="CONFIDENTIAL">BẢO MẬT</option>
            </select>
          </div>
        </div>

        {/* Results Count Banner */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <div>
            Tìm thấy <strong className="text-[#0066CC] font-bold">{filteredDocs.length}</strong> tài liệu phù hợp.
          </div>
          {(selectedCategoryFilter !== 'all' ||
            selectedDept !== 'all' ||
            selectedStatus !== 'all' ||
            selectedYear !== 'all' ||
            selectedSecurity !== 'all' ||
            searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategoryFilter('all');
                setSelectedDept('all');
                setSelectedStatus('all');
                setSelectedYear('all');
                setSelectedSecurity('all');
                setSearchQuery('');
              }}
              className="text-[#0066CC] hover:underline font-bold cursor-pointer"
            >
              Đặt lại tất cả bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area: Table or Card Grid */}
      {paginatedDocs.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-blue-100">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">Không tìm thấy tài liệu phù hợp</h3>
          <p className="text-xs text-slate-400 mt-1">
            Vui lòng thử từ khóa khác hoặc điều chỉnh các tiêu chí bộ lọc phía trên.
          </p>
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW matching section 10:
           STT | Mã tài liệu | Tên tài liệu | Loại | Phiên bản | Phòng ban | Ngày ban hành | Ngày hiệu lực | Trạng thái | Người phụ trách | Thao tác (👁 Xem, ⬇ Tải xuống, 📌 Chi tiết)
        */
        <div className="bg-white rounded-2xl border border-blue-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 border-collapse">
              <thead>
                <tr className="bg-[#003B82] text-white font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-3 text-center w-12">STT</th>
                  <th className="py-3 px-3">Mã tài liệu</th>
                  <th className="py-3 px-4 min-w-[260px]">Tên tài liệu</th>
                  <th className="py-3 px-3">Nhóm</th>
                  <th className="py-3 px-2 text-center">Version</th>
                  <th className="py-3 px-3">Phòng ban</th>
                  <th className="py-3 px-3">Ngày ban hành</th>
                  <th className="py-3 px-3">Ngày hiệu lực</th>
                  <th className="py-3 px-3 text-center">Trạng thái</th>
                  <th className="py-3 px-3">Phụ trách</th>
                  <th className="py-3 px-4 text-center min-w-[160px]">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedDocs.map((doc, idx) => {
                  const globalIdx = (currentPage - 1) * pageSize + idx + 1;
                  return (
                    <tr
                      key={doc.id}
                      className="hover:bg-[#F4F9FD] transition-colors group cursor-pointer"
                    >
                      <td
                        onClick={() => handleOpenDetail(doc)}
                        className="py-3.5 px-3 text-center font-bold text-slate-400"
                      >
                        {globalIdx}
                      </td>
                      <td
                        onClick={() => handleOpenDetail(doc)}
                        className="py-3.5 px-3 font-mono font-bold text-[#003B82] group-hover:text-[#0066CC] whitespace-nowrap"
                      >
                        {doc.code}
                      </td>
                      <td onClick={() => handleOpenDetail(doc)} className="py-3.5 px-4 font-semibold text-slate-800">
                        <div className="line-clamp-2 leading-snug group-hover:text-[#003B82]">
                          {doc.title}
                        </div>
                        {doc.keywords && doc.keywords.length > 0 && (
                          <div className="flex gap-1 mt-1">
                            {doc.keywords.slice(0, 2).map((k, i) => (
                              <span
                                key={i}
                                className="text-[10px] text-slate-400 bg-slate-50 px-1.5 py-0.2 rounded"
                              >
                                #{k}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>
                      <td
                        onClick={() => handleOpenDetail(doc)}
                        className="py-3.5 px-3 text-slate-600 font-medium whitespace-nowrap"
                      >
                        {doc.categoryName}
                      </td>
                      <td
                        onClick={() => handleOpenDetail(doc)}
                        className="py-3.5 px-2 text-center font-mono font-bold text-[#0066CC]"
                      >
                        {doc.version}
                      </td>
                      <td
                        onClick={() => handleOpenDetail(doc)}
                        className="py-3.5 px-3 text-slate-600 truncate max-w-[140px]"
                      >
                        {doc.department}
                      </td>
                      <td
                        onClick={() => handleOpenDetail(doc)}
                        className="py-3.5 px-3 text-slate-500 whitespace-nowrap"
                      >
                        {doc.issueDate}
                      </td>
                      <td
                        onClick={() => handleOpenDetail(doc)}
                        className="py-3.5 px-3 text-slate-800 font-medium whitespace-nowrap"
                      >
                        {doc.effectiveDate}
                      </td>
                      <td
                        onClick={() => handleOpenDetail(doc)}
                        className="py-3.5 px-3 text-center whitespace-nowrap"
                      >
                        {getStatusBadge(doc.status)}
                      </td>
                      <td
                        onClick={() => handleOpenDetail(doc)}
                        className="py-3.5 px-3 text-slate-600 whitespace-nowrap"
                      >
                        {doc.personInCharge}
                      </td>
                      {/* Action buttons: 👁 Xem, ⬇ Tải xuống, 📌 Chi tiết */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              viewDocument(doc);
                            }}
                            className="bg-[#0066CC] hover:bg-[#0055B8] text-white p-1.5 rounded-lg transition shadow-2xs cursor-pointer"
                            title="👁 Xem trực tuyến"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              downloadDocument(doc);
                            }}
                            className="bg-slate-100 hover:bg-[#EAF7FF] hover:text-[#0066CC] text-slate-600 p-1.5 rounded-lg transition cursor-pointer"
                            title="⬇ Tải xuống tệp tin"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDetail(doc);
                            }}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer"
                            title="📌 Xem chi tiết tài liệu"
                          >
                            Chi tiết
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* CARD GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedDocs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => handleOpenDetail(doc)}
              className="bg-white rounded-2xl border border-blue-100 hover:border-[#008FE5] p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200 group cursor-pointer"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-black text-[#003B82] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {doc.code}
                  </span>
                  <div>{getStatusBadge(doc.status)}</div>
                </div>

                <h3 className="text-sm font-bold text-slate-800 group-hover:text-[#003B82] leading-snug line-clamp-2">
                  {doc.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                  {doc.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Phòng ban:</span>
                    <span className="font-semibold">{doc.department}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Phiên bản:</span>
                    <span className="font-mono font-bold text-[#0066CC]">{doc.version}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Ngày hiệu lực:</span>
                    <span>{doc.effectiveDate}</span>
                  </div>
                </div>
              </div>

              {/* Actions footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {doc.viewsCount} lượt xem • {doc.downloadsCount} lượt tải
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadDocument(doc);
                    }}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#EAF7FF] text-slate-600 hover:text-[#0066CC] transition cursor-pointer"
                    title="Tải xuống"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      viewDocument(doc);
                    }}
                    className="flex items-center gap-1 bg-[#0066CC] hover:bg-[#0055B8] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Xem</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-5 bg-white p-3.5 rounded-xl border border-blue-100 text-xs">
          <div className="text-slate-500">
            Hiển thị trang <strong>{currentPage}</strong> trên tổng số <strong>{totalPages}</strong> trang
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-30 hover:bg-slate-100 font-semibold cursor-pointer"
            >
              Trang trước
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-lg font-bold transition cursor-pointer ${
                  currentPage === i + 1
                    ? 'bg-[#0066CC] text-white'
                    : 'border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-30 hover:bg-slate-100 font-semibold cursor-pointer"
            >
              Trang sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
