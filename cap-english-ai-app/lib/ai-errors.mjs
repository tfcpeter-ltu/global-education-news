// Keep provider diagnostics separate from user-facing messages. Never return raw errors.
export function classifyAIError(status, payload = {}) {
  const values = [payload?.error?.code, payload?.error?.type];
  if (values.some(v => ['insufficient_quota', 'credit_balance_exhausted', 'billing_hard_limit_reached'].includes(v))) return 'AI_INSUFFICIENT_QUOTA';
  if (status === 429) return 'AI_RATE_LIMIT';
  if (status === 401) return 'AI_AUTH_FAILED';
  if (status === 403 || values.includes('model_not_found')) return 'AI_ACCESS_DENIED';
  return 'AI_SERVICE_FAILED';
}
