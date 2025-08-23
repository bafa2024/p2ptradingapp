export type AdvertisementId = string;
export type TradeId = string;
export type PaymentMethodId = string;

export type AdvertisementType = 'buy' | 'sell';
export type TradeStatus = 'pending' | 'paid' | 'confirmed' | 'disputed' | 'completed' | 'cancelled' | 'expired';
export type PaymentMethodType = 'bank_transfer' | 'cash' | 'mobile_money' | 'online_wallet' | 'crypto';
export type PriceType = 'fixed' | 'floating';

export interface PaymentMethod {
  id: PaymentMethodId;
  type: PaymentMethodType;
  name: string;
  details: Record<string, any>;
  is_verified: boolean;
  processing_time_minutes: number;
  minimum_amount?: number;
  maximum_amount?: number;
}

export interface Advertisement {
  id: AdvertisementId;
  user_id: string;
  type: AdvertisementType;
  currency: string;
  amount: number;
  min_amount: number;
  max_amount: number;
  price: number;
  price_type: PriceType;
  margin?: number; // For floating price
  payment_methods: PaymentMethod[];
  terms: string;
  auto_reply_message?: string;
  trade_time_limit_minutes: number;
  is_active: boolean;
  is_promoted: boolean;
  require_verified_email: boolean;
  require_verified_phone: boolean;
  require_minimum_reputation: number;
  country_restrictions: string[];
  created_at: Date;
  updated_at: Date;
}

export interface Trade {
  id: TradeId;
  advertisement_id: AdvertisementId;
  seller_id: string;
  buyer_id: string;
  amount: number;
  price: number;
  total_amount: number;
  currency: string;
  payment_method: PaymentMethod;
  status: TradeStatus;
  escrow_released: boolean;
  commission_amount: number;
  payment_deadline?: Date;
  dispute_reason?: string;
  dispute_resolved_by?: string;
  dispute_resolution?: string;
  rating_given_by_seller?: number;
  rating_given_by_buyer?: number;
  feedback_from_seller?: string;
  feedback_from_buyer?: string;
  chat_messages?: TradeMessage[];
  created_at: Date;
  updated_at: Date;
  completed_at?: Date;
}

export interface TradeMessage {
  id: string;
  trade_id: TradeId;
  sender_id: string;
  message: string;
  message_type: 'text' | 'image' | 'system' | 'payment_proof';
  attachment_url?: string;
  is_system_message: boolean;
  created_at: Date;
}

export interface TradeRating {
  id: string;
  trade_id: TradeId;
  rater_id: string;
  rated_user_id: string;
  rating: number; // 1-5
  feedback?: string;
  is_positive: boolean;
  created_at: Date;
}

export interface MarketPrice {
  currency: string;
  buy_price: number;
  sell_price: number;
  last_updated: Date;
  volume_24h: number;
  change_24h: number;
}

export interface TradingStats {
  user_id: string;
  total_trades_as_buyer: number;
  total_trades_as_seller: number;
  total_volume_bought: number;
  total_volume_sold: number;
  average_trade_time_minutes: number;
  completion_rate: number;
  dispute_rate: number;
  average_rating: number;
  total_ratings_received: number;
  fastest_trade_time_minutes?: number;
  last_trade_date?: Date;
}

export interface CreateAdvertisementRequest {
  type: AdvertisementType;
  currency: string;
  amount: number;
  min_amount: number;
  max_amount: number;
  price: number;
  price_type: PriceType;
  margin?: number;
  payment_method_ids: PaymentMethodId[];
  terms: string;
  auto_reply_message?: string;
  trade_time_limit_minutes?: number;
  require_verified_email?: boolean;
  require_verified_phone?: boolean;
  require_minimum_reputation?: number;
  country_restrictions?: string[];
}

export interface CreateTradeRequest {
  advertisement_id: AdvertisementId;
  amount: number;
  payment_method_id: PaymentMethodId;
  message?: string;
}

export interface UpdateTradeStatusRequest {
  status: TradeStatus;
  message?: string;
  payment_proof_url?: string;
}

export type AdvertisementResponse = Advertisement & {
  user: {
    id: string;
    username?: string;
    reputation_score: number;
    total_trades: number;
    positive_feedback_percentage: number;
    last_seen: Date;
  };
};

export type TradeResponse = Trade & {
  advertisement: Pick<Advertisement, 'id' | 'type' | 'terms'>;
  seller: Pick<any, 'id' | 'username' | 'reputation_score'>;
  buyer: Pick<any, 'id' | 'username' | 'reputation_score'>;
};


