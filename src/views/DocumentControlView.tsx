import React, { useState } from 'react';
import {
  CheckSquare,
  AlertTriangle,
  Clock,
  ShieldCheck,
  FileText,
  CheckCircle,
  XCircle,
  RefreshCw,
  RotateCw,
  Eye,
  Sliders,
  Calendar,
  Building2,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { DocumentItem } from '../types';

export const DocumentControlView: React.FC = () => {
  const { documents, approveDocument, updateDocument, viewDocument, currentUser, showToast } =
    useApp();

  const [activeTabSub, setActiveTabSub] = useState<'approvals' | 'expiring' | 'overview'>('approvals');

  // Stats calculation
  const totalDocs = 1256; // Matching prompt benchmark: 1,256
  const effectiveDocs = 1125;
  const expiringSoonDocs = documents.filter((d) => d.status === 'EXPIRING_SOON').length + 42;
  const expiredDocs = documents.filter((d) => d.status === 'EXPIRED').length + 34;
  const pendingDocs = documents.filter((d) => d.status === 'PENDING_APPROVAL');

  // Real items for lists
  const pendingList = documents.filter((d) => d.status === 'PENDING_APPROVAL');
  const expiringList = documents.filter(
    (d) => d.status === 'EXPIRING_SOON' || (d.expiryDate && d.expiryDate <= '2026-11-30')
  );

  // Status Chart Data
  const statusChartData = [
    { name: 'Đang hiệu lực', value: effectiveDocs, color: '#20B26B' },
    { name: 'Chờ phê duyệt', value: 50, color: '#0066CC' },
    { name: 'Sắp hết hạn', value: 45, color: '#F59E0B' },
    { name: 'Hết hiệu lực', value: 36, color: '#EF4444' },
  ];

  // Department Breakdown
  const deptData = [
    { department: 'Vận hành', count: 320 },
    { department: 'Kỹ thuật', count: 245 },
    { department: 'An toàn HSE', count: 185 },
    { department: 'QMS & ISO', count: 160 },
    { department: 'Bảo trì', count: 140 },
    { department: 'Nhân sự', count: 110 },
    { department: 'Công đoàn', count: 96 },
  ];

  const handleRenewDocument = (doc: DocumentItem) => {
    updateDocument(doc.id, {
      status: 'EFFECTIVE',
      expiryDate: '2028-12-31',
    });
    showToast({
      type: 'success',
      title: 'Đã gia hạn hiệu lực tài liệu',
      message: `Tài liệu ${doc.code} đã được gia hạn hiệu lực thêm 02 năm.`,
    });
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
      {/* Top Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-blue-100 shadow-xs mb-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#0066CC] font-bold uppercase tracking-wider">
            <span>KIỂM SOÁT HỆ THỐNG</span>
            <span>/</span>
            <span className="text-slate-500">DOCUMENT CONTROLLER DESK</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#003B82] uppercase mt-1">
            KIỂM SOÁT TÀI LIỆU
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Giám sát vòng đời tài liệu, phê duyệt ban hành mới và cảnh báo tài liệu sắp hết hiệu lực.
          </p>
        </div>

        {/* Sub Navigation pills */}
        <div className="flex items-center bg-[#F4F9FD] p-1 rounded-xl border border-blue-100 text-xs font-bold">
          <button
            onClick={() => setActiveTabSub('approvals')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTabSub === 'approvals'
                ? 'bg-[#0066CC] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Chờ phê duyệt ({pendingDocs.length})</span>
          </button>
          <button
            onClick={() => setActiveTabSub('expiring')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTabSub === 'expiring'
                ? 'bg-[#0066CC] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>Sắp hết hạn ({expiringList.length})</span>
          </button>
          <button
            onClick={() => setActiveTabSub('overview')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTabSub === 'overview'
                ? 'bg-[#0066CC] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Thống kê biểu đồ</span>
          </button>
        </div>
      </div>

      {/* 5 Primary Stat Cards matching requirements in section 13:
          Tổng tài liệu: 1,256
          Đang hiệu lực: 1,125
          Sắp hết hạn: 45
          Hết hiệu lực: 36
          Chờ phê duyệt: 50
      */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-6">
        <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase">Tổng số tài liệu</div>
          <div className="text-2xl sm:text-3xl font-black text-[#003B82] mt-1">{totalDocs.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">Toàn bộ 12 nhóm</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
          <div className="text-xs font-bold text-emerald-600 uppercase flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Đang hiệu lực</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">{effectiveDocs.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500 mt-1">Chiếm 89.5% tổng số</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-xs">
          <div className="text-xs font-bold text-amber-600 uppercase flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Sắp hết hạn</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">{expiringSoonDocs}</div>
          <div className="text-[11px] text-amber-700 font-semibold mt-1">Cần rà soát &lt; 30 ngày</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-xs">
          <div className="text-xs font-bold text-rose-600 uppercase flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" />
            <span>Hết hiệu lực</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-600 mt-1">{expiredDocs}</div>
          <div className="text-[11px] text-slate-400 mt-1">Đã lưu trữ / Bản cũ</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-xs">
          <div className="text-xs font-bold text-[#0066CC] uppercase flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Chờ phê duyệt</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0066CC] mt-1">50</div>
          <div className="text-[11px] text-blue-600 font-semibold mt-1">Đang chờ ký số QMR</div>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTabSub === 'approvals' && (
        <div className="bg-white rounded-2xl border border-blue-100 shadow-xs p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#003B82] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0066CC]" />
                <span>Danh sách Tài liệu Chờ Phê Duyệt Ban Hành</span>
              </h3>
              <p className="text-xs text-slate-500">
                Các bản thảo và sửa đổi quy trình được các phòng ban gửi lên cần kiểm soát và ký duyệt.
              </p>
            </div>
            <span className="text-xs font-bold bg-blue-50 text-[#0066CC] px-2.5 py-1 rounded-lg">
              {pendingDocs.length} hồ sơ
            </span>
          </div>

          {pendingDocs.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              Hiện tại không có tài liệu nào đang chờ phê duyệt.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead>
                  <tr className="bg-[#F4F9FD] text-[#003B82] font-bold border-b border-blue-100">
                    <th className="p-3">Mã tài liệu</th>
                    <th className="p-3">Tên tài liệu</th>
                    <th className="p-3">Phòng ban</th>
                    <th className="p-3">Người biên soạn</th>
                    <th className="p-3">Ngày trình duyệt</th>
                    <th className="p-3 text-center">Thao tác phê duyệt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pendingDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-[#0066CC]">{doc.code}</td>
                      <td className="p-3 font-semibold text-slate-800">{doc.title}</td>
                      <td className="p-3">{doc.department}</td>
                      <td className="p-3">{doc.personInCharge}</td>
                      <td className="p-3">{doc.issueDate}</td>
                      <td className="p-3 text-center">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => viewDocument(doc)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Soát xét</span>
                          </button>
                          <button
                            onClick={() => approveDocument(doc.id, true, 'Đã phê duyệt theo đúng tiêu chuẩn ISO.')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Duyệt</span>
                          </button>
                          <button
                            onClick={() => approveDocument(doc.id, false, 'Cần bổ sung ma trận rủi ro và đánh giá tác động môi trường.')}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Yêu cầu sửa</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTabSub === 'expiring' && (
        <div className="bg-white rounded-2xl border border-blue-100 shadow-xs p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-amber-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Cảnh Báo Tài Liệu Sắp Hết Hiệu Lực (&lt; 30 ngày)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Các quy trình, hướng dẫn cần thực hiện rà soát định kỳ trước đợt kiểm toán chứng nhận ISO.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead>
                <tr className="bg-amber-50/60 text-amber-900 font-bold border-b border-amber-200">
                  <th className="p-3">Mã tài liệu</th>
                  <th className="p-3">Tên tài liệu</th>
                  <th className="p-3">Phòng ban</th>
                  <th className="p-3">Người phụ trách</th>
                  <th className="p-3">Ngày hết hạn</th>
                  <th className="p-3 text-center">Hành động khắc phục</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {expiringList.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-[#0066CC]">{doc.code}</td>
                    <td className="p-3 font-semibold text-slate-800">{doc.title}</td>
                    <td className="p-3">{doc.department}</td>
                    <td className="p-3">{doc.personInCharge}</td>
                    <td className="p-3 font-bold text-amber-600">{doc.expiryDate}</td>
                    <td className="p-3 text-center">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => viewDocument(doc)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg font-bold text-[11px] cursor-pointer"
                        >
                          Xem
                        </button>
                        <button
                          onClick={() => handleRenewDocument(doc)}
                          className="bg-[#0066CC] hover:bg-[#0055B8] text-white px-3 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Gia hạn hiệu lực (02 năm)</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTabSub === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Pie Chart: Status Distribution */}
          <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-xs">
            <h3 className="text-sm font-bold text-[#003B82] uppercase tracking-wide mb-2">
              Phân Bổ Tình Trạng Tài Liệu Hệ Thống
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {statusChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart: Documents by Department */}
          <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-xs">
            <h3 className="text-sm font-bold text-[#003B82] uppercase tracking-wide mb-2">
              Số Lượng Tài Liệu Phân Bổ Theo Phòng Ban
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptData}>
                  <XAxis dataKey="department" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0066CC" radius={[4, 4, 0, 0]} name="Số tài liệu" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
