import React, { useState } from 'react';
import {
  Wifi,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Laptop,
  Smartphone,
  Tablet,
  Cpu,
  Shield,
  Key,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WifiRequest } from '../types';

export const WifiRequestView: React.FC = () => {
  const { wifiRequests, submitWifiRequest, updateWifiStatus, currentUser, showToast } = useApp();

  // Form states
  const [fullName, setFullName] = useState(currentUser.fullName);
  const [employeeId, setEmployeeId] = useState(
    currentUser.username === 'admin' ? 'LOL-0001' : 'LOL-0482'
  );
  const [department, setDepartment] = useState(currentUser.department);
  const [deviceType, setDeviceType] = useState<WifiRequest['deviceType']>('Laptop');
  const [macAddress, setMacAddress] = useState('');
  const [location, setLocation] = useState('Phòng Điều khiển Trung tâm DCS');
  const [purpose, setPurpose] = useState('');
  const [duration, setDuration] = useState<WifiRequest['duration']>('6_MONTHS');
  const [notes, setNotes] = useState('');

  // Submitted ticket modal
  const [newTicketCode, setNewTicketCode] = useState<string | null>(null);

  // Active view tab
  const [activeTab, setActiveTab] = useState<'form' | 'tracking' | 'admin'>('form');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic MAC address validation check
    const cleanMac = macAddress.trim().toUpperCase();
    if (!cleanMac) {
      showToast({
        type: 'error',
        title: 'Thiếu địa chỉ MAC',
        message: 'Vui lòng nhập địa chỉ MAC vật lý của thiết bị.',
      });
      return;
    }

    if (!purpose.trim()) {
      showToast({
        type: 'error',
        title: 'Thiếu mục đích sử dụng',
        message: 'Vui lòng nêu rõ lý do kết nối mạng nội bộ.',
      });
      return;
    }

    const generatedCode = submitWifiRequest({
      fullName,
      employeeId,
      department,
      deviceType,
      macAddress: cleanMac,
      location,
      purpose: purpose.trim(),
      duration,
      notes: notes.trim() || undefined,
    });

    setNewTicketCode(generatedCode);
    setMacAddress('');
    setPurpose('');
    setNotes('');
  };

  const getStatusBadge = (status: WifiRequest['status']) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            🟡 Chờ xử lý
          </span>
        );
      case 'PROCESSING':
        return (
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            🔵 Đang xử lý
          </span>
        );
      case 'APPROVED':
        return (
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            🟢 Đã duyệt
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-800 text-xs font-bold px-2.5 py-1 rounded-full border border-rose-200">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            🔴 Từ chối
          </span>
        );
    }
  };

  const isITAdmin = currentUser.role === 'ADMIN' || currentUser.role === 'DOCUMENT_CONTROLLER';

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-blue-100 shadow-xs mb-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#0066CC] font-bold uppercase tracking-wider">
            <span>HẠ TẦNG CÔNG NGHỆ THÔNG TIN</span>
            <span>/</span>
            <span className="text-slate-500">QUẢN LÝ KẾT NỐI KHÔNG DÂY</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#003B82] uppercase mt-1">
            YÊU CẦU KẾT NỐI WIFI NỘI BỘ
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Đăng ký địa chỉ MAC thiết bị công tác vào vùng mạng bảo mật LOL37-INTERNAL theo tiêu chuẩn ISO/IEC 27001.
          </p>
        </div>

        {/* Sub tabs */}
        <div className="flex items-center bg-[#F4F9FD] p-1 rounded-xl border border-blue-100 text-xs font-bold">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-3.5 py-2 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'form'
                ? 'bg-[#0066CC] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Gửi Yêu Cầu</span>
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`px-3.5 py-2 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'tracking'
                ? 'bg-[#0066CC] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Theo Dõi Yêu Cầu ({wifiRequests.length})</span>
          </button>
          {isITAdmin && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3.5 py-2 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'admin'
                  ? 'bg-[#0066CC] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>Duyệt Cấp WiFi (IT Admin)</span>
            </button>
          )}
        </div>
      </div>

      {/* View 1: Submission Form */}
      {activeTab === 'form' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-blue-100 shadow-xs">
            <h2 className="text-base font-bold text-[#003B82] mb-1 flex items-center gap-2">
              <Wifi className="w-5 h-5 text-[#0066CC]" />
              <span>Biểu Mẫu Đăng Ký Thiết Bị Truy Cập Mạng Không Dây</span>
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              Vui lòng điền đầy đủ và chính xác thông tin để bộ phận IT Security thẩm định và gán VLAN phù hợp.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mã nhân viên *
                  </label>
                  <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="LOL-XXXX"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Bộ phận / Phòng ban *
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Loại thiết bị *
                  </label>
                  <select
                    value={deviceType}
                    onChange={(e) => setDeviceType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:outline-none bg-white font-medium"
                  >
                    <option value="Laptop">💻 Máy tính xách tay (Laptop)</option>
                    <option value="Smartphone">📱 Điện thoại thông minh (Smartphone)</option>
                    <option value="Tablet">📟 Máy tính bảng (Tablet)</option>
                    <option value="Thiết bị đo">⚙ Thiết bị đo kiểm chuyên dụng</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                    <span>Địa chỉ MAC Address *</span>
                    <span className="text-[10px] text-slate-400 font-normal">Định dạng: AA:BB:CC:DD:EE:FF</span>
                  </label>
                  <input
                    type="text"
                    value={macAddress}
                    onChange={(e) => setMacAddress(e.target.value)}
                    placeholder="VD: 3C:52:82:11:AB:F4"
                    className="w-full px-3 py-2 font-mono uppercase border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Vị trí / Khu vực sử dụng *
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="VD: Khu văn phòng điều hành, Xưởng 1, Lab kiểm nghiệm..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Thời gian yêu cầu *
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:outline-none bg-white font-medium"
                  >
                    <option value="1_MONTH">01 Tháng (Khách công tác)</option>
                    <option value="3_MONTHS">03 Tháng (Dự án ngắn hạn)</option>
                    <option value="6_MONTHS">06 Tháng (Thiết bị công vụ)</option>
                    <option value="PERMANENT">Vĩnh viễn (Cán bộ chính thức)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mục đích sử dụng *
                </label>
                <textarea
                  rows={2}
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Nêu rõ công việc cụ thể cần truy cập internet hoặc mạng tài liệu nội bộ..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:outline-none resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ghi chú bổ sung (tên máy, nhãn hiệu)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="VD: Dell XPS 15 của công ty cấp hoặc iPad phục vụ kiểm kê"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#008FE5] to-[#0066CC] hover:from-[#007AC9] hover:to-[#0055B8] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>GỬI YÊU CẦU WIFI</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Guidance Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#F4F9FD] p-5 rounded-2xl border border-blue-100">
              <h3 className="text-sm font-bold text-[#003B82] mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-[#0066CC]" />
                <span>Cách Tìm Địa Chỉ MAC Của Thiết Bị</span>
              </h3>
              <div className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
                <div>
                  <strong className="text-slate-800">💻 Windows:</strong> Mở Command Prompt (cmd) gõ lệnh <code className="bg-white px-1.5 py-0.5 rounded border border-blue-200 font-mono text-blue-700">getmac</code> hoặc <code className="bg-white px-1.5 py-0.5 rounded border border-blue-200 font-mono text-blue-700">ipconfig /all</code>.
                </div>
                <div>
                  <strong className="text-slate-800">🍎 MacOS:</strong> Vào Cài đặt hệ thống (System Settings) → Wi-Fi → Nâng cao (Details) → Hardware.
                </div>
                <div>
                  <strong className="text-slate-800">📱 iOS &amp; Android:</strong> Vào Cài đặt → Giới thiệu điện thoại → Trạng thái → Địa chỉ MAC Wi-Fi (Tắt tính năng địa chỉ MAC riêng tư cho mạng công ty).
                </div>
              </div>
            </div>

            <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
              <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-800">
                <Shield className="w-4 h-4 text-amber-600" />
                <span>Quy Định An Toàn Mạng LOL37</span>
              </div>
              <p>
                Mọi thiết bị được phê duyệt phải tuân thủ chính sách bảo mật: không phát wifi chia sẻ (Hotspot), không tự ý cắm cáp kết nối mạng OT sản xuất và tự động quét mã độc trước khi đăng ký.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* View 2: Tracking List */}
      {activeTab === 'tracking' && (
        <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-[#003B82]">
              Danh Sách Theo Dõi Trạng Thái Yêu Cầu WiFi
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Tự động cập nhật trạng thái từ hệ thống Tường lửa Firewall
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead>
                <tr className="bg-[#F4F9FD] text-[#003B82] font-bold border-b border-blue-100">
                  <th className="p-3">Mã yêu cầu</th>
                  <th className="p-3">Người yêu cầu</th>
                  <th className="p-3">Bộ phận</th>
                  <th className="p-3">Thiết bị</th>
                  <th className="p-3">Địa chỉ MAC</th>
                  <th className="p-3">Khu vực</th>
                  <th className="p-3">Ngày gửi</th>
                  <th className="p-3 text-center">Trạng thái</th>
                  <th className="p-3">Mạng được cấp (SSID)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {wifiRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-[#0066CC]">{req.requestCode}</td>
                    <td className="p-3 font-semibold text-slate-800">{req.fullName}</td>
                    <td className="p-3">{req.department}</td>
                    <td className="p-3">{req.deviceType}</td>
                    <td className="p-3 font-mono text-[11px] font-bold text-slate-700">
                      {req.macAddress}
                    </td>
                    <td className="p-3">{req.location}</td>
                    <td className="p-3 text-slate-500">{req.requestDate}</td>
                    <td className="p-3 text-center">{getStatusBadge(req.status)}</td>
                    <td className="p-3">
                      {req.assignedSsid ? (
                        <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {req.assignedSsid}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Chưa cấp</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View 3: IT Admin Approval */}
      {activeTab === 'admin' && isITAdmin && (
        <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#003B82] flex items-center gap-2">
                <Key className="w-5 h-5 text-amber-500" />
                <span>Bàn Phê Duyệt &amp; Cấp SSID Mạng Không Dây (IT Security Desk)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Thẩm định địa chỉ MAC, gán phân vùng mạng VLAN và phản hồi kết quả cho người dùng.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead>
                <tr className="bg-[#F4F9FD] text-[#003B82] font-bold border-b border-blue-100">
                  <th className="p-3">Mã yêu cầu</th>
                  <th className="p-3">Nhân sự</th>
                  <th className="p-3">Địa chỉ MAC</th>
                  <th className="p-3">Mục đích sử dụng</th>
                  <th className="p-3">Thời hạn</th>
                  <th className="p-3 text-center">Trạng thái</th>
                  <th className="p-3 text-center">Thao tác IT Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {wifiRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-[#0066CC]">{req.requestCode}</td>
                    <td className="p-3">
                      <div className="font-bold text-slate-800">{req.fullName}</div>
                      <div className="text-[11px] text-slate-500">{req.department}</div>
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-700">{req.macAddress}</td>
                    <td className="p-3 max-w-[200px] truncate" title={req.purpose}>
                      {req.purpose}
                    </td>
                    <td className="p-3">{req.duration}</td>
                    <td className="p-3 text-center">{getStatusBadge(req.status)}</td>
                    <td className="p-3 text-center">
                      <div className="inline-flex items-center gap-1.5">
                        {req.status !== 'APPROVED' && (
                          <button
                            onClick={() =>
                              updateWifiStatus(
                                req.id,
                                'APPROVED',
                                'Đã kiểm tra MAC hợp lệ và cho phép truy cập.',
                                'LOL37-INTERNAL-SECURE'
                              )
                            }
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg transition cursor-pointer"
                          >
                            Duyệt cấp
                          </button>
                        )}
                        {req.status === 'PENDING' && (
                          <button
                            onClick={() =>
                              updateWifiStatus(
                                req.id,
                                'PROCESSING',
                                'Đang đối soát địa chỉ MAC trên FortiGate.'
                              )
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg transition cursor-pointer"
                          >
                            Xử lý
                          </button>
                        )}
                        {req.status !== 'REJECTED' && (
                          <button
                            onClick={() =>
                              updateWifiStatus(
                                req.id,
                                'REJECTED',
                                'Địa chỉ MAC không khớp hoặc thiết bị không thuộc diện cấp phép.'
                              )
                            }
                            className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-[11px] px-2 py-1 rounded-lg transition cursor-pointer"
                          >
                            Từ chối
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Ticket Success Modal */}
      {newTicketCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#003B82]">Gửi Yêu Cầu Thành Công!</h3>
            <p className="text-xs text-slate-500 mt-1">
              Hệ thống đã tiếp nhận hồ sơ đăng ký mạng không dây của bạn.
            </p>

            <div className="bg-[#F4F9FD] p-4 rounded-xl border border-blue-200 my-4">
              <div className="text-[11px] text-slate-500 uppercase font-semibold">
                Mã tra cứu yêu cầu:
              </div>
              <div className="font-mono text-xl font-black text-[#0066CC] tracking-wider mt-0.5 select-all">
                {newTicketCode}
              </div>
              <div className="text-[11px] text-amber-700 font-medium mt-1">
                🟡 Trạng thái: Chờ bộ phận IT phê duyệt (Thời gian dự kiến: 15-30 phút).
              </div>
            </div>

            <div className="flex justify-center gap-2">
              <button
                onClick={() => {
                  setNewTicketCode(null);
                  setActiveTab('tracking');
                }}
                className="bg-[#0066CC] hover:bg-[#0055B8] text-white text-xs font-bold px-5 py-2 rounded-xl transition cursor-pointer"
              >
                Xem danh sách theo dõi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
