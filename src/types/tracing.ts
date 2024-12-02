export interface TraceModel {
  name: string;
  start_time: string;
  end_time?: string;
  duration?: number;
  status?: string;
  attributes?: Record<string, any>;
  version?: string;
  spans?: Record<string, any>[];
}

export interface SpanModel {
  name: string;
  start_time: string;
  span_type: string;
  end_time?: string;
  duration?: number;
  status?: string;
  attributes?: Record<string, any>;
  input?: Record<string, any>;
  output?: Record<string, any>;
  version?: string;
}
