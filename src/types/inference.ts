export interface InferenceLoggerOptions {
  prompt: string | Record<string, any> | Array<Record<string, any>>;
  response?: any;
  promptSlug?: string;
  languageModelId?: string;
  environment?: string;
  customerId?: string;
  customerUserId?: string;
  sessionId?: string;
  userQuery?: string;
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  responseTime?: number;
  context?: Record<string, any>;
  expectedResponse?: string;
  customAttributes?: Record<string, any>;
  customEvalMetrics?: Record<string, any>;
  cost?: number;
  functions?: Array<Record<string, any>>;
  functionCallResponse?: any;
  tools?: any;
  toolCalls?: any;
  modelOptions?: Record<string, any>;
  externalReferenceId?: string;
}
