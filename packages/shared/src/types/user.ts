export type UserId = string;
export type PhoneNumber = string;
export type Email = string;
export type Username = string;

export type KYCStatus = 'pending' | 'verified' | 'rejected';
export type MembershipTier = 'free' | 'basic' | 'premium';

export type UserRole = 'user' | 'admin' | 'moderator';
export type UserStatus = 'active' | 'suspended' | 'banned' | 'pending_verification';

export interface BaseUser {
  id: UserId;
  phone_number: PhoneNumber;
  email?: Email;
  username?: Username;
  kyc_status: KYCStatus;
  membership_tier: MembershipTier;
  referral_code: string;
  referred_by?: UserId;
  created_at: Date;
  updated_at: Date;
}

export interface UserProfile extends BaseUser {
  first_name?: string;
  last_name?: string;
  date_of_birth?: Date;
  country?: string;
  city?: string;
  avatar_url?: string;
  bio?: string;
  preferred_language: string;
  timezone: string;
  two_factor_enabled: boolean;
  email_notifications: boolean;
  sms_notifications: boolean;
  trade_notifications: boolean;
}

export interface UserSecurityInfo {
  user_id: UserId;
  password_hash: string;
  last_login?: Date;
  login_attempts: number;
  locked_until?: Date;
  password_reset_token?: string;
  password_reset_expires?: Date;
  two_factor_secret?: string;
  backup_codes?: string[];
}

export interface UserStats {
  user_id: UserId;
  total_trades: number;
  successful_trades: number;
  trade_completion_rate: number;
  total_volume_traded: number;
  average_rating: number;
  total_ratings: number;
  disputes_initiated: number;
  disputes_against: number;
  reputation_score: number;
  registration_date: Date;
  last_active: Date;
}

export interface UserPreferences {
  user_id: UserId;
  theme: 'light' | 'dark' | 'auto';
  language: string;
  currency_display: 'USD' | 'IQD' | 'USDT';
  timezone: string;
  email_notifications: boolean;
  sms_notifications: boolean;
  push_notifications: boolean;
  trade_alerts: boolean;
  price_alerts: boolean;
  marketing_emails: boolean;
}

export type CreateUserRequest = Pick<UserProfile, 'phone_number' | 'email' | 'username'> & {
  password: string;
  referral_code?: string;
};

export type UpdateUserRequest = Partial<Pick<UserProfile, 
  'email' | 'username' | 'first_name' | 'last_name' | 'date_of_birth' | 
  'country' | 'city' | 'bio' | 'preferred_language' | 'timezone'
>>;

export type UserResponse = Omit<UserProfile, 'password_hash' | 'two_factor_secret'>;


