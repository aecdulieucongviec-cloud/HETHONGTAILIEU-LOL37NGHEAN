import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  Tag,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EventsView: React.FC = () => {
  const { events } = useApp();
  const [selectedMonth, setSelectedMonth] = useState('Tháng 10 / 2026');

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-blue-100 shadow-xs mb-5">
        <div className="flex items-center gap-2 text-xs text-[#0066CC] font-bold uppercase tracking-wider">
          <span>HOẠT ĐỘNG DOANH NGHIỆP</span>
          <span>/</span>
          <span className="text-slate-500">LỊCH SỰ KIỆN TOÀN CÔNG TY</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-[#003B82] uppercase mt-1">
          SỰ KIỆN &amp; LỊCH CÔNG TÁC CÔNG TY
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Theo dõi các mốc kỷ niệm 20 năm thành lập, kế hoạch kiểm toán chất lượng ISO và các hoạt động văn hóa nội bộ.
        </p>
      </div>

      {/* Grid of Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="bg-white rounded-2xl border border-blue-100 hover:border-[#008FE5] p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="bg-[#EAF7FF] text-[#0066CC] text-xs font-bold px-3 py-1 rounded-full border border-blue-100 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{evt.category}</span>
                </span>
                <span className="bg-amber-100 text-amber-900 text-[11px] font-black px-2 py-0.5 rounded">
                  {evt.badge}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#003B82] leading-snug">{evt.title}</h3>
              <p className="text-xs text-amber-600 font-bold mt-1">{evt.subtitle}</p>

              <p className="text-xs text-slate-600 mt-3 leading-relaxed">{evt.description}</p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#0066CC] shrink-0" />
                <span>
                  <strong>Thời gian:</strong> {evt.date}{' '}
                  {evt.endDate ? `đến ${evt.endDate}` : ''}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0066CC] shrink-0" />
                <span className="truncate">
                  <strong>Địa điểm:</strong> {evt.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
