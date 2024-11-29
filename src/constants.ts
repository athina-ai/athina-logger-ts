import { TiktokenEncoding } from "tiktoken";

// Athina Server Base Url
export const API_BASE_URL = process.env.API_BASE_URL || 'https://log.athina.ai';
export const LOG_INFERENCE_URL = `${API_BASE_URL}/api/v1/log/inference`;
export const USER_FEEDBACK_URL = `${API_BASE_URL}/api/v1/prompt_run/user-feedback`;

export const OPENAI_MODEL_ENCODINGS: Record<string, TiktokenEncoding> = {
  'gpt-3.5-turbo-0613': 'cl100k_base',
  'gpt-3.5-turbo-16k-0613': 'cl100k_base',
  'gpt-4-0613': 'cl100k_base',
  'gpt-4-32k-0613': 'cl100k_base',
  'text-davinci-003': 'p50k_base',
};