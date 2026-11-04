require('dotenv').config();
const { expect } = require('@playwright/test');

const RESPONSE_TIME_THRESHOLD_MS = Number(process.env.RESPONSE_TIME_THRESHOLD_MS) || 5000;

function assertStatus(response, expectedStatuses) {
  const list = Array.isArray(expectedStatuses) ? expectedStatuses : [expectedStatuses];
  expect(list, `Expected status in [${list.join(', ')}] but got ${response.status()}`).toContain(response.status());
}

function assertJsonContentType(response) {
  const contentType = response.headers()['content-type'] || '';
  expect(contentType, 'Expected a JSON Content-Type header').toMatch(/json/i);
}

function assertResponseTime(durationMs, maxMs = RESPONSE_TIME_THRESHOLD_MS) {
  expect(durationMs, `Response took ${durationMs}ms, exceeding ${maxMs}ms threshold`).toBeLessThanOrEqual(maxMs);
}

function assertHasFields(body, fields) {
  expect(body, 'Response body must be an object').toBeTruthy();
  for (const field of fields) {
    expect(body, `Response missing required field "${field}"`).toHaveProperty(field);
  }
}

module.exports = { assertStatus, assertJsonContentType, assertResponseTime, assertHasFields, RESPONSE_TIME_THRESHOLD_MS };
