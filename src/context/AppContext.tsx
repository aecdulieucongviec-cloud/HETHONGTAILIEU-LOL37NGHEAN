import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DocumentItem,
  CategoryInfo,
  AnnouncementItem,
  CompanyEvent,
  CertificateItem,
  CompanyObjective,
  InternalWebApp,
  WifiRequest,
  UserAccount,
  AuditLogItem,
  UserRole,
  CategoryId,
  DocumentStatus,
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_DOCUMENTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_EVENTS,
  INITIAL_CERTIFICATES,
  INITIAL_OBJECTIVES,
  INITIAL_WEB_APPS,
  INITIAL_WIFI_REQUESTS,
  INITIAL_USERS,
  INITIAL_AUDIT_LOGS,
} from '../data/mockData';

export type NavTab =
  | 'home'
  | 'documents'
  | 'objectives'
  | 'dashboard'
  | 'webapps'
  | 'wifi'
  | 'control'
  | 'announcements'
  | 'events'
  | 'users'
  | 'audit';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
}

interface AppContextType {
  // Navigation & View State
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  selectedCategoryFilter: CategoryId | 'all';
  setSelectedCategoryFilter: (cat: CategoryId | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  triggerSearch: (query: string) => void;

  // Modals & Viewers
  selectedDocument: DocumentItem | null;
  setSelectedDocument: (doc: DocumentItem | null) => void;
  isViewerOpen: boolean;
  setIsViewerOpen: (open: boolean) => void;
  isDetailOpen: boolean;
  setIsDetailOpen: (open: boolean) => void;
  isUploadOpen: boolean;
  setIsUploadOpen: (open: boolean) => void;
  isVersionHistoryOpen: boolean;
  setIsVersionHistoryOpen: (open: boolean) => void;

  // Data Collections
  documents: DocumentItem[];
  categories: CategoryInfo[];
  announcements: AnnouncementItem[];
  events: CompanyEvent[];
  certificates: CertificateItem[];
  objectives: CompanyObjective[];
  webApps: InternalWebApp[];
  wifiRequests: WifiRequest[];
  users: UserAccount[];
  auditLogs: AuditLogItem[];

  // User & Auth State
  currentUser: UserAccount;
  setCurrentUser: (user: UserAccount) => void;
  switchRole: (role: UserRole) => void;

  // Actions
  viewDocument: (doc: DocumentItem) => void;
  downloadDocument: (doc: DocumentItem) => boolean;
  addDocument: (doc: Partial<DocumentItem>) => void;
  updateDocument: (id: string, updates: Partial<DocumentItem>) => void;
  deleteDocument: (id: string) => void;
  approveDocument: (id: string, approved: boolean, note?: string) => void;

  submitWifiRequest: (data: Omit<WifiRequest, 'id' | 'requestCode' | 'requestDate' | 'status'>) => string;
  updateWifiStatus: (id: string, status: WifiRequest['status'], adminNotes?: string, ssid?: string) => void;

  markAnnouncementRead: (id: string) => void;
  addAnnouncement: (announcement: Partial<AnnouncementItem>) => void;

  logAuditAction: (
    action: AuditLogItem['action'],
    targetType: AuditLogItem['targetType'],
    targetId: string,
    targetCode: string,
    targetTitle: string
  ) => void;

  // Toast feedback
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with localStorage fallbacks
  const [activeTab, setActiveTabState] = useState<NavTab>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false);

  // Entities
  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    try {
      const saved = localStorage.getItem('lol37_docs_v3');
      return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
    } catch {
      return INITIAL_DOCUMENTS;
    }
  });

  const [categories, setCategories] = useState<CategoryInfo[]>(INITIAL_CATEGORIES);

  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(() => {
    try {
      const saved = localStorage.getItem('lol37_announcements_v2');
      return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
    } catch {
      return INITIAL_ANNOUNCEMENTS;
    }
  });

  const [events, setEvents] = useState<CompanyEvent[]>(INITIAL_EVENTS);
  const [certificates, setCertificates] = useState<CertificateItem[]>(INITIAL_CERTIFICATES);
  const [objectives, setObjectives] = useState<CompanyObjective[]>(INITIAL_OBJECTIVES);
  const [webApps, setWebApps] = useState<InternalWebApp[]>(INITIAL_WEB_APPS);

  const [wifiRequests, setWifiRequests] = useState<WifiRequest[]>(() => {
    try {
      const saved = localStorage.getItem('lol37_wifi_v2');
      return saved ? JSON.parse(saved) : INITIAL_WIFI_REQUESTS;
    } catch {
      return INITIAL_WIFI_REQUESTS;
    }
  });

  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<UserAccount>(INITIAL_USERS[0]); // Default to Admin for full exploration

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    try {
      const saved = localStorage.getItem('lol37_audit_v3');
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lol37_docs_v3', JSON.stringify(documents));
    } catch (e) {
      console.error(e);
    }
  }, [documents]);

  useEffect(() => {
    try {
      localStorage.setItem('lol37_wifi_v2', JSON.stringify(wifiRequests));
    } catch (e) {
      console.error(e);
    }
  }, [wifiRequests]);

  useEffect(() => {
    try {
      localStorage.setItem('lol37_announcements_v2', JSON.stringify(announcements));
    } catch (e) {
      console.error(e);
    }
  }, [announcements]);

  useEffect(() => {
    try {
      localStorage.setItem('lol37_audit_v3', JSON.stringify(auditLogs));
    } catch (e) {
      console.error(e);
    }
  }, [auditLogs]);

  // Update category counts based on current documents
  useEffect(() => {
    setCategories((prev) =>
      prev.map((cat) => {
        const count = documents.filter((d) => d.categoryId === cat.id).length;
        return { ...cat, docCount: count };
      })
    );
  }, [documents]);

  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString().substring(2, 6);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const logAuditAction = (
    action: AuditLogItem['action'],
    targetType: AuditLogItem['targetType'],
    targetId: string,
    targetCode: string,
    targetTitle: string
  ) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(
      2,
      '0'
    )}:${String(now.getSeconds()).padStart(2, '0')}`;

    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.fullName,
      userRole: currentUser.role,
      action,
      targetType,
      targetId,
      targetCode,
      targetTitle,
      timestamp: formattedDate,
      ipAddress: '192.168.10.' + Math.floor(Math.random() * 80 + 10),
      device: `${navigator.platform} / WebApp`,
    };

    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const setActiveTab = (tab: NavTab) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerSearch = (query: string) => {
    setSearchQuery(query);
    setActiveTab('documents');
  };

  const switchRole = (role: UserRole) => {
    const found = users.find((u) => u.role === role);
    if (found) {
      setCurrentUser(found);
      showToast({
        type: 'info',
        title: 'Chuyển đổi vai trò',
        message: `Đang đăng nhập với vai trò: ${found.role} (${found.fullName})`,
      });
    }
  };

  const viewDocument = (doc: DocumentItem) => {
    setSelectedDocument(doc);
    setIsViewerOpen(true);
    // Increment view count
    setDocuments((prev) =>
      prev.map((d) => (d.id === doc.id ? { ...d, viewsCount: d.viewsCount + 1 } : d))
    );
    logAuditAction('VIEW', 'DOCUMENT', doc.id, doc.code, doc.title);
  };

  const downloadDocument = (doc: DocumentItem): boolean => {
    // Check permission: GUEST cannot download confidential or internal docs
    if (currentUser.role === 'GUEST' && doc.securityLevel !== 'PUBLIC') {
      showToast({
        type: 'error',
        title: 'Không có quyền tải xuống',
        message: 'Tài khoản khách vãng lai chỉ được xem trực tuyến hoặc tải tài liệu Công khai.',
      });
      return false;
    }

    setDocuments((prev) =>
      prev.map((d) => (d.id === doc.id ? { ...d, downloadsCount: d.downloadsCount + 1 } : d))
    );
    logAuditAction('DOWNLOAD', 'DOCUMENT', doc.id, doc.code, doc.title);
    showToast({
      type: 'success',
      title: 'Tải tài liệu thành công',
      message: `Đang tải: ${doc.fileName} (${doc.fileSize})`,
    });
    return true;
  };

  const addDocument = (docData: Partial<DocumentItem>) => {
    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      code: docData.code || `TL-${Math.floor(1000 + Math.random() * 9000)}`,
      title: docData.title || 'Tài liệu mới',
      categoryId: docData.categoryId || 'chinh-sach-quy-trinh',
      categoryName:
        categories.find((c) => c.id === docData.categoryId)?.name || 'CHÍNH SÁCH & QUY TRÌNH',
      department: docData.department || currentUser.department,
      version: docData.version || 'V1.0',
      issueDate: docData.issueDate || new Date().toISOString().slice(0, 10),
      effectiveDate: docData.effectiveDate || new Date().toISOString().slice(0, 10),
      expiryDate: docData.expiryDate,
      status: currentUser.role === 'ADMIN' ? 'EFFECTIVE' : 'PENDING_APPROVAL',
      personInCharge: docData.personInCharge || currentUser.fullName,
      issuer: docData.issuer || 'Ban Giám đốc',
      securityLevel: docData.securityLevel || 'INTERNAL',
      keywords: docData.keywords || [],
      description: docData.description || '',
      fileType: docData.fileType || 'pdf',
      fileName: docData.fileName || `${docData.code || 'DOC'}.pdf`,
      fileSize: docData.fileSize || '2.4 MB',
      viewsCount: 0,
      downloadsCount: 0,
      versionHistory: [
        {
          version: docData.version || 'V1.0',
          effectiveDate: docData.effectiveDate || new Date().toISOString().slice(0, 10),
          updatedBy: currentUser.fullName,
          summaryOfChanges: 'Ban hành lần đầu lên hệ thống số hóa LOL37',
          fileUrl: '#',
          fileName: docData.fileName || 'document.pdf',
          fileSize: docData.fileSize || '2.4 MB',
          status: currentUser.role === 'ADMIN' ? 'EFFECTIVE' : 'PENDING_APPROVAL',
        },
      ],
      contentSample: docData.contentSample || docData.description,
    };

    setDocuments((prev) => [newDoc, ...prev]);
    logAuditAction('UPLOAD', 'DOCUMENT', newDoc.id, newDoc.code, newDoc.title);
    showToast({
      type: 'success',
      title: 'Tải lên tài liệu thành công',
      message: `Tài liệu mã ${newDoc.code} đã được lưu vào hệ thống.`,
    });
  };

  const updateDocument = (id: string, updates: Partial<DocumentItem>) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === id) {
          const updated = { ...doc, ...updates };
          logAuditAction('EDIT', 'DOCUMENT', doc.id, doc.code, doc.title);
          return updated;
        }
        return doc;
      })
    );
    showToast({
      type: 'success',
      title: 'Cập nhật thành công',
      message: 'Thông tin tài liệu đã được lưu lại.',
    });
  };

  const deleteDocument = (id: string) => {
    const target = documents.find((d) => d.id === id);
    if (!target) return;

    if (currentUser.role !== 'ADMIN' && currentUser.role !== 'DOCUMENT_CONTROLLER') {
      showToast({
        type: 'error',
        title: 'Từ chối quyền',
        message: 'Chỉ Quản trị viên hoặc Document Controller mới có quyền xóa tài liệu.',
      });
      return;
    }

    setDocuments((prev) => prev.filter((d) => d.id !== id));
    logAuditAction('DELETE', 'DOCUMENT', target.id, target.code, target.title);
    showToast({
      type: 'info',
      title: 'Đã xóa tài liệu',
      message: `Tài liệu ${target.code} đã được loại bỏ khỏi hệ thống.`,
    });
  };

  const approveDocument = (id: string, approved: boolean, note?: string) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === id) {
          const nextStatus: DocumentStatus = approved ? 'EFFECTIVE' : 'DRAFT';
          logAuditAction(
            approved ? 'APPROVE' : 'REJECT',
            'DOCUMENT',
            doc.id,
            doc.code,
            doc.title
          );
          return {
            ...doc,
            status: nextStatus,
            approver: currentUser.fullName,
          };
        }
        return doc;
      })
    );
    showToast({
      type: approved ? 'success' : 'warning',
      title: approved ? 'Đã phê duyệt tài liệu' : 'Đã từ chối/yêu cầu sửa',
      message: note || (approved ? 'Tài liệu đã chính thức có hiệu lực.' : 'Tài liệu chuyển về bản nháp.'),
    });
  };

  const submitWifiRequest = (
    data: Omit<WifiRequest, 'id' | 'requestCode' | 'requestDate' | 'status'>
  ): string => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const requestCode = `WIFI-2026-${randomNum}`;
    const now = new Date();
    const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(
      2,
      '0'
    )}`;

    const newReq: WifiRequest = {
      ...data,
      id: `wifi-${Date.now()}`,
      requestCode,
      requestDate: formatted,
      status: 'PENDING',
    };

    setWifiRequests((prev) => [newReq, ...prev]);
    logAuditAction('WIFI_REQUEST', 'WIFI', newReq.id, requestCode, `Yêu cầu WiFi: ${data.fullName}`);
    showToast({
      type: 'success',
      title: 'Đã gửi yêu cầu kết nối WiFi',
      message: `Mã tra cứu của bạn là: ${requestCode}`,
    });
    return requestCode;
  };

  const updateWifiStatus = (
    id: string,
    status: WifiRequest['status'],
    adminNotes?: string,
    ssid?: string
  ) => {
    setWifiRequests((prev) =>
      prev.map((req) => {
        if (req.id === id) {
          const now = new Date().toISOString().slice(0, 16).replace('T', ' ');
          return {
            ...req,
            status,
            adminNotes: adminNotes || req.adminNotes,
            assignedSsid: ssid || (status === 'APPROVED' ? 'LOL37-INTERNAL-SECURE' : undefined),
            approvedDate: status === 'APPROVED' ? now : undefined,
          };
        }
        return req;
      })
    );
    showToast({
      type: status === 'APPROVED' ? 'success' : 'info',
      title: 'Cập nhật yêu cầu WiFi',
      message: `Đã chuyển trạng thái sang: ${status}`,
    });
  };

  const markAnnouncementRead = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const currentReaders = item.readBy || [];
          if (!currentReaders.includes(currentUser.id)) {
            return { ...item, readBy: [...currentReaders, currentUser.id] };
          }
        }
        return item;
      })
    );
  };

  const addAnnouncement = (data: Partial<AnnouncementItem>) => {
    const code = `TB_${String(new Date().getDate()).padStart(2, '0')}_${String(
      new Date().getMonth() + 1
    ).padStart(2, '0')}.26`;
    const newAnn: AnnouncementItem = {
      id: `tb-${Date.now()}`,
      code: data.code || code,
      title: data.title || 'Thông báo mới',
      date: new Date().toISOString().slice(0, 10),
      author: currentUser.fullName,
      department: currentUser.department,
      isImportant: !!data.isImportant,
      isNew: true,
      hasAttachment: !!data.hasAttachment,
      attachmentName: data.attachmentName || (data.hasAttachment ? 'ThongBaoDinhKem.pdf' : undefined),
      attachmentSize: data.hasAttachment ? '1.5 MB' : undefined,
      content: data.content || '',
      readBy: [currentUser.id],
    };

    setAnnouncements((prev) => [newAnn, ...prev]);
    showToast({
      type: 'success',
      title: 'Tạo thông báo thành công',
      message: `Thông báo ${newAnn.code} đã được đăng tải.`,
    });
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        searchQuery,
        setSearchQuery,
        triggerSearch,

        selectedDocument,
        setSelectedDocument,
        isViewerOpen,
        setIsViewerOpen,
        isDetailOpen,
        setIsDetailOpen,
        isUploadOpen,
        setIsUploadOpen,
        isVersionHistoryOpen,
        setIsVersionHistoryOpen,

        documents,
        categories,
        announcements,
        events,
        certificates,
        objectives,
        webApps,
        wifiRequests,
        users,
        auditLogs,

        currentUser,
        setCurrentUser,
        switchRole,

        viewDocument,
        downloadDocument,
        addDocument,
        updateDocument,
        deleteDocument,
        approveDocument,

        submitWifiRequest,
        updateWifiStatus,

        markAnnouncementRead,
        addAnnouncement,

        logAuditAction,

        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
