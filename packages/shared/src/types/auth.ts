export type TokenType = 'access' | 'refresh' | 'email_verification' | 'password_reset' | 'two_factor';

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: 'Bearer';
}

export interface LoginRequest {
  phone_number: string;
  password: string;
  remember_me?: boolean;
  two_factor_code?: string;
}

export interface RegisterRequest {
  phone_number: string;
  email?: string;
  username?: string;
  password: string;
  confirm_password: string;
  referral_code?: string;
  accept_terms: boolean;
  accept_privacy: boolean;
}

export interface VerifyOTPRequest {
  phone_number: string;
  otp_code: string;
  type: 'registration' | 'login' | 'password_reset' | 'phone_verification';
}

export interface ForgotPasswordRequest {
  phone_number: string;
}

export interface ResetPasswordRequest {
  phone_number: string;
  reset_code: string;
  new_password: string;
  confirm_password: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export interface TwoFactorSetupRequest {
  password: string;
}

export interface TwoFactorVerifyRequest {
  code: string;
  backup_code?: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: any; // Will be UserResponse from user types
    tokens?: AuthTokens;
    requires_otp?: boolean;
    otp_sent_to?: string;
    two_factor_required?: boolean;
  };
  errors?: string[];
}

export interface OTPResponse {
  success: boolean;
  message: string;
  data?: {
    otp_sent_to: string;
    expires_in: number;
    resend_after: number;
  };
}

export interface TwoFactorSetupResponse {
  success: boolean;
  message: string;
  data?: {
    secret: string;
    qr_code_url: string;
    backup_codes: string[];
  };
}

export interface SessionInfo {
  id: string;
  user_id: string;
  device_info: string;
  ip_address: string;
  user_agent: string;
  location?: string;
  is_current: boolean;
  created_at: Date;
  last_active: Date;
  expires_at: Date;
}

export interface DeviceInfo {
  device_id: string;
  device_name: string;
  device_type: 'mobile' | 'desktop' | 'tablet';
  os: string;
  browser?: string;
  app_version?: string;
  is_trusted: boolean;
  first_seen: Date;
  last_seen: Date;
}

export interface SecurityEvent {
  id: string;
  user_id: string;
  event_type: 'login' | 'logout' | 'password_change' | 'email_change' | 'phone_change' | 
              'two_factor_enabled' | 'two_factor_disabled' | 'suspicious_activity' | 
              'account_locked' | 'account_unlocked';
  ip_address: string;
  user_agent: string;
  location?: string;
  device_id?: string;
  details?: Record<string, any>;
  risk_score?: number;
  created_at: Date;
}

export type LogoutRequest = {
  all_devices?: boolean;
};


