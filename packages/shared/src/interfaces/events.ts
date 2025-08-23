import { TradeId, AdvertisementId } from '../types/trading';
import { UserId } from '../types/user';

export interface BaseEvent {
  id: string;
  timestamp: Date;
  user_id?: UserId;
  session_id?: string;
}

// User Events
export interface UserRegisteredEvent extends BaseEvent {
  type: 'user.registered';
  data: {
    user_id: UserId;
    phone_number: string;
    email?: string;
    referral_code?: string;
    registration_source: 'web' | 'mobile' | 'api';
  };
}

export interface UserVerifiedEvent extends BaseEvent {
  type: 'user.verified';
  data: {
    user_id: UserId;
    verification_type: 'phone' | 'email' | 'kyc';
  };
}

export interface UserLoginEvent extends BaseEvent {
  type: 'user.login';
  data: {
    user_id: UserId;
    ip_address: string;
    user_agent: string;
    device_id?: string;
    login_method: 'password' | 'two_factor' | 'social';
  };
}

// Trading Events
export interface TradeCreatedEvent extends BaseEvent {
  type: 'trade.created';
  data: {
    trade_id: TradeId;
    advertisement_id: AdvertisementId;
    buyer_id: UserId;
    seller_id: UserId;
    amount: number;
    price: number;
    currency: string;
  };
}

export interface TradeStatusChangedEvent extends BaseEvent {
  type: 'trade.status_changed';
  data: {
    trade_id: TradeId;
    old_status: string;
    new_status: string;
    changed_by: UserId;
    reason?: string;
  };
}

export interface TradeCompletedEvent extends BaseEvent {
  type: 'trade.completed';
  data: {
    trade_id: TradeId;
    buyer_id: UserId;
    seller_id: UserId;
    amount: number;
    commission: number;
    completion_time_minutes: number;
  };
}

export interface TradeDisputedEvent extends BaseEvent {
  type: 'trade.disputed';
  data: {
    trade_id: TradeId;
    initiated_by: UserId;
    dispute_type: string;
    description: string;
  };
}

// Wallet Events
export interface WalletTransactionEvent extends BaseEvent {
  type: 'wallet.transaction';
  data: {
    transaction_id: string;
    user_id: UserId;
    transaction_type: string;
    amount: number;
    currency: string;
    status: string;
    tx_hash?: string;
  };
}

export interface WalletBalanceChangedEvent extends BaseEvent {
  type: 'wallet.balance_changed';
  data: {
    user_id: UserId;
    currency: string;
    old_balance: number;
    new_balance: number;
    change_amount: number;
    reason: string;
  };
}

// Advertisement Events
export interface AdvertisementCreatedEvent extends BaseEvent {
  type: 'advertisement.created';
  data: {
    advertisement_id: AdvertisementId;
    user_id: UserId;
    type: 'buy' | 'sell';
    amount: number;
    price: number;
    currency: string;
  };
}

export interface AdvertisementStatusChangedEvent extends BaseEvent {
  type: 'advertisement.status_changed';
  data: {
    advertisement_id: AdvertisementId;
    old_status: string;
    new_status: string;
    reason?: string;
  };
}

// System Events
export interface SystemMaintenanceEvent extends BaseEvent {
  type: 'system.maintenance';
  data: {
    maintenance_type: 'scheduled' | 'emergency';
    start_time: Date;
    end_time?: Date;
    affected_services: string[];
    message: string;
  };
}

export interface SecurityAlertEvent extends BaseEvent {
  type: 'security.alert';
  data: {
    alert_type: 'suspicious_login' | 'multiple_failed_attempts' | 'unusual_activity';
    user_id?: UserId;
    ip_address: string;
    user_agent?: string;
    details: Record<string, any>;
    risk_score: number;
  };
}

// WebSocket Events
export interface ChatMessageEvent extends BaseEvent {
  type: 'chat.message';
  data: {
    trade_id: TradeId;
    sender_id: UserId;
    message: string;
    message_type: 'text' | 'image' | 'system';
    attachment_url?: string;
  };
}

export interface OnlineStatusEvent extends BaseEvent {
  type: 'user.online_status';
  data: {
    user_id: UserId;
    status: 'online' | 'offline' | 'away';
    last_seen?: Date;
  };
}

export interface NotificationEvent extends BaseEvent {
  type: 'notification';
  data: {
    user_id: UserId;
    notification_type: string;
    title: string;
    message: string;
    action_url?: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
  };
}

// Event unions for type safety
export type UserEvent = 
  | UserRegisteredEvent 
  | UserVerifiedEvent 
  | UserLoginEvent;

export type TradingEvent = 
  | TradeCreatedEvent 
  | TradeStatusChangedEvent 
  | TradeCompletedEvent 
  | TradeDisputedEvent;

export type WalletEvent = 
  | WalletTransactionEvent 
  | WalletBalanceChangedEvent;

export type AdvertisementEvent = 
  | AdvertisementCreatedEvent 
  | AdvertisementStatusChangedEvent;

export type SystemEvent = 
  | SystemMaintenanceEvent 
  | SecurityAlertEvent;

export type RealtimeEvent = 
  | ChatMessageEvent 
  | OnlineStatusEvent 
  | NotificationEvent;

export type AppEvent = 
  | UserEvent 
  | TradingEvent 
  | WalletEvent 
  | AdvertisementEvent 
  | SystemEvent 
  | RealtimeEvent;

// Event handler interfaces
export interface EventHandler<T extends AppEvent = AppEvent> {
  handle(event: T): Promise<void> | void;
}

export interface EventEmitter {
  emit<T extends AppEvent>(event: T): Promise<void>;
  on<T extends AppEvent>(eventType: T['type'], handler: EventHandler<T>): void;
  off<T extends AppEvent>(eventType: T['type'], handler: EventHandler<T>): void;
}

export interface EventStore {
  save(event: AppEvent): Promise<void>;
  getEvents(filters: EventFilter): Promise<AppEvent[]>;
  getEventsByUser(userId: UserId, filters?: EventFilter): Promise<AppEvent[]>;
}

export interface EventFilter {
  types?: string[];
  user_id?: UserId;
  start_date?: Date;
  end_date?: Date;
  limit?: number;
  offset?: number;
}
