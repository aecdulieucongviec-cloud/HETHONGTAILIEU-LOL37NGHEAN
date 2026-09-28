import React from 'react';
import {
  BarChart2,
  TrendingUp,
  Eye,
  Download,
  FileText,
  Users,
  CheckCircle,
  Clock,
  Award,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

export const DashboardView: React.FC = () => {
  const { documents, viewDocument } = useApp();

  // Monthly trends (2026)
  const monthlyData = [
    { month: 'Tháng 1', views: 1240, downloads: 480, uploads: 18 },
    { month: 'Tháng 2', views: 1580, downloads: 610, uploads: 14 },
    { month: 'Tháng 3', views: 2100, downloads: 820, uploads: 25 },
    { month: 'Tháng 4', views: 1950, downloads: 740, uploads: 12 },
    { month: 'Tháng 5', views: 2420, downloads: 910, uploads: 30 },
    { month: 'Tháng 6', views: 2680, downloads: 1050, uploads: 22 },
    { month: 'Tháng 7', views: 2510, downloads: 980, uploads: 19 },
    { month: 'Tháng 8', views: 2890, downloads: 1140, uploads: 28 },
    { month: 'Tháng 9', views: 3120, downloads: 1280, uploads: 35 },
  ];

  // Category breakdown
  const categoryChartData = [
    { name: 'Hướng dẫn CV', value: 58, color: '#0066CC' },
    { name: 'Chính sách & QT', value: 42, color: '#008FE5' },
    { name: 'Vận hành', value: 36, color: '#00BFEF' },
    { name: 'Đào tạo', value: 35, color: '#20B26B' },
    { name: 'Bảo trì', value: 31, color: '#F59E0B' },
    { name: 'Tài liệu HSE', value: 29, color: '#E91E63' },
    { name: 'Khác', value: 89, color: '#8B5CF6' },
  ];

  // Top 5 popular documents
  const topDocs = [...documents].sort((a, b) => b.viewsCount - a.viewsCount).slice(0, 5);

  const totalViews = documents.reduce((acc, d) => acc + d.viewsCount, 0) + 18500;
  const totalDownloads = documents.reduce((acc, d) => acc + d.downloadsCount, 0) + 7200;

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-blue-100 shadow-xs mb-5">
        <div className="flex items-center gap-2 text-xs text-[#0066CC] font-bold uppercase tracking-wider">
          <span>HỆ THỐNG BÁO CÁO</span>
          <span>/</span>
          <span className="text-slate-500">BI THỐNG KÊ QUẢN TRỊ</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-[#003B82] uppercase mt-1">
          BẢNG ĐIỀU KHIỂN &amp; THỐNG KÊ HỆ THỐNG
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Tổng quan lưu lượng tra cứu, xu hướng tải về và hiệu quả phổ biến tri thức trong tổ chức.
        </p>
      </div>

      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase">Tổng Lượt Tra Cứu</span>
            <Eye className="w-5 h-5 text-[#0066CC]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#003B82] mt-2">
            {totalViews.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-600 font-bold mt-1">↑ +14.2% so với tháng trước</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase">Tổng Lượt Tải Xuống</span>
            <Download className="w-5 h-5 text-[#008FE5]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#003B82] mt-2">
            {totalDownloads.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-600 font-bold mt-1">↑ +8.5% so với tháng trước</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase">Tài Liệu Đang Quản Lý</span>
            <FileText className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#003B82] mt-2">1,256</div>
          <div className="text-xs text-slate-500 mt-1">Chuẩn hóa 100% dạng số</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase">Cập Nhật Trong Tháng</span>
            <TrendingUp className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#003B82] mt-2">35</div>
          <div className="text-xs text-blue-600 font-semibold mt-1">Tháng 9/2026</div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Line Chart: Views & Downloads Trend */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-blue-100 shadow-xs">
          <h3 className="text-sm font-bold text-[#003B82] uppercase tracking-wide mb-3 flex items-center justify-between">
            <span>Xu hướng tra cứu và tải tài liệu năm 2026</span>
            <span className="text-xs text-slate-400 font-normal">Đơn vị: lượt</span>
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#0066CC"
                  strokeWidth={3}
                  name="Lượt xem trực tuyến"
                />
                <Line
                  type="monotone"
                  dataKey="downloads"
                  stroke="#20B26B"
                  strokeWidth={2.5}
                  name="Lượt tải về"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Categories */}
        <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-xs">
          <h3 className="text-sm font-bold text-[#003B82] uppercase tracking-wide mb-3">
            Tỷ trọng theo nhóm tài liệu
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }: any) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Trending Documents Table */}
      <div className="bg-white rounded-2xl border border-blue-100 shadow-xs p-5">
        <h3 className="text-sm font-bold text-[#003B82] uppercase tracking-wide mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-500" />
          <span>Top Tài Liệu Được Tra Cứu Nhiều Nhất</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead>
              <tr className="bg-[#F4F9FD] text-[#003B82] font-bold border-b border-blue-100">
                <th className="p-3 w-12 text-center">Hạng</th>
                <th className="p-3">Mã tài liệu</th>
                <th className="p-3">Tên tài liệu</th>
                <th className="p-3">Phòng ban</th>
                <th className="p-3 text-center">Lượt xem</th>
                <th className="p-3 text-center">Lượt tải</th>
                <th className="p-3 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topDocs.map((doc, idx) => (
                <tr key={doc.id} className="hover:bg-slate-50">
                  <td className="p-3 text-center font-bold text-[#0066CC]">#{idx + 1}</td>
                  <td className="p-3 font-mono font-bold text-slate-900">{doc.code}</td>
                  <td className="p-3 font-semibold text-slate-800">{doc.title}</td>
                  <td className="p-3">{doc.department}</td>
                  <td className="p-3 text-center font-bold text-[#0066CC]">
                    {doc.viewsCount.toLocaleString()}
                  </td>
                  <td className="p-3 text-center font-bold text-emerald-600">
                    {doc.downloadsCount.toLocaleString()}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => viewDocument(doc)}
                      className="bg-[#0066CC] hover:bg-[#0055B8] text-white px-2.5 py-1 rounded-lg font-bold text-[11px] cursor-pointer"
                    >
                      Xem ngay
                    </button>
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
