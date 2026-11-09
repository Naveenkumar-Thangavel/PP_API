require('dotenv').config();
const { attachApiCall } = require('./allure-helper');

const API_VERSION = process.env.API_VERSION || '1';

// Fallback value for any route segment not substituted by the caller (e.g. {logId}),
// so requests hit a real route instead of a literal "{param}" URL segment.
const SYNTHETIC_PATH_PARAM = 'synthetic-automation-value';
// Per-param overrides for route segments whose API requires a specific type/format (e.g. an int id).
const PATH_PARAM_OVERRIDES = { logId: '1' };

function resolvePath(path) {
  return path
    .replace('{version}', API_VERSION)
    .replace(/\{([^}]+)\}/g, (_match, name) => PATH_PARAM_OVERRIDES[name] || SYNTHETIC_PATH_PARAM);
}

/**
 * Sends an API request through an APIRequestContext, times it, and attaches
 * details to the Allure report (full detail only when the call fails).
 */
async function sendRequest(context, { method = 'GET', path, headers = {}, data, params }) {
  const url = resolvePath(path);
  const start = Date.now();
  const contentType = headers['Content-Type'] || headers['content-type'] || 'application/json';
  const requestData = typeof data === 'string' && /json/i.test(contentType) ? JSON.stringify(data) : data;
  const response = await context.fetch(url, { method, headers, data: requestData, params });
  const durationMs = Date.now() - start;

  let body;
  const responseContentType = response.headers()['content-type'] || '';
  try {
    body = responseContentType.includes('json') ? await response.json() : await response.text();
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
