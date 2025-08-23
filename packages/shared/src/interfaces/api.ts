export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[] | Record<string, string[]>;
  meta?: {
    pagination?: PaginationMeta;
    timestamp: Date;
    request_id: string;
    version: string;
  };
}

export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
  total_pages: number;
  has_next_page: boolean;
  has_prev_page: boolean;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface SearchQuery extends PaginationQuery {
  search?: string;
  filters?: Record<string, any>;
}

export interface ApiError {
  code: string;
  message: string;
  field?: string;
  details?: Record<string, any>;
}

export interface ValidationError extends ApiError {
  field: string;
  value: any;
  constraint: string;
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: Date;
  retry_after?: number;
}

export interface HealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: Date;
  uptime: number;
  version: string;
  services: {
    database: ServiceStatus;
    redis: ServiceStatus;
    blockchain: ServiceStatus;
    external_api: ServiceStatus;
  };
  metrics: {
    memory_usage: number;
    cpu_usage: number;
    active_connections: number;
    requests_per_minute: number;
  };
}

export interface ServiceStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  response_time_ms: number;
  last_check: Date;
  error?: string;
}

export interface WebSocketMessage<T = any> {
  type: string;
  event: string;
  data: T;
  timestamp: Date;
  request_id?: string;
}

export interface WebSocketResponse<T = any> {
  type: 'response' | 'event' | 'error';
  event: string;
  data?: T;
  error?: ApiError;
  timestamp: Date;
  request_id?: string;
}

// Request/Response interfaces for common operations
export interface ListRequest extends SearchQuery {
  include?: string[];
  exclude?: string[];
}

export interface ListResponse<T> {
  items: T[];
  meta: PaginationMeta;
}

export interface CreateRequest<T> {
  data: T;
}

export interface UpdateRequest<T> {
  data: Partial<T>;
}

export interface DeleteRequest {
  id: string;
  soft_delete?: boolean;
}

export interface BulkOperationRequest<T> {
  operation: 'create' | 'update' | 'delete';
  items: T[];
}

export interface BulkOperationResponse {
  success_count: number;
  error_count: number;
  errors: Array<{
    index: number;
    error: ApiError;
  }>;
}

export interface FileUploadResponse {
  file_id: string;
  filename: string;
  original_name: string;
  size: number;
  mime_type: string;
  url: string;
  thumbnail_url?: string;
  upload_date: Date;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  in_app: boolean;
}

export interface SystemNotification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  action_url?: string;
  action_text?: string;
  is_dismissible: boolean;
  expires_at?: Date;
  created_at: Date;
}


