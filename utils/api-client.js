require('dotenv').config();
const { attachApiCall } = require('./allure-helper');

const API_VERSION = process.env.API_VERSION || '1';

// Fallback value for any route segment not substituted by the caller (e.g. {logId}),
// so requests hit a real route instead of a literal "{param}" URL segment.
const SYNTHETIC_PATH_PARAM = 'synthetic-automation-value';

function resolvePath(path) {
  return path.replace('{version}', API_VERSION).replace(/\{[^}]+\}/g, SYNTHETIC_PATH_PARAM);
}

/**
 * Sends an API request through an APIRequestContext, times it, and attaches
 * details to the Allure report (full detail only when the call fails).
 */
async function sendRequest(context, { method = 'GET', path, headers = {}, data, params }) {
  const url = resolvePath(path);
  const start = Date.now();
  const response = await context.fetch(url, { method, headers, data, params });
  const durationMs = Date.now() - start;

  let body;
  const contentType = response.headers()['content-type'] || '';
  try {
    body = contentType.includes('json') ? await response.json() : await response.text();
  } catch {
    body = await response.text().catch(() => '');
  }

  await attachApiCall({
    method,
    url,
    headers,
    payload: data,
    status: response.status(),
    durationMs,
    body,
    failed: !response.ok(),
  });

  return { response, body, durationMs };
}

module.exports = { sendRequest, resolvePath, API_VERSION };
