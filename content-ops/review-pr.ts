const DAILY_CONTENT_BRANCH = /^codex\/daily-content-(\d{4}-\d{2}-\d{2})$/;

export function qualifiesAsPendingContentReview(input: {
  pullRequest?: string;
  branch?: string;
  generatedDocumentCount?: number;
}) {
  if (!input.pullRequest?.trim() || !input.branch?.trim()) return false;
  if (!/^https:\/\/github\.com\/[^/]+\/[^/]+\/pull\/\d+$/.test(input.pullRequest.trim())) return false;
  if (!DAILY_CONTENT_BRANCH.test(input.branch.trim())) return false;
  return Number.isInteger(input.generatedDocumentCount) && (input.generatedDocumentCount || 0) > 0;
}
