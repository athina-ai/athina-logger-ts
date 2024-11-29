export interface UserFeedbackOptions {
  externalReferenceId: string;
  userFeedback: 1 | -1; // 1: positive, -1: negative
  userFeedbackComment?: string;
}
