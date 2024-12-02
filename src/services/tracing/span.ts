import { SpanModel } from '../../types/tracing';
import { getUtcTime, removeNoneValues } from '../../utils/tracing';
import { Generation } from './generation';

export class Span {
  private _span: SpanModel;
  private _children: (Span | Generation)[] = [];

  constructor(
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
  ) {
    if (!start_time) {
      start_time = new Date();
    }
    this._span = {
      name,
      span_type,
      start_time: start_time.toISOString(),
      end_time: end_time?.toISOString(),
      status,
      attributes: attributes || {},
      input: input || {},
      output: output || {},
      duration,
      version,
    };
  }

  toString(): string {
    return `Span(name=${this._span.name}, dict=${JSON.stringify(removeNoneValues(this.toDict()))}, children=${this._children})`;
  }

  addSpan(span: Span): void {
    this._children.push(span);
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
    this._children.push(span);
    return span;
  }

  addGeneration(generation: Generation): void {
    this._children.push(generation);
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
      start_time,
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
    this._children.push(generation);
    return generation;
  }

  update(
    end_time?: Date,
    status?: string,
    input?: Record<string, any>,
    output?: Record<string, any>,
    duration?: number,
    attributes?: Record<string, any>,
  ): void {
    if (end_time) {
      this._span.end_time = end_time.toISOString();
    }
    if (status) {
      this._span.status = status;
    }
    if (input) {
      this._span.input = input;
    }
    if (output) {
      this._span.output = output;
    }
    if (duration) {
      this._span.duration = duration;
    }
    if (attributes) {
      this._span.attributes = { ...this._span.attributes, ...attributes };
    }
  }

  end(end_time?: Date): void {
    try {
      end_time = getUtcTime(end_time);
      if (!this._span.end_time) {
        this._span.end_time = end_time.toISOString();
      }
      if (!this._span.duration) {
        const delta = end_time.getTime() - new Date(this._span.start_time).getTime();
        this._span.duration = Math.floor(delta);
      }
      for (const child of this._children) {
        child.end(end_time);
      }
    } catch (e) {
      console.error(`Error ending span: ${e}`);
    }
  }

  toDict(): Record<string, any> {
    return removeNoneValues({
      ...this._span,
      children: this._children.map((child) => child.toDict()),
    });
  }
}
