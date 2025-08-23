export type AdminRole = 'super_admin' | 'admin' | 'moderator' | 'support';
export type AdminPermission = 
  | 'users.view' | 'users.edit' | 'users.delete' | 'users.suspend'
  | 'trades.view' | 'trades.edit' | 'trades.cancel' | 'trades.dispute'
  | 'advertisements.view' | 'advertisements.edit' | 'advertisements.delete'
  | 'wallets.view' | 'wallets.edit' | 'wallets.freeze'
  | 'kyc.view' | 'kyc.approve' | 'kyc.reject'
  | 'reports.view' | 'reports.export'
  | 'settings.view' | 'settings.edit'
  | 'system.logs' | 'system.maintenance';

export interface AdminUser {
  id: string;
  email: string;
  username: string;
  role: AdminRole;
  permissions: AdminPermission[];
  is_active: boolean;
  last_login?: Date;
  created_at: Date;
  created_by: string;
}

export interface SystemStats {
  total_users: number;
  active_users_24h: number;
  total_trades: number;
  trades_24h: number;
  total_volume: number;
  volume_24h: number;
  pending_kyc: number;
  active_disputes: number;
  total_revenue: number;
  revenue_24h: number;
  server_uptime: number;
  api_response_time: number;
}

export interface UserManagement {
  id: string;
  phone_number: string;
  email?: string;
  username?: string;
  kyc_status: string;
  membership_tier: string;
  account_status: 'active' | 'suspended' | 'banned';
  total_trades: number;
  total_volume: number;
  reputation_score: number;
  last_active?: Date;
  created_at: Date;
  flags: UserFlag[];
}

export interface UserFlag {
  id: string;
  user_id: string;
  flag_type: 'suspicious_activity' | 'multiple_accounts' | 'fraud_risk' | 'kyc_issues' | 'payment_disputes';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  created_by: string;
  created_at: Date;
  resolved_at?: Date;
  resolved_by?: string;
}

export interface TradeDispute {
  id: string;
  trade_id: string;
  initiated_by: string;
  respondent_id: string;
  dispute_type: 'payment_not_received' | 'payment_not_sent' | 'wrong_amount' | 'fraud' | 'other';
  description: string;
  evidence_urls: string[];
  status: 'open' | 'investigating' | 'resolved' | 'escalated';
  assigned_to?: string;
  resolution?: string;
  resolution_notes?: string;
  created_at: Date;
  resolved_at?: Date;
}

export interface KYCSubmission {
  id: string;
  user_id: string;
  document_type: 'passport' | 'national_id' | 'drivers_license';
  document_number: string;
  document_front_url: string;
  document_back_url?: string;
  selfie_url: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected' | 'requires_additional_info';
  rejection_reason?: string;
  reviewed_by?: string;
  reviewed_at?: Date;
  submitted_at: Date;
  additional_notes?: string;
}

export interface SystemLog {
  id: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  service: string;
  message: string;
  user_id?: string;
  ip_address?: string;
  metadata?: Record<string, any>;
  timestamp: Date;
}

export interface AdminAction {
  id: string;
  admin_id: string;
  action_type: string;
  target_type: 'user' | 'trade' | 'advertisement' | 'kyc' | 'system';
  target_id: string;
  description: string;
  before_data?: Record<string, any>;
  after_data?: Record<string, any>;
  ip_address: string;
  created_at: Date;
}

export interface ReportData {
  period: 'day' | 'week' | 'month' | 'quarter' | 'year';
  start_date: Date;
  end_date: Date;
  metrics: {
    users: {
      new_registrations: number;
      active_users: number;
      kyc_completions: number;
    };
    trading: {
      total_trades: number;
      total_volume: number;
      average_trade_size: number;
      completion_rate: number;
    };
    financial: {
      total_fees: number;
      commission_earned: number;
      revenue: number;
    };
  };
}

export interface AdminSettings {
  id: string;
  category: string;
  key: string;
  value: any;
  description: string;
  is_public: boolean;
  updated_by: string;
  updated_at: Date;
}

export type CreateAdminUserRequest = Pick<AdminUser, 'email' | 'username' | 'role'> & {
  password: string;
  permissions?: AdminPermission[];
};

export type UpdateUserStatusRequest = {
  status: 'active' | 'suspended' | 'banned';
  reason?: string;
  duration?: number; // in days, for suspensions
};

export type KYCReviewRequest = {
  status: 'approved' | 'rejected' | 'requires_additional_info';
  rejection_reason?: string;
  additional_notes?: string;
};

export type DisputeResolutionRequest = {
  resolution: string;
  resolution_notes?: string;
  winner?: 'buyer' | 'seller' | 'partial';
};


