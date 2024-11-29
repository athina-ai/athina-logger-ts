import { AthinaApiKey } from "../core/api-key";
import { RequestHelper } from "../core/request-helper";
import { InferenceLoggerOptions } from "../types";
import { LOG_INFERENCE_URL } from "../constants";

export class InferenceLogger {
  static async logInference(options: InferenceLoggerOptions): Promise<void> {
    try {
      const payload = {
        prompt_slug: options.promptSlug,
        prompt: options.prompt,
        response: options.response,
        language_model_id: options.languageModelId,
        environment: options.environment || "production",
        customer_id: options.customerId,
        customer_user_id: options.customerUserId,
        session_id: options.sessionId,
        user_query: options.userQuery,
        prompt_tokens: options.promptTokens,
        completion_tokens: options.completionTokens,
        externalReferenceId: options.externalReferenceId,
        total_tokens: options.totalTokens,
        response_time: options.responseTime,
        context: options.context,
        expected_response: options.expectedResponse,
        custom_attributes: options.customAttributes,
        custom_eval_metrics: options.customEvalMetrics,
        cost: options.cost,
        functions: options.functions,
        function_call_response: options.functionCallResponse,
        tools: options.tools,
        tool_calls: options.toolCalls,
        model_options: options.modelOptions,
      };

      // Remove undefined fields
      const cleanPayload = Object.fromEntries(
        Object.entries(payload).filter(([_, v]) => v !== undefined)
      );

      await RequestHelper.makePostRequest(LOG_INFERENCE_URL, cleanPayload, {
        "athina-api-key": AthinaApiKey.getApiKey(),
      });
    } catch (error) {
      console.error("Error logging inference to Athina:", error);
      throw error;
    }
  }
}
