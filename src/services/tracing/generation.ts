import { Span } from './span';

export class Generation extends Span {
  constructor(
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
  ) {
    if (!attributes) {
      attributes = {};
    }
    const additionalAttributes: Record<string, any> = {
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
    };
    for (const [key, value] of Object.entries(additionalAttributes)) {
      if (value !== undefined) {
        attributes[key] = value;
      }
    }
    super(name, start_time, end_time, span_type, status, attributes, input, output, duration, version);
  }

  update(
    end_time?: Date,
    status?: string,
    input?: Record<string, any>,
    output?: Record<string, any>,
    duration?: number,
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
  ): void {
    const attributes: Record<string, any> = {};
    const additionalAttributes: Record<string, any> = {
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
    };
    for (const [key, value] of Object.entries(additionalAttributes)) {
      if (value !== undefined) {
        attributes[key] = value;
      }
    }
    super.update(end_time, status, input, output, duration, attributes);
  }
}
