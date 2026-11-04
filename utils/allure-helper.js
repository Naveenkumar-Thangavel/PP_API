const { allure } = require('allure-playwright');

// Keys whose values must never appear in reports
const SENSITIVE_KEY_PATTERN = /(authorization|password|token|apikey|api-key|secret|cookie|connectionstring|credential)/i;

function maskSensitive(input) {
  if (Array.isArray(input)) return input.map(maskSensitive);
  if (input && typeof input === 'object') {
    const masked = {};
    for (const [key, value] of Object.entries(input)) {
      masked[key] = SENSITIVE_KEY_PATTERN.test(key) ? '***MASKED***' : maskSensitive(value);
    }
    return masked;
  }
  return input;
}

/**
 * Attaches a short summary for every call, and full request/response detail only on failure
 * to keep the Allure report small.
 */
async function attachApiCall({ method, url, headers, payload, status, durationMs, body, failed }) {
  await allure.attachment(
    'API Call Summary',
    `${method} ${url}\nStatus: ${status}\nDuration: ${durationMs}ms`,
    'text/plain'
  );

  if (!failed) return;

  await allure.attachment('Request Headers', JSON.stringify(maskSensitive(headers || {}), null, 2), 'application/json');
  if (payload !== undefined) {
    await allure.attachment('Request Payload', JSON.stringify(maskSensitive(payload), null, 2), 'application/json');
  }
  const bodyText = typeof body === 'string' ? body : JSON.stringify(maskSensitive(body), null, 2);
  await allure.attachment('Response Body', bodyText, 'application/json');
}

/** Masked, length-capped text form of a response body, for use in assertion failure reasons. */
function summarizeBody(body, maxLength = 300) {
  const masked = maskSensitive(body);
  const text = typeof masked === 'string' ? masked : JSON.stringify(masked);
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

module.exports = { maskSensitive, attachApiCall, summarizeBody };
