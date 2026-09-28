import React, { useState } from 'react';
import { X, Upload, FileText, Check, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CategoryId, SecurityLevel } from '../types';

export const UploadDocumentModal: React.FC = () => {
  const { isUploadOpen, setIsUploadOpen, addDocument, categories, currentUser } = useApp();

  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState<CategoryId>('chinh-sach-quy-trinh');
  const [department, setDepartment] = useState(currentUser.department || 'Phòng Kỹ thuật');
  const [version, setVersion] = useState('V1.0');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().slice(0, 10));
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().slice(0, 10));
  const [expiryDate, setExpiryDate] = useState('');
  const [personInCharge, setPersonInCharge] = useState(currentUser.fullName);
  const [issuer, setIssuer] = useState('Ban Giám đốc LOL37');
  const [securityLevel, setSecurityLevel] = useState<SecurityLevel>('INTERNAL');
  const [tagsInput, setTagsInput] = useState('');
  const [description, setDescription] = useState('');
  const [fileType, setFileType] = useState<'pdf' | 'docx' | 'xlsx' | 'pptx' | 'zip'>('pdf');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('2.4 MB');

  if (!isUploadOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const autoCode = code.trim() || `TL-${Math.floor(1000 + Math.random() * 9000)}`;
    const finalFileName = fileName || `${autoCode}.${fileType}`;
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addDocument({
      code: autoCode,
      title: title.trim(),
      categoryId,
      department,
      version,
      issueDate,
      effectiveDate,
      expiryDate: expiryDate || undefined,
      personInCharge,
      issuer,
      securityLevel,
      keywords: tags.length ? tags : ['tài liệu nội bộ', 'lol37'],
      description: description.trim(),
      fileType,
      fileName: finalFileName,
      fileSize,
    });

    setIsUploadOpen(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (['pdf', 'docx', 'xlsx', 'pptx', 'zip'].includes(ext || '')) {
        setFileType(ext as any);
      }
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#003B82]">
                Tải Lên Tài Liệu Mới
              </h3>
              <p className="text-xs text-slate-500">
                Nhập thông tin quản trị và đính kèm tệp văn bản theo quy chuẩn ISO.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsUploadOpen(false)}
            className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-4 space-y-4 text-xs sm:text-sm">
          {/* File Dropzone */}
          <div className="border-2 border-dashed border-blue-200 hover:border-[#0066CC] rounded-xl p-4 bg-[#F4F9FD] text-center transition cursor-pointer relative">
            <input
              type="file"
              onChange={handleFileSelect}
              accept=".pdf,.docx,.xlsx,.pptx,.zip"
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <FileText className="w-8 h-8 text-[#0066CC] mx-auto mb-1" />
            <div className="font-semibold text-slate-700">
              {fileName ? (
                <span className="text-emerald-700 font-bold">{fileName} ({fileSize})</span>
              ) : (
                <span>Nhấp hoặc kéo thả tệp tài liệu vào đây (PDF, DOCX, XLSX, PPTX, ZIP)</span>
              )}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Dung lượng tối đa 50MB</div>
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mã tài liệu *
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="VD: QT-VH-15, ST-CL-02..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Phiên bản *
              </label>
              <input
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="V1.0"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Tên tài liệu *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Quy trình vận hành hệ thống xử lý nước thải..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nhóm danh mục *
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value as CategoryId)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:outline-none bg-white"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Phòng ban phụ trách *
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="VD: Phòng Vận hành, Phòng HSE..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Ngày ban hành *
              </label>
              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Ngày hiệu lực *
              </label>
              <input
                type="date"
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Ngày hết hiệu lực
              </label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Người phụ trách *
              </label>
              <input
                type="text"
                value={personInCharge}
                onChange={(e) => setPersonInCharge(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mức độ bảo mật *
              </label>
              <select
                value={securityLevel}
                onChange={(e) => setSecurityLevel(e.target.value as SecurityLevel)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:outline-none bg-white"
              >
                <option value="PUBLIC">CÔNG KHAI (Cho phép toàn thể)</option>
                <option value="INTERNAL">NỘI BỘ (Chỉ nhân viên LOL37)</option>
                <option value="CONFIDENTIAL">BẢO MẬT (Cần quyền truy cập)</option>
                <option value="STRICTLY_CONFIDENTIAL">TUYỆT MẬT (Ban Giám đốc)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Từ khóa (cách nhau bởi dấu phẩy)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="VD: quy trình, an toàn, iso 9001, hóa chất"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Tóm tắt / Mô tả tài liệu
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập tóm tắt mục tiêu, phạm vi và đối tượng áp dụng..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:outline-none resize-none"
            />
          </div>

          <div className="border-t border-slate-100 pt-3 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsUploadOpen(false)}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-[#20B26B] hover:bg-[#1ca060] text-white font-bold px-5 py-2 rounded-lg transition shadow-sm cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Lưu &amp; Ban Hành</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
