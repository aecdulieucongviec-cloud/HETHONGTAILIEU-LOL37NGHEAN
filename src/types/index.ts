export type DocumentStatus =
  | 'DRAFT'
  | 'PENDING_APPROVAL'
  | 'APPROVED'
  | 'EFFECTIVE'
  | 'EXPIRING_SOON'
  | 'EXPIRED'
  | 'OBSOLETE'
  | 'ARCHIVED';

export type SecurityLevel = 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL' | 'STRICTLY_CONFIDENTIAL';

export type UserRole =
  | 'ADMIN'
  | 'DOCUMENT_CONTROLLER'
  | 'DEPARTMENT_MANAGER'
  | 'EMPLOYEE'
  | 'GUEST';

export type CategoryId =
  | 'so-tay'
  | 'chinh-sach-quy-trinh'
  | 'muc-tieu'
  | 'van-hanh'
  | 'tai-lieu-hse'
  | 'tai-lieu-cd'
  | 'huong-dan-cong-viec'
  | 'bao-tri'
  | 'bao-cao-ky-thuat'
  | 'tieu-chuan-sqm'
  | 'tai-lieu-dao-tao'
  | 'sach-dien-tu';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  docCount: number;
}

export interface DocumentVersion {
  version: string;
  effectiveDate: string;
  updatedBy: string;
  summaryOfChanges: string;
  fileUrl: string;
  fileSize: string;
  fileName: string;
  status: DocumentStatus;
  approvedBy?: string;
  approvedDate?: string;
}

export interface DocumentItem {
  id: string;
  code: string; // e.g. ST-01, QT-VH-02
  title: string;
  categoryId: CategoryId;
  categoryName: string;
  department: string;
  version: string;
  issueDate: string; // Ngày ban hành
  effectiveDate: string; // Ngày hiệu lực
  expiryDate?: string; // Ngày hết hiệu lực
  status: DocumentStatus;
  personInCharge: string; // Người phụ trách
  issuer: string; // Người / Cơ quan ban hành
  approver?: string;
  securityLevel: SecurityLevel;
  keywords: string[];
  description: string;
  fileType: 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'zip';
  fileName: string;
  fileSize: string;
  viewsCount: number;
  downloadsCount: number;
  versionHistory: DocumentVersion[];
  contentSample?: string;
}

export interface AnnouncementItem {
  id: string;
  code: string; // e.g. TB_25_09.26
  title: string;
  date: string;
  author: string;
  department: string;
  isImportant?: boolean;
  isNew?: boolean;
  hasAttachment?: boolean;
  attachmentName?: string;
  attachmentSize?: string;
  content: string;
  readBy?: string[]; // user IDs who have read
}

export interface CompanyEvent {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  endDate?: string;
  location: string;
  description: string;
  bannerImage?: string;
  badge?: string;
  category: 'Kỷ niệm' | 'Đánh giá ISO' | 'An toàn HSE' | 'Đào tạo' | 'Sự kiện nội bộ';
  isActive: boolean;
}

export interface CertificateItem {
  id: string;
  code: string;
  name: string;
  standard: string; // e.g. ISO 9001:2015
  issuingBody: string; // e.g. BSI, TÜV Rheinland
  issueDate: string;
  expiryDate: string;
  status: 'ACTIVE' | 'RENEWING' | 'EXPIRED';
  scope: string;
  certificateNumber: string;
  fileUrl?: string;
}

export interface CompanyObjective {
  id: string;
  title: string;
  category: 'Chất lượng' | 'An toàn HSE' | 'Sản xuất' | 'Năng lượng' | 'Đào tạo';
  targetValue: string;
  currentValue: string;
  percentage: number;
  period: string; // e.g. Năm 2026
  responsiblePerson: string;
  status: 'ON_TRACK' | 'AT_RISK' | 'ACHIEVED';
}

export interface InternalWebApp {
  id: string;
  name: string;
  shortName: string;
  category: string;
  description: string;
  url: string;
  iconName: string;
  status: 'ACTIVE' | 'MAINTENANCE' | 'UPDATING';
  version: string;
  badge?: string;
}

export type WifiRequestStatus = 'PENDING' | 'PROCESSING' | 'APPROVED' | 'REJECTED';

export interface WifiRequest {
  id: string;
  requestCode: string; // e.g. WIFI-2026-000125
  fullName: string;
  employeeId: string;
  department: string;
  deviceType: 'Laptop' | 'Smartphone' | 'Tablet' | 'Thiết bị đo';
  macAddress: string;
  location: string;
  purpose: string;
  duration: '1_MONTH' | '3_MONTHS' | '6_MONTHS' | 'PERMANENT';
  notes?: string;
  requestDate: string;
  status: WifiRequestStatus;
  adminNotes?: string;
  approvedDate?: string;
  assignedSsid?: string;
}

export interface UserAccount {
  id: string;
  username: string;
  fullName: string;
  email: string;
  department: string;
  position: string;
  role: UserRole;
  isActive: boolean;
  avatar?: string;
  lastLogin: string;
  phone?: string;
}

export interface AuditLogItem {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: 'VIEW' | 'DOWNLOAD' | 'UPLOAD' | 'EDIT' | 'DELETE' | 'APPROVE' | 'REJECT' | 'WIFI_REQUEST';
  targetType: 'DOCUMENT' | 'ANNOUNCEMENT' | 'WIFI' | 'USER' | 'SETTINGS';
  targetId: string;
  targetCode: string;
  targetTitle: string;
  timestamp: string;
  ipAddress: string;
  device: string;
}
