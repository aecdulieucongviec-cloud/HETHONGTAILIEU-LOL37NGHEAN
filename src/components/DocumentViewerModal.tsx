import React, { useState } from 'react';
import {
  X,
  Download,
  Printer,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  FileText,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DocumentViewerModal: React.FC = () => {
  const {
    selectedDocument,
    isViewerOpen,
    setIsViewerOpen,
    downloadDocument,
    currentUser,
    setIsVersionHistoryOpen,
  } = useApp();

  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 4;

  if (!isViewerOpen || !selectedDocument) return null;

  const handleDownload = () => {
    downloadDocument(selectedDocument);
  };

  const handlePrint = () => {
    window.print();
  };

  const isGuest = currentUser.role === 'GUEST';
  const canDownload = !isGuest || selectedDocument.securityLevel === 'PUBLIC';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#1E293B] rounded-2xl w-full max-w-5xl h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-700 animate-in zoom-in-95">
        {/* Top Control Bar */}
        <div className="bg-[#0F172A] px-4 py-3 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3 text-white">
          {/* Document Title & Badge */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#0066CC] flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-[#00BFEF] tracking-wide">
                  {selectedDocument.code}
                </span>
                <span className="text-[10px] bg-slate-700 text-slate-200 px-1.5 py-0.2 rounded font-bold">
                  {selectedDocument.version}
                </span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-700/50 px-1.5 py-0.2 rounded">
                  {selectedDocument.status}
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white truncate max-w-md">
                {selectedDocument.title}
              </h3>
            </div>
          </div>

          {/* Viewer Tools: Zoom, Pages, Actions */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Page navigation */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 hover:bg-slate-700 disabled:opacity-30 rounded cursor-pointer"
                title="Trang trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 font-mono text-[11px]">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 hover:bg-slate-700 disabled:opacity-30 rounded cursor-pointer"
                title="Trang sau"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
              <button
                onClick={() => setZoomLevel((z) => Math.max(50, z - 15))}
                className="p-1.5 hover:bg-slate-700 rounded cursor-pointer"
                title="Thu nhỏ"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-2 font-mono text-[11px] min-w-[45px] text-center">
                {zoomLevel}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
                className="p-1.5 hover:bg-slate-700 rounded cursor-pointer"
                title="Phóng to"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 text-slate-200 transition cursor-pointer"
              title="In tài liệu"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Download Button */}
            {canDownload ? (
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 bg-[#0066CC] hover:bg-[#0055B8] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition shadow-sm cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tải về ({selectedDocument.fileSize})</span>
              </button>
            ) : (
              <div
                className="flex items-center gap-1.5 bg-slate-800 text-slate-400 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700"
                title="Bạn không có quyền tải tài liệu nội bộ"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Chỉ xem trực tuyến</span>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={() => setIsViewerOpen(false)}
              className="p-1.5 bg-slate-800 hover:bg-rose-900/60 hover:text-rose-300 text-slate-400 rounded-lg transition cursor-pointer"
              title="Đóng trình xem"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Content Viewport (Scrollable with zoom) */}
        <div className="flex-1 bg-slate-900 overflow-auto p-4 sm:p-8 flex justify-center relative">
          {/* Semi-transparent Watermark */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10 select-none z-20">
            <div className="transform -rotate-30 text-center font-black text-3xl sm:text-5xl text-white tracking-widest uppercase">
              BẢN NỘI BỘ - LOL37 NGHỆ AN<br />
              KHÔNG SAO CHÉP TRÁI PHÉP
            </div>
          </div>

          {/* Paper Sheet Document Canvas */}
          <div
            style={{
              width: `${(800 * zoomLevel) / 100}px`,
              minHeight: '1100px',
              transformOrigin: 'top center',
            }}
            className="bg-white text-slate-900 shadow-2xl rounded-sm p-8 sm:p-12 border border-slate-300 flex flex-col justify-between relative z-10 transition-all duration-150"
          >
            <div>
              {/* ISO Corporate Header Header Block */}
              <div className="border-2 border-slate-900 p-3 mb-6 grid grid-cols-12 items-center text-xs">
                {/* Logo & Company info */}
                <div className="col-span-3 border-r-2 border-slate-900 pr-3 flex flex-col items-center justify-center text-center">
                  <div className="text-[#E91E63] font-black text-sm">LOL37 NGHỆ AN</div>
                  <div className="text-[9px] font-bold text-slate-700 uppercase mt-0.5">
                    Tổ hợp Công nghiệp Hóa dầu
                  </div>
                </div>

                {/* Document Main Heading */}
                <div className="col-span-6 px-3 text-center">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    HỆ THỐNG QUẢN LÝ CHẤT LƯỢNG ISO 9001:2015
                  </div>
                  <div className="text-sm font-black text-[#003B82] uppercase mt-0.5 leading-snug">
                    {selectedDocument.title}
                  </div>
                </div>

                {/* Document Code & Revision Table */}
                <div className="col-span-3 border-l-2 border-slate-900 pl-3 space-y-1 text-[10px]">
                  <div>
                    <span className="font-bold">Mã số:</span> {selectedDocument.code}
                  </div>
                  <div>
                    <span className="font-bold">Lần ban hành:</span> {selectedDocument.version}
                  </div>
                  <div>
                    <span className="font-bold">Ngày hiệu lực:</span> {selectedDocument.effectiveDate}
                  </div>
                  <div>
                    <span className="font-bold">Trang:</span> {currentPage} / {totalPages}
                  </div>
                </div>
              </div>

              {/* Page 1: Formal Sign-off and Table of Content */}
              {currentPage === 1 && (
                <div className="space-y-6 text-xs sm:text-sm">
                  {/* Approval Grid */}
                  <div className="border border-slate-300 rounded-md overflow-hidden text-center text-xs">
                    <div className="grid grid-cols-3 bg-slate-100 font-bold border-b border-slate-300 py-1.5">
                      <div>NGƯỜI BIÊN SOẠN</div>
                      <div>NGƯỜI KIỂM SOÁT</div>
                      <div>NGƯỜI PHÊ DUYỆT</div>
                    </div>
                    <div className="grid grid-cols-3 py-6 h-24 items-end text-[11px] text-slate-700">
                      <div>
                        <div className="italic text-slate-400 mb-1">(Đã ký số)</div>
                        <div className="font-bold">{selectedDocument.personInCharge}</div>
                        <div className="text-[10px] text-slate-500">Chuyên viên QMS</div>
                      </div>
                      <div>
                        <div className="italic text-slate-400 mb-1">(Đã ký số)</div>
                        <div className="font-bold">Trần Thị Mai</div>
                        <div className="text-[10px] text-slate-500">Document Controller</div>
                      </div>
                      <div>
                        <div className="italic text-slate-400 mb-1">(Đã ký số)</div>
                        <div className="font-bold">{selectedDocument.approver || 'NGUYỄN THANH TÙNG'}</div>
                        <div className="text-[10px] text-slate-500">TỔNG BIÊN TẬP</div>
                      </div>
                    </div>
                  </div>

                  {/* Section 1: Mục đích */}
                  <div>
                    <h4 className="font-bold text-[#003B82] uppercase border-b border-slate-200 pb-1 mb-2">
                      1. MỤC ĐÍCH &amp; PHẠM VI ÁP DỤNG
                    </h4>
                    <p className="text-slate-700 leading-relaxed text-justify">
                      Tài liệu này quy định đầy đủ các chuẩn mực quản lý, nguyên tắc kiểm soát và trách nhiệm cụ thể của các phòng ban, phân xưởng tại Công ty TNHH LOL37 Nghệ An nhằm bảo đảm tính thống nhất, an toàn và hiệu quả cao nhất trong hoạt động sản xuất kinh doanh.
                    </p>
                    <p className="text-slate-700 leading-relaxed text-justify mt-2">
                      Phạm vi áp dụng bao gồm toàn bộ khu vực Tổ hợp Nhà máy LOL37, Văn phòng Điều hành, Trung tâm Kiểm nghiệm Chất lượng và các nhà thầu thi công phụ trợ.
                    </p>
                  </div>

                  {/* Section 2: Tài liệu viện dẫn */}
                  <div>
                    <h4 className="font-bold text-[#003B82] uppercase border-b border-slate-200 pb-1 mb-2">
                      2. TÀI LIỆU VIỆN DẪN &amp; TIÊU CHUẨN CƠ SỞ
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      <li>Tiêu chuẩn Quốc gia TCVN ISO 9001:2015 / ISO 9001:2015.</li>
                      <li>Luật An toàn, Vệ sinh lao động số 84/2015/QH13 của Quốc hội.</li>
                      <li>Quy chuẩn Kỹ thuật Quốc gia QCVN 06:2022/BXD về an toàn cháy cho nhà và công trình.</li>
                      <li>Sổ tay Quản lý Chất lượng và Sổ tay HSE ban hành nội bộ của LOL37 Nghệ An.</li>
                    </ul>
                  </div>

                  {/* Section 3: Tóm tắt nội dung */}
                  <div>
                    <h4 className="font-bold text-[#003B82] uppercase border-b border-slate-200 pb-1 mb-2">
                      3. TÓM TẮT NỘI DUNG CHÍNH
                    </h4>
                    <div className="bg-slate-50 p-3.5 rounded border border-slate-200 text-slate-800 leading-relaxed text-justify whitespace-pre-line font-serif">
                      {selectedDocument.contentSample || selectedDocument.description}
                    </div>
                  </div>
                </div>
              )}

              {/* Page 2: Detailed Workflow and Protocols */}
              {currentPage === 2 && (
                <div className="space-y-6 text-xs sm:text-sm">
                  <div>
                    <h4 className="font-bold text-[#003B82] uppercase border-b border-slate-200 pb-1 mb-2">
                      4. QUY TRÌNH THỰC HIỆN VÀ TRÁCH NHIỆM PHỐI HỢP
                    </h4>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <span className="font-bold text-[#0066CC] shrink-0">Bước 1:</span>
                        <div>
                          <div className="font-bold">Tiếp nhận yêu cầu &amp; Khảo sát hiện trường</div>
                          <p className="text-slate-600 mt-0.5">
                            Kỹ sư phụ trách ghi nhận thông số kỹ thuật, lập phiếu kiểm tra tình trạng ban đầu của thiết bị và báo cáo Trưởng bộ phận.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="font-bold text-[#0066CC] shrink-0">Bước 2:</span>
                        <div>
                          <div className="font-bold">Đánh giá rủi ro &amp; Cấp phép công việc (Work Permit)</div>
                          <p className="text-slate-600 mt-0.5">
                            Thực hiện phân tích rủi ro an toàn JSA. Trường hợp thao tác công việc có phát sinh nhiệt, bắt buộc phải có Giấy phép Làm việc Nóng (Hot Work Permit) do Ban HSE phê duyệt.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="font-bold text-[#0066CC] shrink-0">Bước 3:</span>
                        <div>
                          <div className="font-bold">Triển khai thao tác theo bảng hướng dẫn kỹ thuật</div>
                          <p className="text-slate-600 mt-0.5">
                            Các kỹ sư, công nhân tuân thủ nghiêm ngặt áp suất, nhiệt độ, lưu lượng và các mốc dung sai quy định. Mọi bất thường phải kích hoạt quy trình ngắt khẩn cấp ESD ngay lập tức.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="font-bold text-[#0066CC] shrink-0">Bước 4:</span>
                        <div>
                          <div className="font-bold">Kiểm nghiệm nghiệm thu &amp; Bàn giao vận hành</div>
                          <p className="text-slate-600 mt-0.5">
                            Bộ phận QC tiến hành lấy mẫu phân tích đối chứng. Sau khi các chỉ tiêu đạt tiêu chuẩn theo SQM, tiến hành ký biên bản nghiệm thu và lưu hồ sơ số hóa.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#003B82] uppercase border-b border-slate-200 pb-1 mb-2">
                      5. LƯU Ý ĐẶC BIỆT VỀ AN TOÀN HSE
                    </h4>
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-3 text-amber-900 text-xs">
                      <strong>CẢNH BÁO NGUY HIỂM:</strong> Tuyệt đối không được mở van xả khí tự do ra môi trường mà chưa qua hệ thống đuốc đốt Flare. Mọi nhân viên bắt buộc phải mang đầy đủ phương tiện bảo hộ lao động PPE tiêu chuẩn Class E trong suốt thời gian có mặt tại khu vực sản xuất.
                    </div>
                  </div>
                </div>
              )}

              {/* Page 3: Forms and Records */}
              {currentPage === 3 && (
                <div className="space-y-6 text-xs sm:text-sm">
                  <div>
                    <h4 className="font-bold text-[#003B82] uppercase border-b border-slate-200 pb-1 mb-2">
                      6. DANH MỤC BIỂU MẪU KÈM THEO
                    </h4>
                    <table className="w-full border-collapse border border-slate-300 text-left text-xs">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="border border-slate-300 p-2">Mã biểu mẫu</th>
                          <th className="border border-slate-300 p-2">Tên biểu mẫu</th>
                          <th className="border border-slate-300 p-2">Nơi lưu trữ</th>
                          <th className="border border-slate-300 p-2">Thời gian lưu</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-slate-300 p-2 font-mono">BM-01/QT</td>
                          <td className="border border-slate-300 p-2">Phiếu bàn giao kỹ thuật ca trực</td>
                          <td className="border border-slate-300 p-2">Phòng DCS</td>
                          <td className="border border-slate-300 p-2">03 năm</td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300 p-2 font-mono">BM-02/QT</td>
                          <td className="border border-slate-300 p-2">Biên bản kiểm tra an toàn trước ca</td>
                          <td className="border border-slate-300 p-2">Ban HSE</td>
                          <td className="border border-slate-300 p-2">05 năm</td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300 p-2 font-mono">BM-03/QT</td>
                          <td className="border border-slate-300 p-2">Phiếu phân tích mẫu kiểm nghiệm Lab</td>
                          <td className="border border-slate-300 p-2">Phòng QC</td>
                          <td className="border border-slate-300 p-2">10 năm</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#003B82] uppercase border-b border-slate-200 pb-1 mb-2">
                      7. PHÂN PHỐI &amp; BẢO MẬT TÀI LIỆU
                    </h4>
                    <p className="text-slate-700 leading-relaxed text-xs">
                      Tài liệu này được lưu trữ dưới dạng bản gốc điện tử (Master Copy) trên Cổng Thông tin Tài liệu LOL37 Nghệ An. Mọi bản in giấy ra ngoài nếu không có dấu đỏ "BẢN KIỂM SOÁT" của Document Controller đều chỉ có giá trị tham khảo.
                    </p>
                  </div>
                </div>
              )}

              {/* Page 4: Revision History */}
              {currentPage === 4 && (
                <div className="space-y-6 text-xs sm:text-sm">
                  <div>
                    <h4 className="font-bold text-[#003B82] uppercase border-b border-slate-200 pb-1 mb-2">
                      8. THEO DÕI SỬA ĐỔI (REVISION HISTORY)
                    </h4>
                    <table className="w-full border-collapse border border-slate-300 text-left text-xs">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="border border-slate-300 p-2">Lần ban hành</th>
                          <th className="border border-slate-300 p-2">Ngày hiệu lực</th>
                          <th className="border border-slate-300 p-2">Nội dung sửa đổi / Bổ sung</th>
                          <th className="border border-slate-300 p-2">Người soát xét</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedDocument.versionHistory.map((ver, idx) => (
                          <tr key={idx}>
                            <td className="border border-slate-300 p-2 font-bold font-mono text-[#0066CC]">
                              {ver.version}
                            </td>
                            <td className="border border-slate-300 p-2">{ver.effectiveDate}</td>
                            <td className="border border-slate-300 p-2">{ver.summaryOfChanges}</td>
                            <td className="border border-slate-300 p-2">{ver.updatedBy}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="pt-8 text-center text-xs text-slate-400">
                    --- HẾT VĂN BẢN ---
                  </div>
                </div>
              )}
            </div>

            {/* Document Paper Footer */}
            <div className="border-t border-slate-300 pt-3 flex justify-between items-center text-[10px] text-slate-500">
              <div>LOL37 NGHỆ AN • HỆ THỐNG QUẢN LÝ NỘI BỘ</div>
              <div>Trang {currentPage} / {totalPages}</div>
              <div>Mã: {selectedDocument.code}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
