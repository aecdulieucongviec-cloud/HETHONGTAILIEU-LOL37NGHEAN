import React, { useState } from 'react';
import {
  Target,
  Award,
  CheckCircle,
  Clock,
  Calendar,
  ShieldCheck,
  FileText,
  ExternalLink,
  Download,
  AlertCircle,
  Building,
  Eye,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CertificateItem } from '../types';

export const ObjectivesAndCertsView: React.FC = () => {
  const { certificates, objectives, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'certs' | 'kpis'>('certs');
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  const handleDownloadCert = (cert: CertificateItem) => {
    showToast({
      type: 'success',
      title: 'Tải bản sao chứng chỉ',
      message: `Đang tải chứng chỉ ${cert.standard} do ${cert.issuingBody} cấp.`,
    });
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
      {/* Header Banner */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-blue-100 shadow-xs mb-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#0066CC] font-bold uppercase tracking-wider">
            <span>HỆ THỐNG QUẢN LÝ</span>
            <span>/</span>
            <span className="text-slate-500">MỤC TIÊU &amp; CHỨNG NHẬN QUỐC TẾ</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#003B82] uppercase mt-1">
            MỤC TIÊU &amp; CHỨNG NHẬN
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Hệ sinh thái tiêu chuẩn ISO, năng lực chất lượng SQM và chỉ số đo lường hiệu suất năm 2026 của LOL37 Nghệ An.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center bg-[#F4F9FD] p-1 rounded-xl border border-blue-100 text-xs font-bold">
          <button
            onClick={() => setActiveTab('certs')}
            className={`px-4 py-2 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'certs'
                ? 'bg-[#0066CC] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Chứng nhận ISO &amp; SQM ({certificates.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('kpis')}
            className={`px-4 py-2 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'kpis'
                ? 'bg-[#0066CC] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Mục tiêu &amp; KPI 2026 ({objectives.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Certifications */}
      {activeTab === 'certs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-2xl border border-blue-100 hover:border-[#008FE5] p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0066CC] flex items-center justify-center border border-blue-100 group-hover:scale-105 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Hiệu lực
                  </span>
                </div>

                <div className="font-mono text-xs font-bold text-[#0066CC] tracking-wide">
                  {cert.standard}
                </div>
                <h3 className="text-base font-bold text-[#003B82] mt-0.5 leading-snug">
                  {cert.name}
                </h3>

                <p className="text-xs text-slate-500 mt-2.5 line-clamp-3 leading-relaxed">
                  {cert.scope}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Đơn vị cấp:</span>
                    <strong className="text-slate-800">{cert.issuingBody}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Số chứng chỉ:</span>
                    <span className="font-mono text-[11px] font-bold">{cert.certificateNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Thời hạn:</span>
                    <span>
                      {cert.issueDate} → <strong className="text-emerald-700">{cert.expiryDate}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="text-xs text-[#0066CC] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Xem chi tiết</span>
                </button>
                <button
                  onClick={() => handleDownloadCert(cert)}
                  className="bg-[#EAF7FF] hover:bg-blue-100 text-[#0066CC] text-xs font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: KPIs & Objectives */}
      {activeTab === 'kpis' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {objectives.map((obj) => (
              <div
                key={obj.id}
                className="bg-white rounded-2xl border border-blue-100 p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="bg-blue-50 text-[#0066CC] text-xs font-bold px-2.5 py-0.5 rounded-md border border-blue-100">
                      {obj.category}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        obj.status === 'ACHIEVED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {obj.status === 'ACHIEVED' ? '✓ Đạt mục tiêu' : 'Đang bám sát'}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-800 mt-1 leading-snug">
                    {obj.title}
                  </h3>

                  {/* Target vs Actual */}
                  <div className="grid grid-cols-2 gap-2 my-3 p-3 bg-[#F4F9FD] rounded-xl text-xs">
                    <div>
                      <div className="text-slate-400">Mục tiêu cả năm:</div>
                      <div className="font-bold text-slate-800 mt-0.5">{obj.targetValue}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Kết quả hiện tại:</div>
                      <div className="font-bold text-[#0066CC] mt-0.5">{obj.currentValue}</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                      <span>Tiến độ hoàn thành:</span>
                      <span className="text-[#0066CC]">{obj.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#008FE5] to-[#0066CC] h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, obj.percentage)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between items-center">
                  <span>Phụ trách: <strong>{obj.responsiblePerson}</strong></span>
                  <span className="font-semibold">{obj.period}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certificate Detail Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-[#0066CC] bg-blue-50 px-2 py-0.5 rounded">
                  {selectedCert.standard}
                </span>
                <h3 className="text-base font-bold text-[#003B82] mt-1">{selectedCert.name}</h3>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-slate-700">
              <div>
                <strong>Tổ chức chứng nhận:</strong> {selectedCert.issuingBody}
              </div>
              <div>
                <strong>Số chứng chỉ:</strong> {selectedCert.certificateNumber}
              </div>
              <div>
                <strong>Hiệu lực:</strong> {selectedCert.issueDate} đến {selectedCert.expiryDate}
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed">
                <strong>Phạm vi chứng nhận:</strong><br />
                {selectedCert.scope}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <button
                onClick={() => handleDownloadCert(selectedCert)}
                className="bg-[#0066CC] hover:bg-[#0055B8] text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải Chứng Chỉ Gốc (PDF)</span>
              </button>
              <button
                onClick={() => setSelectedCert(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
