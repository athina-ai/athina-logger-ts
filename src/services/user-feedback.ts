import { AthinaApiKey } from "../core/api-key";
import { RequestHelper } from "../core/request-helper";
import { UserFeedbackOptions } from "../types";
import { USER_FEEDBACK_URL } from "../constants";

export class UserFeedback {
  static async logUserFeedback(options: UserFeedbackOptions): Promise<void> {
    try {
      const payload = {
        external_reference_id: options.externalReferenceId,
        user_feedback: options.userFeedback,
        user_feedback_comment: options.userFeedbackComment,
      };

      // Remove undefined fields
      const cleanPayload = Object.fromEntries(
        Object.entries(payload).filter(([_, v]) => v !== undefined)
      );

      await RequestHelper.makePatchRequest(USER_FEEDBACK_URL, cleanPayload, {
        "athina-api-key": AthinaApiKey.getApiKey(),
      });
    } catch (error) {
      console.error("Error logging user feedback to Athina:", error);
      throw error;
    }
  }
}
