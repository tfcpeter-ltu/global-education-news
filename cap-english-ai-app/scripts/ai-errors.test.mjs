import assert from 'node:assert/strict';
import {classifyAIError} from '../lib/ai-errors.mjs';
for (const status of [400, 402, 429]) {
  for (const field of ['code', 'type']) {
    for (const value of ['insufficient_quota', 'credit_balance_exhausted', 'billing_hard_limit_reached']) {
      assert.equal(classifyAIError(status, {error: {[field]: value}}), 'AI_INSUFFICIENT_QUOTA');
    }
  }
}
assert.equal(classifyAIError(429, {error:{code:'rate_limit_exceeded'}}), 'AI_RATE_LIMIT');
assert.equal(classifyAIError(401), 'AI_AUTH_FAILED');
assert.equal(classifyAIError(403), 'AI_ACCESS_DENIED');
assert.equal(classifyAIError(404, {error:{code:'model_not_found'}}), 'AI_ACCESS_DENIED');
assert.equal(classifyAIError(500, null), 'AI_SERVICE_FAILED');
console.log('PASS: quota variants distinguished from rate limits, authentication and model access');
