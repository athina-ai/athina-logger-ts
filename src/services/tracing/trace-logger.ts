import { API_BASE_URL } from '../../constants';
import { AthinaApiKey } from '../../core/api-key';
import { RequestHelper } from '../../core/request-helper';
import { TraceModel } from '../../types/tracing';
import { getUtcTime, removeNoneValues } from '../../utils/tracing';
import { Generation } from './generation';
import { Span } from './span';

export class TraceLogger {
  private _trace: TraceModel;
  private _spans: Span[];

  constructor(
    name: string,
    start_time?: Date,
    end_time?: Date,
    status?: string,
    attributes?: Record<string, any>,
    duration?: number,
    version?: string,
  ) {
    this._trace = {
      name,
      start_time: (start_time || new Date()).toISOString(),
      end_time: end_time?.toISOString(),
      status,
      attributes: attributes || {},
      duration,
      version,
      spans: [],
    };
    this._spans = [];
  }

  toString(): string {
    return `Trace(name=${this._trace.name}, dict=${JSON.stringify(removeNoneValues(this.toDict()))}, spans=${this._spans})`;
  }

  addSpan(span: Span): void {
    this._spans.push(span);
  }

  createSpan(
    name: string,
    start_time?: Date,
    end_time?: Date,
    span_type: string = 'span',
    status?: string,
    attributes?: Record<string, any>,
    input?: Record<string, any>,
    output?: Record<string, any>,
    duration?: number,
    version?: string,
  ): Span {
    const span = new Span(
      name,
      start_time || new Date(),
      end_time,
      span_type,
      status,
      attributes,
      input,
      output,
      duration,
      version,
    );
    this._spans.push(span);
    return span;
  }

  addGeneration(generation: Generation): void {
    this._spans.push(generation);
  }

  createGeneration(
    name: string,
    start_time?: Date,
    end_time?: Date,
    span_type: string = 'generation',
    status?: string,
    attributes?: Record<string, any>,
    input?: Record<string, any>,
    output?: Record<string, any>,
    duration?: number,
    version?: string,
    prompt?: string | Record<string, any> | Array<Record<string, any>>,
    response?: any,
    prompt_slug?: string,
    language_model_id?: string,
    environment?: string,
    functions?: Array<Record<string, any>>,
    function_call_response?: any,
    tools?: any,
    tool_calls?: any,
    external_reference_id?: string,
    customer_id?: string,
    customer_user_id?: string,
    session_id?: string,
    user_query?: string,
    prompt_tokens?: number,
    completion_tokens?: number,
    total_tokens?: number,
    response_time?: number,
    context?: Record<string, any>,
    expected_response?: string,
    custom_attributes?: Record<string, any>,
    cost?: number,
    custom_eval_metrics?: Record<string, any>,
  ): Generation {
    const generation = new Generation(
      name,
      start_time || new Date(),
      end_time,
      span_type,
      status,
      attributes,
      input,
      output,
      duration,
      version,
      prompt,
      response,
      prompt_slug,
      language_model_id,
      environment,
      functions,
      function_call_response,
      tools,
      tool_calls,
      external_reference_id,
      customer_id,
      customer_user_id,
      session_id,
      user_query,
      prompt_tokens,
      completion_tokens,
      total_tokens,
      response_time,
      context,
      expected_response,
      custom_attributes,
      cost,
      custom_eval_metrics,
    );
    this._spans.push(generation);
    return generation;
  }

  toDict(): Record<string, any> {
    const traceDict = { ...this._trace };
    traceDict.spans = this._spans.map((span) => span.toDict());
    return traceDict;
  }

  update(end_time?: Date, duration?: number, status?: string, attributes?: Record<string, any>): void {
    if (end_time) {
      this._trace.end_time = end_time.toISOString();
    }
    if (status) {
      this._trace.status = status;
    }
    if (attributes) {
      this._trace.attributes = attributes;
    }
    if (duration) {
      this._trace.duration = duration;
    }
  }

  private async _logTraceAsync(requestDict: Record<string, any>): Promise<void> {
    return RequestHelper.makePostRequest(`${API_BASE_URL}/api/v1/trace/sdk`, requestDict, {
      'athina-api-key': AthinaApiKey.getApiKey(),
      'Content-Type': 'application/json',
    });
  }

  end(end_time?: Date): void {
    try {
      end_time = getUtcTime(end_time);
      for (const span of this._spans) {
        span.end(end_time);
      }
      if (!this._trace.end_time) {
        this._trace.end_time = end_time.toISOString();
      }
      if (!this._trace.duration) {
        const delta = end_time.getTime() - new Date(this._trace.start_time).getTime();
        this._trace.duration = Math.floor(delta);
      }
      const requestDict = removeNoneValues(this.toDict());
      this._logTraceAsync(requestDict).catch((e) => console.error('Error logging trace:', e));
    } catch (e) {
      console.error('Error ending trace:', e);
    }
  }
}
