import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  UserPlus,
  Search,
  CheckCircle,
  XCircle,
  Key,
  Lock,
  Mail,
  Building,
  Phone,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole, UserAccount } from '../types';

export const UserManagementView: React.FC = () => {
  const { users, currentUser, switchRole, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');
  const [showMatrix, setShowMatrix] = useState(false);

  const filteredUsers = users.filter((u) => {
    if (selectedRoleFilter !== 'all' && u.role !== selectedRoleFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.department.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Permission Matrix Definition
  const permissionsMatrix: {
    role: UserRole;
    name: string;
    view: boolean;
    download: boolean;
    upload: boolean;
    edit: boolean;
    approve: boolean;
    delete: boolean;
    manage: boolean;
  }[] = [
    {
      role: 'ADMIN',
      name: 'Tổng Giám Đốc (Admin)',
      view: true,
      download: true,
      upload: true,
      edit: true,
      approve: true,
      delete: true,
      manage: true,
    },
    {
      role: 'DOCUMENT_CONTROLLER',
      name: 'Document Controller',
      view: true,
      download: true,
      upload: true,
      edit: true,
      approve: true,
      delete: true,
      manage: true,
    },
    {
      role: 'DEPARTMENT_MANAGER',
      name: 'Trưởng Phòng Ban',
      view: true,
      download: true,
      upload: true,
      edit: true,
      approve: false,
      delete: false,
      manage: false,
    },
    {
      role: 'EMPLOYEE',
      name: 'Cán bộ Nhân viên',
      view: true,
      download: true,
      upload: false,
      edit: false,
      approve: false,
      delete: false,
      manage: false,
    },
    {
      role: 'GUEST',
      name: 'Khách Vãng lai',
      view: true,
      download: false,
      upload: false,
      edit: false,
      approve: false,
      delete: false,
      manage: false,
    },
  ];

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-blue-100 shadow-xs mb-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#0066CC] font-bold uppercase tracking-wider">
            <span>QUẢN TRỊ BẢO MẬT</span>
            <span>/</span>
            <span className="text-slate-500">NGƯỜI DÙNG &amp; PHÂN QUYỀN RBAC</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#003B82] uppercase mt-1">
            QUẢN LÝ NGƯỜI DÙNG &amp; MA TRẬN PHÂN QUYỀN
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Quản trị tài khoản, vai trò và phân quyền truy cập tài liệu bảo mật theo vị trí công tác.
          </p>
        </div>

        <button
          onClick={() => setShowMatrix(!showMatrix)}
          className="flex items-center gap-2 bg-[#0066CC] hover:bg-[#0055B8] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition shadow-sm cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{showMatrix ? 'Xem danh sách người dùng' : 'Xem ma trận quyền (RBAC)'}</span>
        </button>
      </div>

      {showMatrix ? (
        /* Permission Matrix View */
        <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-xs">
          <h3 className="text-base font-bold text-[#003B82] mb-3">
            Bảng Ma Trận Phân Quyền Truy Cập (Role-Based Access Control)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#003B82] text-white font-bold uppercase">
                  <th className="p-3">Vai trò (Role)</th>
                  <th className="p-3 text-center">XEM (View)</th>
                  <th className="p-3 text-center">TẢI (Download)</th>
                  <th className="p-3 text-center">TẢI LÊN (Upload)</th>
                  <th className="p-3 text-center">SỬA (Edit)</th>
                  <th className="p-3 text-center">PHÊ DUYỆT (Approve)</th>
                  <th className="p-3 text-center">XÓA (Delete)</th>
                  <th className="p-3 text-center">QUẢN TRỊ (Manage)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {permissionsMatrix.map((row) => (
                  <tr key={row.role} className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900">
                      <div>{row.name}</div>
                      <div className="font-mono text-[10px] text-slate-400">{row.role}</div>
                    </td>
                    <td className="p-3 text-center">
                      {row.view ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600 mx-auto" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-300 mx-auto" />
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {row.download ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600 mx-auto" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-300 mx-auto" />
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {row.upload ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600 mx-auto" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-300 mx-auto" />
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {row.edit ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600 mx-auto" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-300 mx-auto" />
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {row.approve ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600 mx-auto" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-300 mx-auto" />
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {row.delete ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600 mx-auto" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-300 mx-auto" />
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {row.manage ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600 mx-auto" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-300 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Users List View */
        <div className="bg-white rounded-2xl border border-blue-100 shadow-xs p-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 text-xs">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm nhân viên, email, phòng ban..."
                className="w-full pl-9 pr-3 py-2 bg-[#F4F9FD] border border-blue-100 rounded-xl focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-slate-400">Lọc theo vai trò:</span>
              <select
                value={selectedRoleFilter}
                onChange={(e) => setSelectedRoleFilter(e.target.value)}
                className="bg-[#F4F9FD] border border-blue-100 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 focus:outline-none"
              >
                <option value="all">Tất cả</option>
                <option value="ADMIN">ADMIN</option>
                <option value="DOCUMENT_CONTROLLER">DOCUMENT_CONTROLLER</option>
                <option value="DEPARTMENT_MANAGER">DEPARTMENT_MANAGER</option>
                <option value="EMPLOYEE">EMPLOYEE</option>
                <option value="GUEST">GUEST</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead>
                <tr className="bg-[#F4F9FD] text-[#003B82] font-bold border-b border-blue-100">
                  <th className="p-3">Họ và tên</th>
                  <th className="p-3">Email liên hệ</th>
                  <th className="p-3">Phòng ban</th>
                  <th className="p-3">Chức vụ</th>
                  <th className="p-3 text-center">Vai trò (Role)</th>
                  <th className="p-3">Đăng nhập gần nhất</th>
                  <th className="p-3 text-center">Mô phỏng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => {
                  const isCurrent = currentUser.id === u.id;
                  return (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{u.fullName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">@{u.username}</div>
                      </td>
                      <td className="p-3 font-medium text-slate-600">{u.email}</td>
                      <td className="p-3">{u.department}</td>
                      <td className="p-3 font-semibold">{u.position}</td>
                      <td className="p-3 text-center">
                        <span className="font-mono text-[10px] font-bold bg-blue-50 text-[#0066CC] border border-blue-200 px-2 py-0.5 rounded">
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500">{u.lastLogin}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => switchRole(u.role)}
                          className={`px-3 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                            isCurrent
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-slate-100 hover:bg-[#0066CC] hover:text-white text-slate-700'
                          }`}
                        >
                          {isCurrent ? '✓ Đang dùng' : 'Đăng nhập vai trò này'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
